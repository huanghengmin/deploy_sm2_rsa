package com.deploy.web.action;

import com.deploy.domain.X509Ca;
import com.deploy.ldap.DNUtils;
import com.deploy.ldap.LdapUtils;
import com.deploy.ldap.LdapXMLUtils;
import com.deploy.service.X509CaService;
import com.deploy.utils.X509Context;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import com.deploy.web.utils.*;

import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.SearchControls;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.PrintWriter;
import java.security.cert.X509Certificate;
import java.util.Date;

/**
 * Created by hhm on 14-3-24.
 */
public class X509CaAction extends ActionSupport {
    private Logger log = Logger.getLogger(X509CaAction.class);
    private X509CaService x509CaService;

    public X509CaService getX509CaService() {
        return x509CaService;
    }

    public void setX509CaService(X509CaService x509CaService) {
        this.x509CaService = x509CaService;
    }


    /**
     * 检查根证书是否存在
     *
     * @return
     * @throws Exception
     */
    public boolean existCa(X509Ca x509Ca, String host, String port, String adm, String pwd, String base) {
        LdapUtils ldapUtils = new LdapUtils();
        DirContext context = ldapUtils.getLdapCtx(host, Integer.parseInt(port), adm, pwd);
        SearchControls sc = new SearchControls();
        sc.setSearchScope(SearchControls.ONELEVEL_SCOPE);
        NamingEnumeration results = null;
        try {
            results = context.search(base, X509Ca.getCnAttr() + "=" + x509Ca.getCn(), sc);
            if (results.hasMore()) {
                return true;
            }
        } catch (NamingException e) {
            return false;
        }
        return false;
    }


    public void clearExistData() throws Exception {
        /**
         * 删除原有数据信息
         */
        DirectoryUtils.deleteDirectory(X509Context.storePath);

        File dir = new File(X509Context.storePath);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        /**
         * 删除原有LDAP数据信息
         */
        String port = LdapXMLUtils.getValue(LdapXMLUtils.port);
        if (port != null) {
            String host = LdapXMLUtils.getValue(LdapXMLUtils.host);
            String adm = LdapXMLUtils.getValue(LdapXMLUtils.adm);
            String pwd = LdapXMLUtils.getValue(LdapXMLUtils.pwd);
            String dn = X509CaXML.getSignDn();
            LdapUtils ldapUtils = new LdapUtils();
            DirContext ctx = ldapUtils.getLdapCtx(host, Integer.parseInt(port), adm, pwd);
            try {
                if (dn != null) {
                    if (ctx != null) {
                        x509CaService.deleteStation(ctx, dn);
                    }
                }
            } catch (Exception e) {
                log.error(e.getMessage());
            } finally {
                LdapUtils.close(ctx);
            }
        }
    }

    /**
     * 自签发证书
     */
    public String selfSign() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();
        HttpServletRequest request = ServletActionContext.getRequest();
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        String json = null;
        String msg = null;
        String CN = request.getParameter("cn");
        String province = request.getParameter("province");
        String city = request.getParameter("city");
        String bit = request.getParameter("bit");
        String validaty = request.getParameter("validaty");
        String certType = request.getParameter("certType");
        String base = request.getParameter("base");
        String host = request.getParameter("host");
        String port = request.getParameter("port");
        String adm = request.getParameter("adm");
        String pwd = request.getParameter("pwd");
        X509Ca x509Ca = new X509Ca(CN);
        x509Ca.setProvince(province);
        x509Ca.setCity(city);
        x509Ca.setKeyLength(bit);
        x509Ca.setCertType(certType);
        x509Ca.setValidity(validaty);
        x509Ca.setIssueCa(base);
        boolean flag = false;
        //删除原始数据
        clearExistData();
        //数据DN
        String DN = DNUtils.add(base, x509Ca.getCn());
        //获取CA签发目录
        String signDirectory = DirectoryUtils.getDNDirectory(DN, base);
        //CA证书存放路径
        String selfDirectory = DirectoryUtils.getSuperStoreDirectory(signDirectory);
        //建立目录结构
        flag = X509CAConfigUtils.buildCADirectory(signDirectory);
        if (flag) {
            //构建ca请求文件
            flag = X509CAConfigUtils.buildCA(x509Ca, selfDirectory, host);
            if (flag) {
                //生成主配置文件
                flag = X509CAConfigUtils.buildCAConfig(x509Ca, selfDirectory, host);
                if (flag) {
                    //签发根证书
                    if (certType.equals(X509Context.rsa)) {
                        flag = X509ShellUtils.build_rsa_selfsign_ca(x509Ca.getValidity(), x509Ca.getKeyLength(),
                                selfDirectory + "/" + x509Ca.getCn() + X509Context.keyName,
                                selfDirectory + "/" + x509Ca.getCn() + X509Context.certName,
                                selfDirectory + "/" + x509Ca.getCn() + X509Context.config_type_certificate);
                    } else if (certType.equals(X509Context.sm2)) {
                        flag = X509ShellUtils.build_sm2_key(bit, selfDirectory + "/" + x509Ca.getCn() + X509Context.keyName);
                        if (flag) {
                            flag = X509ShellUtils.build_sm2_csr(selfDirectory + "/" + x509Ca.getCn() + X509Context.keyName,
                                    selfDirectory + "/" + x509Ca.getCn() + X509Context.csrName,
                                    selfDirectory + "/" + x509Ca.getCn() + X509Context.config_type_certificate);
                            if (flag) {
                                flag = X509ShellUtils.build_sm2_ca(selfDirectory + "/" + x509Ca.getCn() + X509Context.csrName,
                                        selfDirectory + "/" + x509Ca.getCn() + "/" + x509Ca.getCn() + X509Context.config_type_ca,
                                        X509Context.certificate_type_ca,
                                        selfDirectory + "/" + x509Ca.getCn() + X509Context.keyName,
                                        selfDirectory + "/" + x509Ca.getCn() + X509Context.certName, validaty);
                            }
                        }
                    }

                    if (flag) {
                        File key_file = new File(selfDirectory + "/" + x509Ca.getCn() + X509Context.keyName);
                        if (key_file.exists()) {
                            //读取私钥文件
//                            String key = FileHandles.readFileByLines(key_file);
                            //读取证书文件
                            File cer_file = new File(selfDirectory + "/" + x509Ca.getCn() + X509Context.certName);
                            //证书文件内容
//                            String certBase64Code = null;
//                            if (cer_file.exists()) {
//                                certBase64Code = FileHandles.readFileByLines(cer_file);
                            if (cer_file.exists() && cer_file.length() > 0) {
                                CertificateUtils certificateUtils = new CertificateUtils();
                                X509Certificate cert = certificateUtils.get_x509_certificate(cer_file);
                                x509Ca.setCreateDate(String.valueOf(cert.getNotBefore().getTime()));
                                x509Ca.setEndDate(String.valueOf(cert.getNotAfter().getTime()));
                                x509Ca.setSerial(cert.getSerialNumber().toString(16).toUpperCase());
                                x509Ca.setCertStatus("0");
                                x509Ca.setDn(DN);
//                                    x509Ca.setKey(key);
//                                    x509Ca.setCertBase64Code(certBase64Code);
                                LdapUtils ldapUtils = new LdapUtils();
                                DirContext ctx = ldapUtils.getLdapCtx(host, Integer.parseInt(port), adm, pwd);
                                if (ctx != null) {
                                    try {
                                        flag = existCa(x509Ca, host, port, adm, pwd, base);
                                        if (flag) {
                                            flag = x509CaService.deleteStation(ctx, DN);
                                            if (flag) {
                                                flag = x509CaService.add(ctx, x509Ca);
                                                if (flag) {
                                                    flag = X509CaXML.save(x509Ca);
                                                    if (flag) {
                                                        msg = "CA签发成功!";
                                                        log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                                                        json = "{success:true,msg:'" + msg + "'}";
                                                    } else {
                                                        msg = "CA配置文件写入出错!";
                                                        log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                                                        json = "{success:false,msg:'" + msg + "'}";
                                                    }
                                                } else {
                                                    msg = "CA签发出错!";
                                                    log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                                                    json = "{success:false,msg:'" + msg + "'}";
                                                }
                                            } else {
                                                msg = "清空LDAP数据失败!";
                                                log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                                                json = "{success:false,msg:'" + msg + "'}";
                                            }
                                        } else {
                                            flag = x509CaService.add(ctx, x509Ca);
                                            if (flag) {
                                                flag = X509CaXML.save(x509Ca);
                                                if (flag) {
                                                    msg = "CA签发成功!";
                                                    log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                                                    json = "{success:true,msg:'" + msg + "'}";
                                                } else {
                                                    msg = "CA配置文件写入出错!";
                                                    log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                                                    json = "{success:false,msg:'" + msg + "'}";
                                                }
                                            } else {
                                                msg = "CA签发出错!";
                                                log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                                                json = "{success:false,msg:'" + msg + "'}";
                                            }
                                        }
                                    } catch (Exception e) {
                                        msg = "CA签发出错!";
                                        log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                                        json = "{success:false,msg:'" + msg + "'}";
                                    } finally {
                                        LdapUtils.close(ctx);
                                    }
                                } else {
                                    msg = "获取LDAP连接失败!";
                                    log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                                    json = "{success:false,msg:'" + msg + "'}";
                                }
//                                }
                            } else {
                                msg = "CA文件未生成!";
                                log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                                json = "{success:false,msg:'" + msg + "'}";
                            }
                        } else {
                            msg = "CA密钥文件未生成!";
                            log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                            json = "{success:false,msg:'" + msg + "'}";
                        }
                    } else {
                        msg = "CA生成过程中出错!";
                        log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                        json = "{success:false,msg:'" + msg + "'}";
                    }
                } else {
                    msg = "CA配置文件生成出错!";
                    log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                    json = "{success:false,msg:'" + msg + "'}";
                }
            } else {
                msg = "CA请求文件生成出错!";
                log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
                json = "{success:false,msg:'" + msg + "'}";
            }
        } else {
            msg = "CA发证目录创建出错!";
            log.info("重新部署界面......操作信息:" + msg + ",时间:" + new Date());
            json = "{success:false,msg:'" + msg + "'}";
        }
        writer.write(json);
        writer.flush();
        writer.close();
        return null;
    }
}

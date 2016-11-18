package com.deploy.web.action;

import com.deploy.ldap.LdapXMLUtils;
import com.deploy.utils.FileUtil;
import com.deploy.utils.StringContext;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.PrintWriter;

/**
 * Created by hhm on 14-3-25.
 */
public class WizardAction extends ActionSupport {
    private Logger logger = Logger.getLogger(WizardAction.class);

    public String finish() throws Exception {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        String msg = null;
        String json ="{success:false}";
        String host = request.getParameter("host");
        String port = request.getParameter("port");
        String base = request.getParameter("base");
        String adm = request.getParameter("adm");
        String pwd = request.getParameter("pwd");
        boolean flag = LdapXMLUtils.save(host,Integer.parseInt(port),adm,pwd,base);
        if(flag){
            File dir = new File(StringContext.webPath+"/ROOT.war_ca");
            File old_war = new File(StringContext.webPath+"/ROOT.war");
            if(dir.exists()&&old_war.exists()){
                File deploy_bak = new File(StringContext.webPath+"/ROOT.war_deploy");
                FileUtil.renameFile(old_war, deploy_bak);
                FileUtil.renameFile(dir,old_war);
//            reload_service("ca");
                msg = "部署访问界面成功,点击[确定]后重启服务!!";
                logger.info("部署信息:"+msg);
            }else {
                msg = "部署访问界面失败,未找到程序包!";
                logger.info("部署信息:"+msg);
            }
            json ="{success:true,msg:'"+msg+"'}";
        }else {
            msg = "部署失败,请重新部署!";
            json ="{success:false,msg:'"+msg+"'}";
        }
        writer.write(json);
        writer.flush();
        writer.close();
        return null;
    }

    public String findConfig()throws Exception{
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        String msg = null;
        int totalCount =0;
        StringBuilder stringBuilder = new StringBuilder();
        getResultDatas(stringBuilder);
        totalCount = totalCount+1;
        StringBuilder json=new StringBuilder("{totalCount:"+totalCount+",root:[");
        json.append(stringBuilder.toString().substring(0,stringBuilder.toString().length()-1));
        json.append("]}");
        writer.write(json.toString());
        writer.flush();
        writer.close();
        return null;
    }



    /**
     * release ldap service
     */
    private void getResultDatas(StringBuilder stringBuilder) {
        stringBuilder.append("{");
        stringBuilder.append("host:'"+LdapXMLUtils.getValue(LdapXMLUtils.host)+"',");
        stringBuilder.append("port:'"+LdapXMLUtils.getValue(LdapXMLUtils.port)+"',");
        stringBuilder.append("base:'"+LdapXMLUtils.getValue(LdapXMLUtils.base)+"',");
        stringBuilder.append("adm:'"+LdapXMLUtils.getValue(LdapXMLUtils.adm)+"',");
        stringBuilder.append("pwd:'"+LdapXMLUtils.getValue(LdapXMLUtils.pwd)+"'");
        stringBuilder.append("},");
    }
}

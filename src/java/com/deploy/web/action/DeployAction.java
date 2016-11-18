package com.deploy.web.action;

import com.deploy.utils.FileUtil;
import com.deploy.utils.StringContext;
import com.inetec.common.exception.Ex;
import com.inetec.common.util.OSInfo;
import com.inetec.common.util.OSReBoot;
import com.inetec.common.util.OSShutDown;
import com.inetec.common.util.Proc;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 14-3-20
 * Time: 下午12:16
 * To change this template use File | Settings | File Templates.
 */
public class DeployAction extends ActionSupport{
    Logger logger = Logger.getLogger(DeployAction.class);

    /**
     * 设备重启
     * @return
     * @throws Exception
     */
    public String restart() throws Exception {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        String msg = null;
        try {
            OSReBoot.exec();
            Thread.sleep(1000*6);
            msg = "重启设备成功";
        } catch (Exception e) {
            msg = "重启设备失败"+new Date();
            logger.error(msg);
        }
        String json = "{success:true,msg:'"+msg+"'}";
        writer.write(json);
        writer.flush();
        writer.close();
        return null;
    }

    /**
     * 设备关闭
     * @return
     * @throws Exception
     */
    public String shutdown() throws Exception {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        String msg = null;
        try {
            OSShutDown.exec();
            Thread.sleep(1000*3);
            msg = "关闭设备成功";
        } catch (Exception e) {
            msg = "关闭设备失败";
        }
        String json = "{success:true,msg:'"+msg+"'}";
        writer.write(json);
        writer.flush();
        writer.close();
        return null;
    }

    /**
     * 重启服务
     * @throws InterruptedException
     * @throws com.inetec.common.exception.Ex
     */
    public String upgradeService() throws Exception {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        String msg = null;
        Proc proc;
        OSInfo osinfo = OSInfo.getOSInfo();
        if (osinfo.isWin()) {
            proc = new Proc();
            proc.exec("nircmd service upgrade "+StringContext.serviceName);
        }
        if (osinfo.isLinux()) {
            proc = new Proc();
            proc.exec("service "+StringContext.serviceName+" upgrade");
        }
        String json = "{success:true}";
        writer.write(json);
        writer.flush();
        writer.close();
        return null;
    }

    /**
     *
     * 还原系统到备份点
     */
    public String restore() throws IOException {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        String msg = null;
        try{
            File ca_bak = new File("/usr/app/ca_bak.tar.gz");
            if(ca_bak.exists()){
                /**
                 * 备份原有的系统
                 * 1.备份原有系统的sql与ldap数据库
                 * 2.生成tar包ca_use.tar.gz
                 * 还原现在系统
                 * 1.解压ca_bak.tar.gz
                 * 2.执行ca_bak.tar.gz中的mysql与ldap脚本
                 * 3.重启系统还原
                 */
                msg = "还原到系统到备份点成功,点击[确定]返回页面!";
            }else {
                msg = "还原到系统到备份点失败,未找到系统恢复包!";
            }

        }catch (Exception e){
            logger.error("恢复失败:"+e.getMessage());
            msg = "恢复失败,恢复出现异常!";
        }
        String json = "{success:true,msg:'"+msg+"'}";
        writer.write(json);
        writer.flush();
        writer.close();
        return null;
    }



    /**
     * 重新部署
     * @return
     * @throws Exception
     */
    public String deploy()throws Exception{
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        String msg = null;
        File dir = new File(StringContext.webPath+"/ROOT.war_deploy");
        File old_war = new File(StringContext.webPath+"/ROOT.war");
        if(dir.exists()&&old_war.exists()){
            File deploy_bak = new File(StringContext.webPath+"/ROOT.war_bak");
            FileUtil.renameFile(old_war,deploy_bak);
            FileUtil.renameFile(dir,old_war);
//            reload_service("ca");
            msg = "确定重新部署系统,点击[确定]返回页面!";
        }else {
            msg = "重新部署失败,未找到部署文件!";
        }
        String json = "{success:true,msg:'"+msg+"'}";
        writer.write(json);
        writer.flush();
        writer.close();
        return null;
    }

    /**
     * 转到访问web界面
     * @return
     * @throws Exception
     */
    public String admin()throws Exception{
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        String msg = null;
        File dir = new File(StringContext.webPath+"/ROOT.war_ca");
        File old_war = new File(StringContext.webPath+"/ROOT.war");
        if(dir.exists()&&old_war.exists()){
            File deploy_bak = new File(StringContext.webPath+"/ROOT.war_deploy");
            FileUtil.renameFile(old_war,deploy_bak);
            FileUtil.renameFile(dir,old_war);
//            reload_service("ca");
            msg = "部署访问界面成功,点击[确定]后重启服务!!";
        }else {
            msg = "部署访问界面失败,未找到访问包!";
        }
        String json = "{success:true,msg:'"+msg+"'}";
        writer.write(json);
        writer.flush();
        writer.close();
        return null;
    }

}

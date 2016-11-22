package com.deploy.web.action;

import com.deploy.system.SystemXMLUtils;
import com.deploy.utils.X509Context;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

/**
 * Created by Administrator on 16-11-21.
 */
public class SystemAction extends ActionSupport{

    private Logger logger = Logger.getLogger(LdapConfigAction.class);

    /**
     * 保存配置
     * @return
     * @throws java.io.IOException
     */
    public String save() throws IOException {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding(X509Context.charset);
//        ActionBase actionBase = new ActionBase();
//        String result =	actionBase.actionBegin(request);
        String json = null;
        String msg = null;
        String passwd = request.getParameter("passwd");
        boolean flag = SystemXMLUtils.save(passwd);
        if(flag){
            msg = "保存系统密码配置成功";
            logger.info(msg+",时间:"+new Date());
            json ="{success:true,msg:'"+msg+"'}";
        }else {
            msg = "保存系统密码配置失败";
            json = "{success:false,msg:'"+msg+"'}";
        }
        PrintWriter writer = response.getWriter();
        writer.write(json);
        writer.flush();
        writer.close();
//        actionBase.actionEnd(response,json,result);
        return null;
    }
}

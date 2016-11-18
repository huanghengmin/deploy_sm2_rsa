package com.deploy.web.action;

import com.deploy.utils.FileUtil;
import com.deploy.utils.StringContext;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.PrintWriter;

/**
 * Created by hhm on 14-3-23.
 */
public class BakAction extends ActionSupport {
    private File uploadFile;
    private String uploadFileFileName;
    private String uploadFileContentType;

    public File getUploadFile() {
        return uploadFile;
    }

    public void setUploadFile(File uploadFile) {
        this.uploadFile = uploadFile;
    }

    public String getUploadFileFileName() {
        return uploadFileFileName;
    }

    public void setUploadFileFileName(String uploadFileFileName) {
        this.uploadFileFileName = uploadFileFileName;
    }

    public String getUploadFileContentType() {
        return uploadFileContentType;
    }

    public void setUploadFileContentType(String uploadFileContentType) {
        this.uploadFileContentType = uploadFileContentType;
    }

    /**
     * 上传系统还原包
     * @return
     * @throws Exception
     */
    public String upload_bak()throws Exception{
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        String msg = null;
        if("".equals(uploadFileFileName)&&uploadFileFileName.endsWith("tar.gz")){
            FileUtil.copy(uploadFile, StringContext.systemPath + "/" + uploadFileFileName);
            msg = "上传系统恢复包成功";
        }  else {
            msg = "导入的文件不是[.tar.gz]文件";
        }
        String json = "{success:true,msg:'"+msg+"'}";
        writer.write(json);
        writer.flush();
        writer.close();
        return null;
    }
    /**
     * 备份系统
     * @return
     * @throws Exception
     */
    public String make_bak()throws Exception{
        return null;
    }

    /**
     * 还原系统
     * @return
     * @throws Exception
     */
    public String restore_bak()throws Exception{
        return null;
    }
}

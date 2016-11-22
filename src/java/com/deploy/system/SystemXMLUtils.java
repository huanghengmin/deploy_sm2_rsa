package com.deploy.system;

import com.deploy.utils.X509Context;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import java.io.*;

public class SystemXMLUtils {
    private static Logger logger = Logger.getLogger(SystemXMLUtils.class);
    public static final String system = "system";
    public static final String passwd = "passwd";
    public static final String charset = "utf-8";


    /**
     * @param name
     * @return
     */
    public static String getValue(String name) {
        SAXReader saxReader = new SAXReader();
        Document doc = null;
        String result = null;
        try {
            doc = saxReader.read(new File(X509Context.system_xml));
        } catch (DocumentException e) {
            logger.error(e.getMessage());
        }
        if(doc!=null){
            Element ldap = doc.getRootElement();
            Element el = ldap.element(name);
            result = el.getText();
        }
        return result;
    }

    /**
     * @param passwd
     */
    public static boolean save(String passwd) {
        boolean flag = false;
        Document doc = DocumentHelper.createDocument();
        Element ldap = doc.addElement(SystemXMLUtils.system);
        Element host_el = ldap.addElement(SystemXMLUtils.passwd);
        host_el.addText(passwd);
        OutputFormat format = OutputFormat.createPrettyPrint();
        format.setEncoding(charset);
        format.setIndent(true);
        try {
            XMLWriter xmlWriter = new XMLWriter(new FileOutputStream(new File(X509Context.system_xml)), format);
            try {
                xmlWriter.write(doc);
                flag = true;
            } catch (IOException e) {
                logger.info(e.getMessage());
            }finally {
                try {
                    xmlWriter.flush();
                    xmlWriter.close();
                } catch (IOException e) {
                    e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }
            }
        } catch (UnsupportedEncodingException e) {
            logger.info(e.getMessage());
        } catch (FileNotFoundException e) {
            logger.info(e.getMessage());
        }
        return flag;
    }

    public static boolean check(String md5passwd) {
        String value = getValue(SystemXMLUtils.passwd);
        if (value.equals(md5passwd)){
            return true;
        }
        return false;
    }
}



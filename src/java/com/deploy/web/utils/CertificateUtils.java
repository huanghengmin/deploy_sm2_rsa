package com.deploy.web.utils;

import org.apache.log4j.Logger;

import java.io.*;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

/**
 * Created with IntelliJ IDEA.
 * User: hhm
 * Date: 14-7-3
 * Time: 下午9:33
 * To change this template use File | Settings | File Templates.
 */
public class CertificateUtils {
    private Logger logger = Logger.getLogger(CertificateUtils.class);

    public X509Certificate get_x509_certificate(File cerFile) {
        CertificateFactory certificatefactory = null;
        try {
            certificatefactory = CertificateFactory.getInstance("X.509");
        } catch (CertificateException e) {
            logger.error(e.getMessage());
        }
        FileInputStream cerIs = null;
        X509Certificate cert = null;
        try {
            cerIs = new FileInputStream(cerFile);
            cert = (X509Certificate) certificatefactory.generateCertificate(cerIs);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }finally {
            try {
                cerIs.close();
            } catch (IOException e) {
                logger.error(e.getMessage());
            }
        }
        return cert;
    }
}

package com.deploy.web.utils;

import com.deploy.utils.StringContext;
import com.inetec.common.util.OSInfo;
import com.inetec.common.util.Proc;
import org.apache.log4j.Logger;

import java.math.BigInteger;
import java.util.UUID;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 13-7-4
 * Time: 上午6:55
 * To change this template use File | Settings | File Templates.
 */
public class X509ShellUtils {
    private static Logger logger = Logger.getLogger(X509ShellUtils.class);

    //生成uuid唯一序列号
    public static String build_uuid() {
        //使用UUID生成序列号
        UUID uuid = UUID.randomUUID();
        String ids[] = uuid.toString().split("-");
        StringBuffer strBuf = new StringBuffer();
        for (int i = 0; i < ids.length; i++) {
            strBuf.append(ids[i]);
        }
        BigInteger big = new BigInteger(strBuf.toString(), 16);
        return big.toString();
    }

    //签发rsa CA
    public static boolean build_rsa_selfsign_ca(String days, String bits, String keyfile, String certificate, String apply_conf) {
        Proc proc = new Proc();
        String command = null;
        if (OSInfo.getOSInfo().isWin()) {
            command = StringContext.systemPath + "/commands/windows/rsa/build-selfsign-ca.bat " +
                    days + " " +
                    build_uuid() + " " +
                    bits + " " +
                    keyfile +" " +
                    certificate+ " " +
                    apply_conf;
        } else {
            command = StringContext.systemPath + "/commands/liunx/rsa/build-selfsign-ca.sh " +
                    days + " " +
                    build_uuid() + " " +
                    bits + " " +
                    keyfile + " " +
                    certificate + " " +
                    apply_conf;
        }
        logger.info(command);
        proc.exec(command);
        if (proc.getResultCode() != -1) {
           if(!proc.getErrorOutput().contains("error")&&!proc.getErrorOutput().contains("Error")){
                return true;
            } else {
                logger.equals(proc.getErrorOutput());
            }
        }
        return false;
    }

    //生成sm2 CA
    public static boolean build_sm2_ca(String csrFile, String extFile,String extensions, String caKey,String caCrt,String days) {
        Proc proc = new Proc();
        String command = null;
        if (OSInfo.getOSInfo().isWin()) {
            command = StringContext.systemPath + "/commands/windows/sm2/build-selfsign-ca.bat " +
                    build_uuid() + " " +
                    csrFile + " " +
                    extFile+ " " +
                    extensions+ " " +
                    caKey+ " " +
                    caCrt+ " " +
                    days;
        } else {
            command = StringContext.systemPath + "/commands/liunx/sm2/build-selfsign-ca.sh " +
                    build_uuid() + " " +
                    csrFile + " " +
                    extFile+ " " +
                    extensions+ " " +
                    caKey+ " " +
                    caCrt+ " " +
                    days;
        }
        logger.info(command);
        proc.exec(command);
        if (proc.getResultCode() != -1) {
            if(!proc.getErrorOutput().contains("error")&&!proc.getErrorOutput().contains("Error")){
                return true;
            } else {
                logger.equals(proc.getErrorOutput());
            }
        }
        return false;
    }

    //生成sm2私钥
    public static boolean build_sm2_key(String bits, String keyfile) {
        Proc proc = new Proc();
        String command = null;
        if (OSInfo.getOSInfo().isWin()) {
            command = StringContext.systemPath + "/commands/windows/sm2/build-key.bat " +
                    keyfile + " " +
                    bits;
        } else {
            command = StringContext.systemPath + "/commands/liunx/sm2/build-key.sh " +
                    keyfile + " " +
                    bits;
        }
        logger.info(command);
        proc.exec(command);
        if (proc.getResultCode() != -1) {
            if(!proc.getErrorOutput().contains("error")&&!proc.getErrorOutput().contains("Error")){
                return true;
            } else {
                logger.equals(proc.getErrorOutput());
            }
        }
        return false;
    }

    //生成sm2请求
    public static boolean build_sm2_csr(String keyfile, String csrfile, String apply_conf) {
        Proc proc = new Proc();
        String command = null;
        if (OSInfo.getOSInfo().isWin()) {
            command = StringContext.systemPath + "/commands/windows/sm2/build-csr.bat " +
                    keyfile + " " +
                    csrfile + " " +
                    apply_conf;
        } else {
            command = StringContext.systemPath + "/commands/liunx/sm2/build-csr.sh " +
                    keyfile + " " +
                    csrfile + " " +
                    apply_conf;
        }
        logger.info(command);
        proc.exec(command);
        if (proc.getResultCode() != -1) {
            if(!proc.getErrorOutput().contains("error")&&!proc.getErrorOutput().contains("Error")){
                return true;
            } else {
                logger.equals(proc.getErrorOutput());
            }
        }
        return false;
    }

}

package com.deploy.dao;


import com.deploy.domain.X509Server;

/**
 * Created by IntelliJ IDEA.
 * User: hhm
 * Date: 12-8-22
 * Time: 下午2:44
 * hzihdevice dao 层
 */
public interface X509ServerDao {
    public boolean add(X509Server x509Server)throws Exception;

    public boolean modify(X509Server x509Server)throws Exception;

    public boolean delete(String DN)throws Exception;
}

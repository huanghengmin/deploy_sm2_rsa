package com.deploy.service;


import com.deploy.domain.X509Server;

/**
 * Created by IntelliJ IDEA.
 * User: hhm
 * Date: 12-8-22
 * Time: 下午2:46
 * hzihdevice 服务层
 */
public interface X509ServerService {
    public boolean add(X509Server hzihDevice)throws Exception;

    public boolean modify(X509Server hzihDevice)throws Exception;

    public boolean delete(String DN)throws Exception;
}

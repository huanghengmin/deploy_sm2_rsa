package com.deploy.service.impl;


import com.deploy.dao.X509ServerDao;
import com.deploy.domain.X509Server;
import com.deploy.service.X509ServerService;

/**
 * Created by IntelliJ IDEA.
 * User: hhm
 * Date: 12-8-22
 * Time: 下午2:46
 * hzihdevice 服务层实现
 */
public class X509ServerServiceImpl implements X509ServerService {
    private X509ServerDao x509ServerDao;

    public X509ServerDao getX509ServerDao() {
        return x509ServerDao;
    }

    public void setX509ServerDao(X509ServerDao x509ServerDao) {
        this.x509ServerDao = x509ServerDao;
    }

    @Override
    public boolean add(X509Server x509Server)throws Exception {
       return  x509ServerDao.add(x509Server);
    }

    @Override
    public boolean modify(X509Server x509Server)throws Exception {
        return x509ServerDao.modify(x509Server);
    }

    @Override
    public boolean delete(String DN)throws Exception {
        return x509ServerDao.delete(DN);
    }
}

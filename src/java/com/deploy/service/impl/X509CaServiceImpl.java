package com.deploy.service.impl;


import com.deploy.dao.X509CaDao;
import com.deploy.domain.X509Ca;
import com.deploy.service.X509CaService;

import javax.naming.directory.DirContext;

/**
 * Created by IntelliJ IDEA.
 * User: hhm
 * Date: 12-8-22
 * Time: 上午9:23
 * To change this template use File | Settings | File Templates.
 */
public class X509CaServiceImpl implements X509CaService {
    private X509CaDao x509CaDao;

    public X509CaDao getX509CaDao() {
        return x509CaDao;
    }

    public void setX509CaDao(X509CaDao x509CaDao) {
        this.x509CaDao = x509CaDao;
    }

    @Override
    public boolean add(DirContext ctx, X509Ca x509Ca){
       return x509CaDao.add(ctx,x509Ca);
    }

    @Override
    public boolean modify(DirContext ctx, X509Ca x509Ca) {
        return x509CaDao.modify(ctx,x509Ca);
    }

    @Override
    public boolean deleteStation(DirContext ctx, String  DN) {
        return x509CaDao.deleteStation(ctx,DN);
    }
}

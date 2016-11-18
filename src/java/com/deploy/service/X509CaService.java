package com.deploy.service;


import com.deploy.domain.X509Ca;

import javax.naming.directory.DirContext;

/**
 * Created by IntelliJ IDEA.
 * User: hhm
 * Date: 12-8-22
 * Time: 上午9:23
 * To change this template use File | Settings | File Templates.
 */
public interface X509CaService {

    public boolean add(DirContext ctx, X509Ca x509Ca) ;

    public boolean modify(DirContext ctx, X509Ca x509Ca);

    public boolean deleteStation(DirContext ctx, String DN);
}

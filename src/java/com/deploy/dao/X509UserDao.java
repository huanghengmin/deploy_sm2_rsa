package com.deploy.dao;


import com.deploy.domain.X509User;

/**
 * Created by IntelliJ IDEA.
 * User: hhm
 * Date: 12-8-22
 * Time: 下午2:44
 * To change this template use File | Settings | File Templates.
 */
public interface X509UserDao {


    public boolean add(X509User x509User)throws Exception;

    public boolean modify(X509User x509User)throws Exception;

    public boolean delete(String DN)throws Exception;
}

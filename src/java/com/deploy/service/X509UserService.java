package com.deploy.service;


import com.deploy.domain.X509User;

/**
 * Created by IntelliJ IDEA.
 * User: hhm
 * Date: 12-8-22
 * Time: 下午2:45
 * 服务层
 */
public interface X509UserService {
    public boolean add(X509User x509User)throws Exception;

    public boolean modify(X509User x509User)throws Exception;

    public boolean delete(String DN)throws Exception;
}

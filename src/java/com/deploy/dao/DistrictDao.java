package com.deploy.dao;

import cn.collin.commons.dao.BaseDao;
import cn.collin.commons.domain.PageResult;
import com.deploy.domain.District;

public interface DistrictDao extends BaseDao {

    PageResult findProvince(int start,int limit);
    
    PageResult findCity(Long parentId,int start,int limit);

    District findById(Long id);
}

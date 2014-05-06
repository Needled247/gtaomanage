package service;

import bean.GTM_BUSINESS_QUOTA;
import bean.GTM_QUOTA_AREA;

import java.util.List;
import java.util.Map;

/**
 * Created by HP on 14-4-15.
 */
public interface GTM_Service {
    public long getCount(String sql , Object[] params);
    public long getAllChargeCount(Object[] params);
    public long getChargeCountByBs(Object[] params);
    public List<Map<String,Object>> getAllQuota();
    public List<Map<String,Object>> getBsQuota(Object[] params);
    public List<Map<String,Object>> getBandWidth(Object[] params);
    public List<Map<String,Object>> getPackageType(Object[] params);
    public long getBandWidthCount(Object[] params);
    public long getPackageCount(Object[] params);
    public long getAllCount(Object[] params);
    public long getMonthUserCount(String tbl,Object[] params);
    public List<Map<String,Object>> getAllStation();
    public long getMonthTotalCount(String tbl);
    public long getMonthTotalNormalCount(String tbl);
    public List<GTM_BUSINESS_QUOTA> getBusinessQuota();
    public List<GTM_QUOTA_AREA> getAreaQuota(int departmentid);
    public boolean updateBusinessQuota(String column, Object[] params);
    public boolean updateAreaQuota(Object[] params);
    public boolean insertAreaQuota(GTM_QUOTA_AREA bean);
    public long getMaxIdFromQuotaArea(String departmentId);
    public boolean removeAreaQuota(String id, String department_id);
}

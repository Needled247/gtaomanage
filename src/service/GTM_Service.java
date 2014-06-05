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
    public List<Map<String,Object>> getBsBandWidth(Object[] params);
    public List<Map<String,Object>> getPackageType(Object[] params);
    public List<Map<String,Object>> getBsPackageType(Object[] params);
    public long getBandWidthCount(Object[] params);
    public long getBsBandWidthCount(Object[] params);
    public long getPackageCount(Object[] params);
    public long getBsPackageCount(Object[] params);
    public long getAllCount(Object[] params);
    public long getBsAllCount(Object[] params);
    public long getMonthUserCount(String tbl,Object[] params);
    public List<Map<String,Object>> getAllStation();
    public long getMonthTotalCount(String tbl);
    public long getMonthTotalNormalCount(String tbl);
    public long getInnerAccountNumber(String tbl);
    public List<GTM_BUSINESS_QUOTA> getBusinessQuota();
    public List<GTM_BUSINESS_QUOTA> getBusinessQuotaByBsid(String bs_id);
    public List<GTM_BUSINESS_QUOTA> getBusinessQuotaByMonth(String month);
    public List<GTM_QUOTA_AREA> getAreaQuota(int departmentid);
    public boolean updateBusinessQuota(String column, Object[] params);
    public boolean updateAreaQuota(Object[] params);
    public boolean insertAreaQuota(GTM_QUOTA_AREA bean);
    public long getMaxIdFromQuotaArea(String departmentId);
    public boolean removeAreaQuota(String id, String department_id);
    public long getChargeCountByBsid(int bsid, String month, Object[] chargeCode);
    public long getChargeCountByCode(int bsid, String month, int charge_code);
    public long getPreChargeCount(String month, int charge_code);
    public List<Map<String,Object>> getChargeCountByGroup(int bsid, String month, Object[] charge_code, String groupColumn);
    public List<Map<String,Object>> getHandselCount(int bsid);
    public long getUserCountByTime(int month);
    public long getStopUserByMonth(String month);
    public long getCancelUserByMonth(String month);
    public long getTotalIncome(int bs, String month);
    public long getIntervalIncome(int bs, String startDate, String endDate);
    public long getUserCountByContract(int contract_id, String suffix);
}

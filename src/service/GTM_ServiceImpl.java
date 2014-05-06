package service;

import bean.GTM_BUSINESS_QUOTA;
import bean.GTM_QUOTA_AREA;
import dao.GTM_Dao;
import dao.GTM_DaoImpl;

import java.util.List;
import java.util.Map;

/**
 * Created by HP on 14-4-15.
 */
public class GTM_ServiceImpl implements GTM_Service {
    private GTM_Dao dao = new GTM_DaoImpl();

    /**
     * 获取某类交易的条数
     * @param params
     * @return  数量
     */
    @Override
    public long getCount(String sql, Object[] params) {
        return dao.getCount(sql,params);
    }

    /**
     * 获取全部门某类交易记录数
     * @param params
     * @return  数量
     */
    @Override
    public long getAllChargeCount(Object[] params) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW " +
                "WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?) " +
                "AND TO_CHAR(CHARGE_DATE,'yyyy-MM')=?";
        return getCount(sql, params);
    }

    /**
     * 获取某营业厅某类交易记录数
     * @param params
     * @return  数量
     */
    @Override
    public long getChargeCountByBs(Object[] params) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW " +
                "WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?) " +
                "AND TO_CHAR(CHARGE_DATE,'yyyy-MM')=? AND BS_ID=?";
        return getCount(sql, params);
    }

    /**
     * 获取定额总数集合
     * @return  定额集合
     */
    @Override
    public List<Map<String,Object>> getAllQuota() {
        String sql = "SELECT SUM(NEW_QUOTA),SUM(CHARGE_QUOTA),SUM(CHARGE_YEAR_QUOTA)," +
                "SUM(CANCEL_QUOTA) FROM GTM_QUOTA";
        List<Map<String,Object>> result = dao.executeQuery(sql);
        return result;
    }

    /**
     * 按营业厅获取定额
     * @param params
     * @return  定额集合
     */
    @Override
    public List<Map<String,Object>> getBsQuota(Object[] params) {
        String sql = "SELECT NEW_QUOTA,CHARGE_QUOTA,CHARGE_YEAR_QUOTA,CANCEL_QUOTA FROM GTM_QUOTA " +
                "WHERE PARENT_ID=?";
        List<Map<String,Object>> result = dao.executeQuery(sql, params);
        return result;
    }

    /**
     * 获取对应交易类型的带宽类型
     * @param params
     * @return  List
     */
    @Override
    public List<Map<String, Object>> getBandWidth(Object[] params) {
        List<Map<String,Object>> result;
        String sql = "SELECT DISTINCT BANDWIDTH FROM GTM_FRONT_CHARGE_NEW " +
                "WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?) AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=?";
        result = dao.executeQuery(sql,params);
        return result;
    }

    /**
     * 获取对应交易类型的餐型类型
     * @param params
     * @return
     */
    @Override
    public List<Map<String, Object>> getPackageType(Object[] params) {
        List<Map<String,Object>> result;
        String sql = "SELECT DISTINCT QUOTA FROM GTM_FRONT_CHARGE_NEW " +
                "WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?) AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=?";
        result = dao.executeQuery(sql,params);
        return result;
    }


    /**
     * 按时间、交易类型、带宽查询交易数量
     * @param params
     * @return count（*）
     */
    @Override
    public long getBandWidthCount(Object[] params){
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?)" +
                 " AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=?  AND BANDWIDTH=?";
        return getCount(sql,params);
    }

    /**
     * 按时间、交易类型、餐型查询交易数量
     * @param params
     * @return
     */
    @Override
    public long getPackageCount(Object[] params) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?)" +
                " AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=? AND QUOTA=?";
        return getCount(sql,params);
    }

    /**
     * 餐型带宽组合查询
     * @param params
     * @return 数量
     */
    @Override
    public long getAllCount(Object[] params) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?)" +
                " AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=? AND BANDWIDTH=? AND QUOTA=?";
        return getCount(sql,params);
    }

    /**
     * 按月份、营业厅获取在网用户数量
     * @param params
     * @return count
     */
    @Override
    public long getMonthUserCount(String tbl,Object[] params) {
        String sql = "SELECT COUNT(*) FROM TBL_USERS"+tbl+" t ,TBL_DISTLIST d WHERE t.ISTATUS<>-9 " +
                "AND t.IDISTID=d.IDISTID AND d.ISTATIONID=?";
        return getCount(sql,params);
    }

    /**
     * 获取营业厅列表  （ID\NAME）
     * @return List
     */
    @Override
    public List<Map<String, Object>> getAllStation() {
        List<Map<String,Object>> result;
        String sql = "SELECT * FROM GTM_BUSINESS_INFO";
        result = dao.executeQuery(sql,new Object[]{});
        return result;
    }

    /**
     * 获取某月在网用户总数
     * @param tbl
     * @return  count
     */
    @Override
    public long getMonthTotalCount(String tbl) {
        String sql = "SELECT COUNT(*) FROM TBL_USERS"+tbl+" WHERE ISTATUS<>-9";
        return getCount(sql,new Object[]{});
    }

    /**
     * 获取在网用户（正常状态）总数
     * @param tbl
     * @return  count
     */
    @Override
    public long getMonthTotalNormalCount(String tbl) {
        String sql = "SELECT COUNT(*) FROM TBL_USERS"+tbl+" WHERE ISTATUS=1";
        return getCount(sql,new Object[]{});
    }

    /**
     * 获取营业厅定额数据
     * @return List
     */
    @Override
    public List<GTM_BUSINESS_QUOTA> getBusinessQuota() {
        return dao.findAll(GTM_BUSINESS_QUOTA.class);
    }

    /**
     * 获取片区定额数据
     * @return List
     */
    @Override
    public List<GTM_QUOTA_AREA> getAreaQuota(int departmentid) {
        return dao.findByKey(GTM_QUOTA_AREA.class,"DEPARTMENT_ID",departmentid);
    }

    /**
     * 更新营业厅定额表数据
     * @param params    COLUMN=字段名、VALUE、ID
     * @return  boolean
     */
    @Override
    public boolean updateBusinessQuota(String column, Object[] params) {
        boolean flag = false;
        String sql = "UPDATE GTM_BUSINESS_QUOTA SET "+column+"=? WHERE ID=?";
        if(dao.executeUpdate(sql,params)>0){
            flag = true;
        }
        return flag;
    }

    /**
     * 更新片区定额数据
     * @param params
     * @return boolean
     */
    @Override
    public boolean updateAreaQuota(Object[] params) {
        boolean flag = false;
        String sql = "UPDATE GTM_QUOTA_AREA SET AREA_ID=?,NEW_QUOTA=?,CHARGE_QUOTA=?," +
            "   CHARGE_YEAR_QUOTA=?,CANCEL_QUOTA=?,MONEY_QUOTA=?,OTHER_QUOTA=?,AREA_NAME=?," +
            "CHARGE_PERSON=? WHERE ID=? AND DEPARTMENT_ID=?";
        if(dao.executeUpdate(sql, params)>0){
            flag = true;
        }
        return flag;
    }

    /**
     * 片区数据添加
     * @param bean
     * @return boolean
     */
    @Override
    public boolean insertAreaQuota(GTM_QUOTA_AREA bean) {
        String sql = "INSERT INTO GTM_QUOTA_AREA(" +
                "ID," +
                "DEPARTMENT_ID," +
                "AREA_NAME," +
                "AREA_ID," +
                "NEW_QUOTA," +
                "CHARGE_QUOTA," +
                "CHARGE_YEAR_QUOTA," +
                "CANCEL_QUOTA," +
                "MONEY_QUOTA," +
                "OTHER_QUOTA," +
                "CHARGE_PERSON"+
                ") VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        long count = dao.insert(sql, new Object[]{
            bean.getID(),bean.getDEPARTMENT_ID(),bean.getAREA_NAME(),
                bean.getAREA_ID(),bean.getNEW_QUOTA(),bean.getCHARGE_QUOTA(),
                bean.getCHARGE_YEAR_QUOTA(),bean.getCANCEL_QUOTA(),
                bean.getMONEY_QUOTA(),bean.getOTHER_QUOTA(),bean.getCHARGE_PERSON()
        });
        return count>0 ? true : false;
    }

    /**
     * 获取片区定额ID最大值（生成ID字段用）
     * @param departmentId
     * @return  long
     */
    @Override
    public long getMaxIdFromQuotaArea(String departmentId) {
        String sql = "SELECT MAX(ID) FROM GTM_QUOTA_AREA WHERE DEPARTMENT_ID=?";
        return getCount(sql, new Object[]{Integer.parseInt(departmentId)});
    }

    /**
     * 删除片区定额数据
     * @param id
     * @param department_id
     * @return  boolean
     */
    @Override
    public boolean removeAreaQuota(String id, String department_id) {
        boolean flag = false;
        String sql = "DELETE FROM GTM_QUOTA_AREA WHERE ID=? AND DEPARTMENT_ID=?";
        if(dao.executeUpdate(sql,new Object[]{id, department_id})>0){
            flag = true;
        }
        return flag;
    }
}

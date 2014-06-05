package service;

import bean.GTM_BUSINESS_QUOTA;
import bean.GTM_QUOTA_AREA;
import dao.GTM_Dao;
import dao.GTM_DaoImpl;
import tools.Tools;

import java.util.Calendar;
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
                " AND BS_ID=? AND TO_CHAR(CHARGE_DATE,'yyyy-MM')=?";
        return getCount(sql, params);
    }

    /**
     * 获取定额总数集合
     * @return  定额集合
     */
    @Override
    public List<Map<String,Object>> getAllQuota() {
        String sql = "SELECT SUM(NEW_QUOTA),SUM(CHARGE_QUOTA),SUM(CHARGE_YEAR_QUOTA)," +
                "SUM(CANCEL_QUOTA) FROM GTM_BUSINESS_QUOTA";
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
        String sql = "SELECT NEW_QUOTA,CHARGE_QUOTA,CHARGE_YEAR_QUOTA,CANCEL_QUOTA FROM GTM_BUSINESS_QUOTA " +
                "WHERE DEPARTMENT_ID=?";
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
     * 获取营业厅对应相依类型的带宽类型
     * @param params
     * @return List
     */
    @Override
    public List<Map<String, Object>> getBsBandWidth(Object[] params) {
        List<Map<String,Object>> result;
        String sql = "SELECT DISTINCT BANDWIDTH FROM GTM_FRONT_CHARGE_NEW " +
                "WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?) AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=? AND BS_ID=?";
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
     * 获取营业厅对应交易类型的餐型类型
     * @param params
     * @return
     */
    @Override
    public List<Map<String, Object>> getBsPackageType(Object[] params) {
        List<Map<String,Object>> result;
        String sql = "SELECT DISTINCT QUOTA FROM GTM_FRONT_CHARGE_NEW " +
                "WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?) AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=?" +
                " AND BS_ID=?";
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
     * 按时间、交易类型、带宽、营业厅查询交易数量
     * @param params
     * @return  count
     */
    @Override
    public long getBsBandWidthCount(Object[] params) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?)" +
                " AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=?  AND BANDWIDTH=? AND BS_ID=?";
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
     * 按营业厅、时间、交易类型、餐型查询交易数量
     * @param params
     * @return
     */
    @Override
    public long getBsPackageCount(Object[] params) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?)" +
                " AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=? AND QUOTA=? AND BS_ID=?";
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
     * 餐型带宽组合查询(营业厅)
     * @param params
     * @return 数量
     */
    @Override
    public long getBsAllCount(Object[] params) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?)" +
                " AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=? AND BANDWIDTH=? AND QUOTA=? AND BS_ID=?";
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
        String sql = "SELECT COUNT(*) FROM TBL_USERS"+tbl+" WHERE ISTATUS=1 AND ITYPE<>0 AND ITYPE<>3";
        return getCount(sql,new Object[]{});
    }

    /**
     * 获取在网用户（免费）总数
     * @param tbl
     * @return  count
     */
    @Override
    public long getMonthTotalNormalCount(String tbl) {
        String sql = "SELECT COUNT(*) FROM TBL_USERS"+tbl+" WHERE ISTATUS=1 AND ITYPE=0";
        return getCount(sql,new Object[]{});
    }

    /**
     * 获取内部账号数量
     * @param tbl
     * @return  count
     */
    @Override
    public long getInnerAccountNumber(String tbl) {
        String sql = "SELECT COUNT(*) FROM TBL_USERS"+tbl+" WHERE ISTATUS=1 AND ITYPE=3";
        return getCount(sql, new Object[]{});
    }

    /**
     * 获取所有营业厅定额数据
     * @return List
     */
    @Override
    public List<GTM_BUSINESS_QUOTA> getBusinessQuota() {
        return dao.findAll(GTM_BUSINESS_QUOTA.class);
    }

    /**
     * 按营业厅查询定额数据
     * @param bs_id
     * @return
     */
    @Override
    public List<GTM_BUSINESS_QUOTA> getBusinessQuotaByBsid(String bs_id) {
        return dao.findByKey(GTM_BUSINESS_QUOTA.class, "DEPARTMENT_ID", Integer.parseInt(bs_id));
    }

    /**
     * 按月份获取定额
     * @param month
     * @return
     */
    @Override
    public List<GTM_BUSINESS_QUOTA> getBusinessQuotaByMonth(String month) {
        return dao.findAllBySuffix(GTM_BUSINESS_QUOTA.class, month);
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

    /**
     * 按月份、营业厅查询某交易类型数量
     * @param bsid
     * @param month
     * @return long
     */
    @Override
    public long getChargeCountByBsid(int bsid, String month, Object[] chargeCode) {
        String sql = "";
        if(bsid==0){
            sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE " +
                    "TO_CHAR(CHARGE_DATE,'yyyymm')=? " +
                    "AND (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?)";
            return getCount(sql, Tools.concat(new Object[]{month},chargeCode));
        }
        else {
            sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE BS_ID=? " +
                    "AND TO_CHAR(CHARGE_DATE,'yyyymm')=? " +
                    "AND (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?)";
            return getCount(sql, Tools.concat(new Object[]{bsid,month},chargeCode));
        }
    }

    /**
     * 按营业厅、交易代码（single）、月份查询交易数量
     * @param bsid
     * @param month
     * @param charge_code
     * @return  count
     */
    @Override
    public long getChargeCountByCode(int bsid, String month, int charge_code) {
        String sql = "";
        if(bsid != 0){
            sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE BS_ID=? " +
                    "AND TO_CHAR(CHARGE_DATE,'yyyymm')=? "+
                    "AND CHARGE_TYPE_ID=?";
            return getCount(sql, new Object[]{bsid, month, charge_code});
        }
        else{
            sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE" +
                    " TO_CHAR(CHARGE_DATE,'yyyymm')=? "+
                    "AND CHARGE_TYPE_ID=?";
            return getCount(sql, new Object[]{month, charge_code});
        }
    }

    /**
     * 获取预付某月交易数量
     * @param month
     * @param charge_code
     * @return count
     */
    @Override
    public long getPreChargeCount(String month, int charge_code) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW " +
                "WHERE CHARGE_TYPE_ID=? AND TO_CHAR(PRE_MONTH,'yyyymm')=? ";
        return getCount(sql, new Object[]{charge_code,month});
    }

    /**
     * 按营业厅、月份、交易、分组字段查询
     * @param bsid
     * @param month
     * @param charge_code
     * @param groupColumn
     * @return  key,value
     */
    @Override
    public List<Map<String, Object>> getChargeCountByGroup(int bsid, String month, Object[] charge_code, String groupColumn) {
        String sql = "";
        if(bsid==0){
            sql = "SELECT "+groupColumn+" ,COUNT(*) FROM GTM_FRONT_CHARGE_NEW " +
                    "WHERE TO_CHAR(CHARGE_DATE,'yyyy-mm')=? AND CHARGE_TYPE_ID=? " +
                    "GROUP BY "+groupColumn;
            return dao.executeQuery(sql, Tools.concat(new Object[]{month},charge_code));
        }
        else {
            sql = "SELECT "+groupColumn+",COUNT(*) FROM GTM_FRONT_CHARGE_NEW " +
                    "WHERE TO_CHAR(CHARGE_DATE,'yyyy-mm')=? AND BS_ID=? " +
                    "AND CHARGE_TYPE_ID=? GROUP BY "+groupColumn;
            return dao.executeQuery(sql,Tools.concat(new Object[]{month,bsid},charge_code));
        }
    }

    /**
     * 获取赠送月份用户的总数
     * @param bsid
     * @return
     */
    @Override
    public List<Map<String,Object>> getHandselCount(int bsid) {
        String sql = "";
        if(bsid == 0){
            sql = "SELECT ADMIT,COUNT(*) FROM GTM_MAINFORM_INFO " +
                    "WHERE ADMIT>0 GROUP BY ADMIT ORDER BY ADMIT";
            return dao.executeQuery(sql, new Object[]{});
        }
        else {
            sql = "SELECT ADMIT,COUNT(*) FROM GTM_MAINFORM_INFO " +
                    "WHERE ADMIT>0 AND DEPARTMENT_ID=? GROUP BY ADMIT " +
                    "ORDER BY ADMIT";
            return dao.executeQuery(sql, new Object[]{bsid});
        }
    }

    /**
     * 按用户在网时长获取用户数量
     * @param month
     * @return  Count
     */
    @Override
    public long getUserCountByTime(int month) {
        String sql = "SELECT COUNT(*) FROM TBL_USERS WHERE " +
                "MONTHS_BETWEEN(SYSDATE,DFIRSTDATE)>? AND ISTATUS<>-9";
        return getCount(sql, new Object[]{month});
    }

    /**
     * 获取停机用户数量
     * @param month
     * @return count
     */
    @Override
    public long getStopUserByMonth(String month) {
        String suffix = Tools.validateTime2(month);
        String sql = "SELECT COUNT(*) FROM TBL_USERS"+suffix+
                " WHERE ITYPE<>0 AND ITYPE<>3 AND TO_CHAR(DOVERDATE,'yyyymm')=?";
        return getCount(sql, new Object[]{month});
    }

    /**
     * 获取停机注销用户数量
     * @param month
     * @return long
     */
    @Override
    public long getCancelUserByMonth(String month) {
        String suffix = Tools.validateTime2(month);
        String thisMonth = Tools.datePlus2(month, Calendar.MONTH);
        String suffixNew = Tools.validateTime2(thisMonth);
        String sql = "SELECT COUNT(*) FROM TBL_USERS"+suffix+" t, TBL_USERS"+suffixNew+" tu " +
                "WHERE t.ITYPE<>0 AND t.ITYPE<>3 AND  t.SUSERNAME=tu.SUSERNAME AND t.DOVERDATE=tu.DOVERDATE " +
                "AND TO_CHAR(t.DOVERDATE,'yyyymm')=?";
        return getCount(sql, new Object[]{month});
    }

    /**
     * 按营业厅、月份获取收入
     * @param bs
     * @param month
     * @return total income
     */
    @Override
    public long getTotalIncome(int bs, String month) {
        String get_total_sql=
            "select sum(fc.charge_amount) from gtm_act ga,gtm_pay_type pt,gtm_contract gc,gtm_business_info bi," +
                    "GTM_MAINFORM_INFO mi,GTM_CHARGE_TYPE ct,GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO ui,tbl_users tu " +
                    "where fc.act_sub_id=ga.act_id and fc.pay_type_id=pt.pay_type_id and fc.username=mi.username " +
                    "and fc.username=ui.susername and fc.username=tu.susername and fc.bs_id=bi.id and mi.contract_id=gc.contract_id " +
                    "and fc.charge_type_id=ct.charge_type_id";
        if(bs!=0){
            get_total_sql += " and fc.bs_id="+bs;
        }
        if(!month.equals("")){
            get_total_sql += " and to_char(fc.charge_date,'yyyyMM')='"+month+"'";
        }
        return getCount(get_total_sql, new Object[]{});
    }

    /**
     * 获取某时间间隔的总收入
     * @param bs
     * @param startDate
     * @param endDate
     * @return  income
     */
    @Override
    public long getIntervalIncome(int bs, String startDate, String endDate) {
        String sql =
                "select sum(fc.charge_amount) from gtm_act ga,gtm_pay_type pt,gtm_contract gc,gtm_business_info bi," +
                        "GTM_MAINFORM_INFO mi,GTM_CHARGE_TYPE ct,GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO ui,tbl_users tu " +
                        "where fc.act_sub_id=ga.act_id and fc.pay_type_id=pt.pay_type_id and fc.username=mi.username " +
                        "and fc.username=ui.susername and fc.username=tu.susername and fc.bs_id=bi.id and mi.contract_id=gc.contract_id " +
                        "and fc.charge_type_id=ct.charge_type_id";
        if(bs!=0){
            sql += " and fc.bs_id="+bs;
        }
        if(!startDate.equals("")){
            sql += " and to_char(fc.charge_date,'yyyyMMdd')>='"+startDate+"'";
        }
        if(!endDate.equals("")){
            sql += " and to_char(fc.charge_date,'yyyyMMdd')<='"+endDate+"'";
        }
        return getCount(sql, new Object[]{});
    }

    /**
     * 按合同号、日期获取交易数量
     * @param contract_id
     * @return  user count
     */
    @Override
    public long getUserCountByContract(int contract_id, String suffix) {
        String sql = "SELECT COUNT(*) FROM GTM_MAINFORM_INFO MF,TBL_USERS"+suffix+" TU" +
                " WHERE MF.USERNAME=TU.SUSERNAME AND MF.CONTRACT_ID=? AND TU.ISTATUS=1";
        return getCount(sql, new Object[]{contract_id});
    }
}

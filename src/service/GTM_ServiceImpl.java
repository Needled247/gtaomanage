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
     * ��ȡĳ�ཻ�׵�����
     * @param params
     * @return  ����
     */
    @Override
    public long getCount(String sql, Object[] params) {
        return dao.getCount(sql,params);
    }

    /**
     * ��ȡȫ����ĳ�ཻ�׼�¼��
     * @param params
     * @return  ����
     */
    @Override
    public long getAllChargeCount(Object[] params) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW " +
                "WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?) " +
                "AND TO_CHAR(CHARGE_DATE,'yyyy-MM')=?";
        return getCount(sql, params);
    }

    /**
     * ��ȡĳӪҵ��ĳ�ཻ�׼�¼��
     * @param params
     * @return  ����
     */
    @Override
    public long getChargeCountByBs(Object[] params) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW " +
                "WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?) " +
                " AND BS_ID=? AND TO_CHAR(CHARGE_DATE,'yyyy-MM')=?";
        return getCount(sql, params);
    }

    /**
     * ��ȡ������������
     * @return  �����
     */
    @Override
    public List<Map<String,Object>> getAllQuota() {
        String sql = "SELECT SUM(NEW_QUOTA),SUM(CHARGE_QUOTA),SUM(CHARGE_YEAR_QUOTA)," +
                "SUM(CANCEL_QUOTA) FROM GTM_BUSINESS_QUOTA";
        List<Map<String,Object>> result = dao.executeQuery(sql);
        return result;
    }

    /**
     * ��Ӫҵ����ȡ����
     * @param params
     * @return  �����
     */
    @Override
    public List<Map<String,Object>> getBsQuota(Object[] params) {
        String sql = "SELECT NEW_QUOTA,CHARGE_QUOTA,CHARGE_YEAR_QUOTA,CANCEL_QUOTA FROM GTM_BUSINESS_QUOTA " +
                "WHERE DEPARTMENT_ID=?";
        List<Map<String,Object>> result = dao.executeQuery(sql, params);
        return result;
    }

    /**
     * ��ȡ��Ӧ�������͵Ĵ�������
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
     * ��ȡӪҵ����Ӧ�������͵Ĵ�������
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
     * ��ȡ��Ӧ�������͵Ĳ�������
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
     * ��ȡӪҵ����Ӧ�������͵Ĳ�������
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
     * ��ʱ�䡢�������͡������ѯ��������
     * @param params
     * @return count��*��
     */
    @Override
    public long getBandWidthCount(Object[] params){
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?)" +
                 " AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=?  AND BANDWIDTH=?";
        return getCount(sql,params);
    }

    /**
     * ��ʱ�䡢�������͡�����Ӫҵ����ѯ��������
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
     * ��ʱ�䡢�������͡����Ͳ�ѯ��������
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
     * ��Ӫҵ����ʱ�䡢�������͡����Ͳ�ѯ��������
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
     * ���ʹ�����ϲ�ѯ
     * @param params
     * @return ����
     */
    @Override
    public long getAllCount(Object[] params) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?)" +
                " AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=? AND BANDWIDTH=? AND QUOTA=?";
        return getCount(sql,params);
    }

    /**
     * ���ʹ�����ϲ�ѯ(Ӫҵ��)
     * @param params
     * @return ����
     */
    @Override
    public long getBsAllCount(Object[] params) {
        String sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=? OR CHARGE_TYPE_ID=?)" +
                " AND TO_CHAR(CHARGE_DATE,'yyyy-mm')=? AND BANDWIDTH=? AND QUOTA=? AND BS_ID=?";
        return getCount(sql,params);
    }

    /**
     * ���·ݡ�Ӫҵ����ȡ�����û�����
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
     * ��ȡӪҵ���б�  ��ID\NAME��
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
     * ��ȡĳ�������û�����
     * @param tbl
     * @return  count
     */
    @Override
    public long getMonthTotalCount(String tbl) {
        String sql = "SELECT COUNT(*) FROM TBL_USERS"+tbl+" WHERE ISTATUS<>-9";
        return getCount(sql,new Object[]{});
    }

    /**
     * ��ȡ�����û�������״̬������
     * @param tbl
     * @return  count
     */
    @Override
    public long getMonthTotalNormalCount(String tbl) {
        String sql = "SELECT COUNT(*) FROM TBL_USERS"+tbl+" WHERE ISTATUS=1";
        return getCount(sql,new Object[]{});
    }

    /**
     * ��ȡ����Ӫҵ����������
     * @return List
     */
    @Override
    public List<GTM_BUSINESS_QUOTA> getBusinessQuota() {
        return dao.findAll(GTM_BUSINESS_QUOTA.class);
    }

    /**
     * ��Ӫҵ����ѯ��������
     * @param bs_id
     * @return
     */
    @Override
    public List<GTM_BUSINESS_QUOTA> getBusinessQuotaByBsid(String bs_id) {
        return dao.findByKey(GTM_BUSINESS_QUOTA.class, "DEPARTMENT_ID", Integer.parseInt(bs_id));
    }

    /**
     * ���·ݻ�ȡ����
     * @param month
     * @return
     */
    @Override
    public List<GTM_BUSINESS_QUOTA> getBusinessQuotaByMonth(String month) {
        return dao.findAllBySuffix(GTM_BUSINESS_QUOTA.class, month);
    }

    /**
     * ��ȡƬ����������
     * @return List
     */
    @Override
    public List<GTM_QUOTA_AREA> getAreaQuota(int departmentid) {
        return dao.findByKey(GTM_QUOTA_AREA.class,"DEPARTMENT_ID",departmentid);
    }

    /**
     * ����Ӫҵ�����������
     * @param params    COLUMN=�ֶ�����VALUE��ID
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
     * ����Ƭ����������
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
     * Ƭ���������
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
     * ��ȡƬ������ID���ֵ������ID�ֶ��ã�
     * @param departmentId
     * @return  long
     */
    @Override
    public long getMaxIdFromQuotaArea(String departmentId) {
        String sql = "SELECT MAX(ID) FROM GTM_QUOTA_AREA WHERE DEPARTMENT_ID=?";
        return getCount(sql, new Object[]{Integer.parseInt(departmentId)});
    }

    /**
     * ɾ��Ƭ����������
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
     * ���·ݡ�Ӫҵ����ѯĳ������������
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
     * ��Ӫҵ�������״��루single�����·ݲ�ѯ��������
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
     * ��ȡԤ��ĳ�½�������
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
     * ��Ӫҵ�����·ݡ����ס������ֶβ�ѯ
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
     * ��ȡ�����·��û�������
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
     * ���û�����ʱ����ȡ�û�����
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
     * ��ȡͣ���û�����
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
     * ��ȡͣ��ע���û�����
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
     * ��Ӫҵ�����·ݻ�ȡ����
     * @param bs
     * @param month
     * @return
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
}

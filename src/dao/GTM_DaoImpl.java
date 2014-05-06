package dao;

import ds.DBHelper;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.apache.log4j.Logger;

import java.math.BigInteger;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Created by HP on 14-4-15.
 */
public class GTM_DaoImpl implements GTM_Dao  {
    /*
    ��ʼ��-->log4j,QueryRunner
     */
    Logger logger = Logger.getLogger(GTM_DaoImpl.class);
    QueryRunner queryRunner = DBHelper.getQueryRunner();

    private final static ScalarHandler getScalarHandler = new ScalarHandler(){
        @Override
        public Object handle(ResultSet rs) throws SQLException {
            Object obj = super.handle(rs);
            if(obj instanceof BigInteger)
            return ((BigInteger)obj).longValue();
            return obj;
        }
    };


    /**
     * ��ѯ��������
     * @param clazz
     * @param <T>
     * @return �������ݶ���ļ���
     */
    @Override
    public <T> List<T> findAll(Class<T> clazz) {
        ResultSetHandler<List<T>> rsh = new BeanListHandler<T>(clazz);
        List<T> result = null;
        try {
            result = queryRunner.query("SELECT * FROM " + clazz.getSimpleName(), rsh);
            logger.debug("SQL: SELECT * FROM " + clazz.getSimpleName());
        } catch (SQLException e) {
            logger.error("Query table" + clazz.getSimpleName()+" failed.", e);
        }
        return result;
    }

    /**
     * ��������ѯ
     * @param clazz
     * @param <T>
     * @return �������ݶ���ļ���
     */
    @Override
    public <T> List<T> findByKey(Class<T> clazz,String key, int id) {
        ResultSetHandler<List<T>> rsh = new BeanListHandler<T>(clazz);
        List<T> result = null;
        try {
            result = queryRunner.query("SELECT * FROM " + clazz.getSimpleName() + " WHERE " + key + "=?",
                    rsh, new Object[]{id});
            logger.debug("SQL: SELECT * FROM " + clazz.getSimpleName()+ " WHERE " + key + "="+id);
        } catch (SQLException e) {
            logger.error("Query table" + clazz.getSimpleName()+" failed.", e);
        }
        return result;
    }

    /**
     * ��ID��ѯ
     * @param clazz
     * @param primary_key
     * @param id
     * @param <T>
     * @return  ���ݶ���
     */
    @Override
    public <T> T findById(Class<T> clazz,String primary_key, int id) {
        ResultSetHandler<T> rsHandler = new BeanHandler<T>(clazz);
        T result = null;
        try {
            if (!"".equals(primary_key) || null != primary_key) {
                result = queryRunner
                        .query("SELECT * FROM " + clazz.getSimpleName() + " WHERE " + primary_key + "=?",
                                rsHandler, new Object[]{id});
                logger
                        .debug("SQL: SELECT * FROM " + clazz.getSimpleName() + " WHERE " + primary_key + "=" + id);
            } else {
                logger.error("ERROR PARAMETER:PRIMARY_KEY.");
            }
        } catch (SQLException e) {
            logger.error("Query table" + clazz.getSimpleName()+" failed", e);
        }
        return result;
    }

    /**
     * ���뷽��
     * @param sql
     * @param args
     * @return  ������������
     */
    @Override
    public long insert(String sql, Object... args) {
        return executeUpdate(sql, args);
    }

    /**
     * �޸ķ���
     * @param sql
     * @param args
     * @return  ������������
     */
    @Override
    public long update(String sql, Object... args) {
        return executeUpdate(sql, args);
    }

    /**
     * �Զ����ѯ����
     * @param sql
     * @param args
     * @return  �����
     */
    @Override
    public List<Map<String, Object>> executeQuery(String sql, Object... args) {
        MapListHandler rsHandler = new MapListHandler();
        List<Map<String, Object>> result = null;
        try {
            result = queryRunner.query(sql, rsHandler, args);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * ��ȡ���¼��
     * @param sql
     * @param args
     * @return count(*)
     */
    @Override
    public long getCount(String sql, Object... args) {
        long count = 0;
        try{
            Number num = (Number)queryRunner.query(sql, getScalarHandler, args);
            count =  (num!=null)?num.longValue():-1;
        }
        catch(SQLException e){
            e.printStackTrace();
        }
        return count;
    }

    /**
     * ִ��INSERT,UPDATE,DELETE����
     * @param sql
     * @param args
     * @return  ������������
     */
    @Override
    public long executeUpdate(String sql, Object... args) {
        long flag = 0;
        try {
            flag = queryRunner.update(sql, args);
        } catch (SQLException e) {
            logger.error("ExecuteUpdate failed:", e);
        }
        return flag;
    }

    /**
     * ɾ������
     * @param sql
     * @param args
     */
    @Override
    public void delete(String sql, Object... args) {
        executeUpdate(sql, args);
    }

    /**
     * ��������
     * @param sql
     * @param objs
     * @return  �������
     */
    @Override
    public int[] batchUpdate(String sql, Object[][] objs) {
        int[] ids = null;
        try {
            ids = queryRunner.batch(sql, objs);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ids;
    }
}

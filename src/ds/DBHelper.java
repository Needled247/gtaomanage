package ds;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.alibaba.druid.util.JdbcUtils;
import org.apache.commons.dbutils.QueryRunner;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

/**
 * ���ݿ����Ӱ�����
 * Created by HP on 14-4-16.
 */
public class DBHelper {
    private static DataSource dataSource;

    /**
     * ��������Druid�����ļ�����ʼ��DataSource.
     * ���ӳ�ֻ����Radius����������ʹ��JDBC����.
     */
    static{
        Properties prop = new Properties();
        try{
            prop.load(JdbcUtils.class.getClassLoader().getResourceAsStream("druid-config.properties"));
            dataSource = DruidDataSourceFactory.createDataSource(prop);
        }
        catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    /**
     * ��ȡ����Դ
     * @return dataSource
     */
    public static DataSource getDataSource(){
        return dataSource;
    }

    /**
     * ��ȡ����
     * @return Connection
     * @throws SQLException
     */
    public static Connection getRaiusConn() throws SQLException{
        return dataSource.getConnection();
    }

    /**
     * ��ȡDBUtils QueryRunnerʵ��
     * @return  QueryRunner
     */
    public static QueryRunner getQueryRunner(){
        return new QueryRunner(dataSource);
    }
}

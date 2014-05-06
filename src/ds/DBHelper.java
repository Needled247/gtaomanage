package ds;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.alibaba.druid.util.JdbcUtils;
import org.apache.commons.dbutils.QueryRunner;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

/**
 * 数据库连接帮助类
 * Created by HP on 14-4-16.
 */
public class DBHelper {
    private static DataSource dataSource;

    /**
     * 加载配置Druid配置文件，初始化DataSource.
     * 连接池只配置Radius，其他两个使用JDBC连接.
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
     * 获取数据源
     * @return dataSource
     */
    public static DataSource getDataSource(){
        return dataSource;
    }

    /**
     * 获取链接
     * @return Connection
     * @throws SQLException
     */
    public static Connection getRaiusConn() throws SQLException{
        return dataSource.getConnection();
    }

    /**
     * 获取DBUtils QueryRunner实例
     * @return  QueryRunner
     */
    public static QueryRunner getQueryRunner(){
        return new QueryRunner(dataSource);
    }
}

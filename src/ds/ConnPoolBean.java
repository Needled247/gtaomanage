package ds;

import java.sql.Connection;
import java.sql.DriverManager;

public class ConnPoolBean
{
    public static Connection getRadiusConn()
    {
        Connection conn = null;
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver").newInstance();
            String url = "jdbc:oracle:thin:@10.0.1.129:1521:radius";
            String user = "mydradius";
            String password = "mydradius";
            conn = DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return conn;
    }

    public static Connection getBMUConn(){
        Connection conn = null;
        try{
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver").newInstance();
            String url = "jdbc:sqlserver://10.1.0.234:1433;DatabaseName=BMU";
            String user = "bill";
            String pass = "gtaoadmin";
            conn = DriverManager.getConnection(url,user,pass);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return conn;
    }

    public static Connection getNetPayConn(){
        Connection conn = null;
        try{
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver").newInstance();
            String url = "jdbc:sqlserver://10.1.0.234:1433;DatabaseName=gtaonew";
            String user = "bill";
            String pass = "gtaoadmin";
            conn = DriverManager.getConnection(url,user,pass);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return conn;
    }
}
package tools;

import ds.ConnPoolBean;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * 同步BMU语音数据到RADIUS数据库。
 * User: HP
 * Date: 14-1-9
 * Time: 上午10:28
 */
public class BmuSyncer implements Job {

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        System.out.println("--------语音数据同步正在进行--------");
        Connection bmuConn = ConnPoolBean.getBMUConn();//gtao_Phone_User
        Connection radiusConn = ConnPoolBean.getRadiusConn();//GTM_PHONE_USER
        String fetchSql = "SELECT * FROM gtao_Phone_User";
        String insertSql = "INSERT INTO GTM_PHONE_USER(PID,USERID,MOBILE,PHONEIP,VLAN,LONGNUM," +
                "SHORTNUM,ITIME,LASTUPD,TACTICS,STATUS,EMAIL,BALANCE,STORED,MATURITYTIME,TBL," +
                "GATE,PROTOCAL)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        String deleteSql = "TRUNCATE TABLE GTM_PHONE_USER";
        PreparedStatement bmuPstmt = null;
        PreparedStatement radiusPstmt = null;
        PreparedStatement radiusPstmt2 = null;
        ResultSet bmuRs = null;
        try{
            bmuPstmt = bmuConn.prepareStatement(fetchSql);
            bmuRs = bmuPstmt.executeQuery();
            //清空表格
            if(bmuRs!=null){
                radiusPstmt = radiusConn.prepareStatement(deleteSql);
                radiusPstmt.executeUpdate();
                System.out.println("--------原数据已清空--------");
            }
            radiusPstmt2 = radiusConn.prepareStatement(insertSql);
            //插入新数据
            while (bmuRs.next()){
                radiusPstmt2.setInt(1,bmuRs.getInt("id"));
                radiusPstmt2.setString(2,bmuRs.getString("userid"));
                radiusPstmt2.setString(3,bmuRs.getString("mobile"));
                radiusPstmt2.setString(4,bmuRs.getString("phoneIp"));
                radiusPstmt2.setString(5,bmuRs.getString("vlan"));
                radiusPstmt2.setString(6,bmuRs.getString("longNum"));
                radiusPstmt2.setString(7,bmuRs.getString("shortNum"));
                radiusPstmt2.setString(8,bmuRs.getString("itime"));
                radiusPstmt2.setString(9,bmuRs.getString("lastUpd"));
                radiusPstmt2.setString(10,bmuRs.getString("Tactics"));
                radiusPstmt2.setString(11,bmuRs.getString("Status"));
                radiusPstmt2.setString(12,bmuRs.getString("email"));
                radiusPstmt2.setString(13,bmuRs.getString("balance"));
                radiusPstmt2.setString(14,bmuRs.getString("stored"));
                radiusPstmt2.setString(15,bmuRs.getString("maturitytime"));
                radiusPstmt2.setString(16,bmuRs.getString("tbl"));
                radiusPstmt2.setString(17,bmuRs.getString("gate"));
                radiusPstmt2.setString(18,bmuRs.getString("protocal"));
                radiusPstmt2.executeUpdate();
            }
        }
        catch (SQLException e){
            e.printStackTrace();
        }
        finally {
            try{
                if(bmuConn!=null){
                    bmuConn.close();
                }
                if(radiusConn!=null){
                    radiusConn.close();
                }
                if(bmuPstmt!=null){
                    bmuPstmt.close();
                }
                if(radiusPstmt!=null){
                    radiusPstmt.close();
                }
                if(radiusPstmt2!=null){
                    radiusPstmt2.close();
                }
            }
            catch (SQLException e){
                e.printStackTrace();
            }
            System.out.println("--------数据同步完成--------");
        }
    }
}

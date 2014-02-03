package tools;

import bean.IcInfoBean;
import ds.ConnPoolBean;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Properties;

public class Tools
{
    public static String getPropertiesValue(String key)
    {
        Properties prop = null;

        String value = "";
        try
        {
            prop = new Properties();
            InputStream is = Tools.class.getResourceAsStream("info.properties");
            InputStreamReader in = new InputStreamReader(is, "UTF-8");
            prop.load(in);
            value = prop.getProperty(key);
            in.close();
            is.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return value;
    }

    public String replaceBsName(String bs_name){
        String rtnName = "";
        if(bs_name.equals("")){
            rtnName = "所有营业厅";
        }
        else {
            rtnName = bs_name;
        }
        return rtnName;
    }

    /**
     * Author：蒋浩
     * @param list
     * @return String
     * 遍历List，格式化输出incoming_detail详细json。
     */
    public String IcDetailIterate(List list){
        String formatStr = "";
        Double param1 = 0.0,param2 = 0.0,param3 = 0.0,param4 = 0.0,param5 = 0.0,param6 = 0.0,param7 = 0.0,
                param8 = 0.0,param9 = 0.0,param10 = 0.0,param11 = 0.0,param12 = 0.0,param13 = 0.0,param14 = 0.0;
        for (Object aList : list) {
            IcInfoBean bean = (IcInfoBean) aList;
            if (bean.getKey().equals("宽带收入")) {
                param1 += bean.getValue();
            }
            if (bean.getKey().equals("IT收入")) {
                param2 += bean.getValue();
            }
            if (bean.getKey().equals("IT卡收入")) {
                param3 += bean.getValue();
            }
            if (bean.getKey().equals("料收入")) {
                param4 += bean.getValue();
            }
            if (bean.getKey().equals("商城收入")) {
                param5 += bean.getValue();
            }
            if (bean.getKey().equals("移机收入")) {
                param6 += bean.getValue();
            }
            if (bean.getKey().equals("光猫押金")) {
                param7 += bean.getValue();
            }
            if (bean.getKey().equals("路由器押金")) {
                param8 += bean.getValue();
            }
            if (bean.getKey().equals("退宽带收入")) {
                param9 += bean.getValue();
            }
            if (bean.getKey().equals("退光猫押金")) {
                param10 += bean.getValue();
            }
            if (bean.getKey().equals("退路由器押金")) {
                param11 += bean.getValue();
            }
            if (bean.getKey().equals("退其他押金")) {
                param12 += bean.getValue();
            }
            if (bean.getKey().equals("联通非ESS收入")) {
                param13 += bean.getValue();
            }
            if (bean.getKey().equals("光猫款")) {
                param14 += bean.getValue();
            }
        }
        formatStr += "income_detail:'<p>" +
                "<b>宽带收入&nbsp;:&nbsp;￥<font color=red>" + param1 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>IT收入&nbsp;:&nbsp;￥<font color=red>" + param2 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>IT卡收入&nbsp;:&nbsp;￥<font color=red>" + param3 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>料收入&nbsp;:&nbsp;￥<font color=red>" + param4 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>商城收入&nbsp;:&nbsp;￥<font color=red>" + param5 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>移机收入&nbsp;:&nbsp;￥<font color=red>" + param6 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>光猫押金&nbsp;:&nbsp;￥<font color=red>" + param7 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>路由器押金&nbsp;:&nbsp;￥<font color=red>" + param8 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>退宽带收入&nbsp;:&nbsp;￥<font color=red>" + param9 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>退光猫押金&nbsp;:&nbsp;￥<font color=red>" + param10 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>退路由器押金&nbsp;:&nbsp;￥<font color=red>" + param11 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>退其他押金&nbsp;:&nbsp;￥<font color=red>" + param12 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>联通非ESS收入&nbsp;:&nbsp;￥<font color=red>" + param13 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>光猫款&nbsp;:&nbsp;￥<font color=red>" + param14 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p>'},";
        return formatStr;
    }

    public static String policy2BandWidth(int policy){
        String bandWidth = "";
        Connection conn = ConnPoolBean.getRadiusConn();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        String sql = "SELECT SPOLICYNAME FROM GTM_POLICY WHERE IPOLICYID="+policy;
        try{
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery(sql);
            while (rs.next()){
                bandWidth = rs.getString("SPOLICYNAME");
            }
        }
        catch (SQLException e){
            e.printStackTrace();
        }
        finally {
            if(conn!=null){
                try{
                    conn.close();
                }
                catch (SQLException e){
                    e.printStackTrace();
                }
            }
            if(pstmt!=null){
                try{
                    pstmt.close();
                }
                catch (SQLException e){
                    e.printStackTrace();
                }
            }
            if(rs!=null){
                try{
                    rs.close();
                }
                catch (SQLException e){
                    e.printStackTrace();
                }
            }
        }
        return bandWidth;
    }
}
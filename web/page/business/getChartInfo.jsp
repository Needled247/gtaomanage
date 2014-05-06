<%@ page import="ds.ConnPoolBean" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    /**
     * 页面初始化的JSON生成“类”
     * Author：蒋浩
     */
    String bs_name = request.getParameter("bs_name");
    Date d = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
    String date = sdf.format(d);
    Connection conn = ConnPoolBean.getRadiusConn();
    String quota_Sql;
    String newSetup_sql;
    String yearCharge_sql;
    String otherCharge_sql;
    String cancel_Sql;
    if(Integer.parseInt(bs_name)>600){
        quota_Sql = "SELECT SUM(NEW_QUOTA),SUM(CHARGE_QUOTA),SUM(CHARGE_YEAR_QUOTA)," +
                "SUM(CANCEL_QUOTA) FROM GTM_QUOTA";   //定额查询SQL
        newSetup_sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=2 " +
                "OR CHARGE_TYPE_ID=3) AND TO_CHAR(CHARGE_DATE,'yyyy-MM')='"+date+"'";    //新装SQL
        yearCharge_sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=4 " +
                "OR CHARGE_TYPE_ID=6) AND TO_CHAR(CHARGE_DATE,'yyyy-MM')='"+date+"'";  //包年续费SQL
        otherCharge_sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=5" +
                " OR CHARGE_TYPE_ID=7) AND TO_CHAR(CHARGE_DATE,'yyyy-MM')='"+date+"'";   //其他续费SQL
        cancel_Sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=8" +
                " OR CHARGE_TYPE_ID=9) AND TO_CHAR(CHARGE_DATE,'yyyy-MM')='"+date+"'";
    }
    else {
        quota_Sql = "SELECT NEW_QUOTA,CHARGE_QUOTA,CHARGE_YEAR_QUOTA,CANCEL_QUOTA FROM GTM_QUOTA " +
                "WHERE PARENT_ID="+bs_name;
        newSetup_sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=2 " +
                "OR CHARGE_TYPE_ID=3) AND TO_CHAR(CHARGE_DATE,'yyyy-MM')='"+date+"' AND " +
                "BS_ID="+bs_name;    //新装SQL
        yearCharge_sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=4 " +
                "OR CHARGE_TYPE_ID=6) AND TO_CHAR(CHARGE_DATE,'yyyy-MM')='"+date+"' AND BS_ID="+bs_name;  //包年续费SQL
        otherCharge_sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=5" +
                " OR CHARGE_TYPE_ID=6) AND TO_CHAR(CHARGE_DATE,'yyyy-MM')='"+date+"' AND " +
                "BS_ID="+bs_name;   //其他续费SQL
        cancel_Sql = "SELECT COUNT(*) FROM GTM_FRONT_CHARGE_NEW WHERE (CHARGE_TYPE_ID=8" +
                " OR CHARGE_TYPE_ID=9) AND TO_CHAR(CHARGE_DATE,'yyyy-MM')='"+date+"' AND " +
                "BS_ID="+bs_name;
    }
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    int new_quota = 0; //init新装定额
    int charge_quota = 0;  //init其他续费定额
    int charge_year_quota = 0;   //init包年续费定额
    int cancel_quota = 0;    //init停机注销定额
    int newSetup = 0; //init 新装数量
    int year_charge = 0; //init 包年续费数量
    int other_charge = 0;// init 其他续费数量
    int cancel = 0; // init 停机注销数量
    try{    //取定额
        pstmt = conn.prepareStatement(quota_Sql);
        rs = pstmt.executeQuery(quota_Sql);
        while (rs.next()){
            new_quota = rs.getInt(1);   //新装定额
            charge_quota = rs.getInt(2);  //其他续费定额
            charge_year_quota = rs.getInt(3);    //包年续费定额
            cancel_quota = rs.getInt(4);    //停机注销定额
        }
        //取新装实际数量
        pstmt = conn.prepareStatement(newSetup_sql);
        rs = pstmt.executeQuery(newSetup_sql);
        while (rs.next()){
            newSetup = rs.getInt(1);
        }
        //取包年续费实际数量
        pstmt = conn.prepareStatement(yearCharge_sql);
        rs = pstmt.executeQuery(yearCharge_sql);
        while (rs.next()){
            year_charge = rs.getInt(1);
        }
        //取其他续费实际数量
        pstmt = conn.prepareStatement(otherCharge_sql);
        rs = pstmt.executeQuery(otherCharge_sql);
        while (rs.next()){
            other_charge = rs.getInt(1);
        }
        //取停机注销实际数量
        pstmt = conn.prepareStatement(cancel_Sql);
        rs = pstmt.executeQuery(cancel_Sql);
        while (rs.next()){
            cancel = rs.getInt(1);
        }
    }
    catch (SQLException e){
        e.printStackTrace();
    }
    finally {   //Recycling Resources
        try{
            conn.close();
        }
        catch (SQLException e){
            e.printStackTrace();
        }
        if(pstmt!=null){
            try{
                pstmt.close();
            }
            catch (SQLException e){
                e.printStackTrace();
            }
        }
        //开始拼接JSON字符串，num为实际数量，num2为定额，name是类别。
        StringBuilder sb = new StringBuilder();
        sb.append("[")
                .append("{\"num\":"+newSetup+",\"num2\":"+(new_quota-newSetup<0?0:new_quota-newSetup)+",\"name\":\"新装\"},")
                .append("{\"num\":"+year_charge+",\"num2\":"+(charge_year_quota-year_charge<0?0:charge_year_quota-year_charge)+",\"name\":\"包年续费\"},")
                .append("{\"num\":"+other_charge+",\"num2\":"+(charge_quota-other_charge<0?0:charge_quota-other_charge)+",\"name\":\"其他续费\"},")
                .append("{\"num\":"+cancel+",\"num2\":"+(cancel_quota-cancel<0?0:cancel_quota-cancel)+",\"name\":\"停机注销\"}")
                .append("]");
        response.setContentType("text/json;charset=UTF-8");
        out.print(sb);
        out.flush();
        out.close();
    }
%>
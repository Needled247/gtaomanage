<%@ page import="ds.ConnPoolBean" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    Connection conn = ConnPoolBean.getRadiusConn();
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    String userid = request.getParameter("userid");
    String bs_name = request.getParameter("bs_name");
    String gridStr = "";
    response.setContentType("text/json;charset=UTF-8");
    String sql = "SELECT tui.SREALNAME,bi.NAME FROM TBL_USERSINFO tui,GTM_MAINFORM_INFO gmf," +
            "GTM_BUSINESS_INFO bi " +
            "WHERE SUSERNAME='"+userid+"' AND bi.ID=gmf.Department_Id " +
            "AND tui.SUSERNAME=gmf.USERNAME AND gmf.DEPARTMENT_ID="+bs_name;
    try{
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery(sql);
        while(rs.next()){
            gridStr += "{";
            if(rs.getString("SREALNAME")!=null){
                gridStr += "realname:'"+new String(rs.getString("SREALNAME").getBytes("ISO-8859-1"),"GBK")+"',";
            }
            else{
                gridStr += "realname:'',";
            }
            if(rs.getString("NAME")!=null){
                gridStr +="station:'"+new String(rs.getString("NAME").getBytes("ISO-8859-1"),"GBK")+"'";
            }
            else {
                gridStr +="station:''";
            }
            gridStr +="}";
        }
        out.print(gridStr);
        out.flush();
        out.close();
    }
    catch (SQLException e){
        e.printStackTrace();
    }
    /**
     * 关闭连接
     */
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
            }catch (SQLException e){
                e.printStackTrace();
            }
        }
    }
%>
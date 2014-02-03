<%@ page import="ds.ConnPoolBean" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="tools.Tools" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    /**
     * 生成主图表详细饼图JSON
     * Author：JH
     */
    int type = Integer.parseInt(request.getParameter("type"));
    Connection conn = ConnPoolBean.getRadiusConn();
    PreparedStatement pstmt = null;
    PreparedStatement innerPstmt = null;
    ResultSet rs = null;
    ResultSet innerRs = null;
    StringBuilder sb = new StringBuilder();
    Date d = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
    String date = sdf.format(d);
    switch (type){
        case 1:        //带宽饼图
            String getBwSql = "SELECT DISTINCT USER_BANDWIDTH FROM GTM_USER_CHARGE_VW " +
                    "WHERE (CHARGE_TYPE_ID=39 OR CHARGE_TYPE_ID=40)";
            try{
                pstmt = conn.prepareStatement(getBwSql);
                rs = pstmt.executeQuery(getBwSql);
                String bwPieSql = "";
                sb.append("[");
                while (rs.next()){
                    int bwId = rs.getInt(1);
                    String bandWidth = Tools.policy2BandWidth(bwId);
                    bwPieSql = "SELECT COUNT(*) FROM GTM_USER_CHARGE_VW WHERE (CHARGE_TYPE_ID=39 OR CHARGE_TYPE_ID=40) AND USER_BANDWIDTH="+bwId;
                    innerPstmt = conn.prepareStatement(bwPieSql);
                    innerRs = innerPstmt.executeQuery(bwPieSql);
                    while (innerRs.next()){
                        sb.append("{\"name\":\"" + bandWidth + "\",\"data\":" + innerRs.getInt(1) + "},");
                    }
                }
                if(sb.length()>2){
                    sb.deleteCharAt(sb.lastIndexOf(","));
                }
                sb.append("]");
                response.setContentType("text/json;charset=UTF-8");
                out.print(sb);
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
                    catch(SQLException e){
                        e.printStackTrace();
                    }

                }
            }
            break;
        case 2:       //餐型饼图

            break;
        case 3:       //网络性质饼图

            break;
        default:
            break;
    }
%>
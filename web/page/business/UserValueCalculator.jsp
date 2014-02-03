<%@ page import="ds.ConnPoolBean" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String userid = request.getParameter("userid");
    Connection conn = ConnPoolBean.getRadiusConn();
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    String sql = "SELECT BLAH BLAH BLAH......";
%>
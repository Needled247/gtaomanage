<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String group_id=request.getParameter("group_id");
	String gi_cid=request.getParameter("gi_cid");
	String sql="update GTM_MAINFORM_INFO set group_id="+group_id+" where contract_id="+gi_cid;
	Connection conn=null;
	Statement st=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	st.executeUpdate(sql);
	
	st.close();
	conn.close();
	
%>
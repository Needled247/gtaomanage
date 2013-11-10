<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String get_data_sql="select T_NAME,T_PRICE from GTM_TEMP order by T_ID";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	rs=st.executeQuery(get_data_sql);
	String gridStr="";
	
	while(rs.next()){
		gridStr+="{name:'"+new String(rs.getString("T_NAME").getBytes("iso-8859-1"),"gbk")+"',price:'"+rs.getString("T_PRICE")+"'}";
		gridStr+=",";
	}
	
	rs.close();
	st.close();
	conn.close();
	
	gridStr=gridStr.replaceFirst(",$", "");
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("["+gridStr+"]");
	
%>
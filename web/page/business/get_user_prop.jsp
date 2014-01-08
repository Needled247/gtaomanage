<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String get_data_sql="select USER_PROP_ID,USER_PROP_VALUE from GTM_USER_PROP order by USER_PROP_ID";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	rs=st.executeQuery(get_data_sql);
	String gridStr="";
	
	while(rs.next()){
		gridStr+="{id:'"+rs.getInt("USER_PROP_ID")+"',name:'"+new String(rs.getString("USER_PROP_VALUE").getBytes("iso-8859-1"),"gbk")+"'}";
		gridStr+=",";
	}
	
	rs.close();
	st.close();
	conn.close();
	gridStr=gridStr.replaceFirst(",$", "");
	//System.out.println(gridStr);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("["+gridStr+"]");
	
%>
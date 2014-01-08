<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String get_data_sql="select ONET_PROP_ID,ONET_PROP_VALUE from GTM_OLDNET_PROP order by ONET_PROP_ID";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	rs=st.executeQuery(get_data_sql);
	String gridStr="";
	
	while(rs.next()){
		gridStr+="{id:'"+rs.getInt("ONET_PROP_ID")+"',name:'"+new String(rs.getString("ONET_PROP_VALUE").getBytes("iso-8859-1"),"gbk")+"'}";
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
<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String get_data_sql="select username,save_time from gtm_mainform_info";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	rs=st.executeQuery(get_data_sql);
	String gridStr="";
	
	while(rs.next()){
		gridStr+="{username:'"+rs.getString("username")+"',save_time:'"+rs.getString("save_time").replaceFirst("\\.0", "")+"'}";
		gridStr+=",";
	}
	
	rs.close();
	st.close();
	conn.close();
	
	gridStr=gridStr.replaceFirst(",$", "");
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{totalCount:6,data:["+gridStr+"]}");
	
%>
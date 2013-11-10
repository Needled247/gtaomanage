<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String bs_id=request.getParameter("bs_id");
	String get_data_sql="select contract_id,contract_name from gtm_contract";
	if(!bs_id.equals("")){
		get_data_sql+=" where hall_id="+bs_id;
	}
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	rs=st.executeQuery(get_data_sql);
	String gridStr="";
	
	while(rs.next()){
		gridStr+="{id:'"+rs.getInt("contract_id")+"',name:'"+new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+"'}";
		gridStr+=",";
	}
	
	rs.close();
	st.close();
	conn.close();
	gridStr=gridStr.replaceFirst(",$", "");
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("["+gridStr+"]");
	
%>
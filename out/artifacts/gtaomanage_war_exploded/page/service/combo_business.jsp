<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String sql="select id,name from business_info";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getConn();
	st=conn.createStatement();
	rs=st.executeQuery(sql);
	String comboStr="";
	while(rs.next()){
		comboStr+="{id:'"+rs.getInt(1)+"',name:'"+rs.getString(2)+"'}";
		if(!rs.isLast()){
			comboStr+=",";
		}
	}
	
	rs.close();
	st.close();
	conn.close();
	//System.out.println(comboStr);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{combo:["+comboStr+"]}");
%>
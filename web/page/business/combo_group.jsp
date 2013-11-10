<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	Integer did=(Integer)session.getAttribute("did");
	String sql="select group_number from business_info where id="+did;
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getConn();
	st=conn.createStatement();
	rs=st.executeQuery(sql);
	String comboStr="";
	if(rs.next()){
		int num=rs.getInt(1);
		for(int i=1;i<=num;i++){
			comboStr+="{id:'"+i+"',name:'第"+i+"组'}";
			if(i != num){
				comboStr+=",";
			}
		}
	}
	
	rs.close();
	st.close();
	conn.close();
	
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{combo:["+comboStr+"]}");
%>
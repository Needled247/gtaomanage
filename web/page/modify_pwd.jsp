<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<jsp:useBean id="md" scope="session" class="tools.MD5" />

<%	
	String old_pwd=request.getParameter("old_pwd");
	String new_pwd=request.getParameter("new_pwd");
	String name=String.valueOf(session.getAttribute("name"));
	String msg="";
	String verify_sql="select department_id from gtm_admin where name='"+name+"' and password='"+md.md5s(old_pwd)+"'";
	String modify_sql="update gtm_admin set password='"+md.md5s(new_pwd)+"'where name='"+name+"'";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	rs=st.executeQuery(verify_sql);
	if(rs.next()){
		st.executeUpdate(modify_sql);
		msg="ok";
	}else{
		msg="error";
	}
	
	rs.close();
	st.close();
	conn.close();
	
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{\"msg\":\""+msg+"\"}");
	
%>
<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String username=request.getParameter("username");
	String pwd=request.getParameter("pwd");
	String sql="select id,department_id from admin where name='"+username+"' and password='"+pwd+"'";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	rs=st.executeQuery(sql);
	String msg="";
	String state="true";
	
	if(rs.next()){
		session.setAttribute("id", rs.getInt(1));
		session.setAttribute("did", rs.getInt(2));
	}else{
		state="false";
		msg="您输入的用户名或密码错误!";
	}
	
	rs.close();
	st.close();
	conn.close();
	
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{success:"+state+",msg:'"+msg+"'}");
	
%>
<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String business_id=request.getParameter("business_id");
	String ask_date=request.getParameter("ask_date");
	String ask_time=request.getParameter("ask_time");
	String username=request.getParameter("username");
	String address=request.getParameter("address");
	String tel=request.getParameter("tel");
	String source_type=request.getParameter("source_type");
	String describe=request.getParameter("describe");
	String is_OA=request.getParameter("is_OA");
	String note=request.getParameter("note");
	int admin_id=(Integer)session.getAttribute("id");
	
	String table="have_source";
	if(source_type.equals(0)){
		table="no_source";
	}
	
	String sql="insert into "+table+"(ask_date,ask_time,business_id,username,tel,address,source_type,describe,admin_id,is_OA,note) values('"+ask_date+"','"+ask_time+"',"+business_id+",'"+username+"','"+tel+"','"+address+"',"+source_type+",'"+describe+"',"+admin_id+","+is_OA+",'"+note+"')";
	Connection conn=null;
	Statement st=null;
	
	conn=ConnPoolBean.getConn();
	st=conn.createStatement();
	int isSuccess=st.executeUpdate(sql);
	String msg="";
	String state="true";
	
	if(isSuccess != 0){
		msg="数据保存成功";
	}else{
		state="false";
		msg="数据保存失败";
	}
	
	st.close();
	conn.close();
	System.out.println(isSuccess);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{success:"+state+",msg:'"+msg+"'}");
%>
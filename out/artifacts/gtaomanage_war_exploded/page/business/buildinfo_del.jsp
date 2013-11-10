<%@page language="java" import="java.util.Date" pageEncoding="UTF-8"%>
<%@page import="java.util.TimeZone"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String list_name=request.getParameter("list_name");
	list_name=new String(list_name.getBytes("gbk"),"iso-8859-1");	
	String hetong_id=request.getParameter("hetong_id");
	String true_name=new String(String.valueOf(session.getAttribute("true_name")).getBytes("gbk"),"iso-8859-1");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	TimeZone timeZoneChina = TimeZone.getTimeZone("Asia/Shanghai");
	sdf.setTimeZone(timeZoneChina);
	String save_time=sdf.format(new Date());
	save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
	String update_del="update gtm_contract set save_time="+save_time+",save_admin='"+true_name+"' where contract_id="+hetong_id;
	String to_del="insert into gtm_contract_del select * from gtm_contract where contract_id="+hetong_id;
	String sql="delete from gtm_contract where contract_id="+hetong_id;
	String del_log="delete from gtm_log where list_name='"+list_name+"' and op_id='"+hetong_id+"'";
	
	Connection conn=null;
	Statement st=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	
		st.executeUpdate(update_del);
		st.executeUpdate(to_del);
		st.executeUpdate(sql);
		st.executeUpdate(del_log);	

	st.close();
	conn.close();
	
%>
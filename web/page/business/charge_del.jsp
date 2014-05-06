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
	String charge_id=request.getParameter("charge_id");
	String true_name=new String(String.valueOf(session.getAttribute("true_name")).getBytes("gbk"),"iso-8859-1");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	TimeZone timeZoneChina = TimeZone.getTimeZone("Asia/Shanghai");
	sdf.setTimeZone(timeZoneChina);
	String save_time=sdf.format(new Date());
	save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
	String update_del="update gtm_front_charge_new set save_time="+save_time+",save_admin='"+true_name+"' where charge_id="+charge_id;
	String to_del="insert into gtm_front_charge_del select * from gtm_front_charge_new where charge_id="+charge_id;
	String sql="delete from gtm_front_charge_new where charge_id="+charge_id;
	String del_log="delete from gtm_log where list_name='"+list_name+"' and op_id='"+charge_id+"'";
	
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	
	st.executeUpdate(update_del);
	st.executeUpdate(to_del);	
	int rs_count=st.executeUpdate(sql);
	st.executeUpdate(del_log);
	if(rs_count>0){
        out.print("操作成功！");
    }
    else {
        out.print("操作失败，请联系系统管理员...");
    }
    out.flush();
    out.close();
	st.close();
	conn.close();
	
%>
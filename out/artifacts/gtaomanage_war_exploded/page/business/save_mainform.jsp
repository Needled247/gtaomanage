﻿<%@page language="java" import="java.util.Date" pageEncoding="UTF-8"%>
<%@page import="java.util.TimeZone"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String list_name=request.getParameter("list_name");
	list_name=new String(list_name.getBytes("gbk"),"iso-8859-1");
	String changedStr=request.getParameter("changedStr");
	changedStr=new String(changedStr.getBytes("gbk"),"iso-8859-1");
	String admin_name=String.valueOf(session.getAttribute("name"));
	String did_log=String.valueOf(session.getAttribute("did"));
	String did=request.getParameter("mf_bs");
	String uname=request.getParameter("mf_id");
	String leaflet_no=request.getParameter("mf_leaflet");
	String group_id=request.getParameter("mf_group");
	String opt_usetime=request.getParameter("mf_opt");
	String futime=request.getParameter("mf_futime");
	String mf_retime=request.getParameter("mf_retime");
	String mf_gm=request.getParameter("mf_gm");
	String mf_gg=request.getParameter("mf_gg");
	String hetong=request.getParameter("mf_hetong");
	String isit=request.getParameter("mf_isit");
	String mf_cxnote=request.getParameter("mf_cxnote").replaceAll("\r|\n"," ").replaceAll("'", "");
	mf_cxnote=new String(mf_cxnote.getBytes("gbk"),"iso-8859-1");
	String mf_hdnote=request.getParameter("mf_hdnote").replaceAll("\r|\n"," ").replaceAll("'", "");
	mf_hdnote=new String(mf_hdnote.getBytes("gbk"),"iso-8859-1");
	String mf_sbnote=request.getParameter("mf_sbnote").replaceAll("\r|\n"," ").replaceAll("'", "");
	mf_sbnote=new String(mf_sbnote.getBytes("gbk"),"iso-8859-1");
	String mf_zhnote=request.getParameter("mf_zhnote").replaceAll("\r|\n"," ").replaceAll("'", "");
	mf_zhnote=new String(mf_zhnote.getBytes("gbk"),"iso-8859-1");
	String mf_tsnote=request.getParameter("mf_tsnote").replaceAll("\r|\n"," ").replaceAll("'", "");
	mf_tsnote=new String(mf_tsnote.getBytes("gbk"),"iso-8859-1");	
	if(opt_usetime.equals("")){
		opt_usetime=null;
	}else{
		opt_usetime="to_date('"+opt_usetime+"','yyyy-mm-dd')";
	}
	String house_type=request.getParameter("mf_ht");
	String line_type=request.getParameter("mf_lt");
	//int did=(Integer)session.getAttribute("did");
	String true_name=new String(String.valueOf(session.getAttribute("true_name")).getBytes("gbk"),"iso-8859-1");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	TimeZone timeZoneChina = TimeZone.getTimeZone("Asia/Shanghai");
	sdf.setTimeZone(timeZoneChina);
	String save_time=sdf.format(new Date());
	save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
	String isExist_sql="select count(*) from gtm_mainform_info where username='"+uname+"'";
	String sql="insert into gtm_mainform_info values('"+uname+"',"+leaflet_no+","+group_id+","+opt_usetime+","+house_type+","+line_type+","+did+","+save_time+",'"+true_name+"','"+futime+"',"+hetong+","+isit+",'"+mf_retime+"',"+mf_gm+",'"+mf_cxnote+"','"+mf_hdnote+"','"+mf_sbnote+"','"+mf_zhnote+"','"+mf_tsnote+"',"+mf_gg+")";
	String update_sql="update gtm_mainform_info set leaflet_no="+leaflet_no+",group_id="+group_id+",opt_usetime="+opt_usetime+",house_type_id="+house_type+",line_type_id="+line_type+",department_id="+did+",dfirstdate='"+futime+"',contract_id="+hetong+",isit="+isit+",redate='"+mf_retime+"',cat_type_id="+mf_gm+",cxnote='"+mf_cxnote+"',hdnote='"+mf_hdnote+"',sbnote='"+mf_sbnote+"',zhnote='"+mf_zhnote+"',tsnote='"+mf_tsnote+"',gg_id="+mf_gg+" where username='"+uname+"'";
	
	String get_logmax_sql="select log_id from gtm_log where rownum=1 order by log_id desc";
	int logId=1;
	String sql_logadd_first="insert into gtm_log values(";
	String sql_logadd_end=",'"+list_name+"','"+admin_name+"','"+true_name+"',"+save_time+",'"+changedStr+"',"+did_log+",'";	
	
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	
	rs=st.executeQuery(get_logmax_sql);
	if(rs.next()){
		logId=rs.getInt("log_id")+1;
	}
	
	rs=st.executeQuery(isExist_sql);
	rs.next();
	if(rs.getInt(1)==1){
		st.executeUpdate(update_sql);
		st.executeUpdate(sql_logadd_first+logId+sql_logadd_end+uname+"')");
	}else{
		st.executeUpdate(sql);
		st.executeUpdate(sql_logadd_first+logId+sql_logadd_end+uname+"')");
	}
	
	rs.close();
	st.close();
	conn.close();
	
%>
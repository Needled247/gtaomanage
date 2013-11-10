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
	String changedStr=request.getParameter("changedStr");
	changedStr=new String(changedStr.getBytes("gbk"),"iso-8859-1");
	String admin_name=String.valueOf(session.getAttribute("name"));
	String did=String.valueOf(session.getAttribute("did"));	
	String hs_id=request.getParameter("hs_id");	
	String hs_bs=request.getParameter("hs_bs");
	String hs_user=request.getParameter("hs_user").toLowerCase();
	String hs_uc=request.getParameter("user_content").replaceAll("\r|\n", " ").replaceAll("'", "");
	hs_uc=new String(hs_uc.getBytes("gbk"),"iso-8859-1");
	String hs_sc=request.getParameter("service_content").replaceAll("\r|\n", " ").replaceAll("'", "");
	hs_sc=new String(hs_sc.getBytes("gbk"),"iso-8859-1");
	String hs_stime=request.getParameter("hs_stime");
	hs_stime=new String(hs_stime.getBytes("gbk"),"iso-8859-1");
	String hs_etime=request.getParameter("hs_etime");
	hs_etime=new String(hs_etime.getBytes("gbk"),"iso-8859-1");
	String hs_no=request.getParameter("hs_no");
	hs_no=new String(hs_no.getBytes("gbk"),"iso-8859-1");
	String hs_uname=request.getParameter("hs_uname");
	hs_uname=new String(hs_uname.getBytes("gbk"),"iso-8859-1");
	String hs_zjno=request.getParameter("hs_zjno");
	hs_zjno=new String(hs_zjno.getBytes("gbk"),"iso-8859-1");
	String hs_note=request.getParameter("hs_note").replaceAll("\r|\n", " ").replaceAll("'", "");
	hs_note=new String(hs_note.getBytes("gbk"),"iso-8859-1");	
	String hs_iszz=request.getParameter("hs_iszz");
	String hs_express=request.getParameter("hs_express");
	String hs_inprice=request.getParameter("hs_inprice");
	String hs_outprice=request.getParameter("hs_outprice");
	String hs_ishf=request.getParameter("hs_ishf");
	String hs_result=request.getParameter("hs_result");
	hs_result=new String(hs_result.getBytes("gbk"),"iso-8859-1");
	String hs_resultname=request.getParameter("hs_resultname");
	hs_resultname=new String(hs_resultname.getBytes("gbk"),"iso-8859-1");
	String hs_resulttime=request.getParameter("hs_resulttime");
	if(hs_resulttime.equals("")){
		hs_resulttime=null;
	}else{
		hs_resulttime="to_date('"+hs_resulttime+"','yyyy-mm-dd')";
	}
	String hs_glist=request.getParameter("goods_list");
	hs_glist=new String(hs_glist.getBytes("gbk"),"iso-8859-1");
	String true_name=new String(String.valueOf(session.getAttribute("true_name")).getBytes("gbk"),"iso-8859-1");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	TimeZone timeZoneChina = TimeZone.getTimeZone("Asia/Shanghai");
	sdf.setTimeZone(timeZoneChina);
	String save_time=sdf.format(new Date());
	save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
	
	String get_max_sql="select hs_id from gtm_home_service where rownum=1 order by hs_id desc";
	int cid=1;
	String sql_first="insert into gtm_home_service values(";
	String sql_end=",'"+hs_user+"',"+hs_bs+","+save_time+",'"+hs_uc+"','"+hs_sc+"','"+hs_stime+"','"+hs_etime+"','"+hs_no+"','"+hs_uname+"','"+hs_zjno+"','"+hs_note+"',"+hs_iszz+","+hs_express+",'"+hs_glist+"',"+hs_inprice+","+hs_outprice+",'"+hs_result+"','"+hs_resultname+"',"+hs_resulttime+",'"+true_name+"',"+save_time+","+hs_ishf+")";
	String update_sql="update gtm_home_service set hs_bs="+hs_bs+",hs_uc='"+hs_uc+"',hs_sc='"+hs_sc+"',hs_stime='"+hs_stime+"',hs_etime='"+hs_etime+"',hs_no='"+hs_no+"',hs_uname='"+hs_uname+"',hs_zjno='"+hs_zjno+"',hs_note='"+hs_note+"',hs_iszz="+hs_iszz+",hs_express="+hs_express+",hs_glist='"+hs_glist+"',hs_inprice="+hs_inprice+",hs_outprice="+hs_outprice+",hs_result='"+hs_result+"',hs_resultname='"+hs_resultname+"',hs_resulttime="+hs_resulttime+",hs_ishf="+hs_ishf+" where hs_id="+hs_id;
	
	String get_logmax_sql="select log_id from gtm_log where rownum=1 order by log_id desc";
	int logId=1;
	String sql_logadd_first="insert into gtm_log values(";
	String sql_logadd_end=",'"+list_name+"','"+admin_name+"','"+true_name+"',"+save_time+",'"+changedStr+"',"+did+",'";	
		
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	
	rs=st.executeQuery(get_logmax_sql);
	if(rs.next()){
		logId=rs.getInt("log_id")+1;
	}
	
	if(hs_id.equals("")){
		rs=st.executeQuery(get_max_sql);
		if(rs.next()){
			cid=rs.getInt("hs_id")+1;
		}		
		st.executeUpdate(sql_first+cid+sql_end);		
		st.executeUpdate(sql_logadd_first+logId+sql_logadd_end+cid+"')");
	}else{
		st.executeUpdate(update_sql);
		st.executeUpdate(sql_logadd_first+logId+sql_logadd_end+hs_id+"')");
	}
	
	if(rs!=null){
		rs.close();
	}
	st.close();
	conn.close();
	
%>
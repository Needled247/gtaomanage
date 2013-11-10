<%@page language="java" import="java.util.Date" pageEncoding="UTF-8"%>
<%@page import="java.util.TimeZone"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String zc_date=request.getParameter("zc_date");
	zc_date="to_date('"+zc_date+"','yyyy-mm-dd')";
	String zc_id=request.getParameter("zc_id");	
	String zc_bs=request.getParameter("zc_bs");
	String zc_type_id=request.getParameter("zc_type");
	String zc_amount=request.getParameter("zc_amount");
	String zc_note=request.getParameter("zc_note").replaceAll("\r|\n", " ").replaceAll("'", "");
	zc_note=new String(zc_note.getBytes("gbk"),"iso-8859-1");
	String true_name=new String(String.valueOf(session.getAttribute("true_name")).getBytes("gbk"),"iso-8859-1");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	TimeZone timeZoneChina = TimeZone.getTimeZone("Asia/Shanghai");
	sdf.setTimeZone(timeZoneChina);
	String save_time=sdf.format(new Date());
	save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
	
	String get_max_sql="select zc_id from gtm_zc_charge where rownum=1 order by zc_id desc";
	int cid=1;
	String sql_first="insert into gtm_zc_charge values(";
	String sql_end=","+zc_date+","+zc_amount+",'"+zc_note+"','"+true_name+"',"+save_time+","+zc_bs+","+zc_type_id+")";
	String update_sql="update gtm_zc_charge set zc_date="+zc_date+",zc_amount="+zc_amount+",zc_note='"+zc_note+"',zc_type_id="+zc_type_id+" where zc_id="+zc_id;
	
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
		
	if(zc_id.equals("")){
		rs=st.executeQuery(get_max_sql);
		if(rs.next()){
			cid=rs.getInt("zc_id")+1;
		}	
		st.executeUpdate(sql_first+cid+sql_end);
	}else{
		st.executeUpdate(update_sql);
	}
	
	if(rs!=null){
		rs.close();
	}
	st.close();
	conn.close();
	
%>
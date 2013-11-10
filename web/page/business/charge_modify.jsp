<%@page language="java" import="java.util.Date" pageEncoding="UTF-8"%>
<%@page import="java.util.TimeZone"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String charge_id=request.getParameter("charge_id");
	String bs_name=request.getParameter("bs_name");
	String username=request.getParameter("username").toLowerCase();
	String receipt_id=new String(request.getParameter("receipt_id").getBytes("gbk"),"iso-8859-1");
	String charge_amount=request.getParameter("charge_amount");
	String is_new=request.getParameter("is_new");
	String charge_type=request.getParameter("charge_type");	
	String note=new String(request.getParameter("note").getBytes("gbk"),"iso-8859-1");
	String true_name=String.valueOf(session.getAttribute("true_name"));
	true_name=new String(true_name.getBytes("gbk"),"iso-8859-1");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	TimeZone timeZoneChina = TimeZone.getTimeZone("Asia/Shanghai");
	sdf.setTimeZone(timeZoneChina);
	String save_time=sdf.format(new Date());
	save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
	
	String sql="update gtm_front_charge set bs_id="+bs_name+",username='"+username+"',is_new="+is_new+",receipt_id='"+receipt_id+"',charge_type_id="+charge_type+",charge_amount="+charge_amount+",note='"+note+"',save_time="+save_time+",save_admin='"+true_name+"' where charge_id="+charge_id;
	
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	String state="0";
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
		
	int rs_count=st.executeUpdate(sql);	
	if(rs_count>0){
		state="1";
	}
	
	st.close();
	conn.close();
	
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{success:true,msg:"+state+"}");
%>
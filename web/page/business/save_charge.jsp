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
	String charge_id=request.getParameter("fc_id");	
	String bs_name=request.getParameter("fc_bs");
	String username=request.getParameter("fc_user").toLowerCase();
	String is_new=request.getParameter("fc_isnew");
	String receipt_id=request.getParameter("fc_rid");
	receipt_id=new String(receipt_id.getBytes("gbk"),"iso-8859-1");
	String charge_type_id=request.getParameter("fc_ct");
	String pay_type_id=request.getParameter("fc_pt");
	String charge_amount=request.getParameter("fc_amount");
	String fc_actsub=request.getParameter("fc_actsub");
	String note=request.getParameter("fc_note").replaceAll("\r|\n", " ").replaceAll("'", "");
	note=new String(note.getBytes("gbk"),"iso-8859-1");
	String true_name=new String(String.valueOf(session.getAttribute("true_name")).getBytes("gbk"),"iso-8859-1");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	TimeZone timeZoneChina = TimeZone.getTimeZone("Asia/Shanghai");
	sdf.setTimeZone(timeZoneChina);
	String save_time=sdf.format(new Date());
	save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
	String charge_date=request.getParameter("fc_date");
	charge_date="to_date('"+charge_date+"','yyyy-mm-dd')";
	
	String get_max_sql="select charge_id from gtm_front_charge where rownum=1 order by charge_id desc";
	int cid=1;
	String sql_first="insert into gtm_front_charge values("+bs_name+","+charge_date+",'"+username+"',"+is_new+",'"+receipt_id+"',"+charge_type_id+","+charge_amount+",'"+note+"','"+true_name+"',"+save_time+",";
	String sql_end=","+pay_type_id+","+fc_actsub+")";
	String update_sql="update gtm_front_charge set bs_id="+bs_name+",is_new="+is_new+",receipt_id='"+receipt_id+"',charge_type_id="+charge_type_id+",charge_amount="+charge_amount+",note='"+note+"',pay_type_id="+pay_type_id+",act_sub_id="+fc_actsub+" where charge_id="+charge_id;
	
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
	
	if(charge_id.equals("")){
		rs=st.executeQuery(get_max_sql);
		if(rs.next()){
			cid=rs.getInt("charge_id")+1;
		}		
		st.executeUpdate(sql_first+cid+sql_end);		
		st.executeUpdate(sql_logadd_first+logId+sql_logadd_end+cid+"')");
	}else{
		st.executeUpdate(update_sql);
		st.executeUpdate(sql_logadd_first+logId+sql_logadd_end+charge_id+"')");
	}
	
	if(rs!=null){
		rs.close();
	}
	st.close();
	conn.close();
	
%>
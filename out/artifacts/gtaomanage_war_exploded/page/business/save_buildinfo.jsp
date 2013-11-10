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
	String hetong_txt=request.getParameter("bi_hetong_txt");
	hetong_txt=new String(hetong_txt.getBytes("gbk"),"iso-8859-1");
	String bs_name=request.getParameter("bi_bs_name");
	String big_id=request.getParameter("bi_big_id");
	String ht_type=request.getParameter("bi_ht_type");
	String qydate=request.getParameter("bi_qydate");
	String xqtime=request.getParameter("bi_xqtime");
	String ggtime=request.getParameter("bi_ggtime");
	String isgg=request.getParameter("bi_isgg");
	String isxk=request.getParameter("bi_isxk");
	String live_num=request.getParameter("bi_live_num");
	String gglive_num=request.getParameter("bi_gglive_num");
	String isjz=request.getParameter("bi_isjz");
	String jzbrand=request.getParameter("bi_jzbrand");
	jzbrand=new String(jzbrand.getBytes("gbk"),"iso-8859-1");
	String hetong_id=request.getParameter("bi_id");
	if(qydate.equals("")){
		qydate=null;
	}else{
		qydate="to_date('"+qydate+"','yyyy-mm-dd')";
	}
	if(xqtime.equals("")){
		xqtime=null;
	}else{
		xqtime="to_date('"+xqtime+"','yyyy-mm-dd')";
	}
	if(ggtime.equals("")){
		ggtime=null;
	}else{
		ggtime="to_date('"+ggtime+"','yyyy-mm-dd')";
	}
	String true_name=new String(String.valueOf(session.getAttribute("true_name")).getBytes("gbk"),"iso-8859-1");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	TimeZone timeZoneChina = TimeZone.getTimeZone("Asia/Shanghai");
	sdf.setTimeZone(timeZoneChina);
	String save_time=sdf.format(new Date());
	save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
	
	String get_max_sql="select contract_id from gtm_contract where rownum=1 order by contract_id desc";
	int cid=1;
	String sql_first="insert into gtm_contract values(";
	String sql_end=","+big_id+","+qydate+",'"+hetong_txt+"',"+bs_name+","+xqtime+","+ggtime+","+isgg+","+isxk+","+isjz+",'"+jzbrand+"',"+live_num+","+gglive_num+","+save_time+",'"+true_name+"',"+ht_type+")";
	String update_sql="update gtm_contract set big_id="+big_id+",sign_date="+qydate+",contract_name='"+hetong_txt+"',hall_id="+bs_name+",xq_open_date="+xqtime+",gg_open_date="+ggtime+",is_gg="+isgg+",is_xk="+isxk+",is_jz="+isjz+",jz_brand='"+jzbrand+"',live_num="+live_num+",gg_live_num="+gglive_num+",contract_type="+ht_type+" where contract_id="+hetong_id;
	
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
	
	if(hetong_id.equals("")){
		rs=st.executeQuery(get_max_sql);
		if(rs.next()){
			cid+=rs.getInt("contract_id");
		}	
		st.executeUpdate(sql_first+cid+sql_end);
		st.executeUpdate(sql_logadd_first+logId+sql_logadd_end+cid+"')");
	}else{
		st.executeUpdate(update_sql);
		st.executeUpdate(sql_logadd_first+logId+sql_logadd_end+hetong_id+"')");
	}
	
	if(rs!=null){
		rs.close();
	}
	st.close();
	conn.close();
	
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{success:true}");
%>
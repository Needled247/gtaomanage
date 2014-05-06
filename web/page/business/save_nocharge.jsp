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
	String charge_id=request.getParameter("nofc_id");	
	String bs_name=request.getParameter("nofc_bs");
	String rname=request.getParameter("nofc_rname");
	rname=new String(rname.getBytes("gbk"),"iso-8859-1");
	String tel=request.getParameter("nofc_tel");
	tel=new String(tel.getBytes("gbk"),"iso-8859-1");
	String addr=request.getParameter("nofc_addr");
	addr=new String(addr.getBytes("gbk"),"iso-8859-1");
	String hetong_id=request.getParameter("nofc_hetong");
	String receipt_id=request.getParameter("nofc_rid").trim();
	receipt_id=new String(receipt_id.getBytes("gbk"),"iso-8859-1");
	String pay_type_id=request.getParameter("nofc_pt");
	String charge_type_id=request.getParameter("nofc_ct");
	String charge_amount=request.getParameter("nofc_amount");
	String note=request.getParameter("nofc_note").replaceAll("\r|\n", " ").replaceAll("'", "");
	note=new String(note.getBytes("gbk"),"iso-8859-1");
	String true_name=new String(String.valueOf(session.getAttribute("true_name")).getBytes("gbk"),"iso-8859-1");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	TimeZone timeZoneChina = TimeZone.getTimeZone("Asia/Shanghai");
	sdf.setTimeZone(timeZoneChina);
	String save_time=sdf.format(new Date());
	save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
	String charge_date=request.getParameter("nofc_date");
	charge_date="to_date('"+charge_date+"','yyyy-mm-dd')";
    String fapiao = request.getParameter("qc_rid");
    String payee = new String(request.getParameter("qc_payee").getBytes("GBK"),"ISO-8859-1");
    String admit = new String(request.getParameter("qc_admit").getBytes("GBK"),"ISO-8859-1");
    String bankcard = "";
    if(request.getParameter("qc_bank_card")!=null){
        bankcard = request.getParameter("qc_bank_card").trim();
    }
	
	String get_max_sql="select charge_id from gtm_nonuser_charge where rownum=1 order by charge_id desc";
	int cid=1;
	String sql_first=
    "insert into gtm_nonuser_charge (BS_ID,CHARGE_DATE,REALNAME,TEL,ADDR,RECEIPT_ID,CHARGE_TYPE_ID,CHARGE_AMOUNT," +
    "NOTE,SAVE_ADMIN,SAVE_TIME,CHARGE_ID,CONTRACT_ID,PAY_TYPE_ID,FAPIAO,PAYEE,ADMIT,BANKCARD)VALUES" +
    "("+bs_name+","+charge_date+",'"+rname+"','"+tel+"','"+addr+"','"+receipt_id+"',"+charge_type_id+","+charge_amount+
    ",'"+note+"','"+true_name+"',"+save_time+",";
	String sql_end=","+hetong_id+","+pay_type_id+",'"+fapiao+"','"+payee+"','"+admit+"','"+bankcard+"')";
	String update_sql=
    "update gtm_nonuser_charge set bs_id="+bs_name+",realname='"+rname+"',tel='"+tel+"',addr='"+addr+"'," +
    "receipt_id='"+receipt_id+"',charge_type_id="+charge_type_id+",charge_amount="+charge_amount+",note='"+note+"'," +
    "contract_id="+hetong_id+",pay_type_id="+pay_type_id+",fapiao='"+fapiao+"',payee='"+payee+"',admit='"+admit+"',bankcard='"+bankcard+"'" +
    " where charge_id="+charge_id;
	
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
        System.out.println(sql_first+cid+sql_end);
		st.executeUpdate(sql_first + cid + sql_end);
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
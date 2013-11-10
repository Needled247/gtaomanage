<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String qc_bs_name=request.getParameter("qc_bs_name");
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");	
	String receipt_id=java.net.URLDecoder.decode(request.getParameter("receipt_id"), "UTF-8");
	String pay_type=request.getParameter("pay_type");
	String charge_type=request.getParameter("charge_type");
	String note=java.net.URLDecoder.decode(request.getParameter("note"), "UTF-8");
	String realname=java.net.URLDecoder.decode(request.getParameter("realname"), "UTF-8");
	String addr=java.net.URLDecoder.decode(request.getParameter("addr"), "UTF-8");
	String save_admin=java.net.URLDecoder.decode(request.getParameter("save_admin"), "UTF-8");
	String tel=java.net.URLDecoder.decode(request.getParameter("tel"), "UTF-8");
	//System.out.println(qc_bs_name+","+charge_date+","+receipt_id+","+username+","+charge_type+","+note+","+realname+","+addr);
	
	String data_Str="";
	String count_Str="";
	
	if(!startDate.equals("")){
		data_Str+=" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
		count_Str+=" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
	}
	data_Str+=" and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
	count_Str+=" and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
	if(!qc_bs_name.equals("")){
				data_Str+=" and fc.bs_id="+qc_bs_name;
				count_Str+=" and fc.bs_id="+qc_bs_name;
			}
			if(!receipt_id.equals("")){
				data_Str+=" and fc.receipt_id like '%"+new String(receipt_id.getBytes("gbk"),"iso-8859-1")+"%'";
				count_Str+=" and fc.receipt_id like '%"+new String(receipt_id.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!pay_type.equals("")){
				data_Str+=" and fc.pay_type_id="+pay_type;
				count_Str+=" and fc.pay_type_id="+pay_type;
			}
			if(!charge_type.equals("")){
				data_Str+=" and fc.charge_type_id="+charge_type;
				count_Str+=" and fc.charge_type_id="+charge_type;
			}
			if(!note.equals("")){
				data_Str+=" and fc.note like '%"+new String(note.getBytes("gbk"),"iso-8859-1")+"%'";
				count_Str+=" and fc.note like '%"+new String(note.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!realname.equals("")){
				data_Str+=" and fc.realname like '%"+new String(realname.getBytes("gbk"),"iso-8859-1")+"%'";
				count_Str+=" and fc.realname like '%"+new String(realname.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!addr.equals("")){
				data_Str+=" and fc.addr like '%"+new String(addr.getBytes("gbk"),"iso-8859-1")+"%'";
				count_Str+=" and fc.addr like '%"+new String(addr.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!save_admin.equals("")){
				data_Str+=" and fc.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
				count_Str+=" and fc.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!tel.equals("")){
				data_Str+=" and fc.tel like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
				count_Str+=" and fc.tel like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
			}
	
	String get_data_sql="select pt.pay_type_name,fc.charge_id,bi.name,fc.charge_date,fc.realname,fc.tel,fc.addr,fc.receipt_id,ct.charge_type_name,fc.note,fc.charge_amount,fc.save_admin,fc.save_time,gc.contract_name from gtm_pay_type pt,gtm_contract gc,gtm_business_info bi,GTM_CHARGE_TYPE ct,GTM_nonuser_CHARGE fc where fc.pay_type_id=pt.pay_type_id and fc.bs_id=bi.id and fc.contract_id=gc.contract_id and fc.charge_type_id=ct.charge_type_id"+data_Str+" order by bi.name";
	String get_total_sql="select sum(fc.charge_amount) from gtm_pay_type pt,GTM_nonuser_CHARGE fc where fc.pay_type_id=pt.pay_type_id"+count_Str;
	String gridStr="";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();					
		
		gridStr+="所属营业厅,收费日期,用户姓名,联系电话,用户住址,收据号码,支付方式,收费类别,收费金额,备注信息,所属合同,录入人,录入时间, \r\n";
		
		rs=st.executeQuery(get_data_sql);
		while(rs.next()){
			gridStr+=new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+", ";
			gridStr+=rs.getDate("charge_date")+", ";
			if(rs.getString("realname")!=null){
				gridStr+=new String(rs.getString("realname").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			}else{
				gridStr+=" , ";
			}
			if(rs.getString("tel")!=null){
				gridStr+=new String(rs.getString("tel").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			}else{
				gridStr+=" , ";
			}
			if(rs.getString("addr")!=null){
				gridStr+=new String(rs.getString("addr").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			}else{
				gridStr+=" , ";
			}
			if(rs.getString("receipt_id")!=null){
				gridStr+=new String(rs.getString("receipt_id").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			}else{
				gridStr+=" , ";
			}
			gridStr+=new String(rs.getString("pay_type_name").getBytes("iso-8859-1"),"gbk")+", ";
			gridStr+=new String(rs.getString("charge_type_name").getBytes("iso-8859-1"),"gbk")+", ";
			gridStr+=rs.getFloat("charge_amount")+", ";
			if(rs.getString("note")!=null){
				gridStr+=new String(rs.getString("note").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			}else{
				gridStr+=" , ";
			}
			gridStr+=new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			gridStr+=new String(rs.getString("save_admin").getBytes("iso-8859-1"),"gbk")+", ";	
			gridStr+=rs.getString("save_time")+", ";
			gridStr+="\r\n";
		}
	
	rs=st.executeQuery(get_total_sql);
	rs.next();
	gridStr+=",,,,,,,,共计 : "+rs.getString(1)+", ";
		
	rs.close();
	st.close();
	conn.close();
	
	response.setContentType("application/vnd.ms-excel;charset=GBK");
	response.setHeader("Content-Disposition", "attachment;filename=\"excel.csv\"");
	response.getWriter().print(gridStr);
    out.clear();
    out = pageContext.pushBody();
%>
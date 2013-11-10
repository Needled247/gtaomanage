<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.NumberFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String bs_id=request.getParameter("bs_id");
	String bs_name=java.net.URLDecoder.decode(request.getParameter("bs_name"), "UTF-8");
	String temp="";
	String temp1="";
	String temp2="";
	if(!bs_id.equals("")){
		temp=" and fc.bs_id="+bs_id;
		temp1=" and zc.zc_bs_id="+bs_id;
		temp2=" and nc.bs_id="+bs_id;
	}else{
		bs_name="所有营业厅";
	}
	//String get_chdate_sql="select sr.charge_date from (select fc.charge_date from gtm_front_charge fc where fc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and fc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp+" union all select nc.charge_date from gtm_nonuser_charge nc where nc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and nc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp2+") sr group by sr.charge_date order by sr.charge_date";
	String get_chdate_sql="select * from (select fc.charge_date from gtm_front_charge fc where fc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and fc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp+" union select nc.charge_date from gtm_nonuser_charge nc where nc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and nc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp2+")";
	String get_chstart_sql="select sum(sr.charge_amount) from (select fc.pay_type_id,fc.charge_amount from gtm_front_charge fc where fc.charge_date=TO_DATE('";
	String get_chcenter_sql="', 'yyyy-mm-dd')"+temp+" union all select nc.pay_type_id,nc.charge_amount from gtm_nonuser_charge nc where nc.charge_date=TO_DATE('";
	String get_chend_sql="', 'yyyy-mm-dd')"+temp2+") sr right join gtm_pay_type pt on sr.pay_type_id=pt.pay_type_id group by pt.pay_type_id order by pt.pay_type_id";
	String get_chtotal_sql="select sum(sr.charge_amount) from (select fc.pay_type_id,fc.charge_amount from gtm_front_charge fc where fc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and fc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp+" union all select nc.pay_type_id,nc.charge_amount from gtm_nonuser_charge nc where nc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and nc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp2+") sr right join gtm_pay_type pt on sr.pay_type_id=pt.pay_type_id group by pt.pay_type_id order by pt.pay_type_id";
	String get_zcdate_sql="select zc.zc_date from gtm_zc_charge zc where zc.zc_date>=to_date('"+startDate+"','yyyy-mm-dd') and zc.zc_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp1+" group by zc.zc_date order by zc.zc_date";
	String get_zcstart_sql="select sum(zc.zc_amount) from gtm_zc_charge zc right join gtm_zc_type zt on zc.zc_type_id=zt.zc_type_id and zc.zc_date=TO_DATE('";
	String get_zcend_sql="', 'yyyy-mm-dd')"+temp1+" group by zt.zc_type_id order by zt.zc_type_id";
	String get_zctotal_sql="select sum(zc.zc_amount) from gtm_zc_charge zc right join gtm_zc_type zt on zc.zc_type_id=zt.zc_type_id and zc.zc_date>=to_date('"+startDate+"','yyyy-mm-dd') and zc.zc_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp1+" group by zt.zc_type_id order by zt.zc_type_id";
	
	String gridStr="";
	
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	Connection data_conn=null;
	Statement data_st=null;
	ResultSet data_rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	data_conn=ConnPoolBean.getRadiusConn();
	data_st=conn.createStatement();
	String noht="";
	int count=1;
	String sr_cash="";
	double sr_total_cash=0;
	double zc_total_cash=0;
	
	gridStr+=",,"+bs_name+startDate+"至"+endDate+"收入汇总\r\n\r\n";
	gridStr+="日期,现金收入,固定POS机收入,移动POS机收入,银联网上支付,快钱网上支付,农行支付,支票支付, \r\n";
	rs=st.executeQuery(get_chdate_sql);
				while(rs.next()){
					gridStr+=rs.getDate(1)+",";
					data_rs=data_st.executeQuery(get_chstart_sql+rs.getDate(1)+get_chcenter_sql+rs.getDate(1)+get_chend_sql);
					while(data_rs.next()){
						noht=data_rs.getString(1);
						if(noht==null){
							noht="0";	
						}
						gridStr+=noht+",";						
					}
					gridStr+="\r\n";
				}
	gridStr+=",";
	rs=st.executeQuery(get_chtotal_sql);
				while(rs.next()){
					noht=rs.getString(1);
					if(noht==null){
						noht="0";	
					}
					gridStr+="小计："+noht+",";
					sr_total_cash+=Double.parseDouble(noht);
					if(count==1){
						sr_cash=noht;
					}
					count++;
				}
				gridStr+="\r\n";
				gridStr+=",,,,,,,总计："+NumberFormat.getInstance().format(sr_total_cash).replaceAll(",", "")+", ";
				gridStr+="\r\n\r\n\r\n\r\n";
				count=1;
		
		gridStr+=bs_name+startDate+"至"+endDate+"支出汇总\r\n\r\n";
	gridStr+="日期,存入银行,日常支出, \r\n";
	rs=st.executeQuery(get_zcdate_sql);
				while(rs.next()){
					gridStr+=rs.getDate(1)+",";
					data_rs=data_st.executeQuery(get_zcstart_sql+rs.getDate(1)+get_zcend_sql);
					while(data_rs.next()){
						noht=data_rs.getString(1);
						if(noht==null){
							noht="0";	
						}
						gridStr+=noht+",";						
					}
					gridStr+="\r\n";
				}
	gridStr+=",";
	rs=st.executeQuery(get_zctotal_sql);
				while(rs.next()){
					noht=rs.getString(1);
					if(noht==null){
						noht="0";	
					}
					gridStr+="小计："+noht+",";
					zc_total_cash+=Double.parseDouble(noht);
				}
				gridStr+="\r\n";
				gridStr+=",,总计："+NumberFormat.getInstance().format(zc_total_cash).replaceAll(",", "")+", ";
				gridStr+="\r\n\r\n\r\n\r\n";
				
				gridStr+=",余款(下期备用金)："+NumberFormat.getInstance().format(Double.parseDouble(sr_cash)-zc_total_cash).replaceAll(",", "");
				
		if(data_rs!=null){
			data_rs.close();
		}		
		rs.close();
		data_st.close();
		st.close();
		data_conn.close();
		conn.close();			
	
	response.setContentType("application/vnd.ms-excel;charset=GBK");
	response.setHeader("Content-Disposition", "attachment;filename=\"excel.csv\"");
	response.getWriter().print(gridStr);
    out.clear();
    out = pageContext.pushBody();
%>
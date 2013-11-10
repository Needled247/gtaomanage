<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String bs_name=request.getParameter("bs_name");
	String temp="";
	if(!bs_name.equals("")){
		temp=" and fc.bs_id="+bs_name;
	}
	String get_group_sql="select gc.contract_id,gc.contract_name,gc.big_id,bi.name,sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_business_info bi,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and gc.hall_id=bi.id"+temp+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') group by gc.contract_id,gc.contract_name,gc.big_id,bi.name";
	String get_xzl_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.contract_type=2 and gc.contract_id=";
	String get_gg_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_gg=1 and gc.contract_id=";
	String get_xz_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and fc.is_new=1 and gc.contract_id=";
	String get_xk_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_xk=1 and gc.contract_id=";
	String get_xzlTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.contract_type=2";
	String get_ggTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_gg=1";
	String get_xzTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and fc.is_new=1";
	String get_xkTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_xk=1";	
	String get_dtotal_sql="select ct.charge_type_name,sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_charge_type ct,gtm_front_charge fc where fc.username=gmf.username and fc.charge_type_id=ct.charge_type_id"+temp+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') group by ct.charge_type_name";
	String get_start_sql="select ct.charge_type_name,sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_charge_type ct,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=";
	String get_end_sql=" and fc.charge_type_id=ct.charge_type_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') group by ct.charge_type_name";
	String get_total_sql="select sum(charge_amount) from gtm_front_charge fc,GTM_MAINFORM_INFO gmf where fc.username=gmf.username and charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')"+temp;
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
	
	gridStr+="日期,营业厅,虚拟编号,合同名称,各项收入汇总明细,总收入,写字楼收入,光改收入,新装收入,新开小区收入, \r\n";
	rs=st.executeQuery(get_group_sql);
				while(rs.next()){
					gridStr+=startDate+"至"+endDate+", ";
					gridStr+=new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+", ";
					gridStr+=rs.getInt("big_id")+", ";
					gridStr+=new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+", ";
					data_rs=data_st.executeQuery(get_start_sql+rs.getInt(1)+get_end_sql);
					while(data_rs.next()){						
						gridStr+=new String(data_rs.getString(1).getBytes("iso-8859-1"),"gbk")+" : "+data_rs.getString(2)+"  ";
					}
					gridStr+=","+rs.getString(5)+", ";			
					data_rs=data_st.executeQuery(get_xzl_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
						gridStr+=data_rs.getString(1)+", ";
					}else{
						gridStr+="0, ";
					}
					data_rs=data_st.executeQuery(get_gg_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
						gridStr+=data_rs.getString(1)+", ";
					}else{
						gridStr+="0, ";
					}
					data_rs=data_st.executeQuery(get_xz_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
						gridStr+=data_rs.getString(1)+", ";
					}else{
						gridStr+="0, ";
					}
					data_rs=data_st.executeQuery(get_xk_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
						gridStr+=data_rs.getString(1)+", ";
					}else{
						gridStr+="0, ";
					}
					gridStr+="\r\n";
				}
	gridStr+=",,,,,, \r\n";
	rs=st.executeQuery(get_dtotal_sql);
	gridStr+=",,,,";
	while(rs.next()){						
		gridStr+=new String(rs.getString(1).getBytes("iso-8859-1"),"gbk")+" : "+rs.getString(2)+"  ";
	}
	gridStr+=", ";
	rs=st.executeQuery(get_total_sql);
	rs.next();
	gridStr+="总收入共计 : "+rs.getString(1)+", ";
	rs=st.executeQuery(get_xzlTotal_sql);
	rs.next();
	if(rs.getString(1)!=null){
		gridStr+="写字楼收入共计 : "+rs.getString(1)+", ";
	}else{
		gridStr+="写字楼收入共计 : 0, ";
	}
	rs=st.executeQuery(get_ggTotal_sql);
	rs.next();
	if(rs.getString(1)!=null){
		gridStr+="光改收入共计 : "+rs.getString(1)+", ";
	}else{
		gridStr+="光改收入共计 : 0, ";
	}
	rs=st.executeQuery(get_xzTotal_sql);
	rs.next();
	if(rs.getString(1)!=null){
		gridStr+="新装收入共计 : "+rs.getString(1)+", ";
	}else{
		gridStr+="新装收入共计 : 0, ";
	}
	rs=st.executeQuery(get_xkTotal_sql);
	rs.next();
	if(rs.getString(1)!=null){
		gridStr+="新开小区收入共计 : "+rs.getString(1)+", \r\n";
	}else{
		gridStr+="新开小区收入共计 : 0, \r\n";
	}
	
	data_rs.close();
	data_st.close();
	data_conn.close();	
	rs.close();
	st.close();
	conn.close();			
	
	response.setContentType("application/vnd.ms-excel;charset=GBK");
	response.setHeader("Content-Disposition", "attachment;filename=\"excel.csv\"");
	response.getWriter().print(gridStr);
    out.clear();
    out = pageContext.pushBody();
%>
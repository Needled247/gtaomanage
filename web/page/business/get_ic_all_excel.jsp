<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.text.NumberFormat"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String bs_name=request.getParameter("bs_name");
	String temp="";
	String temp1="";
	String notemp="";
	if(!bs_name.equals("")){
		temp=" where gc.hall_id="+bs_name;
		temp1=" and fc.bs_id="+bs_name;
		notemp=" and bs_id="+bs_name;
	}
	String get_group_sql="select gc.contract_id,gc.contract_name,gc.big_id,bi.name,sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf join gtm_front_charge fc on fc.username=gmf.username and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') right join gtm_contract gc on gmf.contract_id=gc.contract_id join gtm_business_info bi on gc.hall_id=bi.id"+temp+" group by gc.contract_id,gc.contract_name,gc.big_id,bi.name order by bi.name";
	String get_noht_sql="select sum(nc.charge_amount) from gtm_nonuser_charge nc where nc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and nc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and nc.contract_id=";
	String get_noctstart_sql="select sum(nc.charge_amount) from gtm_nonuser_charge nc where nc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and nc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and nc.contract_id=";
	String get_noctend_sql=" and nc.charge_type_id=";
	String get_xzl_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.contract_type=2 and gc.contract_id=";
	String get_gg_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_gg=1 and gc.contract_id=";
	String get_xz_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and fc.is_new=1 and gc.contract_id=";
	String get_xk_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_xk=1 and gc.contract_id=";
	String get_xzlTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp1+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.contract_type=2";
	String get_ggTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp1+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_gg=1";
	String get_xzTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp1+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and fc.is_new=1";
	String get_xkTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp1+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_xk=1";	
	String get_dtotal_sql="select ct.charge_type_name,sum(fc.charge_amount),ct.charge_type_id from GTM_MAINFORM_INFO gmf join gtm_front_charge fc on fc.username=gmf.username and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') right join gtm_charge_type ct on fc.charge_type_id=ct.charge_type_id group by ct.charge_type_name,ct.charge_type_id order by ct.charge_type_id";
	String get_nodtotal_sql="select sum(nc.charge_amount) from gtm_nonuser_charge nc where nc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and nc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and nc.charge_type_id=";
	String get_start_sql="select ct.charge_type_name,sum(fc.charge_amount),ct.charge_type_id from GTM_MAINFORM_INFO gmf join gtm_front_charge fc on fc.username=gmf.username and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gmf.contract_id=";
	String get_end_sql=" right join gtm_charge_type ct on fc.charge_type_id=ct.charge_type_id group by ct.charge_type_name,ct.charge_type_id order by ct.charge_type_id";
	String get_total_sql="select sum(charge_amount) from gtm_front_charge fc,GTM_MAINFORM_INFO gmf where fc.username=gmf.username and charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')"+temp1;
	String get_nototal_sql="select sum(charge_amount) from gtm_nonuser_charge nc where charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')"+notemp;
	String gridStr="";
	
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	Connection data_conn=null;
	Statement data_st=null;
	ResultSet data_rs=null;
	Connection no_conn=null;
	Statement no_st=null;
	ResultSet no_rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	data_conn=ConnPoolBean.getRadiusConn();
	data_st=conn.createStatement();
	no_conn=ConnPoolBean.getRadiusConn();
	no_st=no_conn.createStatement();
	String noht="";
	
	gridStr+="日期,营业厅,虚拟编号,合同名称,宽带收入,IT收入,IT卡收入,料收入,商城收入,移机收入,光猫押金,路由器押金,退宽带收入,退光猫押金,退路由器押金,退其他押金,联通非ESS收入,总收入,写字楼收入,光改收入,新装收入,新开小区收入, \r\n";
	rs=st.executeQuery(get_group_sql);
				while(rs.next()){
					gridStr+=startDate+"至"+endDate+", ";
					gridStr+=new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+", ";
					gridStr+=rs.getInt("big_id")+", ";
					gridStr+=new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
					
					data_rs=data_st.executeQuery(get_start_sql+rs.getInt(1)+get_end_sql);
					while(data_rs.next()){
						no_rs=no_st.executeQuery(get_noctstart_sql+rs.getInt(1)+get_noctend_sql+data_rs.getInt(3));
						no_rs.next();
						noht=no_rs.getString(1);
						if(noht==null){
							noht="0";	
						}
						String cost=data_rs.getString(2);
						if(cost==null){
							cost="0";
						}
						cost=NumberFormat.getInstance().format(Double.parseDouble(cost)+Double.parseDouble(noht)).replaceAll(",", "");						
						gridStr+=cost+", ";
					}
					data_rs=data_st.executeQuery(get_noht_sql+rs.getInt(1));
					data_rs.next();
					noht=data_rs.getString(1);
					if(noht==null){
						noht="0";	
					}
					if(rs.getString(5)!=null){
						gridStr+=NumberFormat.getInstance().format(rs.getDouble(5)+Double.parseDouble(noht)).replaceAll(",", "")+", ";
					}else{
						gridStr+=noht+", ";
					}			
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
	gridStr+=",,,,,,, \r\n";
	rs=st.executeQuery(get_dtotal_sql);
	gridStr+=",,,,";
	while(rs.next()){
		no_rs=no_st.executeQuery(get_nodtotal_sql+rs.getInt(3));
		no_rs.next();
		noht=no_rs.getString(1);
		if(noht==null){
			noht="0";	
		}
		String cost=rs.getString(2);
		if(cost==null){
			cost="0";
		}
		cost=NumberFormat.getInstance().format(Double.parseDouble(cost)+Double.parseDouble(noht)).replaceAll(",", "");												
		gridStr+=new String(rs.getString(1).getBytes("iso-8859-1"),"gbk")+"合计 : "+cost+", ";
	}
	rs=st.executeQuery(get_nototal_sql);
	rs.next();
	noht=rs.getString(1);
	if(noht==null){
		noht="0";	
	}
	rs=st.executeQuery(get_total_sql);
	rs.next();
	if(rs.getString(1)!=null){
		gridStr+="总收入合计 : "+NumberFormat.getInstance().format(rs.getDouble(1)+Double.parseDouble(noht)).replaceAll(",", "")+", ";
		
	}else{
		gridStr+="总收入合计 : "+noht+", ";
	}
	rs=st.executeQuery(get_xzlTotal_sql);
	rs.next();
	if(rs.getString(1)!=null){
		gridStr+="写字楼收入合计 : "+rs.getString(1)+", ";
	}else{
		gridStr+="写字楼收入合计 : 0, ";
	}
	rs=st.executeQuery(get_ggTotal_sql);
	rs.next();
	if(rs.getString(1)!=null){
		gridStr+="光改收入合计 : "+rs.getString(1)+", ";
	}else{
		gridStr+="光改收入合计 : 0, ";
	}
	rs=st.executeQuery(get_xzTotal_sql);
	rs.next();
	if(rs.getString(1)!=null){
		gridStr+="新装收入合计 : "+rs.getString(1)+", ";
	}else{
		gridStr+="新装收入合计 : 0, ";
	}
	rs=st.executeQuery(get_xkTotal_sql);
	rs.next();
	if(rs.getString(1)!=null){
		gridStr+="新开小区收入合计 : "+rs.getString(1)+", \r\n";
	}else{
		gridStr+="新开小区收入合计 : 0, \r\n";
	}
	
		if(no_rs!=null){
			no_rs.close();
		}
		if(data_rs!=null){
			data_rs.close();
		}		
		rs.close();
		no_st.close();
		data_st.close();
		st.close();
		no_conn.close();
		data_conn.close();
		conn.close();			
	
	response.setContentType("application/vnd.ms-excel;charset=GBK");
	response.setHeader("Content-Disposition", "attachment;filename=\"excel.csv\"");
	response.getWriter().print(gridStr);
    response.getWriter().close();
%>
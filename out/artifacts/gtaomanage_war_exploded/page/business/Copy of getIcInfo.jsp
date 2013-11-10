<%@page language="java" import="java.util.Date" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String startPage=request.getParameter("start");
	String countPage=request.getParameter("limit");
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String bs_name=request.getParameter("bs_name");
	String temp="";
	if(!bs_name.equals("")){
		temp=" and fc.bs_id="+bs_name;
	}
	
	String get_group_sql="select * from (select gc.contract_id,gc.contract_name,gc.big_id,bi.name,sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_business_info bi,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and gc.hall_id=bi.id"+temp+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') group by gc.contract_id,gc.contract_name,gc.big_id,bi.name) where rownum<=";
	String get_xzl_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.contract_type=2 and gc.contract_id=";
	String get_gg_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_gg=1 and gc.contract_id=";
	String get_xz_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and fc.is_new=1 and gc.contract_id=";
	String get_xk_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_xk=1 and gc.contract_id=";
	String get_start_sql="select ct.charge_type_name,sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_charge_type ct,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=";
	String get_end_sql=" and fc.charge_type_id=ct.charge_type_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') group by ct.charge_type_name";
	String get_count_sql="select count(*) from (select gc.contract_id from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_business_info bi,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and gc.hall_id=bi.id"+temp+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') group by gc.contract_id)";
	String gridStr="";
	int count=0;
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
				
		int endPage=Integer.parseInt(startPage)+Integer.parseInt(countPage);
		get_group_sql+=endPage+" minus "+get_group_sql+startPage;
		
		rs=st.executeQuery(get_count_sql);
			rs.next();
			count=rs.getInt(1);
			if(count!=0){
				rs=st.executeQuery(get_group_sql);
				while(rs.next()){				
					gridStr+="{";
					gridStr+="income_date:'<b><p><font color=#8B0000>从"+startDate+"</font></p><p><font color=green>至"+endDate+"</font></p></b>',";
					gridStr+="hall_id:'"+new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',";
					gridStr+="big_id:'"+rs.getInt("big_id")+"',";
					gridStr+="contract_name:'"+new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+"',";
					gridStr+="income_total:'<b>￥<font color=royalblue>"+rs.getString(5)+"</font></b>',";
					data_rs=data_st.executeQuery(get_xzl_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
						gridStr+="xzl:'￥"+data_rs.getString(1)+"',";
					}else{
						gridStr+="xzl:'￥0',";
					}
					data_rs=data_st.executeQuery(get_gg_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
						gridStr+="gg:'￥"+data_rs.getString(1)+"',";
					}else{
						gridStr+="gg:'￥0',";	
					}
					data_rs=data_st.executeQuery(get_xz_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
						gridStr+="xz:'￥"+data_rs.getString(1)+"',";
					}else{
						gridStr+="xz:'￥0',";	
					}
					data_rs=data_st.executeQuery(get_xk_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
						gridStr+="xk:'￥"+data_rs.getString(1)+"',";
					}else{
						gridStr+="xk:'￥0',";	
					}
					gridStr+="income_detail:'<p>";					
					data_rs=data_st.executeQuery(get_start_sql+rs.getInt(1)+get_end_sql);
					int c=0;
					while(data_rs.next()){						
						gridStr+="<b>"+new String(data_rs.getString(1).getBytes("iso-8859-1"),"gbk")+"&nbsp;:&nbsp;￥<font color=red>"+data_rs.getString(2)+"</font></b>&nbsp;&nbsp;&nbsp;&nbsp;";
						c++;
						if((c%4)==0){
							gridStr+="</p><p>";
						}
					}
					gridStr+="</p>'},";
					/*
					if((c%3)==0){
						gridStr=gridStr.replaceFirst("<p>$", "'},");
					}else{
						gridStr+="</p>'},";
					}
					*/
				}
			}
		
		if(data_rs!=null){
			data_rs.close();
		}		
		rs.close();
		data_st.close();
		st.close();
		data_conn.close();
		conn.close();
		
		gridStr=gridStr.replaceFirst(",$", "");
	
	
	//System.out.println(gridStr);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{totalCount:"+count+",data:["+gridStr+"]}");
	
%>
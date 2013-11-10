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
	if(!bs_id.equals("")){
		temp=" and fc.bs_id="+bs_id;
	}else{
		bs_name="所有营业厅";
	}
	//String get_chdate_sql="select sr.charge_date from (select fc.charge_date from gtm_front_charge fc where fc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and fc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp+" union all select nc.charge_date from gtm_nonuser_charge nc where nc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and nc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp2+") sr group by sr.charge_date order by sr.charge_date";
	String get_tcdate_sql="select distinct fc.charge_date from gtm_front_charge fc where fc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and fc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp+" and fc.act_sub_id!=0 order by fc.charge_date";
	String get_tcstart_sql="select count(fc.bs_id) from gtm_front_charge fc right join gtm_act_sub gas on fc.act_sub_id=gas.actsub_id and fc.charge_date=TO_DATE('";
	String get_tcend_sql="', 'yyyy-mm-dd')"+temp+" and fc.act_sub_id!=0 group by gas.actsub_id order by gas.actsub_id";
	String get_tctotal_sql="select count(fc.bs_id) from gtm_front_charge fc right join gtm_act_sub gas on fc.act_sub_id=gas.actsub_id and fc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and fc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp+" and fc.act_sub_id!=0 group by gas.actsub_id order by gas.actsub_id";
	String get_hdtotal_sql="select count(fc.bs_id) from gtm_front_charge fc join gtm_act_sub gas on fc.act_sub_id=gas.actsub_id and fc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and fc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp+" and fc.act_sub_id!=0 right join gtm_act ga on ga.act_id=gas.act_id group by ga.act_id order by ga.act_id";
	
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
	int count=1;
	String noht="";
	
	gridStr+=",,"+bs_name+startDate+"至"+endDate+"活动办理情况汇总\r\n\r\n";
	gridStr+="日期,套餐EA1999元4M包1年,套餐EB2999元4M包2年,套餐EC2999元10M包1年,套餐ED3999元10M包2年,套餐EE5999元10M包2年,套餐EF6999元10M包1年,套餐GA1888元4M包1年,套餐GB2888元10M包1年,套餐GC3888元50M包1年,套餐GD6888元50M包1年,悦视A1699元10M包1年,悦视B1899元50M包1年,活动A1180元4M包1年,活动B1480元10M包1年,活动C1680元50M包1年,4M一年,4M二年,4M三年,10M一年,10M二年,10M三年,50M一年,50M二年,50M三年,100M一年,100M二年,100M三年,金秋礼包1年4M带宽,金秋礼包1年10M带宽,金秋礼包1年50M带宽,金秋礼包1年100M带宽,金秋礼包2年4M带宽,金秋礼包2年10M带宽,金秋礼包2年50M带宽,金秋礼包2年100M带宽,金秋礼包3年4M带宽,金秋礼包3年10M带宽,金秋礼包3年50M带宽,金秋礼包3年100M带宽,4M5折办手机,10M5折办手机,10M乐视机顶盒,50M5折办手机,50M乐视机顶盒,100M5折办手机,100M乐视机顶盒,10M手机+乐视机顶盒,50M手机+乐视机顶盒,100M手机+乐视机顶盒, \r\n";
	rs=st.executeQuery(get_tcdate_sql);
				while(rs.next()){
					gridStr+=rs.getDate(1)+",";
					data_rs=data_st.executeQuery(get_tcstart_sql+rs.getDate(1)+get_tcend_sql);
					while(data_rs.next()){
						if(count!=1){
							noht=data_rs.getString(1);						
							if(noht==null){
								noht="0";	
							}
							gridStr+=noht+",";
						}
						count++;						
					}
					gridStr+="\r\n";
					count=1;
				}
	gridStr+=",";
	count=1;
	rs=st.executeQuery(get_tctotal_sql);
				while(rs.next()){
					if(count!=1){
						noht=rs.getString(1);
						if(noht==null){
							noht="0";	
						}
						gridStr+="小计："+noht+",";
					}
					count++;
				}
				gridStr+="\r\n\r\n\r\n,,";
				count=1;
	
	gridStr+="套餐E99,套餐G88,悦视,预存包年全额返,4M带宽餐型,10M带宽餐型,50M带宽餐型,100M带宽餐型,金秋礼包1年,金秋礼包2年,金秋礼包3年,金秋套包2年,金秋套包3年, \r\n,,";			
	rs=st.executeQuery(get_hdtotal_sql);
				while(rs.next()){
					if(count!=1){
						noht=rs.getString(1);
						if(noht==null){
							noht="0";	
						}
						gridStr+="小计："+noht+",";
					}
					count++;
				}
			
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
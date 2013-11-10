<%@page language="java" import="ds.ConnPoolBean" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.text.NumberFormat"%>
<%@page import="java.util.ArrayList"%>
<%@ page import="java.util.List" %>
<%@ page import="bean.IcInfoBean" %>
<%@ page import="tools.Tools" %>

<%
	String startPage=request.getParameter("start");
	String countPage=request.getParameter("limit");
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String bs_name=request.getParameter("bs_name");
	String temp="";
    String tempJson = "";
	if(!bs_name.equals("")){
		temp=" where gc.hall_id="+bs_name;
	}
	
	String get_group_sql="select * from (select gc.contract_id,gc.contract_name,gc.big_id,bi.name,sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf join gtm_front_charge fc on fc.username=gmf.username and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') right join gtm_contract gc on gmf.contract_id=gc.contract_id join gtm_business_info bi on gc.hall_id=bi.id"+temp+" group by gc.contract_id,gc.contract_name,gc.big_id,bi.name) where rownum<=";
	String get_noht_sql="select sum(nc.charge_amount) from gtm_nonuser_charge nc where nc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and nc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and nc.contract_id=";
	String get_noctstart_sql="select sum(nc.charge_amount) from gtm_nonuser_charge nc where nc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and nc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and nc.contract_id=";
	String get_noctend_sql=" and nc.charge_type_id=";
	String get_xzl_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.contract_type=2 and gc.contract_id=";
	String get_gg_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_gg=1 and gc.contract_id=";
	String get_xz_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and fc.is_new=1 and gc.contract_id=";
	String get_xk_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_xk=1 and gc.contract_id=";
	String get_start_sql="select ct.charge_type_name,sum(fc.charge_amount),ct.charge_type_id from GTM_MAINFORM_INFO gmf join gtm_front_charge fc on fc.username=gmf.username and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gmf.contract_id=";
	String get_end_sql=" right join gtm_charge_type ct on fc.charge_type_id=ct.charge_type_id group by ct.charge_type_name,ct.charge_type_id order by ct.charge_type_id";
	//String get_count_sql="select count(*) from (select gc.contract_id from GTM_MAINFORM_INFO gmf join gtm_front_charge fc on gmf.username=fc.username and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') right join gtm_contract gc on gmf.contract_id=gc.contract_id join gtm_business_info bi on gc.hall_id=bi.id "+temp+" group by gc.contract_id)";
	String get_count_sql="select count(*) from gtm_contract gc"+temp;
	String gridStr="";
	int count=0;
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
				
    int endPage=Integer.parseInt(startPage)+Integer.parseInt(countPage);
    get_group_sql+=endPage+" minus "+get_group_sql+startPage;

    /**
     * Author:蒋浩
     * Date:2013-11-06
     */
    //BEGIN
    String finalHall = "";   //营业厅
    Double finalIncoming = 0.0;
    Double finalXZL = 0.0;
    Double finalGG = 0.0;
    Double finalXZ = 0.0;
    Double finalXK = 0.0;
    List<IcInfoBean> finalCostArr = new ArrayList<IcInfoBean>();
    //END
    rs=st.executeQuery(get_count_sql);
        rs.next();
        count=rs.getInt(1);
			if(count!=0){
				rs=st.executeQuery(get_group_sql);
				while(rs.next()){
					gridStr+="{";
					gridStr+="income_date:'<b><p><font color=#8B0000>从"+startDate+"</font></p><p><font color=green>至"+endDate+"</font></p></b>',";					
					gridStr+="hall_id:'"+new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',";
                    finalHall = new String(rs.getString("name").getBytes("iso-8859-1"),"gbk");
					gridStr+="big_id:'"+rs.getInt("big_id")+"',";
					gridStr+="contract_name:'"+new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+"',";					
					data_rs=data_st.executeQuery(get_noht_sql+rs.getInt(1));
					String noht="";
					data_rs.next();
					noht=data_rs.getString(1);
					if(noht==null){
						noht="0";	
					}
					if(rs.getString(5)!=null){
                        finalIncoming += rs.getDouble(5)+Double.parseDouble(noht);
						gridStr+="income_total:'<b>￥<font color=royalblue>"+NumberFormat.getInstance().format(rs.getDouble(5)+Double.parseDouble(noht)).replaceAll(",", "")+"</font></b>',";
					}else{
                        finalIncoming += Double.parseDouble(noht);
						gridStr+="income_total:'<b>￥<font color=royalblue>"+noht+"</font></b>',";	
					}
					data_rs=data_st.executeQuery(get_xzl_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
                        finalXZL += Double.parseDouble(data_rs.getString(1));
						gridStr+="xzl:'￥"+data_rs.getString(1)+"',";
					}else{
						gridStr+="xzl:'￥0',";
					}
					data_rs=data_st.executeQuery(get_gg_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
                        finalGG += Double.parseDouble(data_rs.getString(1));
						gridStr+="gg:'￥"+data_rs.getString(1)+"',";
					}else{
						gridStr+="gg:'￥0',";	
					}
					data_rs=data_st.executeQuery(get_xz_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
                        finalXZ += Double.parseDouble(data_rs.getString(1));
						gridStr+="xz:'￥"+data_rs.getString(1)+"',";
					}else{
						gridStr+="xz:'￥0',";	
					}
					data_rs=data_st.executeQuery(get_xk_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getString(1)!=null){
                        finalXK += Double.parseDouble(data_rs.getString(1));
						gridStr+="xk:'￥"+data_rs.getString(1)+"',";
					}else{
						gridStr+="xk:'￥0',";	
					}
					gridStr+="income_detail:'<p>";					
					data_rs=data_st.executeQuery(get_start_sql+rs.getInt(1)+get_end_sql);
					int c=0;
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
						gridStr+="<b>"+new String(data_rs.getString(1).getBytes("iso-8859-1"),"gbk")+"&nbsp;:&nbsp;￥<font color=red>"+cost+"</font></b>&nbsp;&nbsp;&nbsp;&nbsp;";
                        finalCostArr.add(new IcInfoBean(new String(data_rs.getString(1).getBytes("iso-8859-1"),"gbk"),Double.parseDouble(cost)));
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
                tempJson = "{income_date:'<b><p><font color=#8B0000>从"+startDate+"</font></p><p><font color=green>至"+endDate+"</font></p></b>',";
                tempJson += "hall_id:'"+finalHall+"总收入',";
                tempJson += "big_id:'-',";
                tempJson += "contract_name:'-',";
                tempJson += "income_total:'<b>￥<font color=royalblue>"+finalIncoming+"</font></b>',";
                tempJson += "xzl:'￥"+finalXZL+"',";
                tempJson += "gg:'￥"+finalGG+"',";
                tempJson += "xz:'￥"+finalXZ+"',";
                tempJson += "xk:'￥"+finalXK+"',";
                tempJson += new Tools().IcDetailIterate(finalCostArr);
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
		
		gridStr=gridStr.replaceFirst(",$", "");
	
	
	//System.out.println(gridStr);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{totalCount:"+count+",data:["+tempJson+gridStr+"]}");
	
%>
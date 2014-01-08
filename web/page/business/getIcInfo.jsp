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
    String temp1 = "";
    String notemp="";
    String tempJson = "";
	if(!bs_name.equals("")){
		temp=" where gc.hall_id="+bs_name;
        temp1 = " and fc.bs_id="+bs_name;
        notemp=" and bs_id="+bs_name;
	}

    String finalHall = "";
    String finalGG = "",finalXZL="",finalXZ="",finalIncoming="",finalXK="";
	
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
    //汇总sql  开始
    String get_xzlTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp1+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.contract_type=2";
    String get_ggTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp1+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_gg=1";
    String get_xzTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp1+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and fc.is_new=1";
    String get_xkTotal_sql="select sum(fc.charge_amount) from GTM_MAINFORM_INFO gmf,gtm_contract gc,gtm_front_charge fc where fc.username=gmf.username and gmf.contract_id=gc.contract_id"+temp1+" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss') and gc.is_xk=1";
    String get_total_sql="select sum(charge_amount) from gtm_front_charge fc,GTM_MAINFORM_INFO gmf where fc.username=gmf.username and charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')"+temp1;
    String get_nototal_sql="select sum(charge_amount) from gtm_nonuser_charge nc where charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')"+notemp;
    //汇总sql  结束
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
    Connection totalConn = null;
    Statement total_st = null;
    ResultSet total_rs = null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	data_conn=ConnPoolBean.getRadiusConn();
	data_st=conn.createStatement();
	no_conn=ConnPoolBean.getRadiusConn();
	no_st=no_conn.createStatement();
    totalConn = ConnPoolBean.getRadiusConn();
    total_st = totalConn.createStatement();
				
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
                    finalHall = new String(rs.getString("name").getBytes("iso-8859-1"),"gbk");
					gridStr+="hall_id:'"+new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',";
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
						gridStr+="income_total:'<b>￥<font color=royalblue>"+NumberFormat.getInstance().format(rs.getDouble(5)+Double.parseDouble(noht)).replaceAll(",", "")+"</font></b>',";
					}else{
						gridStr+="income_total:'<b>￥<font color=royalblue>"+noht+"</font></b>',";	
					}
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
						c++;
						if((c%4)==0){
							gridStr+="</p><p>";
						}
					}
                    //光改总收入
                    total_rs=total_st.executeQuery(get_ggTotal_sql);
                    total_rs.next();
                    if(total_rs.getString(1)!=null){
                        finalGG = total_rs.getString(1);
                    }else{
                        finalGG = "0";
                    }
                    //新开总收入
                    total_rs=total_st.executeQuery(get_xkTotal_sql);
                    total_rs.next();
                    if(total_rs.getString(1)!=null){
                        finalXK = total_rs.getString(1);
                    }else{
                        finalXK = "0";
                    }
                    //写字楼总收入
                    total_rs=total_st.executeQuery(get_xzlTotal_sql);
                    total_rs.next();
                    if(total_rs.getString(1)!=null){
                        finalXZL = total_rs.getString(1);
                    }else{
                        finalXZL = "0";
                    }
                    //新开总收入
                    total_rs=total_st.executeQuery(get_xzTotal_sql);
                    total_rs.next();
                    if(total_rs.getString(1)!=null){
                        finalXZ = total_rs.getString(1);
                    }else{
                        finalXZ = "0";
                    }
                    total_rs=total_st.executeQuery(get_nototal_sql);
                    total_rs.next();
                    String noht1=total_rs.getString(1);
                    if(noht1==null){
                        noht1="0";
                    }
                    //总收入
                    total_rs=total_st.executeQuery(get_total_sql);
                    total_rs.next();
                    if(total_rs.getString(1)!=null){
                        finalIncoming =NumberFormat.getInstance().format(total_rs.getDouble(1)+Double.parseDouble(noht1)).replaceAll(",", "");
                    }else{
                        finalIncoming = noht1;
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
                String totalTemp = "";
                if(bs_name.equals("")){
                    totalTemp = "所有营业厅";
                }
                else {
                    totalTemp = finalHall;
                }
                tempJson = "{income_date:'<b><p><font color=#8B0000>从"+startDate+"</font></p><p><font color=green>至"+endDate+"</font></p></b>',";
                tempJson += "hall_id:'" + totalTemp + "总收入',";
                tempJson += "big_id:'-',";
                tempJson += "contract_name:'-',";
                tempJson += "income_total:'<b>￥<font color=royalblue>"+finalIncoming+"</font></b>',";
                tempJson += "xzl:'￥"+finalXZL+"',";
                tempJson += "gg:'￥"+finalGG+"',";
                tempJson += "xz:'￥"+finalXZ+"',";
                tempJson += "xk:'￥"+finalXK+"',";
                tempJson += "income_detail:''},";
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
        total_st.close();
		no_conn.close();
		data_conn.close();
		conn.close();
        totalConn.close();
		
		gridStr=gridStr.replaceFirst(",$", "");
	
	
	//System.out.println(gridStr);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{totalCount:"+count+",data:["+tempJson+gridStr+"]}");
	
%>
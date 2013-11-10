<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String zc_bs_name=request.getParameter("zc_bs_name");
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");	
	String zc_type=request.getParameter("zc_type");
	//System.out.println(qc_bs_name+","+charge_date+","+receipt_id+","+username+","+charge_type+","+note+","+realname+","+addr);
	
	String data_Str="";
	String count_Str="";
	
	if(!zc_bs_name.equals("")){
				data_Str+=" and zc.zc_bs_id="+zc_bs_name;
				count_Str+=" and zc.zc_bs_id="+zc_bs_name;
			}
			if(!zc_type.equals("")){
				data_Str+=" and zc.zc_type_id="+zc_type;
				count_Str+=" and zc.zc_type_id="+zc_type;
			}
	
	String get_data_sql="select zt.zc_type_name,zc.zc_id,bi.name,zc.zc_date,zc.zc_note,zc.zc_amount,zc.zc_saveadmin,zc.zc_savetime from gtm_zc_type zt,gtm_business_info bi,gtm_zc_charge zc where zt.zc_type_id=zc.zc_type_id and zc.zc_bs_id=bi.id and zc.zc_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and zc.zc_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')"+data_Str+" order by bi.name";
	String get_total_sql="select sum(zc.zc_amount) from gtm_zc_charge zc where zc.zc_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and zc.zc_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')"+count_Str;
	String gridStr="";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();					
		
		gridStr+="营业厅,支出日期,支出类型,支出金额,备注信息,录入人,录入时间, \r\n";
		
		rs=st.executeQuery(get_data_sql);
		while(rs.next()){
			gridStr+=new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+", ";
			gridStr+=rs.getDate("zc_date")+", ";
			gridStr+=new String(rs.getString("zc_type_name").getBytes("iso-8859-1"),"gbk")+", ";
			gridStr+=rs.getString("zc_amount")+", ";
			if(rs.getString("zc_note")!=null){
				gridStr+=new String(rs.getString("zc_note").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			}else{
				gridStr+=" , ";
			}
			gridStr+=new String(rs.getString("zc_saveadmin").getBytes("iso-8859-1"),"gbk")+", ";	
			gridStr+=rs.getString("zc_savetime")+", ";
			gridStr+="\r\n";
		}
	
	rs=st.executeQuery(get_total_sql);
	rs.next();
	gridStr+=",,,共计 : "+rs.getString(1)+", ";
		
	rs.close();
	st.close();
	conn.close();
	
	response.setContentType("application/vnd.ms-excel;charset=GBK");
	response.setHeader("Content-Disposition", "attachment;filename=\"excel.csv\"");
	response.getWriter().print(gridStr);
    out.clear();
    out = pageContext.pushBody();
%>
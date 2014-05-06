<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String bs_name=request.getParameter("bs_name");
	String temp="";
	if(!bs_name.equals("")){
		temp=" and gmf.department_id="+bs_name;
	}
	String get_group_sql="select * from (select gmf.contract_id,count(username) from GTM_MAINFORM_INFO gmf,tbl_users tu where tu.susername=gmf.username and tu.istatus<>-9"+temp+" group by gmf.contract_id)";
	String get_data_sql="select * from gtm_contract gc,gtm_business_info bi where gc.hall_id=bi.id and gc.contract_id=";
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
		
		gridStr+="所属营业厅,虚拟编号,合同名称,合同类型,签约时间,是否新开小区,小区开通时间,是否光改,光改开通时间,是否有竞争,竞争宽带,住户数,光改住户数,用户数,用户占比, \r\n";
		
		rs=st.executeQuery(get_group_sql);
		while(rs.next()){
			data_rs=data_st.executeQuery(get_data_sql+rs.getInt(1));
			data_rs.next();
			gridStr+=new String(data_rs.getString("name").getBytes("iso-8859-1"),"gbk")+",";
			gridStr+=data_rs.getInt("big_id")+",";
			gridStr+=new String(data_rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+",";
			if(data_rs.getInt("contract_type")==1){
				gridStr+="社区合同,";
			}else if(data_rs.getInt("contract_type")==2){
				gridStr+="写字楼合同,";
			}else if(data_rs.getInt("contract_type")==3){
				gridStr+="无合同,";
			}
			if(data_rs.getString("sign_date")!=null){
				gridStr+=data_rs.getDate("sign_date")+",";
			}else{
				gridStr+=" ,";
			}
			if(data_rs.getInt("is_xk")==1){
				gridStr+="是,";
			}else if(data_rs.getInt("is_xk")==0){
				gridStr+="否,";
			}
			if(data_rs.getString("xq_open_date")!=null){
				gridStr+=data_rs.getDate("xq_open_date")+",";
			}else{
				gridStr+=" ,";
			}
			if(data_rs.getInt("is_gg")==1){
				gridStr+="是,";
			}else if(data_rs.getInt("is_gg")==0){
				gridStr+="否,";
			}
			if(data_rs.getString("gg_open_date")!=null){
				gridStr+=data_rs.getDate("gg_open_date")+",";
			}else{
				gridStr+=" ,";
			}
			if(data_rs.getInt("is_jz")==1){
				gridStr+="是,";
			}else if(data_rs.getInt("is_jz")==0){
				gridStr+="否,";
			}
			if(data_rs.getString("jz_brand")!=null){
				gridStr+=new String(data_rs.getString("jz_brand").getBytes("iso-8859-1"),"gbk")+",";
			}else{
				gridStr+=" ,";
			}
			if(data_rs.getString("live_num")!=null){
				gridStr+=data_rs.getString("live_num")+",";
			}else{
				gridStr+=" ,";
			}
			if(data_rs.getString("gg_live_num")!=null){
				gridStr+=data_rs.getString("gg_live_num")+",";
			}else{
				gridStr+=" ,";
			}
			gridStr+=rs.getInt(2)+",";
			if(data_rs.getInt("live_num")==0){
				gridStr+="0.00%,";
			}else{
				gridStr+=String.format("%.2f",(rs.getFloat(2)/data_rs.getInt("live_num"))*100)+"%,";
			}	
			gridStr+="\r\n";
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
    response.getWriter().close();
%>
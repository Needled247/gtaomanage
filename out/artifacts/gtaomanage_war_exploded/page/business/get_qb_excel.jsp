<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String qb_hetong=request.getParameter("qb_hetong");	
	String big_id=request.getParameter("big_id");
	String qydate=request.getParameter("qydate");
	String xqtime=request.getParameter("xqtime");
	String ggtime=request.getParameter("ggtime");
	String qb_bs_name=request.getParameter("qb_bs_name");
	String ht_type=request.getParameter("ht_type");
	String isgg=request.getParameter("isgg");
	String isxk=request.getParameter("isxk");
	String isjz=request.getParameter("isjz");
	String jzbrand=java.net.URLDecoder.decode(request.getParameter("jzbrand"), "UTF-8");
	String save_admin=java.net.URLDecoder.decode(request.getParameter("save_admin"), "UTF-8");
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	//System.out.println(qb_hetong+","+big_id+","+qydate+","+xqtime+","+ggtime+","+qb_bs_name+","+ht_type+","+isgg+","+isxk+","+isjz+","+jzbrand);
	
	String temp="";
	
			if(!qb_hetong.equals("")){
				temp+=" and gc.contract_id="+qb_hetong;
			}
			if(!big_id.equals("")){
				temp+=" and gc.big_id="+big_id;
			}
			if(!qydate.equals("")){
				temp+=" and to_char(gc.sign_date,'yyyy-mm')='"+qydate+"'";
			}
			if(!xqtime.equals("")){
				temp+=" and to_char(gc.xq_open_date,'yyyy-mm')='"+xqtime+"'";
			}
			if(!ggtime.equals("")){
				temp+=" and to_char(gc.gg_open_date,'yyyy-mm')='"+ggtime+"'";
			}
			if(!qb_bs_name.equals("")){
				temp+=" and gc.hall_id="+qb_bs_name;
			}
			if(!ht_type.equals("")){
				temp+=" and gc.contract_type="+ht_type;
			}
			if(!isgg.equals("")){
				temp+=" and gc.is_gg="+isgg;
			}
			if(!isxk.equals("")){
				temp+=" and gc.is_xk="+isxk;
			}
			if(!isjz.equals("")){
				temp+=" and gc.is_jz="+isjz;
			}
			if(!jzbrand.equals("")){
				temp+=" and gc.jz_brand like '%"+new String(jzbrand.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!save_admin.equals("")){
				temp+=" and gc.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!startDate.equals("")){
				temp+=" and gc.save_time>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
			}
			if(!endDate.equals("")){
				temp+=" and gc.save_time<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
			}
			if(!temp.equals("")){
				temp=" where"+temp.replaceFirst("^ and", "");
			}
	
	String get_group_sql="select gc.contract_id,count(username) from GTM_MAINFORM_INFO gmf join tbl_users tu on tu.susername=gmf.username and tu.istatus<>-9 right join gtm_contract gc on gc.contract_id=gmf.contract_id"+temp+" group by gc.contract_id,gc.hall_id order by gc.hall_id";
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
		
		gridStr+="合同编号,所属营业厅,虚拟编号,合同名称,合同类型,签约时间,是否新开小区,小区开通时间,是否光改,光改开通时间,是否有竞争,竞争宽带,住户数,光改住户数,用户数,用户占比,录入人,录入时间 \r\n";
		
		rs=st.executeQuery(get_group_sql);
		while(rs.next()){
			data_rs=data_st.executeQuery(get_data_sql+rs.getInt(1));
			data_rs.next();
			gridStr+=data_rs.getInt("contract_id")+",";
			gridStr+=new String(data_rs.getString("name").getBytes("iso-8859-1"),"gbk")+",";
			gridStr+=data_rs.getInt("big_id")+",";
			gridStr+=new String(data_rs.getString("contract_name").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+",";
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
				gridStr+=new String(data_rs.getString("jz_brand").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+",";
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
			gridStr+=new String(data_rs.getString("save_admin").getBytes("iso-8859-1"),"gbk")+", ";	
			gridStr+=data_rs.getString("save_time")+", ";	
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
    out.clear();
    out = pageContext.pushBody();
%>
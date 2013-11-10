<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String menu_txt=request.getParameter("menu_txt");
	String bs_name=request.getParameter("bs_name");
	String get_data_sql="";
	String gridStr="";
	
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	ResultSet rs=null;
	
	if(menu_txt.equals("1")){
			String leaflet_no=request.getParameter("leaflet_no");
			String start_time=request.getParameter("start_time");
			String group_id=request.getParameter("group_id");
			String house_type=request.getParameter("house_type");
			String user_ads=request.getParameter("user_ads");
			user_ads=java.net.URLDecoder.decode(user_ads, "UTF-8");
			String un=request.getParameter("un").toLowerCase();
			//System.out.println(leaflet_no+","+start_time+","+group_id+","+house_type+","+user_ads);
			if(!bs_name.equals("1")){
				get_data_sql="select tu.susername,tui.srealname,ti.sispname,tu.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no from tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf where tu.susername=tui.susername and tu.susername=gmf.username and tu.iispid=ti.iispid and tu.idistid=td.idistid and td.istationid="+bs_name;
			}else{
				get_data_sql="select tu.susername,tui.srealname,ti.sispname,tu.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no from tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf where tu.susername=tui.susername and tu.susername=gmf.username and tu.iispid=ti.iispid and tu.idistid=td.idistid and (td.istationid=1 or td.istationid=2)";
			}
			get_data_sql+=" and tu.istatus<>-9";
			get_data_sql+=" and tu.susername like '"+un+"%'";
			
			if(!leaflet_no.equals("null")){
				get_data_sql+=" and gmf.leaflet_no="+leaflet_no;
			}
			if(!start_time.equals("")){
				get_data_sql+=" and to_char(TU.DFIRSTDATE,'yyyy-mm-dd')='"+start_time+"'";
			}
			if(!group_id.equals("null")){
				get_data_sql+=" and gmf.group_id="+group_id;
			}
			if(!house_type.equals("")){
				get_data_sql+=" and gmf.house_type_id="+house_type;
			}
			if(!user_ads.equals("")){
				get_data_sql+=" and tu.sfeephone like '%"+new String(user_ads.getBytes("gbk"),"iso-8859-1")+"%'";
			}
						
		}else if(menu_txt.equals("2")){
			if(!bs_name.equals("1")){
				get_data_sql="select tu.susername,tui.srealname,ti.sispname,tu.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no from tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf where tu.susername=tui.susername and tu.susername=gmf.username and tu.iispid=ti.iispid and tu.idistid=td.idistid and td.istationid="+bs_name;
			}else{
				get_data_sql="select tu.susername,tui.srealname,ti.sispname,tu.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no from tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf where tu.susername=tui.susername and tu.susername=gmf.username and tu.iispid=ti.iispid and tu.idistid=td.idistid and (td.istationid=1 or td.istationid=2)";
			}
			get_data_sql+=" and tu.istatus<>-9";
			get_data_sql+=" and to_char(TU.DOVERDATE,'yyyy-mm')=to_char(ADD_MONTHS(sysdate,-4),'yyyy-mm')";
		}else if(menu_txt.equals("3")){			
			String ml_type=request.getParameter("ml_type");
			String ymt_start=request.getParameter("ymt_start");
			//System.out.println(ml_type+"-"+ymt_start);
			if(!bs_name.equals("1")){
				get_data_sql="select tu.susername,tui.srealname,ti.sispname,tu.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no from tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf where tu.susername=tui.susername and tu.susername=gmf.username and tu.iispid=ti.iispid and tu.idistid=td.idistid and td.istationid="+bs_name;				
			}else{
				get_data_sql="select tu.susername,tui.srealname,ti.sispname,tu.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no from tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf where tu.susername=tui.susername and tu.susername=gmf.username and tu.iispid=ti.iispid and tu.idistid=td.idistid and (td.istationid=1 or td.istationid=2)";				
			}
			get_data_sql+=" and tu.iispid="+ml_type;
			get_data_sql+=" and TU.DOVERDATE>to_date('"+ymt_start+"','yyyy-mm') and TU.DFIRSTDATE<=to_date('"+ymt_start+"','yyyy-mm')";
		}
		
		gridStr+="<html><head><meta http-equiv='Content-Type' content='text/html;charset=UTF-8'/><title>打印预览</title></head><body>";
		gridStr+="<table align='center' border='0' cellpadding='0' cellspacing='10' width='1000'><tbody>";
		gridStr+="<tr><td>营业厅分组</td><td>宣传单号</td><td>用户账号</td><td>用户姓名</td><td>使用餐型</td><td>启用时间</td><td>截止时间</td><td>详细地址</td></tr>";
		
		rs=st.executeQuery(get_data_sql);
		while(rs.next()){
			if(rs.getString("group_id")!=null){
				gridStr+="<tr><td>"+rs.getString("group_id")+"</td>";
			}else{
				gridStr+="<tr><td></td>";
			}
			if(rs.getString("leaflet_no")!=null){
				gridStr+="<td>"+rs.getString("leaflet_no")+"</td>";
			}else{
				gridStr+="<td></td>";
			}
			if(rs.getString("susername")!=null){
				gridStr+="<td>"+new String(rs.getString("susername").getBytes("iso-8859-1"),"gbk")+"</td>";
			}else{
				gridStr+="<td></td>";
			}
			if(rs.getString("srealname")!=null){
				gridStr+="<td>"+new String(rs.getString("srealname").getBytes("iso-8859-1"),"gbk")+"</td>";
			}else{
				gridStr+="<td></td>";
			}
			if(rs.getString("sispname")!=null){
				gridStr+="<td>"+new String(rs.getString("sispname").getBytes("iso-8859-1"),"gbk")+"</td>";
			}else{
				gridStr+="<td></td>";
			}
			if(rs.getString("dfirstdate")!=null){
				gridStr+="<td>"+rs.getDate("dfirstdate")+"</td>";
			}else{
				gridStr+="<td></td>";
			}
			if(rs.getString("doverdate")!=null){
				gridStr+="<td>"+rs.getDate("doverdate")+"</td>";
			}else{
				gridStr+="<td></td>";
			}
			if(rs.getString("sfeephone")!=null){
				gridStr+="<td>"+new String(rs.getString("sfeephone").getBytes("iso-8859-1"),"gbk")+"</td></tr>";
			}else{
				gridStr+="<td></td></tr>";
			}			
		}
		
		gridStr+="</tbody></table></body></html>";
		
	rs.close();
	st.close();
	conn.close();
	
	response.setContentType("text/html;charset=UTF-8");
	response.getWriter().print(gridStr);
%>
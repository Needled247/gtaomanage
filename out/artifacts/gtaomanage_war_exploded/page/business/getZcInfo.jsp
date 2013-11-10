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
	String zc_bs_name=request.getParameter("zc_bs_name");
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String zc_type=request.getParameter("zc_type");
	//System.out.println(qc_bs_name+","+charge_date+","+receipt_id+","+username+","+charge_type+","+note+","+realname+","+addr);
	
	String get_data_sql="select zt.zc_type_name,zc.zc_id,bi.name,zc.zc_date,zc.zc_note,zc.zc_amount,zc.zc_saveadmin,zc.zc_savetime from gtm_zc_type zt,gtm_business_info bi,gtm_zc_charge zc where zt.zc_type_id=zc.zc_type_id and zc.zc_bs_id=bi.id";
	String get_count_sql="select count(*) from gtm_zc_type zt,gtm_business_info bi,gtm_zc_charge zc where zt.zc_type_id=zc.zc_type_id and zc.zc_bs_id=bi.id";
	String gridStr="";
	int count=0;
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();		
			
			get_data_sql+=" and zc.zc_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and zc.zc_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
			get_count_sql+=" and zc.zc_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss') and zc.zc_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";			
				
			if(!zc_bs_name.equals("")){
				get_data_sql+=" and zc.zc_bs_id="+zc_bs_name;
				get_count_sql+=" and zc.zc_bs_id="+zc_bs_name;
			}
			if(!zc_type.equals("")){
				get_data_sql+=" and zc.zc_type_id="+zc_type;
				get_count_sql+=" and zc.zc_type_id="+zc_type;
			}	
				
		int endPage=Integer.parseInt(startPage)+Integer.parseInt(countPage);
		get_data_sql+=" and rownum<="+endPage+" minus "+get_data_sql+" and rownum<="+startPage;
		
		rs=st.executeQuery(get_count_sql);
			rs.next();
			count=rs.getInt(1);
			if(count!=0){
				rs=st.executeQuery(get_data_sql);
				while(rs.next()){
					gridStr+="{";
					gridStr+="zc_id:'"+rs.getInt("zc_id")+"',";
					gridStr+="zc_bs:'"+new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',";
					if(rs.getDate("zc_date")!=null){
						gridStr+="zc_date:'"+rs.getDate("zc_date")+"',";
					}else{
						gridStr+="zc_date:'',";
					}
					gridStr+="zc_type:'"+new String(rs.getString("zc_type_name").getBytes("iso-8859-1"),"gbk")+"',";
					if(rs.getString("zc_note")!=null){
						gridStr+="zc_note:'"+new String(rs.getString("zc_note").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="zc_note:'',";
					}
					gridStr+="zc_amount:'"+rs.getFloat("zc_amount")+"',";
					if(rs.getString("zc_saveadmin")!=null){
						gridStr+="save_admin:'"+new String(rs.getString("zc_saveadmin").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="save_admin:'',";
					}
					if(rs.getString("zc_savetime")!=null){
						gridStr+="save_time:'"+rs.getString("zc_savetime")+"',";
					}else{
						gridStr+="save_time:'',";
					}
					gridStr+="},";
				}
			}
		
		rs.close();
		st.close();
		conn.close();
		
		gridStr=gridStr.replaceFirst(",$", "");
	
	//System.out.println(gridStr);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{totalCount:"+count+",data:["+gridStr+"]}");
	
%>
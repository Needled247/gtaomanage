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
	String username=request.getParameter("username").toLowerCase();
	String list_name=request.getParameter("list_name");
	list_name=new String(list_name.getBytes("gbk"),"iso-8859-1");	
	
	String get_data_sql="select l.log_id,di.name,l.op_rname,l.op_time,l.op_desc from gtm_department_info di,gtm_log l where l.op_did=di.id and l.list_name='"+list_name+"' and l.op_id='"+username+"'";
	String get_count_sql="select count(*) from gtm_department_info di,gtm_log l where l.op_did=di.id and l.list_name='"+list_name+"' and l.op_id='"+username+"'";
	String gridStr="";
	int count=0;
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
				
		int endPage=Integer.parseInt(startPage)+Integer.parseInt(countPage);
		get_data_sql+=" and rownum<="+endPage+" minus "+get_data_sql+" and rownum<="+startPage;
		
		rs=st.executeQuery(get_count_sql);
			rs.next();
			count=rs.getInt(1);
			if(count!=0){
				rs=st.executeQuery(get_data_sql);
				while(rs.next()){
					gridStr+="{";
					gridStr+="log_id:'"+rs.getInt("log_id")+"',";
					gridStr+="op_did:'"+new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',";
					gridStr+="op_rname:'"+new String(rs.getString("op_rname").getBytes("iso-8859-1"),"gbk")+"',";
					gridStr+="op_time:'"+rs.getString("op_time")+"',";
					String op=new String(rs.getString("op_desc").getBytes("iso-8859-1"),"gbk");
					gridStr+="op_desc:'["+op.split("\\[")[1]+"',";					
					gridStr+="op_type:'"+op.split("\\[")[0]+"'";
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
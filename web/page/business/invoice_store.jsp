<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
    String bs_name = request.getParameter("bs_name");
	String get_data_sql="SELECT INVOICE_ID FROM GTM_INVOICE WHERE BS_ID="+bs_name+" AND USED=0 AND ROWNUM < 6";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	rs=st.executeQuery(get_data_sql);
	String gridStr="";
	
	while(rs.next()){
        int invoice_id = rs.getInt("invoice_id");
		gridStr+="{id:'"+invoice_id+"',name:'"+invoice_id+"'}";
		gridStr+=",";
	}
	
	rs.close();
	st.close();
	conn.close();
	gridStr=gridStr.replaceFirst(",$", "");
	//System.out.println(gridStr);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("["+gridStr+"]");
	
%>
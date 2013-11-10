<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	int did=(Integer)session.getAttribute("did");
	int rid=(Integer)session.getAttribute("rid");
	String sql="select root,interface from gtm_root_info where id="+rid;
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	rs=st.executeQuery(sql);
	String rt="";
	String itf="";
	if(rs.next()){
		rt=rs.getString("root");
		itf=rs.getString("interface");
	}
	
	rs.close();
	st.close();
	conn.close();
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{rt:'"+rt+"',itf:'"+itf+"',bs_did:'"+did+"'}");
	
%>
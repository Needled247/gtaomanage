<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.io.FileInputStream"%>

<%	
	String param = request.getParameter("param");
	application.setAttribute("msg", param);	
	//if(application.getAttribute("msg") == null){
		//application.setAttribute("msg","111");
	//}
	System.out.println("设置"+param);
	//response.setContentType("text/json;charset=UTF-8");
	//response.getWriter().print("");
%>
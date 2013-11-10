<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%
	int did=(Integer)session.getAttribute("did");
	//if(did<600){
		response.sendRedirect("business/main_business.jsp");
	//}else if(did==601){
		//response.sendRedirect("business/mb_admin.jsp");
	//}else if(did==666){
		//response.sendRedirect("main_all.jsp");
	//}
 %>

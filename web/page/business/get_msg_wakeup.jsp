<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%
	String state="0";
	String t="";
	String toBS=(String)session.getAttribute("name");
	if(application.getAttribute(toBS)!=null){
		t=(String)application.getAttribute(toBS);
		application.removeAttribute(toBS);
		state="1";
	}
		
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{state:"+state+",t:'"+t+"'}");
%>
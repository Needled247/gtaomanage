<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String user=request.getParameter("user");
	String pwd=request.getParameter("pwd");
	String code=request.getParameter("code");
	String certCode=String.valueOf(session.getAttribute("certCode"));
	String errorMsg="";
	
	if(!code.equals(certCode)){
		errorMsg="c";
	}
	
	System.out.println(user+" "+pwd+" "+code);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{\"error\":\""+errorMsg+"\"}");
%>
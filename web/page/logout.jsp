<%@ page language="java" pageEncoding="UTF-8"%>
<%
	session.removeAttribute("did");
	response.sendRedirect("../login.jsp");
%>
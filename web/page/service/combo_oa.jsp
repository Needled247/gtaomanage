<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%
	String comboStr="{id:'1',name:'是'},{id:'0',name:'否'}";
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{combo:["+comboStr+"]}");
%>
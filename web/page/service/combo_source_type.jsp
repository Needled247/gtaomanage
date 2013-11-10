<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%
	String comboStr="{id:'1',name:'有资源'},{id:'0',name:'无资源'}";
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{combo:["+comboStr+"]}");
%>
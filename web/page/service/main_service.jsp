<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="tools.Tools"%>
<%
	//session.setAttribute("test", "hello");
	//application.setAttribute("test", "hello");
	
 %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><%=Tools.getPropertiesValue("title") %></title>
	<link rel="stylesheet" type="text/css" href="../../js/extjs/resources/css/ext-all.css">
	<link rel="stylesheet" type="text/css" href="../../js/extjs/resources/css/ext-patch.css">
	
	
	<style type="text/css">
		img.list{
			cursor:pointer;
			cursor:hand
		}
		p {
    		margin:0 0 3 5;
		}
		.service {
    		background-image:url(../../image/service.gif);
		}
		.user {
    		background-image:url(../../image/user.gif);
		}
	</style>
	
	<script type="text/javascript" src="../../js/extjs/ext-all.js"></script>
  	<script type="text/javascript" src="../../js/extjs/ext-lang-zh_CN.js"></script>
  	<script type="text/javascript" src="../../js/main_service.js"></script>
  	<script type="text/javascript" src="../../js/app.js"></script>
  	<script type="text/javascript">
	
	//setInterval("CollectGarbage();", 10000);
	
	//Ext.require(['*']);
	
	
    </script>
</head>
<body>
    <!-- use class="x-hide-display" to prevent a brief flicker of the content -->
    <div id="north" class="x-hide-display">
		<img src="../../image/logo.gif">
	</div>
	<div id="west_service" class="x-hide-display">
		<div style="margin-top:6px;"></div>
        <p><img src="../../image/service_ask.gif" class="list" id="service_ask"></p>
        <p><img src="../../image/service_problem.gif" class="list" id="service_problem"></p>
    </div>
</body>
</html>


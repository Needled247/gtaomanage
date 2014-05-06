<%@ page language="java" import="tools.Tools" pageEncoding="UTF-8"%>
<%
	int did=(Integer)session.getAttribute("did");
	if(did!=666){
		response.sendRedirect("../../login.jsp");
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>   
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><%=Tools.getPropertiesValue("title") %></title>
	<link rel="stylesheet" type="text/css" href="../../js/extjs/resources/css/ext-all.css">
	<link rel="stylesheet" type="text/css" href="../../js/extjs/resources/css/ext-patch.css">
	<link rel="stylesheet" type="text/css" href="../../css/example.css">
	<style type="text/css">
		img.list{
			cursor:pointer;
			cursor:hand;
			width: 157px;
			height: 30px;
		}
		p {
    		margin:0 0 3 5;
		}
		.mf {
    		background-image:url(../../image/mf_icon.png);
		}
		.etc {
    		background-image:url(../../image/etc.png);
		}
		.work {
    		background-image:url(../../image/user.gif);
		}
	</style>
	
	<script type="text/javascript" src="../../js/extjs/ext-all.js"></script>
	<script type="text/javascript" src="../../js/extjs/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="../../js/mb_admin.js"></script>
	<script type="text/javascript" src="../../js/RowExpander.js"></script>
	<script type="text/javascript" src="../../js/examples.js"></script>
	<script type="text/javascript" src="../../js/app.js"></script>
  	<script type="text/javascript">
	
	//setInterval("CollectGarbage();", 10000);
	
	//Ext.require(['*']);
	
	
    </script>
</head>
<body>
    <!-- use class="x-hide-display" to prevent a brief flicker of the content -->
    <div id="north" class="x-hide-display">
		<img src="../../image/logo.png" width="270" height="40">
	</div>
	<div id="mf_div" class="x-hide-display">
        <div style="margin-top:6px;"></div>
        <p><img src="../../image/mfsave_btn.gif" class="list" id="mfsave_btn"></p>
        <p><img src="../../image/mfquery_btn.gif" class="list" id="mfquery_btn"></p>
    </div>
    <div id="version_info" class="x-hide-display">
		<img src="../../image/ttt.gif">
	</div>
</body>
</html>


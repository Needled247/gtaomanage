<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>观滔可控管理软件v1.0</title>
	<link rel="stylesheet" type="text/css" href="../js/extjs/resources/css/ext-all.css">
	<link rel="stylesheet" type="text/css" href="../js/extjs/resources/css/ext-patch.css">
	
	<style type="text/css">
		img.list{
			cursor:pointer;
			cursor:hand
		}
		p {
    		margin:5px;
		}
		.settings {
    		background-image:url(../shared/icons/fam/folder_wrench.png);
		}
		.nav {
    		background-image:url(../shared/icons/fam/folder_go.png);
		}
		.info {
    		background-image:url(../shared/icons/fam/information.png);
		}
	</style>
	
	<script type="text/javascript" src="../js/extjs/ext-all.js"></script>
	<script type="text/javascript" src="../js/main_business.js"></script>
  	<script type="text/javascript">
	
	//setInterval("CollectGarbage();", 10000);
	
	//Ext.require(['*']);
	
	
    </script>
</head>
<body>
    <!-- use class="x-hide-display" to prevent a brief flicker of the content -->
    <div id="north" class="x-hide-display">
		<img src="../image/logo.gif" style="margin-top: 15">
	</div>
	<div id="west_business" class="x-hide-display">
        <p><img src="../image/a1.png" class="list" id="a1"></p>
		<p><img src="../image/a2.png" class="list" id="a2"></p>
		<p><img src="../image/a3.png" class="list" id="a3"></p>
    </div>
	<div id="west_service" class="x-hide-display">
        <p><img src="../image/a1.png" class="list" id="a1"></p>
    </div>
</body>
</html>


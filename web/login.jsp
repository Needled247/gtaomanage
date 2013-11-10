<%@page language="java" import="tools.Tools" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><%=Tools.getPropertiesValue("title") %></title>
<style type="text/css">
		body {
/* 		  background-color: #d5e4f2; */
/*		  background: url('image/bj.gif');*/
/* 	  	  color:#383838; */
		}
		table.formbg {
		  background:url(image/login_form.png);
		  width:510px;
		  height:255px;
		  margin-top:14%;
		}
		input,button,select,textarea{outline:none} /*去掉谷歌浏览器黄色边框*/
		textarea{resize:none} /*不能拖放textarea大小*/
		input.user,input.pwd,input.code {
		  border:0px;
		  font-family:微软雅黑;
		  height:34px;
		  margin-left:100px;
		  padding:6px 11px;
		}
		input.user,input.pwd {
		  width:210px;
		  background: url('image/textbox.png') no-repeat left top;		  
		}
		input.user {
		  margin-top:58px;
		  margin-bottom:5px;
		}
		input.pwd {
		  margin-bottom:5px;
		}
		input.code {
		  margin-bottom:10px;
		  width:100px;
		  background: url('image/textbox_code.png') no-repeat left top;
		}
		input.imgCode,input.btn {
		  border:0px;
		  cursor:pointer;
		  cursor:hand;
		}
		input.imgCode {
		  margin-bottom:13px;
		  width: 96px;
		  height:28px;
		  background: url('tools/makeCertPic.jsp') no-repeat left top;
/* 		  ime-mode:disabled; */
/* 		  user-select: none;  */
/* 		  -khtml-user-select: none;  */
/* 		  -moz-user-select: none; */
		}
		input.btn {
			margin-left:205px;
			background:url(image/login_btn.gif);
			width:100px;
			height:42px;
		}
	</style>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/md5.js"></script>
	<script type="text/javascript" src="js/login_form.js"></script>
   </head>
<body>
<form method="post" action="" name="login_form" id="login_form">
<table cellspacing="0" cellpadding="0" align="center" class="formbg">
      <tr>
        <td><input type="text" name="user" id="user" value="" maxlength="18" class="user" onkeydown="enter(event)"/></td>
      </tr>
      <tr>
        <td><input type="password" name="pwd" id="pwd" value="" maxlength="12" class="pwd" onkeydown="enter(event)"/></td>
      </tr>
      <tr>
        <td>
        	<input type="text" name="code" id="code" value="" maxlength="4" class="code" onkeydown="enter(event)"/>
        	<input type="text" id="imgCode" name="imgCode" value="" class="imgCode" title="看不清楚,换一张" readonly="readonly" onfocus="mouseBlur()" onclick="reloadcode()"/>
        </td>  
      </tr>
      <tr>
      	<td><input type="button" value="" onclick="verify()" class="btn"/></td>
      </tr>
      <tr><td>&nbsp;</td></tr>
</table>
</form>
</body>
</html>
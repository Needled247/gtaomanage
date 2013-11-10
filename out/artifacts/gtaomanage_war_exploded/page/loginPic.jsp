<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
　　<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<style type="text/css">
		body {
		  background-color: #ededed;
		}
		table.formbg {
		  background:url(../image/login_form.gif);
		  width:510px;
		  height:255px;
		  margin-top:11%;
		}
		input.user,input.pwd,input.code {
		  border:0px;
		  font-family:微软雅黑;
		  height:30px;
		  margin-left:105px;
		  padding:5px 11px;
		}
		input.user,input.pwd {
		  width:210px;
		  background: url('../image/textbox.gif') no-repeat left top;		  
		}
		input.user {
		  margin-top:58px;	
		}
		input.pwd {
		  margin-top:6px;		  
		}
		input.code {
		  width:100px;
		  margin-top:9px;
		  background: url('../image/textbox_code.gif') no-repeat left top;
		}
		input.imgCode,input.btn {
		  border:0px;
		  cursor:pointer;
		  cursor:hand;
		}
		input.imgCode {
		  width: 96px;
		  height:29px;		  
		  background: url('makeCertPic.jsp') no-repeat left top;
		}
		input.btn {
			margin-left:205px;
			margin-top:10px;
			background:url(../image/login_btn.gif);
			width:100px;
			height:42px;
		}
	</style>
	<script type="text/javascript" src="../js/jquery.js"></script>
	<script type="text/javascript" src="../js/md5.js"></script>
	<script type="text/javascript" src="../js/login_form.js"></script>
   </head>
<body>
<form method="post" action="" name="login_form" id="login_form">
<table cellspacing="0" cellpadding="0" align="center" class="formbg">
      <tr>
        <td><input type="text" name="user" id="user" value="" maxlength="12" class="user"/></td>
      </tr>
      <tr>
        <td><input type="password" name="pwd" id="pwd" value="" maxlength="16" class="pwd"/></td>
      </tr>
      <tr>
        <td>
        	<input type="text" name="code" id="code" value="" maxlength="4" class="code" />
        	<input type="button" id="imgCode" name="imgCode" value="" class="imgCode" title="看不清楚,换一张" onclick="reloadcode()"/>
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
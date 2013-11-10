<%@ page language="java" import="tools.Tools" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>   
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><%=Tools.getPropertiesValue("title") %></title>
	<link rel="stylesheet" type="text/css" href="../js/extjs/resources/css/ext-all.css">
	<link rel="stylesheet" type="text/css" href="../js/extjs/resources/css/ext-patch.css">
	<style>
		body {
			 font-family: helvetica, tahoma, verdana, sans-serif;
			 padding: 20px;
			 padding-top: 32px;
			 font-size: 13px;
			 background-color: #fff !important;
		}
	</style>
	<script type="text/javascript" src="../js/extjs/ext-all.js"></script>
	<script type="text/javascript" src="../js/extjs/ext-lang-zh_CN.js"></script>
	<script type="text/javascript">

MsgTip = function(){
    var msgCt;
    function createBox(t, s){
        return ['<div class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc" style="font-family:微软雅黑;"><font style="font-size:16px;font-weight:bold;">', t, '&nbsp;',Ext.Date.format(new Date(),"Y-m-d H:i:s"),'</font><br><div align="center" style="margin-top:4;margin-bottom:4;"><font color="#8B0000" style="font-size:15px;font-weight:bold;">', s, '</font></div><div style="text-align:right;font-size:12px; width:100%;"><font color="blank"><u style="cursor:hand;" onclick="MsgTip.hide(this);">关闭</u></div></span></div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }
    return {
        msg : function(title, message,autoHide,pauseTime){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div22',style:'position:absolute;top:10px;width:300px;margin:0 auto;z-index:20000;'}, true);
            }
            msgCt.alignTo(document, 't-t');
            //给消息框右下角增加一个关闭按钮
            //message+='<br><span style="text-align:right;font-size:12px; width:100%;"><font color="blank"><u style="cursor:hand;" onclick="MsgTip.hide(this);">关闭</u></font></span>';
            var m = Ext.DomHelper.append(msgCt, {html:createBox(title, message)}, true);
            m.slideIn('t');
            if(!Ext.isEmpty(autoHide)&&autoHide==true){
             if(Ext.isEmpty(pauseTime)){
              pauseTime=5000;
             }
             m.pause(pauseTime).ghost("tr", {remove:true});
            }
        },
        hide:function(v){
         var msg=Ext.get(v.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);
         msg.ghost("tr", {remove:true});
        }
    };
}();
Ext.onReady(function(){
 
 var btn=new Ext.Button({
  text:'不自动隐藏',
  width:80,
  renderTo:Ext.getBody(),
  handler:function(){
    MsgTip.msg('消息提示 : ', '收到新的报装信息 , 请进行确认');
  }
 });
 
 var btn2=new Ext.Button({
  text:'自动隐藏',
  width:80,
  renderTo:Ext.getBody(),
  handler:function(){
    MsgTip.msg('消息', '使用默认值5秒自动隐藏',true);
  }
 });
 
 var btn3=new Ext.Button({
  text:'设置自动隐藏时间',
  width:80,
  renderTo:Ext.getBody(),
  handler:function(){
    MsgTip.msg('消息', '设置10秒后自动隐藏',true,10);
  }
 });
});   
</script>
 </head>
 <body>
 </body>
</html>
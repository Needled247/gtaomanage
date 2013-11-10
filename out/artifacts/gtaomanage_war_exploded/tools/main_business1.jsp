<%@ page language="java" import="tools.Tools" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>   
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><%=Tools.getPropertiesValue("title") %></title>
	<link rel="stylesheet" type="text/css" href="../js/extjs/resources/css/ext-all.css">
	<link rel="stylesheet" type="text/css" href="../js/extjs/resources/css/ext-patch.css">
	<script type="text/javascript" src="../js/extjs/ext-all.js"></script>
	<script type="text/javascript" src="../js/extjs/ext-lang-zh_CN.js"></script>
	<script type="text/javascript">
		 Ext.onReady(function () {
            var eBody = Ext.getBody();

            //短消息窗基本配置
            var msgWinConfig = { width: 300, height: 200 };
            var openMsgWinConfig = { width: 53, height: 40 };

            var openMsgWin = new Ext.Window({
                closable: false, shadow: false, resizable: false, x: eBody.getWidth() - openMsgWinConfig.width, y: eBody.getHeight() - openMsgWinConfig.height,
                width: openMsgWinConfig.width, height: openMsgWinConfig.height
                , items: [{ xtype: 'button', text: '打开', layout: 'fit', handler: function () { msgWin.flyIn(); } }]
                , flyIn: function () {
                    var myWin = openMsgWin;
                    myWin.show();
                    myWin.getEl().shift({ x: eBody.getWidth() - myWin.getWidth(), y: eBody.getHeight() - myWin.getHeight() });
                }
                , flyOut: function () {
                    if (!this.isVisible()) { return; }
                    var myWin = openMsgWin;
                    myWin.getEl().shift({ x: eBody.getWidth() - myWin.getWidth(), y: eBody.getHeight() });
                }
            });


            var msgWin = new Ext.Window({
                resizable: false,
                x: eBody.getWidth() - msgWinConfig.width, y: eBody.getHeight(), width: msgWinConfig.width, height: msgWinConfig.height, shadow: false
                , items:
                [

                ]
                , listeners: {
                    beforeclose: function () {
                        var win = this;
                        win.flyOut();
                        return false;
                    }
                }
                , flyIn: function () {
                    var myWin = this;
                    myWin.show();
                    myWin.getEl().shift({
                        x: eBody.getWidth() - myWin.getWidth(),
                        y: eBody.getHeight() - myWin.getHeight(),
                        opacity: 80,
                        easing: 'easeOut',
                        duration: .35
                    });
                    openMsgWin.flyOut();
                    myWin.isFlyIn = true;
                }
                , flyOut: function () {
                    var myWin = this;
                    myWin.getEl().shift({
                        y: eBody.getHeight()
                    });
                    openMsgWin.flyIn();
                    myWin.isFlyIn = false;
                }
                //自动设置位置
                , autoPosition: function () {
                    if (this.isFlyIn) { this.flyIn(); } else { this.flyOut(); }
                }
            });

            Ext.EventManager.onWindowResize(function () {
                msgWin.autoPosition();
            });

            msgWin.flyIn();
        });
	</script>
 </head>
 <body>
 </body>
</html>
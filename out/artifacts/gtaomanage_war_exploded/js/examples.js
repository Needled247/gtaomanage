Ext.example = function(){
    var msgCt;
    function createBox(t, s){
    	if(Ext.get('msgCt')!=null){
        	Ext.example.hide();
    	}
    	return ['<div id="msgCt" class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc" style="font-family:微软雅黑;"><font style="font-size:15px;font-weight:bold;margin-left:20;">', t, '</font><br><div align="center" style="margin-top:4;margin-bottom:4;"><img src="../../image/msg.png" style="float:left;margin-left:5;"><font color="#8B0000" style="margin-right:10;font-size:15px;font-weight:bold;">', s, '</font></div><div style="text-align:right;font-size:12px; width:100%;"><font color="blank"><u style="cursor:hand;cursor:pointer;" onclick="Ext.example.hide();">关闭</u></div></span></div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }
    return {
    	msg : function(title, message,autoHide,pauseTime){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div22',style:'position:absolute;top:10px;width:300px;margin:0 auto;z-index:20000;'}, true);
            }
            msgCt.alignTo(document, 't-t');
            var m = Ext.DomHelper.append(msgCt, {html:createBox(title, message)}, true);
            m.slideIn('t');
        },
        hide:function(){
        	var msg=Ext.get('msgCt');
//        	msg.ghost("tr", {remove:true});
        	msg.remove();
        }
    };
}();
//Ext.require([
//    'My.center_panelB_ask'
//]);

function fn(){	

		Ext.QuickTips.init();

        //Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
		
        Ext.create('Ext.Viewport', {
            id: 'viewport',
            layout: 'border',
            items: [
            	
				Ext.create('My.toolbar_north'),
            
            	Ext.create('My.tree_westBA'),
            
            	Ext.create('My.save_mainform')
			]
			
			/*destroy:function (){//销毁tabpanel
                                    if(this.fireEvent("destroy",this)!=false){
                                        this.el.remove();
                                        vp = null;
                                        
                                        if(Ext.isIE){
                                            CollectGarbage();
                                        }
                                    }
                                }*/

        });
        
//        Ext.get("a1").on('click', function(){
//        	center_ask.hide();
//        	if(center_ask.isHidden()){
//        		center_ask.hide();
//        	}
//        });
        
}

Ext.onReady(fn);

//Ajax读取消息提醒
function msg_wakeup(){
    	Ext.Ajax.request({
		    url: 'get_msg_wakeup.jsp',
		    params: {
		        param: 1
		    },
		    success: function(response){
		    	var results = Ext.JSON.decode(response.responseText);
		        if(results.msg!=""){
		        	Ext.Msg.show({
					    title: '短信息提示',
					    msg: '<span style="font-size:15px;font-family:微软雅黑;margin-left:5;">收到新的报装信息 , 请进行确认</span>',
					    width: 300,
					    buttons: Ext.Msg.OK,
					    icon: Ext.Msg.INFO
					});
//					待写清空application代码
//		        	alert('<span style="font-size:18px;font-family:微软雅黑;color:#39F;">收到未处理信息</span>');
		        }
//		        Ext.example.msg('消息提示' , text);
		    }
		});
}
		
//		self.setInterval("msg_wakeup()" , 5000);
    
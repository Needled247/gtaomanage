//Ext.require([
//    'Ext.form.*',
//    'Ext.data.*',
//    'Ext.util.*',
//    'Ext.Viewport'
//]);
function fn(){	

		Ext.QuickTips.init();

        //Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
		
        var vp = Ext.create('Ext.Viewport', {
            id: 'viewport',
            layout: 'border',
            items: [
                    
                Ext.create('My.toolbar_north'),
                    
                Ext.create('My.tree_westS'),
                
            	Ext.create('My.center_panelS_query')
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
        
        Ext.get("service_ask").on('click', function(){
        	center_ask.hide();
        	if(center_ask.isHidden()){
        		center_ask.hide();
        	}
        });
        
}

Ext.onReady(fn);

		//Ajax写入消息提醒
function msg_wakeup(){
    	Ext.Ajax.request({
		    url: 'msg_wakeup.jsp',
		    params: {
		        param: 3
		    },
		    success: function(response){
		        var text = response.responseText;
		        
		    }
		});
}
		
		//self.setInterval("msg_wakeup()" , 1000);
		msg_wakeup();
    
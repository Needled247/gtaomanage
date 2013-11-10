//Ext.require([
//    'My.center_panelB_ask'
//]);

function fn(){	

		Ext.QuickTips.init();

        //Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
		
		Ext.Ajax.request({
		    url: 'get_dp.jsp',
		    success: function(response){
		    	var results = Ext.JSON.decode(response.responseText);
		    	var rs_itf=results.itf.split(',');
		    	Ext.bs_did=results.bs_did;		    	
		    	Ext.create('Ext.Viewport', {
            		id: 'viewport',
            		layout: 'border',
            		items: [
						Ext.create('My.toolbar_north'),
            			Ext.create('My.tree_westB'),
            			Ext.create(rs_itf[0])
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
		    	
		    	for(i=1;i<rs_itf.length;i++){
        			Ext.getCmp(rs_itf[i]).show();
        		}
        		if(Ext.getCmp('bs_name').isHidden()){
					Ext.getCmp('bs_name').setValue(Ext.bs_did);
					var params=Ext.data.StoreManager.lookup('hetong').getProxy().extraParams;
				    params['bs_id']=Ext.bs_did;
				    Ext.data.StoreManager.lookup('hetong').load();
				}else{
				    Ext.data.StoreManager.lookup('hetong').load();
				}
        		var rs=results.rt.split('|');
        		var rs_one=rs[0].split(',');
        		Ext.rs_two=rs[1].split(',');
        		for(i=0;i<rs_one.length;i++){
        			Ext.getCmp(rs_one[i]).show();
        		}
        		
		    }
		});
		
        
//        Ext.get("a1").on('click', function(){
//        	center_ask.hide();
//        	if(center_ask.isHidden()){
//        		center_ask.hide();
//        	}
//        });
        
}

Ext.onReady(fn);


		
		
    
Ext.define('My.tree_westB', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
    	
    	Ext.define('bs_name', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'}
		     ]
		 });

		 Ext.create('Ext.data.Store', {
			 model: 'bs_name',
			 storeId: 'bs_name',
		     proxy: {
		         type: 'ajax',
		         url: 'get_bs_name.jsp',
		         reader: {
		             type: 'json'
		         }
		     },
		     autoLoad: true
		 });
		 
		 Ext.define('charge_type1', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'}
		     ]
		 });

		 Ext.create('Ext.data.Store', {
			 model: 'charge_type1',
			 storeId: 'charge_type1',
		     proxy: {
		         type: 'ajax',
		         url: 'get_charge_type.jsp',
		         reader: {
		             type: 'json'
		         }
		     },
		     autoLoad: true
		 });

        Ext.define('charge_type2', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'name', type: 'string'}
            ]
        });

        Ext.create('Ext.data.Store', {
            model: 'charge_type2',
            storeId: 'charge_type2',
            proxy: {
                type: 'ajax',
                url: '',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: false
        });

        Ext.define('charge_type3', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'name', type: 'string'}
            ]
        });

        Ext.create('Ext.data.Store', {
            model: 'charge_type3',
            storeId: 'charge_type3',
            proxy: {
                type: 'ajax',
                url: '',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: false
        });

        Ext.define('charge_type4', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'name', type: 'string'}
            ]
        });

        Ext.create('Ext.data.Store', {
            model: 'charge_type4',
            storeId: 'charge_type4',
            proxy: {
                type: 'ajax',
                url: '',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: false
        });
		 
		 Ext.define('ml_type', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'}
		     ]
		 });

		 Ext.create('Ext.data.Store', {
			 model: 'ml_type',
			 storeId: 'ml_type',
		     proxy: {
		         type: 'ajax',
		         url: 'get_ml_type.jsp',
		         reader: {
		             type: 'json'
		         }
		     },
		     autoLoad: true
		 });
		 
		 Ext.define('hetong', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'}
		     ]
		 });

		 Ext.create('Ext.data.Store', {
			 model: 'hetong',
			 storeId: 'hetong',
		     proxy: {
		         type: 'ajax',
		         actionMethods : {
   		        read : 'POST'
   		     },
		         url: 'get_hetong.jsp',
		         extraParams:{
		        	bs_id:'' 
		         },
		         reader: {
		             type: 'json'
		         }
		     },
		     autoLoad: false
		 });
		 
		 Ext.define('gm_type', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'}
		     ]
		 });

		 Ext.create('Ext.data.Store', {
			 model: 'gm_type',
			 storeId: 'gm_type',
		     proxy: {
		         type: 'ajax',
		         url: 'get_gm_type.jsp',
		         reader: {
		             type: 'json'
		         }
		     },
		     autoLoad: true
		 });
		 
		 Ext.define('pay_type', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'}
		     ]
		 });

		 Ext.create('Ext.data.Store', {
			 model: 'pay_type',
			 storeId: 'pay_type',
		     proxy: {
		         type: 'ajax',
		         url: 'get_pay_type.jsp',
		         reader: {
		             type: 'json'
		         }
		     },
		     autoLoad: true
		 });
		 
		 Ext.define('zc_type', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'}
		     ]
		 });

		 Ext.create('Ext.data.Store', {
			 model: 'zc_type',
			 storeId: 'zc_type',
		     proxy: {
		         type: 'ajax',
		         url: 'get_zc_type.jsp',
		         reader: {
		             type: 'json'
		         }
		     },
		     autoLoad: true
		 });
		 
		 Ext.define('gg_state', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'}
		     ]
		 });

		 Ext.create('Ext.data.Store', {
			 model: 'gg_state',
			 storeId: 'gg_state',
		     proxy: {
		         type: 'ajax',
		         url: 'get_gg_state.jsp',
		         reader: {
		             type: 'json'
		         }
		     },
		     autoLoad: true
		 });

        Ext.define('net_prop', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'name', type: 'string'}
            ]
        });

        Ext.create('Ext.data.Store', {
            model: 'net_prop',
            storeId: 'net_prop',
            proxy: {
                type: 'ajax',
                url: 'get_net_prop.jsp',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });

        Ext.define('old_net_prop', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'name', type: 'string'}
            ]
        });

        Ext.create('Ext.data.Store', {
            model: 'old_net_prop',
            storeId: 'old_net_prop',
            proxy: {
                type: 'ajax',
                url: 'get_oldnet_prop.jsp',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });

        Ext.define('user_prop', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'name', type: 'string'}
            ]
        });

        Ext.create('Ext.data.Store', {
            model: 'user_prop',
            storeId: 'user_prop',
            proxy: {
                type: 'ajax',
                url: 'get_user_prop.jsp',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
		 
		 Ext.define('huodong', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'}
		     ]
		 });

		 Ext.create('Ext.data.Store', {
			 model: 'huodong',
			 storeId: 'huodong',
		     proxy: {
		         type: 'ajax',
		         url: 'get_huodong.jsp',
		         reader: {
		             type: 'json'
		         }
		     },
		     autoLoad: true
		 });
		 
		 Ext.define('huodong_sub', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'},
		         {name: 'huodong_id', type: 'string'}
		     ]
		 });

		 Ext.create('Ext.data.Store', {
			 model: 'huodong_sub',
			 storeId: 'huodong_sub',
		     proxy: {
		         type: 'ajax',
		         url: 'get_huodong_sub.jsp',
		         reader: {
		             type: 'json'
		         }
		     },
		     autoLoad: true
		 });
    	
        Ext.apply(this, {
            
        	region: 'west',
//            stateId: 'navigation-panel',
            id: 'west-panelB', // see Ext.getCmp() below
//            title: '导航窗口',
            title: '功能管理列表',
            icon: '../../image/mf_icon.png',
            scale: 'small',
            frame: true,
            split: true,
            width: 160,
            minWidth: 160,
            maxWidth: 160,
            collapsible: true,
            animCollapse: false,
            autoScroll: true,
            margins: '0 0 5 5',
//            layout: {
//            	type:'accordion',
//            	hideCollapseTool:true
//            },          
//            items: [{
//                title: '功能管理列表',
//                icon: '../../image/mf_icon.png', 
                items:[{
                	id:'B1',
                	hidden:true,
	            	xtype:'button',
	            	width:150,
					text: '&nbsp;&nbsp;用户主要信息',
					textAlign: 'left',
					icon: '../../image/save_btn1.png',
					scale: 'medium',
					handler: function(){
						if(Ext.getCmp('base_query_mfA')==undefined){
							Ext.getCmp('viewport').remove('setup_ask');
							Ext.getCmp('viewport').remove('query_buildinfo');
							Ext.getCmp('viewport').remove('query_charge');
							Ext.getCmp('viewport').remove('income_count');
							Ext.getCmp('viewport').remove('query_zzsale');
							Ext.getCmp('viewport').remove('setup_debug');
							Ext.getCmp('viewport').remove('home_service');
							Ext.getCmp('viewport').remove('zc_charge');
							Ext.getCmp('viewport').add(Ext.create('My.base_query_mfA'));
							setSubBtns(['addmf','bs_name','ex_fn','admin_fn']);
							if(Ext.getCmp('bs_name').isHidden()){
								Ext.getCmp('bs_name').setValue(Ext.bs_did);
							}
						}
					}
				},{
                    //TODO:子菜单
					id:'C1',
					hidden:true,
	            	xtype:'button',
	            	width:150,
					text: '&nbsp;&nbsp;营业厅收费信息',
					textAlign: 'left',
					icon: '../../image/rmb.png',
					scale: 'medium',
					handler: function(){
						if(Ext.getCmp('query_charge')==undefined){
							Ext.getCmp('viewport').remove('setup_ask');
							Ext.getCmp('viewport').remove('query_buildinfo');
							Ext.getCmp('viewport').remove('base_query_mfA');
							Ext.getCmp('viewport').remove('income_count');
							Ext.getCmp('viewport').remove('query_zzsale');
							Ext.getCmp('viewport').remove('setup_debug');
							Ext.getCmp('viewport').remove('home_service');
							Ext.getCmp('viewport').remove('zc_charge');
							Ext.getCmp('viewport').add(Ext.create('My.query_charge'));
							setSubBtns(['addmf','bs_name','admin_fn','ex_fn']);
							if(Ext.getCmp('bs_name').isHidden()){								
								Ext.getCmp('bs_name').setValue(Ext.bs_did);								
							}
						}
					}
				},{
					id:'J1',
					hidden:true,
	            	xtype:'button',
	            	width:150,
					text: '&nbsp;&nbsp;营业厅支出信息',
					textAlign: 'left',
					icon: '../../image/zc.png',
					scale: 'medium',
					handler: function(){
						if(Ext.getCmp('zc_charge')==undefined){
							Ext.getCmp('viewport').remove('setup_ask');
							Ext.getCmp('viewport').remove('query_buildinfo');
							Ext.getCmp('viewport').remove('base_query_mfA');
							Ext.getCmp('viewport').remove('income_count');
							Ext.getCmp('viewport').remove('query_charge');
							Ext.getCmp('viewport').remove('query_zzsale');
							Ext.getCmp('viewport').remove('setup_debug');
							Ext.getCmp('viewport').remove('home_service');
							Ext.getCmp('viewport').add(Ext.create('My.zc_charge'));
							setSubBtns(['addmf','bs_name','admin_fn','ex_fn']);
							if(Ext.getCmp('bs_name').isHidden()){								
								Ext.getCmp('bs_name').setValue(Ext.bs_did);								
							}
						}
					}
				},{
					id:'E1',
					hidden:true,
					xtype:'button',
					width:150,
					text: '&nbsp;&nbsp;楼宇覆盖信息',
					textAlign: 'left',
					icon: '../../image/add_contract.png',
					scale: 'medium',
					handler: function(){
						if(Ext.getCmp('query_buildinfo')==undefined){
							Ext.getCmp('viewport').remove('setup_ask');
							Ext.getCmp('viewport').remove('query_charge');
							Ext.getCmp('viewport').remove('base_query_mfA');
							Ext.getCmp('viewport').remove('income_count');
							Ext.getCmp('viewport').remove('query_zzsale');
							Ext.getCmp('viewport').remove('setup_debug');
							Ext.getCmp('viewport').remove('home_service');
							Ext.getCmp('viewport').remove('zc_charge');
							Ext.getCmp('viewport').add(Ext.create('My.query_buildinfo'));
							setSubBtns(['addmf','bs_name','admin_fn','ex_fn']);
							if(Ext.getCmp('bs_name').isHidden()){
								Ext.getCmp('bs_name').setValue(Ext.bs_did);
							}
						}
					}
				},{
					id:'G1',
					hidden:true,
	            	xtype:'button',
	            	width:150,
					text: '&nbsp;&nbsp;社区收入统计',
					textAlign: 'left',
					icon: '../../image/income_count.png',
					scale: 'medium',
					handler: function(){
						if(Ext.getCmp('income_count')==undefined){
							Ext.getCmp('viewport').remove('setup_ask');
							Ext.getCmp('viewport').remove('query_charge');
							Ext.getCmp('viewport').remove('base_query_mfA');
							Ext.getCmp('viewport').remove('query_buildinfo');
							Ext.getCmp('viewport').remove('query_zzsale');
							Ext.getCmp('viewport').remove('setup_debug');
							Ext.getCmp('viewport').remove('home_service');
							Ext.getCmp('viewport').remove('zc_charge');
							Ext.getCmp('viewport').add(Ext.create('My.income_count'));
							setSubBtns(['bs_name','ex_fn']);
							if(Ext.getCmp('bs_name').isHidden()){
								Ext.getCmp('bs_name').setValue(Ext.bs_did);
								Ext.getCmp('reset_btn').hide();
							}
						}
					}
				},{
					id:'F1',
					hidden:true,
						xtype:'button',
						width:150,
						text: '&nbsp;&nbsp;网上付费查询',
						textAlign: 'left',
						icon: '../../image/pay.png',
						scale: 'medium',
						handler: function(){
							window.open('http://10.1.0.131:8080/Search/index.html');
						}
				}]
//            }
//            
//            ]
        
		});
        
        this.callParent(arguments);
        
    }
});

function setSubBtns(sub_btns){
	for(var i=0;i<sub_btns.length;i++){
		if(Ext.Array.contains(Ext.rs_two,sub_btns[i])){
			Ext.getCmp(sub_btns[i]).show();
		}								
	}
}
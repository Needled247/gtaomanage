Ext.define('My.zc_charge', {
    extend: 'Ext.panel.Panel',
	
    constructor: function() {    	

   	
		 
    	//初始化
        Ext.apply(this, {       	
        	title: '营业厅支出信息',
        	icon: '../../image/zc.png',
			scale: 'small',
            region: 'center',
            margin: '0 5 5 0',
            id: 'zc_charge',
            name: 'zc_charge',
//            border: false,
            layout: 'border',
            frame: true,
            items: [
            	Ext.create('My.zc_north'),
            	Ext.create('My.zc_grid')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'zc_tb',
            	name:'zc_tb',
            	border: false,
            	height: 40,
            	items: [
            	'-',
            	{
        			id: 'addmf',
					text: '添加修改',
					icon: '../../image/addmf.png',
					scale: 'medium',
					hidden:true,
		            menu: [
					{        				    
						text: '添加支出信息',
						icon: '../../image/add.png',
						scale: 'small',
						handler: function(){
							Ext.create('My.zc_save');
							Ext.getCmp('zc_save').setTitle('添加支出信息');
							if(Ext.getCmp('bs_name').isHidden()){
								var did=Ext.data.StoreManager.lookup('bs_name').findRecord('id',Ext.bs_did);        						
	    						Ext.getCmp('zc_bs').setRawValue(did.get('name'));
								Ext.getCmp('zc_bs').setReadOnly(true);
							}
						}
					},
					{
					text: '修改支出信息',
					icon: '../../image/modify.png',
					scale: 'small',
					handler: function(){						
						var sm=Ext.getCmp('zc_grid').getSelectionModel();
						if(sm.hasSelection()){
							var r=sm.getLastSelected();
							var cur_year=Ext.Date.format(new Date(),'Y');
							var cur_month=Ext.Date.format(new Date(),'m');    							
							var charge_date=r.get('zc_date').split('-');
							if(cur_year==charge_date[0]){
								if(cur_month==charge_date[1]){
									Ext.create('My.zc_save');
									Ext.getCmp('zc_save').setTitle('修改支出信息');
									Ext.getCmp('zc_bs').setRawValue(r.get('zc_bs'));
									if(Ext.getCmp('bs_name').isHidden()){
										Ext.getCmp('zc_bs').setReadOnly(true);
									}
									Ext.getCmp('zc_date').setRawValue(r.get('zc_date'));
									Ext.getCmp('zc_id').setValue(r.get('zc_id'));
				        			Ext.getCmp('zc_amount').setValue(r.get('zc_amount'));			        			
				        			Ext.getCmp('zc_type').setRawValue(r.get('zc_type'));
				        			Ext.getCmp('zc_note').setValue(r.get('zc_note'));									
								}else{
									alert('很抱歉，您只能修改当月支出信息');
								}
							}else{
								alert('很抱歉，您只能修改当月支出信息');
							}
						}else{
							alert('请先选择一行记录');
						}
					}
				    }]
				},{
            		id: 'bs_name',
	                name: 'bs_name',
	                xtype:'combobox',
	                hidden:true,
	                emptyText:'请选择营业厅',
	                store: Ext.data.StoreManager.lookup('bs_name'),
			      	width: 110,
			      	valueField:'id',
	      			displayField:'name',
	      			value:'',
	      			//allowBlank: false,
					//blankText: '请选择营业厅',
					editable: false,
					queryMode:'local'
            	},
            	{
            		xtype:'button',
	        		text: '查询信息',
	        		id:'qbtn',
	        		icon: '../../image/find_user1.png',
	        		scale: 'medium',
	        		handler: function(){
	        			
	        			if(!Ext.getCmp('startDate').isValid()){
	        				return;
	        			}
	        			
	        			if(!Ext.getCmp('endDate').isValid()){
	        				return;
	        			}
	        			
	        			var params = Ext.getCmp('zc_grid').getStore().getProxy().extraParams;
	        			params['zc_bs_name']=Ext.getCmp('bs_name').getValue();
	        			params['startDate']=Ext.getCmp('startDate').getRawValue();
	        			params['endDate']=Ext.getCmp('endDate').getRawValue();
	        			params['zc_type']=Ext.getCmp('zct').getValue();
	        			Ext.getCmp('zc_grid').getStore().loadPage(1);
	        		}        		
        		},
        		{
        			xtype:'button',
        			id: 'reset_btn',
			        name: 'reset_btn',
	        		text: '重置查询',
	        		icon: '../../image/reset_btn.png',
	        		scale: 'medium',
	        		handler: function(){
	        			if(!Ext.getCmp('bs_name').isHidden()){
							Ext.getCmp('bs_name').reset();
						}
	        			Ext.getCmp('startDate').reset();
	        			Ext.getCmp('endDate').reset();
	        			Ext.getCmp('zct').reset();
	        		}
        		},
        		{
        			xtype:'button',
        			id: 'ex_fn',
			        name: 'ex_fn',
	        		text: '导出Excel',
	        		icon: '../../image/excel_btn.png',
	        		scale: 'medium',
	        		hidden: true,
	        		handler: function(){
	        			if(Ext.getCmp('zc_grid').getStore().getCount()==0){
	        				return;
	        			}	        					
	        			var params = Ext.getCmp('zc_grid').getStore().getProxy().extraParams;
	        			var reqStr='';
	        			reqStr+='zc_bs_name='+params['zc_bs_name'];
	        			reqStr+='&startDate='+params['startDate'];
	        			reqStr+='&endDate='+params['endDate'];
	        			reqStr+='&zc_type='+params['zc_type'];
//	        			window.location.href="get_qc_excel.jsp?"+reqStr;
	        			window.open("get_zc_excel.jsp?"+reqStr);
	        		}
        		},
        		{
        			id: 'admin_fn',
					text: '管理员功能',
					icon: '../../image/admin_fn.png',
					scale: 'medium',
					hidden:true,
		            menu: [
					{
						text: '删除支出信息',
						icon: '../../image/delete.png',
						scale: 'small',
						handler: function(){
							var sm=Ext.getCmp('zc_grid').getSelectionModel();
    						if(sm.hasSelection()){
    							var r=sm.getLastSelected();
    							var cur_date=Ext.Date.format(new Date(),'Y-m-d');
    							var charge_date=r.get('zc_date');
    							if(cur_date==charge_date){
    								if(confirm("您确定要删除此条支出信息吗?")){
	    	        					Ext.Ajax.request({
	    							    		url: 'zccharge_del.jsp',
	    							    		method: 'POST',
	    									    params: {
	    									        zc_id : r.get('zc_id')
	    									    }
	    								});
	    	        					Ext.data.StoreManager.lookup('zc_grid_store').remove(r);
	            					}
    							}else{
    								alert('很抱歉，您只能删除当日支出信息');
        						}
    							
//    							var cur_year=Ext.Date.format(new Date(),'Y');
//    							var cur_month=Ext.Date.format(new Date(),'m');    							
//    							var charge_date=r.get('zc_date').split('-');
//    							if(cur_year==charge_date[0]){
//    								if(cur_month==charge_date[1]){
//    									if(confirm("您确定要删除此条支出信息吗?")){
//    	    	        					Ext.Ajax.request({
//    	    							    		url: 'zccharge_del.jsp',
//    	    							    		method: 'POST',
//    	    									    params: {
//    	    									        zc_id : r.get('zc_id')
//    	    									    }
//    	    								});
//    	    	        					Ext.data.StoreManager.lookup('zc_grid_store').remove(r);
//    	            					}    									
//    								}else{
//    									alert('很抱歉，您只能删除当月支出信息');
//    								}
//    							}else{
//    								alert('很抱歉，您只能删除当月支出信息');
//    							}
    						}else{
    							alert('请先选择一行记录');
    						}										
						}
					}]
            	}
        	]})
        });
        
        this.callParent(arguments);
        
    }
});
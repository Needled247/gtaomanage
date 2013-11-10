Ext.define('My.noquery_charge', {
    extend: 'Ext.panel.Panel',
	
    constructor: function() {    	

   	
		 
    	//初始化
        Ext.apply(this, {       	
        	title: '非用户收费信息',
            region: 'center',
            margin: '0 5 5 0',
            id: 'noquery_charge',
            name: 'noquery_charge',
//            border: false,
            layout: 'border',
            frame: true,
            items: [
            	Ext.create('My.noqc_north'),
            	Ext.create('My.noqc_grid')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'qc_tb',
            	name:'qc_tb',
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
						text: '添加收费信息',
						icon: '../../image/add.png',
						scale: 'small',
						handler: function(){
							Ext.create('My.nofc_save');
							Ext.getCmp('nofc_save').setTitle('添加收费信息');
							if(Ext.getCmp('bs_name').isHidden()){
								var did=Ext.data.StoreManager.lookup('bs_name').findRecord('id',Ext.bs_did);        						
	    						Ext.getCmp('nofc_bs').setRawValue(did.get('name'));
								Ext.getCmp('nofc_bs').setReadOnly(true);
							}
						}
					},
					{
					text: '修改收费信息',
					icon: '../../image/modify.png',
					scale: 'small',
					handler: function(){						
						var sm=Ext.getCmp('noqc_grid').getSelectionModel();
						if(sm.hasSelection()){
							var r=sm.getLastSelected();
							var cur_year=Ext.Date.format(new Date(),'Y');
							var cur_month=Ext.Date.format(new Date(),'m');    							
							var charge_date=r.get('charge_date').split('-');
							if(cur_year==charge_date[0]){
								if(cur_month==charge_date[1]){
									Ext.create('My.nofc_save');
									Ext.getCmp('nofc_save').setTitle('修改收费信息');
									Ext.getCmp('nofc_bs').setRawValue(r.get('bs_name'));
									if(Ext.getCmp('bs_name').isHidden()){
										Ext.getCmp('nofc_bs').setReadOnly(true);
									}
									Ext.getCmp('nofc_rname').setRawValue(r.get('realname'));
									Ext.getCmp('nofc_date').setValue(r.get('charge_date'));
									Ext.getCmp('nofc_id').setValue(r.get('charge_id'));
									Ext.getCmp('nofc_rid').setValue(r.get('receipt_id'));
				        			Ext.getCmp('nofc_amount').setValue(r.get('charge_amount'));			        			
				        			Ext.getCmp('nofc_pt').setValue(r.get('pay_type'));
				        			Ext.getCmp('nofc_ct').setValue(r.get('charge_type'));
				        			Ext.getCmp('nofc_note').setValue(r.get('note'));
				        			Ext.getCmp('nofc_tel').setValue(r.get('tel'));
				        			Ext.getCmp('nofc_addr').setValue(r.get('addr'));
				        			Ext.getCmp('nofc_hetong').setValue(r.get('contract_name'));									
								}else{
									alert('很抱歉，您只能修改当月收费信息');
								}
							}else{
								alert('很抱歉，您只能修改当月收费信息');
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
	        			
	        			if(Ext.getCmp('charge_type').getValue()!=''){
    						if(Ext.getCmp('charge_type').getValue()==Ext.getCmp('charge_type').getRawValue()){
        						return;
        					}
						}
	        			var params = Ext.getCmp('noqc_grid').getStore().getProxy().extraParams;
	        			params['qc_bs_name']=Ext.getCmp('bs_name').getValue();
	        			params['startDate']=Ext.getCmp('startDate').getRawValue();
	        			params['endDate']=Ext.getCmp('endDate').getRawValue();
	        			params['receipt_id']=Ext.getCmp('receipt_id').getValue();
	        			params['pay_type']=Ext.getCmp('pay_type').getValue();
	        			params['charge_type']=Ext.getCmp('charge_type').getValue();
	        			params['note']=Ext.getCmp('note').getValue();
	        			params['realname']=Ext.getCmp('realname').getValue();
	        			params['addr']=Ext.getCmp('addr').getValue();
	        			params['save_admin']=Ext.getCmp('save_admin').getValue();
	        			Ext.getCmp('noqc_grid').getStore().loadPage(1);
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
	        			Ext.getCmp('receipt_id').reset();
	        			Ext.getCmp('pay_type').reset();
	        			Ext.getCmp('charge_type').reset();
	        			Ext.getCmp('note').reset();
	        			Ext.getCmp('realname').reset();
	        			Ext.getCmp('addr').reset();
	        			Ext.getCmp('save_admin').reset();
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
	        			if(Ext.getCmp('noqc_grid').getStore().getCount()==0){
	        				return;
	        			}	        					
	        			var params = Ext.getCmp('noqc_grid').getStore().getProxy().extraParams;
	        			var reqStr='';
	        			reqStr+='qc_bs_name='+params['qc_bs_name'];
	        			reqStr+='&startDate='+params['startDate'];
	        			reqStr+='&endDate='+params['endDate'];
	        			reqStr+='&receipt_id='+encodeURI(encodeURI(params['receipt_id']));
	        			reqStr+='&pay_type='+params['pay_type'];
	        			if(params['charge_type']==null){
	        				reqStr+='&charge_type=';
	        			}else{
	        				reqStr+='&charge_type='+params['charge_type'];
	        			}
	        			reqStr+='&note='+encodeURI(encodeURI(params['note']));
	        			reqStr+='&realname='+encodeURI(encodeURI(params['realname']));
	        			reqStr+='&addr='+encodeURI(encodeURI(params['addr']));
	        			reqStr+='&save_admin='+encodeURI(encodeURI(params['save_admin']));
//	        			window.location.href="get_qc_excel.jsp?"+reqStr;
	        			window.open("get_noqc_excel.jsp?"+reqStr);
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
						text: '删除收费信息',
						icon: '../../image/delete.png',
						scale: 'small',
						handler: function(){
							var sm=Ext.getCmp('noqc_grid').getSelectionModel();
    						if(sm.hasSelection()){
    							var r=sm.getLastSelected();
    							var cur_year=Ext.Date.format(new Date(),'Y');
    							var cur_month=Ext.Date.format(new Date(),'m');    							
    							var charge_date=r.get('charge_date').split('-');
    							if(cur_year==charge_date[0]){
    								if(cur_month==charge_date[1]){
    									if(confirm("您确定要删除此条收费信息吗?")){
    	    	        					Ext.Ajax.request({
    	    							    		url: 'nocharge_del.jsp',
    	    							    		method: 'POST',
    	    									    params: {
    	    									        charge_id : r.get('charge_id'),
    	    									        list_name : '非用户收费信息'
    	    									    }
    	    								});
    	    	        					Ext.data.StoreManager.lookup('noqc_grid_store').remove(r);
    	            					}    									
    								}else{
    									alert('很抱歉，您只能删除当月收费信息');
    								}
    							}else{
    								alert('很抱歉，您只能删除当月收费信息');
    							}
    						}else{
    							alert('请先选择一行记录');
    						}										
						}
					},{
						text: '查看操作记录',
						icon: '../../image/log.png',
						scale: 'small',
						handler: function(){
							var sm=Ext.getCmp('noqc_grid').getSelectionModel();
    						if(sm.hasSelection()){
    							Ext.create('My.log_window');
								Ext.getCmp('log_window').setTitle('查看操作记录');
    							var r=sm.getLastSelected();
    	        				var params=Ext.data.StoreManager.lookup('log_grid_store').getProxy().extraParams;
		            			params['username']=r.get('charge_id');
		            			params['list_name']=Ext.getCmp('noquery_charge').title;
		            			Ext.data.StoreManager.lookup('log_grid_store').loadPage(1);
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
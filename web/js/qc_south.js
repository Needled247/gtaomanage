Ext.define('My.qc_south', {
    extend: 'Ext.form.FieldSet',
    
    constructor: function() {
		
        Ext.apply(this, {
            region:'south',
			id:'qc_south',
			name:'qc_south',
            title: '<font color="red">*</font>修改收费信息<font color="red">*</font>',
            margin: '15 10 15 10',
            collapsible: true,
            hidden: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 4
		            },
		            items:[{
		            id: 's_bs_name',
			        name: 's_bs_name',
			        xtype:'combobox',
			        margin: '10 0 10 40',
			        fieldLabel:'选择营业厅',
			        store: Ext.getCmp('qc_bs_name').store,
			        labelWidth: 70,
					width: 180,
					valueField:'id',
			      	displayField:'name',
					editable: false,
					allowBlank: false,
					blankText: '请选择营业厅'
		        },{
	            	xtype:'textfield',
	                fieldLabel: '用户账号',
	                id: 'uname',
	                name: 'uname',
	                margin: '10 0 10 40',
//	              	value: '',
	                labelWidth: 90,
					allowBlank: false,
					blankText: '请输入用户账号',
					enforceMaxLength: true,
	                maxLength: 30,
	                width: 200
            	},{
	            	xtype:'textfield',
	                fieldLabel: '收据号码',
	                id: 'r_id',
	                name: 'r_id',
	                margin: '10 0 10 40',
//	              	value: '',
	                labelWidth: 60,
					allowBlank: false,
					blankText: '请输入收据号码',
					enforceMaxLength: true,
	                maxLength: 40,
	                width: 250
            	},{
            		xtype:'button',
    				text: '修改信息',
    				icon: '../../image/qc_modify.png',
    				scale: 'medium',        				
    				margin: '0 0 0 40',
    				rowspan: 3,
    				handler: function(){
    						var cur_month=Ext.Date.format(new Date(),'m');    						
    						var charge_month=Ext.getCmp('charge_month').getValue().split('-')[1];
    						if(cur_month!=charge_month){
    							alert('很抱歉，您只能修改当月收费信息');
    							return;
    						}else if(Ext.getCmp('charge_id').getValue()==''){
    							return;
    						}
//    						Ext.getCmp('ct_id').getStore().load(
//    							function(records, operation, success){
    										var s_bs_name=Ext.getCmp('s_bs_name').getStore().findRecord('name',Ext.getCmp('s_bs_name').getRawValue());
			        						var is_xz=Ext.getCmp('is_xz').getStore().findRecord('name',Ext.getCmp('is_xz').getRawValue());
    										var ct_id=Ext.getCmp('ct_id').getStore().findRecord('name',Ext.getCmp('ct_id').getRawValue());
			        						Ext.Ajax.request({
									    		url: 'charge_modify.jsp',
									    		method: 'POST',
											    params: {
											    	charge_id : Ext.getCmp('charge_id').getValue(),
											    	bs_name : s_bs_name.get('id'),
											    	username : Ext.getCmp('uname').getValue(),
											    	receipt_id : Ext.getCmp('r_id').getValue(),
											    	charge_amount : Ext.getCmp('charge_num').getValue(),
											    	is_new : is_xz.get('id'),
											    	charge_type : ct_id.get('id'),
											    	note : Ext.getCmp('s_note').getValue()
											    },
											    success: function(response){
											        var result = Ext.decode(response.responseText);
											        if(result.msg=="1"){												        	
											        	Ext.getCmp('qc_grid').store.loadPage(1);
											        	Ext.getCmp('charge_id').reset();
											        	Ext.getCmp('s_bs_name').reset();
											        	Ext.getCmp('uname').reset();
											        	Ext.getCmp('r_id').reset();
											        	Ext.getCmp('charge_num').reset();
											        	Ext.getCmp('is_xz').reset();
											        	Ext.getCmp('ct_id').reset();
											        	Ext.getCmp('s_note').reset();
											        	Ext.getCmp('charge_month').reset();
											        	alert("收费信息修改成功");
											        }else{
											        	alert("修改失败,请重新提交");
											        }
											    },
											    failure: function(response) {
				//							        response.status;
			//								        alert("网络故障,请稍后再试");
											    }
											});       								
//    							}
//    						);
    				}        				
            	},{
	            	xtype:'textfield',
	                fieldLabel: '收费金额',
	                id: 'charge_num',
	                name: 'charge_num',
	                margin: '10 0 10 40',
	                labelWidth: 70,
					allowBlank: false,
					blankText: '请输入收费金额',
	                width: 180,
	                enforceMaxLength: true,
	                maxLength: 12,
	                regex: /(^-?\d{1,8}$)|(^-?\d{1,8}\.\d{1,2}$)/,
		            regexText: '请输入正确的收费金额'
            	},{
	                id: 'is_xz',
	                name: 'is_xz',
	                margin: '10 0 10 40',
	                xtype:'combobox',
	                fieldLabel: '是否新装用户',
	                labelWidth: 90,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','是'],['0','否']]
			      	}),
			      	queryMode:'local',
			      	width: 200,
			      	valueField:'id',
	      			displayField:'name',
					allowBlank: false,
					blankText: '请选择是否新装用户',
					editable: false
            	},{
            		id: 'ct_id',
					name: 'ct_id',
					xtype:'combobox',
	                fieldLabel: '收费类别',
	                store: Ext.getCmp('charge_type').store,
	                margin: '10 0 10 40',
	                labelWidth: 60,
	                width: 250,
	                valueField:'id',
					displayField:'name',
					allowBlank: false,
					blankText: '请输入收费类别',
					minChars:1,
					queryMode:'local',
					editable: false,
					listeners:{
//						f.onTriggerClick();						
						beforequery : function(e){
							var combo = e.combo;
							if(!e.forceAll){
								var value = e.query;
								combo.store.filterBy(function(record,id){
									var text = record.get(combo.displayField);
									return (text.indexOf(value.toUpperCase())!=-1);
								});
								combo.expand();
								return false;
							}
						}
//						,
//            			focus : function(cb,e){
//            				if(cb.store.getTotalCount()==0){
//            						cb.store.load();
//            				}
//            			}
	            	}
            	}
//            	,{
//	            		xtype:'button',
//        				text: '删除信息',
//        				icon: '../../image/qc_del.png',
//        				scale: 'medium',
//        				margin: '0 0 0 40',
//        				rowspan: 2,
//        				handler: function(){
//        					if(Ext.getCmp('charge_id').getValue()==''){
//    							return;
//    						}
//			            	if(confirm("确定要删除此条收费信息吗?")){
//			            		Ext.Ajax.request({
//						    		url: 'charge_del.jsp',
//						    		method: 'POST',
//								    params: {
//								    	charge_id : Ext.getCmp('charge_id').getValue()
//								    },
//								    success: function(response){
//								        var result = Ext.decode(response.responseText);
//								        if(result.msg=="1"){								        	
//								        	Ext.getCmp('qc_grid').store.loadPage(1);
//								        	Ext.getCmp('charge_id').reset();
//								        	Ext.getCmp('s_bs_name').reset();
//								        	Ext.getCmp('uname').reset();
//								        	Ext.getCmp('r_id').reset();
//								        	Ext.getCmp('charge_num').reset();
//								        	Ext.getCmp('is_xz').reset();
//								        	Ext.getCmp('ct_id').reset();
//								        	Ext.getCmp('s_note').reset();
//								        	alert("收费信息删除成功");
//								        }else{
//								        	alert("删除失败,请重新提交");
//								        }
//								    },
//								    failure: function(response) {
//	//							        response.status;
////								        alert("网络故障,请稍后再试");
//								    }
//			            		});
//			            	}
//        				}        				
//	            	}
            	,{
	            	xtype:'textfield',
	                fieldLabel: '其它及备注',
	                id: 's_note',
	                name: 's_note',
	                colspan: 3,
	                margin: '10 0 10 40',
	                labelWidth: 70,
					allowBlank: false,
					blankText: '请输入备注',
					enforceMaxLength: true,
	                maxLength: 180,
//					emptyText: '',
	                width: 710
            	},{
			        xtype: 'hiddenfield',
			        id: 'charge_id',
			        name: 'charge_id',
			        value: ''
    			},{
			        xtype: 'hiddenfield',
			        id: 'charge_month',
			        name: 'charge_month',
			        value: ''
    			}]
            
        });
        
        this.callParent(arguments);
        
    }
});
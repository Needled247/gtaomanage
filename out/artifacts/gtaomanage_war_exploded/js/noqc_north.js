Ext.define('My.noqc_north', {
    extend: 'Ext.form.FieldSet',
    
    constructor: function() {
    	
        Ext.apply(this, {
            region:'north',
			id:'noqc_north',
			name:'noqc_north',
            title: '<font color="red">*</font>非用户收费查询条件<font color="red">*</font>',
            margin: '10 10 6 10',
            height: 150,
            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 3
		            },
		            items:[{
	            		xtype:'datefield',
		                fieldLabel: '起始日期',
		                id: 'startDate',
		                name: 'startDate',
		                margin: '5 0 10 30',
		              	value: '',
		              	format: 'Y-m-d',
		              	maxValue: new Date(),
		                labelWidth: 60,
		                width: 190,
//						allowBlank: false,
//						blankText: '请输入起始日期',
						editable: false,
						listeners: {
	                    	change: function(obj){
	                    		Ext.getCmp('endDate').setMinValue(obj.getRawValue());
	                    	}
	                    }
	            	},{
            		xtype:'datefield',
	                fieldLabel: '截止日期',
	                id: 'endDate',
	                name: 'endDate',
	                margin: '5 0 10 30',
	              	value: Ext.Date.format(new Date(), 'Y-m-d'),
	              	format: 'Y-m-d',
	              	maxValue: new Date(),
	                labelWidth: 60,
	                width: 190,	                
					allowBlank: false,
					blankText: '请输入截止日期',
					editable: false,
					listeners: {
                    	change: function(obj){
                    		Ext.getCmp('startDate').setMaxValue(obj.getRawValue());
                    	}
                    }
            	},{
		            		xtype:'textfield',
		            		id: 'save_admin',
		            		name: 'save_admin',
		                    fieldLabel: '录入人员',
		                    margin: '5 0 10 30',
		                    labelWidth: 60,
					      	width: 190,
					      	value:'',
							maxLength: 10,
				            enforceMaxLength: true,
			            	listeners:{
			            		specialkey:function(f,e){
			            			if (e.getKey() == e.ENTER) {
			            				document.getElementById('qbtn').click();
			            			}
			            		}
			            	}
	            },{
	            	xtype:'textfield',
	                fieldLabel: '用户姓名',
	                id: 'realname',
	                name: 'realname',
	                margin: '5 0 10 30',
	              	value: '',
	                labelWidth: 60,
	                width: 190,
	                enforceMaxLength: true,
	                maxLength: 30,
	                listeners:{
			            	specialkey:function(f,e){
			            	if (e.getKey() == e.ENTER) {
			            		document.getElementById('qbtn').click();
			            	}
			            }
			        }
            	},{
	            	xtype:'textfield',
	                fieldLabel: '用户住址',
	                id: 'addr',
	                name: 'addr',
	                margin: '5 0 10 30',
	              	value: '',
	                labelWidth: 60,
	                width: 190,
	                enforceMaxLength: true,
	                maxLength: 30,
	                listeners:{
			            	specialkey:function(f,e){
			            	if (e.getKey() == e.ENTER) {
			            		document.getElementById('qbtn').click();
			            	}
			            }
			        }
            	},{
            		xtype:'textfield',
            		id: 'tel',
            		name: 'tel',
                    fieldLabel: '联系电话',
                    margin: '5 0 10 30',
                    labelWidth: 60,
			      	width: 190,
			      	value:'',
					maxLength: 11,
		            enforceMaxLength: true,
//		            regex: /^\d{1,11}$/,
//		            regexText: '请输入数字',
	            	listeners:{
	            		specialkey:function(f,e){
	            			if(this.isValid()){
		            			if (e.getKey() == e.ENTER) {
		            				document.getElementById('qbtn').click();
		            			}
	            			}
	            		}
	            	}
        		},{
		            id: 'pay_type',
			        name: 'pay_type',
			        xtype:'combobox',
			        margin: '5 0 10 30',
			        fieldLabel:'支付方式',
			        store: Ext.data.StoreManager.lookup('pay_type'),
			        labelWidth: 60,
					width: 190,
					valueField:'id',
			      	displayField:'name',
					value:'',
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
									return (text.indexOf(value)!=-1);
								});
								combo.expand();
								return false;
							}
						}
	            	}
		        },{
		            id: 'charge_type',
			        name: 'charge_type',
			        xtype:'combobox',
			        margin: '5 0 10 30',
			        fieldLabel:'收费类别',
			        store: Ext.data.StoreManager.lookup('charge_type'),
			        labelWidth: 60,
					width: 190,
					valueField:'id',
			      	displayField:'name',
					value:'',
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
									return (text.indexOf(value)!=-1);
								});
								combo.expand();
								return false;
							}
						}
	            	}
		        },{
	            	xtype:'textfield',
	                fieldLabel: '备注信息',
	                id: 'note',
	                name: 'note',
	                margin: '5 0 10 30',
	                labelWidth: 60,
					enforceMaxLength: true,
	                maxLength: 20,
	                width: 190,	                
	                value:'',
	                listeners:{
			            	specialkey:function(f,e){
			            	if (e.getKey() == e.ENTER) {
			            		document.getElementById('qbtn').click();
			            	}
			            }
			        }
            	},{
	            	xtype:'textfield',
	                fieldLabel: '收据号码',
	                id: 'receipt_id',
	                name: 'receipt_id',
	                margin: '5 0 10 30',
	              	value: '',
	                labelWidth: 60,
	                width: 190,
	                enforceMaxLength: true,
	                maxLength: 20,
	                listeners:{
			            	specialkey:function(f,e){
			            	if (e.getKey() == e.ENTER) {
			            		document.getElementById('qbtn').click();
			            	}
			            }
			        }
            	}]
            
        });
        
        this.callParent(arguments);
        
    }
});
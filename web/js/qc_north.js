Ext.define('My.qc_north', {
    extend: 'Ext.form.FieldSet',
    
    constructor: function() {
    	
        Ext.apply(this, {
            region:'north',
			id:'qc_north',
			name:'qc_north',
            title: '<font color="red">*</font>用户收费查询条件<font color="red">*</font>',
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
//					allowBlank: false,
//					blankText: '请输入起始日期',
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
	                fieldLabel: '用户账号',
	                id: 'username',
	                name: 'username',
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
					editable: false					
		        },{
		            id: 'charge_type1',
			        name: 'charge_type1',
			        xtype:'combobox',
			        margin: '5 0 10 30',
			        fieldLabel:'收费类1',
			        store: Ext.data.StoreManager.lookup('charge_type1'),
			        labelWidth: 60,
					width: 190,
					valueField:'id',
			      	displayField:'name',
					value:'',
					minChars:1,
					queryMode:'local',
					editable: false,
                    listeners:{
                        select:function(){
                            var cid = Ext.getCmp('charge_type1').getValue();
                            Ext.getCmp('charge_type2').clearValue();
                            Ext.getCmp('charge_type3').clearValue();
                            Ext.getCmp('charge_type4').clearValue();
                            Ext.getCmp('charge_type2').store.proxy.url = 'get_charge_type_son.jsp?cid='+cid+'&level=2';
                            Ext.getCmp('charge_type2').store.load();
                        }
                    }
		        },{
                        id: 'charge_type2',
                        name: 'charge_type2',
                        xtype:'combobox',
                        margin: '5 0 10 30',
                        fieldLabel:'收费类2',
                        store: Ext.data.StoreManager.lookup('charge_type2'),
                        labelWidth: 60,
                        width: 190,
                        valueField:'id',
                        displayField:'name',
                        value:'',
                        minChars:1,
                        queryMode:'local',
                        editable: false,
                        listeners:{
                            select:function(){
                                var cid = Ext.getCmp('charge_type2').getValue();
                                Ext.getCmp('charge_type3').clearValue();
                                Ext.getCmp('charge_type4').clearValue();
                                Ext.getCmp('charge_type3').store.proxy.url = 'get_charge_type_son.jsp?cid='+cid+'&level=3';
                                Ext.getCmp('charge_type3').store.load();
                            }
                        }
                    },{
                        id: 'charge_type3',
                        name: 'charge_type3',
                        xtype:'combobox',
                        margin: '5 0 10 30',
                        fieldLabel:'收费类3',
                        store: Ext.data.StoreManager.lookup('charge_type3'),
                        labelWidth: 60,
                        width: 190,
                        valueField:'id',
                        displayField:'name',
                        value:'',
                        minChars:1,
                        queryMode:'local',
                        editable: false,
                        listeners:{
                            select:function(){
                                var cid = Ext.getCmp('charge_type3').getValue();
                                Ext.getCmp('charge_type4').clearValue();
                                Ext.getCmp('charge_type4').store.proxy.url = 'get_charge_type_son.jsp?cid='+cid+'&level=4';
                                Ext.getCmp('charge_type4').store.load();
                            }
                        }
                    },{
                        id: 'charge_type4',
                        name: 'charge_type4',
                        xtype:'combobox',
                        margin: '5 0 10 30',
                        fieldLabel:'收费类4',
                        store: Ext.data.StoreManager.lookup('charge_type4'),
                        labelWidth: 60,
                        width: 190,
                        valueField:'id',
                        displayField:'name',
                        value:'',
                        minChars:1,
                        queryMode:'local',
                        editable: false
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
		            id: 'act_id',
			        name: 'act_id',
			        xtype:'combobox',
			        margin: '5 0 10 30',
			        fieldLabel:'活动名称',
			        store: Ext.data.StoreManager.lookup('huodong'),
			        labelWidth: 60,
			        colspan: 2,
					width: 410,
					valueField:'id',
			      	displayField:'name',
					value:'',
					minChars:1,
					queryMode:'local',
					editable: false,
					listeners:{
						select : function(c,rec){
							Ext.getCmp('actsub_id').setValue('');
							Ext.data.StoreManager.lookup('huodong_sub').filterBy(function(record,id){
									var text = record.get('huodong_id');
									return (text==rec[0].get('id'));
							});							
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
            	},{
		            id: 'actsub_id',
			        name: 'actsub_id',
			        xtype:'combobox',
			        margin: '5 0 10 30',
			        fieldLabel:'套餐名称',
			        store: Ext.data.StoreManager.lookup('huodong_sub'),
			        labelWidth: 60,
			        colspan: 2,
					width: 410,
					valueField:'id',
			      	displayField:'name',
					value:'',
					minChars:1,
					queryMode:'local',
					editable: false
		        },{
	            	xtype:'textfield',
	                fieldLabel: '备注信息',
	                id: 'note',
	                name: 'note',
	                margin: '5 0 10 30',
	                labelWidth: 60,
					enforceMaxLength: true,
	                maxLength: 30,
	                width: 190,
	                value:'',
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
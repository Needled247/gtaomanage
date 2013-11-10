Ext.define('My.mfA_north', {
    extend: 'Ext.form.FieldSet',
    
    constructor: function() {
    	
        Ext.apply(this, {
            region:'north',
			id:'mfA_north',
			name:'mfA_north',
            title: '<font color="red">*</font>基本功能查询条件<font color="red">*</font>',
            margin: '10 10 5 10',
            height: 190,
            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 3
		            },
		            items:[{
		            		xtype:'datefield',
			                fieldLabel: '录入起始日期',
			                id: 'startDate',
			                name: 'startDate',
			                margin: '5 0 10 30',
			              	value: '',
			              	format: 'Y-m-d',
			              	maxValue: new Date(),
			                labelWidth: 85,
			                width: 200,
//							allowBlank: false,
//							blankText: '请输入录入起始日期',
							editable: false,
							listeners: {
		                    	change: function(obj){
		                    		Ext.getCmp('endDate').setMinValue(obj.getRawValue());
		                    	}
		                    }
		            	},{
		            		xtype:'datefield',
			                fieldLabel: '录入截止日期',
			                id: 'endDate',
			                name: 'endDate',
			                margin: '5 0 10 30',
			              	value: Ext.Date.format(new Date(), 'Y-m-d'),
			              	format: 'Y-m-d',
			              	maxValue: new Date(),
			                labelWidth: 85,
			                width: 200,	                
							allowBlank: false,
							blankText: '请输入录入截止日期',
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
					      	width: 200,
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
		            		id: 'un',
		            		name: 'un',
		                    fieldLabel: '用户账号',
		                    margin: '5 0 10 30',
		                    labelWidth: 60,
					      	width: 200,
					      	value:'',
							maxLength: 20,
				            enforceMaxLength: true,
			            	listeners:{
			            		specialkey:function(f,e){
			            			if (e.getKey() == e.ENTER) {
			            				document.getElementById('qbtn').click();
			            			}
			            		}
			            	}
	            		},{
			            	xtype:'datefield',
			                fieldLabel: '启用时间',
			                id: 'start_time',
			                name: 'start_time',
			                margin: '5 0 10 30',
			//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
			                value: '',
			              	format: 'Y-m',
			                labelWidth: 60,
			                width: 200,
			//				allowBlank: false,
			//				blankText: '请选择光纤开通时间',
							editable: false
		            	},{
			            	xtype:'numberfield',
			                fieldLabel: '社区分组',
			                id: 'group_id',
			                name: 'group_id',
			                margin: '5 0 10 30',
//			              	value: 1,
			                labelWidth: 60,
			                width: 200,
			        		maxValue: 99,
			        		minValue: 1,
//							allowBlank: false,
//							blankText: '请选择营业厅分组',
							editable: true
		            	},{
		            		xtype:'textfield',
		            		id: 'rname',
		            		name: 'rname',
		                    fieldLabel: '用户姓名',
		                    margin: '5 0 10 30',
		                    labelWidth: 60,
					      	width: 200,
					      	value:'',
							maxLength: 20,
				            enforceMaxLength: true,
			            	listeners:{
			            		specialkey:function(f,e){
			            			if (e.getKey() == e.ENTER) {
			            				document.getElementById('qbtn').click();
			            			}
			            		}
			            	}
	            		},{
			            	xtype:'datefield',
			                fieldLabel: '重新启用时间',
			                id: 're_time',
			                name: 're_time',
			                margin: '5 0 10 30',
			//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
			                value: '',
			              	format: 'Y-m',
			                labelWidth: 85,
			                width: 200,
			//				allowBlank: false,
			//				blankText: '请选择重新启用时间',
							editable: false
		            	},{
			               	xtype:'numberfield',
			                fieldLabel: '宣传单号',
			                id: 'leaflet_no',
			                name: 'leaflet_no',
			                margin: '5 0 10 30',
//			              	value: 1,
			                labelWidth: 60,
			                width: 200,
			        		maxValue: 99,
			        		minValue: 1,
//							allowBlank: false,
//							blankText: '请选择宣传单号',
							editable: true
		            	},{
		            		xtype:'textfield',
		            		id: 'tel',
		            		name: 'tel',
		                    fieldLabel: '联系电话',
		                    margin: '5 0 10 30',
		                    labelWidth: 60,
					      	width: 200,
					      	value:'',
							maxLength: 11,
				            enforceMaxLength: true,
//				            regex: /^\d{1,11}$/,
//				            regexText: '请输入数字',
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
			            	xtype:'datefield',
			                fieldLabel: '截止时间',
			                id: 'end_time',
			                name: 'end_time',
			                margin: '5 0 10 30',
			//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
			                value: '',
			              	format: 'Y-m',
			                labelWidth: 60,
			                width: 200,
							editable: false
		            	},{
			                id: 'house_type',
			                name: 'house_type',
			                margin: '5 0 10 30',
			                xtype:'combobox',
			                fieldLabel: '房屋性质',
			                labelWidth: 60,
			                store:new Ext.data.SimpleStore(
					      	{
					       		fields:['value','text'],
					       		data:[['1','租用'],['2','私有']]
					      	}),
					      	queryMode:'local',
					      	width: 200,
					      	value:'',
					      	valueField:'value',
			      			displayField:'text',
							editable: false
		            	},{
		            		id: 'mf_cat',
		                    name: 'mf_cat',
		                    xtype:'combobox',
		                    fieldLabel:'光猫类型',
		                    store: Ext.data.StoreManager.lookup('gm_type'),
			                margin: '5 0 10 30',
			                labelWidth: 60,
			                width: 200,
		    		      	valueField:'id',
		          			displayField:'name',
		          			value:'',
		          			queryMode:'local',
		    				editable: false
		            	},{
		            		id: 'user_ads',
			                name: 'user_ads',
			                margin: '5 0 10 30',
			                xtype:'textfield',
			                fieldLabel: '用户地址',
			                labelWidth: 60,
					      	width: 200,
					      	value:'',
							maxLength: 50,
				            enforceMaxLength: true,
			            	listeners:{
			            		specialkey:function(f,e){
			            			if (e.getKey() == e.ENTER) {
			            				document.getElementById('qbtn').click();
			            			}
			            		}
			            	}
		            	},{
			                id: 'isit',
			                name: 'isit',
			                margin: '5 0 10 30',
			                xtype:'combobox',
			                fieldLabel: 'IT卡用户',
			                labelWidth: 60,
			                store:new Ext.data.SimpleStore(
					      	{
					       		fields:['id','name'],
					       		data:[['1','是'],['0','否']]
					      	}),
					      	queryMode:'local',
					      	width: 200,
					      	value:'',
					      	valueField:'id',
			      			displayField:'name',
							editable: false
		            	},{
		            		id: 'mf_gg_state',
		                    name: 'mf_gg_state',
		                    xtype:'combobox',
		                    fieldLabel:'光改情况',
		                    store: Ext.data.StoreManager.lookup('gg_state'),
			                margin: '5 0 10 30',
			                labelWidth: 60,
			                width: 200,
		    		      	valueField:'id',
		          			displayField:'name',
		          			value:'',
		          			queryMode:'local',
		    				editable: false
		            	},{
		            		id: 'hetong',
							name: 'hetong',
							xtype:'combobox',
							fieldLabel: '合同名称',
							margin: '5 0 10 30',
							labelWidth: 60,
							store: Ext.data.StoreManager.lookup('hetong'),
							width: 430,
							valueField:'id',
							displayField:'name',
							colspan:2,
//							triggerAction: 'all',
//							typeAhead:true,
							minChars:1,
							queryMode:'local',
//							forceSelection: true,
							editable: true,
							value:'',
//							selectOnFocus: true,
//							enableKeyEvents: true,
							listeners:{
//								f.onTriggerClick();
								specialkey:function(f,e){
			            			if (e.getKey() == e.ENTER) {
			            				document.getElementById('qbtn').click();
			            			}
			            		},
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
			            	xtype:'datefield',
			                fieldLabel: '光纤开通时间',
			                id: 'opt_time',
			                name: 'opt_time',
			                margin: '5 0 10 30',
			//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
			                value: '',
			              	format: 'Y-m',
			                labelWidth: 85,
			                width: 200,
			//				allowBlank: false,
			//				blankText: '请选择光纤开通时间',
							editable: false
		            	},{
		            		id: 'mfA_ml_type',
							name: 'mfA_ml_type',
							xtype:'combobox',
							fieldLabel: '套餐类型',
							margin: '5 0 10 30',
							labelWidth: 60,
							store: Ext.data.StoreManager.lookup('ml_type'),
							width: 430,
							colspan:2,
							valueField:'id',
							displayField:'name',
//							triggerAction: 'all',
//							typeAhead:true,
							minChars:1,
							queryMode:'local',
//							forceSelection: true,
							editable: true,
							value:'',
//							selectOnFocus: true,
//							enableKeyEvents: true,
							listeners:{
//								f.onTriggerClick();
								specialkey:function(f,e){
			            			if (e.getKey() == e.ENTER) {
			            				document.getElementById('qbtn').click();
			            			}
			            		},
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
		            		id: 'zhnote',
		            		name: 'zhnote',
		                    fieldLabel: '帐号变更',
		                    margin: '5 0 10 30',
		                    labelWidth: 60,
					      	width: 200,
					      	value:'',
							maxLength: 25,
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
		            		id: 'cxnote',
		            		name: 'cxnote',
		                    fieldLabel: '餐型备注',
		                    margin: '5 0 10 30',
		                    labelWidth: 60,
					      	width: 200,
					      	value:'',
							maxLength: 25,
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
		            		id: 'hdnote',
		            		name: 'hdnote',
		                    fieldLabel: '活动备注',
		                    margin: '5 0 10 30',
		                    labelWidth: 60,
					      	width: 200,
					      	value:'',
							maxLength: 25,
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
		            		id: 'sbnote',
		            		name: 'sbnote',
		                    fieldLabel: '设备备注',
		                    margin: '5 0 10 30',
		                    labelWidth: 60,
					      	width: 200,
					      	value:'',
							maxLength: 25,
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
		            		id: 'tsnote',
		            		name: 'tsnote',
		                    fieldLabel: '特殊备注',
		                    margin: '5 0 10 30',
		                    labelWidth: 60,
					      	width: 200,
					      	value:'',
							maxLength: 25,
				            enforceMaxLength: true,
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
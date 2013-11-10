Ext.define('My.qb_north', {
    extend: 'Ext.form.FieldSet',
    
    constructor: function() {	
    	
        Ext.apply(this, {
            region:'north',
			id:'qb_north',
			name:'qb_north',
            title: '<font color="red">*</font>合同信息查询条件<font color="red">*</font>',
            margin: '10 10 5 10',
            height: 150,
            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 3
		            },
		            items:[{
            		id: 'qb_hetong',
					name: 'qb_hetong',					
					xtype:'combobox',
					margin: '5 0 10 30',
					colspan:3,
					fieldLabel: '合同名称',
					labelWidth: 60,
					store: Ext.data.StoreManager.lookup('hetong'),
					width: 660,
					valueField:'id',
					displayField:'name',
//					triggerAction: 'all',
//					typeAhead:true,
					minChars:1,
					queryMode:'local',
//					forceSelection: true,
					editable: true,
					value:'',
//					allowBlank: false,
//					blankText: '请选择合同名称',
//					selectOnFocus: true,
//					enableKeyEvents: true,
					listeners:{
//						f.onTriggerClick();
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
	                id: 'ht_type',
	                name: 'ht_type',
	                margin: '5 0 10 30',
	                xtype:'combobox',
	                fieldLabel: '合同类型',
	                labelWidth: 60,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','社区合同'],['2','写字楼合同'],['3','无合同']]
			      	}),
			      	queryMode:'local',
			      	width: 200,
			      	valueField:'id',
	      			displayField:'name',
//					allowBlank: false,
//					blankText: '请选择合同类型',
					editable: false,
					value:''
            	},{
	            	xtype:'datefield',
	                fieldLabel: '合同签约日期',
	                id: 'qydate',
	                name: 'qydate',
	                margin: '5 0 10 30',
	//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
	                value: '',
	              	format: 'Y-m',
	                labelWidth: 85,
	                width: 200,
//					allowBlank: false,
//					blankText: '请选择签约日期',
					editable: false
            	},{
	            	xtype:'datefield',
	                fieldLabel: '小区开通时间',
	                id: 'xqtime',
	                name: 'xqtime',
	                margin: '5 0 10 30',
	//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
	                value: '',
	              	format: 'Y-m',
	                labelWidth: 85,
	                width: 200,
//					allowBlank: false,
//					blankText: '请选择小区开通时间',
					editable: false
            	},{
	                id: 'isgg',
	                name: 'isgg',
	                margin: '5 0 10 30',
	                xtype:'combobox',
	                fieldLabel: '是否光改',
	                labelWidth: 60,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','是'],['0','否']]
			      	}),
			      	queryMode:'local',
			      	width: 200,
			      	valueField:'id',
	      			displayField:'name',
//					allowBlank: false,
//					blankText: '请选择是否已光改',
					editable: false,
					value:''
            	},{
            		id: 'isxk',
	                name: 'isxk',
	                margin: '5 0 10 30',
	                xtype:'combobox',
	                fieldLabel: '是否新开小区',
	                labelWidth: 85,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','是'],['0','否']]
			      	}),
			      	queryMode:'local',
			      	width: 200,
			      	valueField:'id',
	      			displayField:'name',
					editable: false,
					value:''
            	},{
	                id: 'isjz',
	                name: 'isjz',
	                margin: '5 0 10 30',
	                xtype:'combobox',
	                fieldLabel: '是否有竞争',
	                labelWidth: 85,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','是'],['0','否']]
			      	}),
			      	queryMode:'local',
			      	width: 200,
			      	valueField:'id',
	      			displayField:'name',
//					allowBlank: false,
//					blankText: '请选择是否有竞争',
					editable: false,
					value:''
            	},{
	            	xtype:'textfield',
	                fieldLabel: '竞争宽带',
	                id: 'jzbrand',
	                name: 'jzbrand',
	                margin: '5 0 10 30',
	              	value: '',
	                labelWidth: 60,
//					allowBlank: false,
//					blankText: '请输入竞争宽带',
	                width: 200,
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
	               	xtype:'numberfield',
	                fieldLabel: '合同虚拟编号',
	                id: 'big_id',
	                name: 'big_id',
	                margin: '5 0 10 30',
//	              	value: '',
	                labelWidth: 85,
	                width: 200,
	        		maxValue: 100000,
	        		minValue: 1,
	        		listeners:{
			            	specialkey:function(f,e){
			            	if (e.getKey() == e.ENTER) {
			            		document.getElementById('qbtn').click();
			            	}
			            }
			        }
            	},{
	            	xtype:'datefield',
	                fieldLabel: '光改开通时间',
	                id: 'ggtime',
	                name: 'ggtime',
	                margin: '5 0 10 30',
	                value: '',
	                labelWidth: 85,
	                width: 200,
	                format: 'Y-m',
//					allowBlank: false,
//					blankText: '请选择光改开通时间',
					editable: false
            	},{
		            		xtype:'datefield',
			                fieldLabel: '录入起始日期',
			                id: 'startDate',
			                name: 'startDate',
			                margin: '5 0 10 30',
//			              	value: Ext.Date.format(new Date(), 'Y-m-d'),
			                value: '',
			              	format: 'Y-m-d',
			              	maxValue: new Date(),
			                labelWidth: 85,
			                width: 200,
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
//			              	value: Ext.Date.format(new Date(), 'Y-m-d'),
			                value: '',
			              	format: 'Y-m-d',
			              	maxValue: new Date(),
			                labelWidth: 85,
			                width: 200,
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
		                    labelWidth: 85,
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
	            		}]
            
        });
        
        this.callParent(arguments);
        
    }
});
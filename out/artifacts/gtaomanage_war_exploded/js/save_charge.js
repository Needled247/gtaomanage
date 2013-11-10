Ext.define('My.save_charge', {
    extend: 'Ext.form.Panel',
//    requires: [
//    	'My.center_grid'
//	],
    constructor: function() {
		 		 
    	//初始化
        Ext.apply(this, {
        	
        	title: '添加收费信息',
        	region: 'center',
            margin: '0 5 5 0',
            id: 'save_charge',
            name: 'save_charge',
            layout:'border',
            frame: true,
            
            fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'qtip',
            margin: '20 0 0 0'
//            afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required"> *</span>'
        },
        
        items: [{
			region:'center',
            xtype: 'fieldset',
            autoScroll: true,
			title: '<font color="red">*</font>收费信息<font color="red">*</font>',
			//collapsible: true,
            margin: '15 10 10 10',
            layout: {
            	type: 'table',
            	columns: 2
            },
            items:[{
		            id: 'bs_name',
			        name: 'bs_name',
			        xtype:'combobox',
			        margin: '50 0 20 60',
			        fieldLabel:'选择营业厅',
			        store: Ext.data.StoreManager.lookup('bs_name'),
			        labelWidth: 90,
					width: 300,
					valueField:'id',
			      	displayField:'name',
					editable: false,
					allowBlank: false,
					blankText: '请选择营业厅'
		        }
//		        ,{
//	            	xtype:'datefield',
//	                fieldLabel: '收费日期',
//	                id: 'charge_date',
//	                name: 'charge_date',
//	                margin: '20 0 10 70',
//	              	value: Ext.Date.format(new Date(), 'Y-m-d'),
////	                value: '',
//	              	format: 'Y-m-d',
//	                labelWidth: 90,
//	                width: 290,
//					allowBlank: false,
//					blankText: '请选择收费日期',
//					editable: true
//            	}
            	,{
	            	xtype:'textfield',
	                fieldLabel: '用户账号',
	                id: 'username',
	                name: 'username',
	                margin: '50 0 20 70',
//	              	value: '',
	                labelWidth: 90,
					allowBlank: false,
					blankText: '请输入用户账号',
					enforceMaxLength: true,
	                maxLength: 30,
	                width: 300
            	},{
	            	xtype:'textfield',
	                fieldLabel: '收据号码',
	                id: 'receipt_id',
	                name: 'receipt_id',
	                margin: '20 0 20 60',
//	              	value: '',
	                labelWidth: 90,
					allowBlank: false,
					blankText: '请输入收据号码',
					enforceMaxLength: true,
	                maxLength: 40,
	                width: 300
            	},{
            		id: 'charge_type_id',
					name: 'charge_type_id',
					xtype:'combobox',
	                fieldLabel: '收费类别',
	                store: Ext.data.StoreManager.lookup('charge_type'),
	                margin: '20 0 20 70',
	                labelWidth: 90,
	                width: 300,
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
            	},{
	            	xtype:'textfield',
	                fieldLabel: '收费金额',
	                id: 'charge_amount',
	                name: 'charge_amount',
	                margin: '20 0 20 60',
	                labelWidth: 90,
					allowBlank: false,
					blankText: '请输入收费金额',
	                width: 300,
	                enforceMaxLength: true,
	                maxLength: 12,
	                regex: /(^-?\d{1,8}$)|(^-?\d{1,8}\.\d{1,2}$)/,
		            regexText: '请输入正确的收费金额'
            	},{
	                id: 'is_new',
	                name: 'is_new',
	                margin: '20 0 20 70',
	                xtype:'combobox',
	                fieldLabel: '是否新装用户',
	                labelWidth: 90,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','是'],['0','否']]
			      	}),
			      	queryMode:'local',
			      	width: 300,
			      	valueField:'id',
	      			displayField:'name',
					allowBlank: false,
					blankText: '请选择是否新装用户',
					editable: false
            	},{
	            	xtype:'textarea',
	                fieldLabel: '其它及备注',
	                id: 'note',
	                name: 'note',
	                colspan: 2,
	                rows: 5,
	                margin: '20 0 20 60',
	                labelWidth: 90,
					allowBlank: false,
					blankText: '请输入备注',
					enforceMaxLength: true,
	                maxLength: 290,
//					emptyText: '',
	                width: 670
            	},{
            		xtype:'button',
    				text: '保存收费信息',
    				margin: '50 0 10 220',
    				icon: '../../image/save_mf_btn.png',
    				scale: 'medium',
    				handler: function(){
    					var form = this.up('form').getForm();
        				if (form.isValid()) {
        					form.submit({
				            	success: function(form, action) {
					            	if(action.result.msg==0){
					            		alert("请先在主表中添加该用户信息,然后再添加收费信息");					                	
					            	}else if(action.result.msg==1){
					            		alert("收费信息保存成功");
					                    form.reset();					            			
					            	}else{
					            		alert("收费信息保存失败,请重试");
					            	}
				                },
				             	failure: function(form, action) {
	//			                 	alert("网络故障,请稍后再试");
				            	}
				        	});
        				}
    				}
            	},{
            		xtype:'button',
    				text: '重置收费信息',
    				margin: '50 0 10 80',
    				icon: '../../image/reset_btn.png',
    				scale: 'medium',
    				handler: function(){
    					this.up('form').getForm().reset();
    				}
            	}]
        }],
        
        url: 'save_charge.jsp'
        
        });
        
        this.callParent(arguments);
        
    }
});
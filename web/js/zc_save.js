Ext.define('My.zc_save', {
    extend: 'Ext.Window',
    
    constructor: function() {
		
        Ext.apply(this, {
        	id: 'zc_save',
            name: 'zc_save',
            title: '信息窗口',
        	layout:'fit',
        	width:550,
        	height:380,
        	modal:true,
        	resizable:false,
        	autoShow:true,
//        	draggable:false,
        items: [{
        	xtype: 'form',
//            margin: '5 0 5 0',
        	id:'zc_form',
        	name:'zc_form',
            layout:'fit',
            bodyStyle:'background-color:transparent',
        items: [{
            xtype: 'fieldset',
            title: '<font color="red">*</font>营业厅支出信息<font color="red">*</font>',
            margin: '10 10 10 10',
//            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 1
		            },
		            items:[{
		            	xtype:'textfield',
		                fieldLabel: '支出日期',
		                id: 'zc_date',
		                name: 'zc_date',
		                margin: '10 30 10 30',
		              	value: Ext.Date.format(new Date(), 'Y-m-d'),
		                labelWidth: 80,
		                width: 430,
		                readOnly: true,
		                allowBlank: false,
						blankText: '请选择支出日期'
	            	},{
	            		id: 'zc_bs',
				        name: 'zc_bs',
				        xtype:'combobox',
				        margin: '10 30 10 30',
				        fieldLabel:'营业厅',
				        store: Ext.data.StoreManager.lookup('bs_name'),
				        labelWidth: 80,
						width: 430,
						valueField:'id',
				      	displayField:'name',
						editable: false,						
						queryMode:'local',
		                allowBlank: false,
						blankText: '请选择营业厅'
			        },{
	            		id: 'zc_type',
				        name: 'zc_type',
				        xtype:'combobox',
				        margin: '10 30 10 30',
				        fieldLabel:'支出类型',
				        store: Ext.data.StoreManager.lookup('zc_type'),
				        labelWidth: 80,
						width: 430,
						valueField:'id',
				      	displayField:'name',
						editable: false,
						queryMode:'local',
						allowBlank: false,
						blankText: '请选择支出类型',
						value: ''
			        },{
		            	xtype:'textfield',
		                fieldLabel: '支出金额',
		                id: 'zc_amount',
		                name: 'zc_amount',
		                margin: '10 30 10 30',
		                labelWidth: 80,
						allowBlank: false,
						blankText: '请输入支出金额',
		                width: 430,
		                enforceMaxLength: true,
		                maxLength: 12,
		                regex: /(^-?\d{1,8}$)|(^-?\d{1,8}\.\d{1,2}$)/,
			            regexText: '请输入正确的支出金额'
	            	},{
		                xtype:'textarea',
		                fieldLabel: '备注信息',
		                id: 'zc_note',
		                name: 'zc_note',
		                rows: 3,
		                margin: '10 30 10 30',
		                labelWidth: 80,
		                width: 430,
		                value:'',
		                maxLength: 100,
			            enforceMaxLength: true
						//,
		                //regex: /(?![^.]*')^[^.]*$/,
			            //regexText: '字符串中不能包含单引号'
	            	},{
				        xtype: 'hiddenfield',
				        id: 'zc_id',
				        name: 'zc_id',
				        value: ''
				    }]
    		}]
    		}],            
            buttons: [
            	{
    				text: '提交信息',
    				handler: function(){
    					var form = Ext.getCmp('zc_form').getForm();
        				if (form.isValid()) {
        					var did=Ext.data.StoreManager.lookup('bs_name').findRecord('name',Ext.getCmp('zc_bs').getRawValue());        						
    						Ext.getCmp('zc_bs').setValue(did.get('id'));
    						var zc_type=Ext.getCmp('zc_type').getStore().findRecord('name',Ext.getCmp('zc_type').getRawValue());        						
    						Ext.getCmp('zc_type').setValue(zc_type.get('id'));
    						if(Ext.getCmp('zc_id').getValue()!=''){
        						var r=Ext.getCmp('zc_grid').getSelectionModel().getLastSelected();
        						if(Ext.getCmp('zc_date').getRawValue()!=r.get('zc_date')){
        							r.set('zc_date',Ext.getCmp('zc_date').getRawValue());
        						}
        						if(Ext.getCmp('zc_type').getRawValue()!=r.get('zc_type')){
        							r.set('zc_type',Ext.getCmp('zc_type').getRawValue());
        						}
        						if(Ext.getCmp('zc_amount').getValue()!=r.get('zc_amount')){
        							r.set('zc_amount',Ext.getCmp('zc_amount').getValue());
        						}
        						if(Ext.getCmp('zc_note').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')!=r.get('zc_note')){
        							r.set('zc_note',Ext.getCmp('zc_note').getValue().replace(/\r|\n/g,' ').replace(/'/g,''));
        						}
        						Ext.getCmp('zc_grid').getView().refresh();
	        				}
        						form.submit({
				                	url: 'save_zc_charge.jsp'
				                });
        						Ext.getCmp('zc_save').close();
			            	}
        				}        			      				
            	},{
    				text: '关闭窗口',
    				handler: function(){
    					Ext.getCmp('zc_save').close();
    				}        				
            	}
            ]
        });
        
        this.callParent(arguments);
        
    }
});
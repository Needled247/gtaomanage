Ext.define('My.invoice_save', {
    extend: 'Ext.Window',
    
    constructor: function() {
		
        Ext.apply(this, {
        	id: 'invoice_save',
            name: 'invoice_save',
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
        	id:'invoice_form',
        	name:'invoice_form',
            layout:'fit',
            bodyStyle:'background-color:transparent',
        items: [{
            xtype: 'fieldset',
            title: '<font color="red">*</font>请填写发票号区间<font color="red">*</font>',
            margin: '10 10 10 10',
//            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 1
		            },
		            items:[{
		            	xtype:'textfield',
		                fieldLabel: '起始号码',
		                id: 'invoice_start',
		                name: 'invoice_start',
		                margin: '10 30 10 30',
		                labelWidth: 80,
		                width: 430,
                        editable:true,
		                allowBlank: false,
						blankText: '请填写发票起始区间'
	            	},{
                        xtype:'textfield',
                        fieldLabel: '结束号码',
                        id: 'invoice_end',
                        name: 'invoice_end',
                        margin: '10 30 10 30',
                        labelWidth: 80,
                        allowBlank: false,
                        blankText: '请输入发票结束区间',
                        width: 430,
                        enforceMaxLength: true,
                        maxLength: 12
                    },{
	            		id: 'invoice_bs',
				        name: 'invoice_bs',
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
			        }]
    		}]
    		}],            
            buttons: [
            	{
                    //TODO
    				text: '提交信息',
    				handler: function(){
    					var form = Ext.getCmp('invoice_form').getForm();
        				if (form.isValid()) {
        					var did=Ext.data.StoreManager.lookup('bs_name').findRecord('name',Ext.getCmp('invoice_bs').getRawValue());
    						Ext.getCmp('invoice_bs').setValue(did.get('id'));
                            form.submit({
                                url: 'save_invoice.jsp'
                            });
                            Ext.getCmp('invoice_save').close();
			            	}
        				}        			      				
            	},{
    				text: '关闭窗口',
    				handler: function(){
    					Ext.getCmp('invoice_save').close();
    				}        				
            	}
            ]
        });
        
        this.callParent(arguments);
        
    }
});
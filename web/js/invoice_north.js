Ext.define('My.invoice_north', {
    extend: 'Ext.form.FieldSet',
    
    constructor: function() {
    	
        Ext.apply(this, {
            region:'north',
			id:'invoice_north',
			name:'invoice_north',
            title: '<font color="red">*</font>查询条件<font color="red">*</font>',
            margin: '10 10 15 10',
            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 3
		            },
		            items:[{
	            		xtype:'datefield',
		                fieldLabel: '起始日期',
		                id: 'invoice_startDate',
		                name: 'invoice_startDate',
		                margin: '5 0 10 30',
		              	value: '',
		              	format: 'Y-m-d',
		              	maxValue: new Date(),
		                labelWidth: 60,
		                width: 190,
						allowBlank: false,
						blankText: '请输入起始日期',
						editable: false,
						listeners: {
	                    	change: function(obj){
	                    		Ext.getCmp('invoice_endDate').setMinValue(obj.getRawValue());
	                    	}
	                    }
	            	},{
            		xtype:'datefield',
	                fieldLabel: '截止日期',
	                id: 'invoice_endDate',
	                name: 'invoice_endDate',
	                margin: '5 0 10 30',
	              	value: '',
	              	format: 'Y-m-d',
	              	maxValue: new Date(),
	                labelWidth: 60,
	                width: 190,	                
					allowBlank: false,
					blankText: '请输入截止日期',
					editable: false,
					listeners: {
                    	change: function(obj){
                    		Ext.getCmp('invoice_startDate').setMaxValue(obj.getRawValue());
                    	}
                    }
            	},{
                        id: 'used',
                        name: 'used',
                        margin: '5 0 10 30',
                        xtype:'combobox',
                        fieldLabel: '使用情况',
                        labelWidth: 60,
                        store:new Ext.data.SimpleStore(
                            {
                                fields:['id','name'],
                                data:[['1','已使用'],['0','未使用'],['-1','废票']]
                            }),
                        queryMode:'local',
                        width: 200,
                        value:'',
                        valueField:'id',
                        displayField:'name',
                        editable: false
                }]
            
        });
        
        this.callParent(arguments);
        
    }
});
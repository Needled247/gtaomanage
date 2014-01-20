Ext.define('My.data_north', {
    extend: 'Ext.form.FieldSet',
    
    constructor: function() {
    	
        Ext.apply(this, {
            region:'north',
			id:'data_north',
			name:'data_north',
            title: '<font color="red">*</font>查询条件<font color="red">*</font>',
            margin: '10 10 15 10',
            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 4
		            },
		            items:[
                    {
                        //通用
	            		xtype:'datefield',
		                fieldLabel: '起始日期',
		                id: 'data_start',
		                name: 'data_start',
		                margin: '5 0 10 30',
		              	value: Ext.Date.format(new Date(), 'Y-m-d'),
		              	format: 'Y-m-d',
		              	maxValue: new Date(),
		                labelWidth: 60,
		                width: 190,
						allowBlank: false,
						blankText: '请输入起始日期',
						editable: false,
						listeners: {
	                    	change: function(obj){
	                    		Ext.getCmp('data_end').setMinValue(obj.getRawValue());
	                    	}
	                    }
	            	},{
                    //通用
            		xtype:'datefield',
	                fieldLabel: '截止日期',
	                id: 'data_end',
	                name: 'data_end',
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
                    		Ext.getCmp('data_start').setMaxValue(obj.getRawValue());
                    	}
                    }
            }]
            
        });
        
        this.callParent(arguments);
        
    }
});
Ext.define('My.zc_north', {
    extend: 'Ext.form.FieldSet',
    
    constructor: function() {
    	
        Ext.apply(this, {
            region:'north',
			id:'zc_north',
			name:'zc_north',
            title: '<font color="red">*</font>支出信息查询条件<font color="red">*</font>',
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
		                id: 'startDate',
		                name: 'startDate',
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
		            id: 'zct',
			        name: 'zct',
			        xtype:'combobox',
			        margin: '5 0 10 30',
			        fieldLabel:'支出类型',
			        store: Ext.data.StoreManager.lookup('zc_type'),
			        labelWidth: 60,
					width: 190,
					valueField:'id',
			      	displayField:'name',
					value:'',
					minChars:1,
					queryMode:'local',
					editable: false
		        }]
            
        });
        
        this.callParent(arguments);
        
    }
});
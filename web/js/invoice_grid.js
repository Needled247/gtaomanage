Ext.define('My.invoice_grid', {
    extend: 'Ext.grid.Panel',
    
    constructor: function() {
    	//创建grid
    	Ext.define('invoice_grid', {
            extend: 'Ext.data.Model',
            fields: [
            			'invoice_id',
            			'used',
            			'charge_id',
                        {name:'charge_amount',type:'float'},
                        'bs_name'
            		]
        	});
        	
        	var invoice_grid_store = Ext.create('Ext.data.Store', {
        		 storeId:'invoice_grid_store',
        		 pageSize: 30,
    			 autoDestroy: true,
    			 model: 'invoice_grid',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
    		         url: 'getInvoiceInfo.jsp',
    		         reader: {
    		             type: 'json',
    		             root: 'data',
    		             totalProperty: 'totalCount'
    		         }
    		     },
    		     autoLoad: false
    		 });
    		 
    		 
    	
        Ext.apply(this, {
            region: 'center',
            id: 'invoice_grid',
            name: 'invoice_grid',
            store: invoice_grid_store,
            selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),
            border: false,
            columns: [{
                header: '发票号',
                dataIndex: 'invoice_id',
                width: 120
            },{
                header: '使用情况',
                dataIndex: 'used',
                width: 120
            },{
                header: '交易ID',
                dataIndex: 'charge_id',
                width: 120
            },{
                header: '交易金额',
                dataIndex: 'charge_amount',
                width: 160,
                renderer : function(val) {
			        if (val >= 0) {
			            return '<b>￥<font color="green">' + val + '</font></b>';
			        } else if (val < 0) {
			            return '<b>￥<font color="red">' + val + '</font></b>';
			        }
	        		return val;
    			}
            },{
                header: '营业厅',
                dataIndex: 'bs_name',
                width: 100
            }],

        	bbar: new Ext.PagingToolbar({
                store: invoice_grid_store,
                displayInfo: true,
                displayMsg: '本页显示{0}-{1}行 共<b><font color="red">{2}</font></b>行',
                emptyMsg: '没有可用数据',
                listeners: {
    	            beforechange: function(){
    	            	
    	            }
                }
            })            
        });
        
        this.callParent(arguments);
        
    }
});
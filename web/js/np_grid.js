Ext.define('My.np_grid', {
    extend: 'Ext.grid.Panel',
    
    constructor: function() {
    	//创建grid
    	Ext.define('np_grid', {
            extend: 'Ext.data.Model',
            fields: [
            			'orderid',
            			'userid',
            			'quota',
                        'quotanum',
                        'amount',
                        'tel',
                        'beizhu',
                        'dealtime',
                        'type'
            		]
        	});
        	
        	var np_grid_store = Ext.create('Ext.data.Store', {
        		 storeId:'np_grid_store',
        		 pageSize: 30,
    			 autoDestroy: true,
    			 model: 'np_grid',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
    		         url: 'getNetPayInfo.jsp',
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
            id: 'np_grid',
            name: 'np_grid',
            store: np_grid_store,
            border: false,
            columns: [{
                header: '订单号',
                dataIndex: 'orderid',
                width: 200
            },{
                header: '账号',
                dataIndex: 'userid',
                width: 120
            },{
                header: '交易金额',
                dataIndex: 'amount',
                width: 120,
                renderer : function(val) {
                    if (val >= 0) {
                        return '<b>￥<font color="green">' + val + '</font></b>';
                    } else if (val < 0) {
                        return '<b>￥<font color="red">' + val + '</font></b>';
                    }
                    return val;
                }
            },{
                header: '电话',
                dataIndex: 'tel',
                width:120
            },{
                header: '备注',
                dataIndex: 'beizhu',
                width:300
            },{
                header: '交易时间',
                dataIndex: 'dealtime',
                width:120
            },{
                header: '交易类型',
                dataIndex: 'type',
                width:120
            }]
        });
        
        this.callParent(arguments);
        
    }
});
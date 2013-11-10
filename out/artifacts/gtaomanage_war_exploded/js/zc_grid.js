Ext.define('My.zc_grid', {
    extend: 'Ext.grid.Panel',
    
    constructor: function() {
    	
    	//创建grid
    	Ext.define('zc_grid', {
            extend: 'Ext.data.Model',
            fields: [
    		            //{ name: 'ask_date', type: 'date', dateFormat: 'Y-m-d' },
    		            //{ name: 'ask_time', type: 'date', dateFormat: 'H:i:s' },
            			'zc_date',
            			'zc_bs',
            			'zc_type',
            			'zc_note',
            			'zc_id',
            			{name:'zc_amount',type:'float'},          			
            			'save_admin',
            			'save_time'
            		]
        	});
        	
        	var zc_grid_store = Ext.create('Ext.data.Store', {
//        		 remoteSort:true,
        		 storeId:'zc_grid_store',
        		 pageSize: 30,
    			 autoDestroy: true,
    			 model: 'zc_grid',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
    		         url: 'getZcInfo.jsp',
    		         reader: {
    		             type: 'json',
    		             root: 'data',
    		             totalProperty: 'totalCount'
    		         }
    		     },
//    		     sorters: [{
//    	            property: 'ask_date',
//    	            direction: 'DESC'
//            	 },{
//    	            property: 'ask_time',
//    	            direction: 'DESC'
//            	 }],
    		     autoLoad: false
    		 });
    		 
    		 
    	
        Ext.apply(this, {
            region: 'center',
            id: 'zc_grid',
            name: 'zc_grid',
            store: zc_grid_store,
//            loadMask: true,
//            forceFit: true,
            border: false,
//            frame: true,
//            viewConfig: {forceFit: true},            
            columns: [{
                header: '营业厅',
                dataIndex: 'zc_bs',
                width: 120
            },{
                header: '支出日期',
                dataIndex: 'zc_date',
                width: 120
            },{
                header: '支出类型',
                dataIndex: 'zc_type',
                width: 120
            },{
                header: '支出金额',
                dataIndex: 'zc_amount',
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
                header: '备注信息',
                dataIndex: 'zc_note',
                width: 600
            }],
            
            plugins: [{
	            ptype: 'rowexpander',	            
	            rowBodyTpl : [
	                '<p><b>录入人&nbsp;:&nbsp;<font color="#8B0000">{save_admin}</font></b>',
	                '<b style="margin-left:40px;">录入时间&nbsp;:&nbsp;<font color="#8B0000">{save_time}</font></b></p>'
	            ]
        	}],
            
			
        
        	bbar: new Ext.PagingToolbar({
                store: zc_grid_store,
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
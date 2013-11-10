Ext.define('My.log_window', {
    extend: 'Ext.Window',
    
    constructor: function() {
		
    	    Ext.define('log_grid', {
            extend: 'Ext.data.Model',
            fields: [
    		            //{ name: 'ask_date', type: 'date', dateFormat: 'Y-m-d' },
    		            //{ name: 'ask_time', type: 'date', dateFormat: 'H:i:s' },
            			'log_id',
            			'op_did',
            			'op_rname',
            			'op_time',
            			'op_desc',
            			'op_type'
            		]
        	});
        	
        	var log_grid_store = Ext.create('Ext.data.Store', {
//        		 remoteSort:true,
        		 storeId:'log_grid_store',
        		 pageSize: 30,
    			 autoDestroy: true,
    			 model: 'log_grid',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
    		         url: 'getLogInfo.jsp',
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
        	id: 'log_window',
            name: 'log_window',
            title: '操作记录',
        	layout:'fit',
        	width:900,
        	height:600,
        	modal:true,
        	resizable:false,
        	autoShow:true,
//        	draggable:false,
        items: [{
        	xtype: 'grid',
//            margin: '5 0 5 0',
        	id:'log_grid',
        	name:'log_grid',
        	store: log_grid_store,
//            layout:'fit',
//            bodyStyle:'background-color:transparent',
            columns: [{
                header: '部门',
                dataIndex: 'op_did',
                width: 180
            },{
                header: '操作人',
                dataIndex: 'op_rname',
                width: 160
            },{
                header: '操作时间',
                dataIndex: 'op_time',
                width: 240
            },{
                header: '操作类别',
                dataIndex: 'op_type',
                width: 280
            }],
            
            plugins: [{
	            ptype: 'rowexpander',	            
	            rowBodyTpl : [
	                '<p><b><font color="#8B0000">{op_desc}</font></b></p>'
	            ]
        	}],
            
//            tbar: [{
//                text: 'Add Employee',
//                handler : function() {
//                	grid_store.load({　params:　{　start:　0, limit: 25 }　});
//                }
        
        	bbar: new Ext.PagingToolbar({
                store: log_grid_store,
                displayInfo: true,
                displayMsg: '本页显示{0}-{1}行 共<b><font color="red">{2}</font></b>行',
                emptyMsg: '没有可用数据',
                listeners: {
    	            beforechange: function(){
    	            	
    	            }
                }
            })
          }]
        });
        
        this.callParent(arguments);
        
    }
});
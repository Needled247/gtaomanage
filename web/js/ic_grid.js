Ext.define('My.ic_grid', {
    extend: 'Ext.grid.Panel',
    
    constructor: function() {
    	
    	//创建grid
    	Ext.define('ic_grid', {
            extend: 'Ext.data.Model',
            fields: [
    		            //{ name: 'ask_date', type: 'date', dateFormat: 'Y-m-d' },
    		            //{ name: 'ask_time', type: 'date', dateFormat: 'H:i:s' },
            			'contract_name',
            			'big_id',
            			'hall_id',
            			'income_date',
            			'income_total',
            			'income_detail',
            			'xzl',
            			'gg',
            			'xz',
            			'xk'
            		]
        	});
        	
        	var ic_grid_store = Ext.create('Ext.data.Store', {
//        		 remoteSort:true,
        		 pageSize: 30,
    			 autoDestroy: true,
    			 model: 'ic_grid',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
    		         url: 'getIcInfo.jsp',
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
            margin: '10 0 0 0',
            id: 'ic_grid',
            name: 'ic_grid',
            store: ic_grid_store,
//            loadMask: true,
//            forceFit: true,
            border: false,
//            frame: true,
//            viewConfig: {forceFit: true},
            
            columns: [{
                header: '日期',
                dataIndex: 'income_date',
                width: 120
            },{
                header: '营业厅',
                dataIndex: 'hall_id',
                width: 130
            },{
                header: '虚拟编号',
                dataIndex: 'big_id',
                width: 90
            },{
                header: '总收入',
                dataIndex: 'income_total',
                width: 200
            },{
                header: '各项收入汇总明细',
                dataIndex: 'income_detail',
                width: 660
            },{
                header: '合同名称',
                dataIndex: 'contract_name',
                width: 280
            },{
                header: '写字楼收入',
                dataIndex: 'xzl',
                width: 120
            },{
                header: '光改收入',
                dataIndex: 'gg',
                width: 120
            },{
                header: '新装收入',
                dataIndex: 'xz',
                width: 120
            },{
                header: '新开小区收入',
                dataIndex: 'xk',
                width: 120
            }],
            
//            plugins: [{
//	            ptype: 'rowexpander',	            
//	            rowBodyTpl : [
//	                '<p><b style="margin-left:40px;">小区开通时间&nbsp;:&nbsp;<font color="green">{xq_open_date}</font></b>',
//	                '<b style="margin-left:40px;">是否光改&nbsp;:&nbsp;<font color="green">{is_gg}</font></b>',
//	                '<b style="margin-left:40px;">光改开通时间&nbsp;:&nbsp;<font color="green">{gg_open_date}</font></b>',
//	                '<b style="margin-left:40px;">是否新开小区&nbsp;:&nbsp;<font color="green">{is_xk}</font></b>',
//	                '<b style="margin-left:40px;">是否有竞争&nbsp;:&nbsp;<font color="green">{is_jz}</font></b></p>',
//	                '<p><b style="margin-left:40px;">操作人&nbsp;:&nbsp;<font color="green">{save_admin}</font></b>',
//	                '<b style="margin-left:40px;">修改时间&nbsp;:&nbsp;<font color="green">{save_time}</font></b></p>'
//	            ]
//        	}],
            
//            tbar: [{
//                text: 'Add Employee',
//                handler : function() {
//                	grid_store.load({　params:　{　start:　0, limit: 25 }　});
//                }
        
        	bbar: new Ext.PagingToolbar({
                store: ic_grid_store,
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
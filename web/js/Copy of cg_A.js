Ext.define('My.cg_A', {
    extend: 'Ext.grid.Panel',
    
    constructor: function() {
    	
    	//创建grid
    	Ext.define('cg_A', {
            extend: 'Ext.data.Model',
            fields: [
    		            //{ name: 'ask_date', type: 'date', dateFormat: 'Y-m-d' },
    		            //{ name: 'ask_time', type: 'date', dateFormat: 'H:i:s' },
            			'username',
            			'realname',
            			'mealtype',
            			'starttime',
            			'endtime',
            			'address',
            			'group_id',
            			'leaflet_no'
            		]
        	});
        	
        	var cg_A_store = Ext.create('Ext.data.Store', {
//        		 remoteSort:true,
    			 autoDestroy: true,
    			 model: 'cg_A',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
    		         url: 'getMfInfo.jsp',
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
    		     autoLoad: true
    		 });
    	
        Ext.apply(this, {
//        	title: '报装跟进修改查询',
            region: 'center',
            margin: '8 0 0 0',
            id: 'cg_A',
            name: 'cg_A',
            store: cg_A_store,
//            loadMask: true,
//            forceFit: true,
            border: false,
//            frame: true,
//            viewConfig: {forceFit: true},
            
            columns: [{
                header: '用户账号',
                dataIndex: 'username',
                width: 100
            },{
                header: '用户姓名',
                dataIndex: 'realname',
                width: 100
            },{
                header: '使用餐型',
                dataIndex: 'mealtype',
                width: 200
            },{
                header: '启用时间',
                dataIndex: 'starttime',
                width: 100
            },{
                header: '截止时间',
                dataIndex: 'endtime',
                width: 100
            },{
                header: '详细地址',
                dataIndex: 'address',
                width: 200
            }],
            
//            tbar: [{
//                text: 'Add Employee',
//                handler : function() {
//                	grid_store.load({　params:　{　start:　0, limit: 25 }　});
//                }
//        	},{
//        		text: 'Remove Employee',
//        		handler : function() {
//        			var header=[
//        				{
//			                header: '联系人',
//			                dataIndex: 'linkman',
//			                //width: 90,
//			                editor: {
//			                    readOnly: true
//			                }
//            			}
//        			];
//        			alert(Ext.getCmp("center_grid").columns);
//        			Ext.getCmp("center_grid").bind(grid_store);
        			
//                	Ext.getCmp("center_grid").reconfigure(grid_store, header);  //定义grid的store和column    
//			        Ext.getCmp("center_grid").render();
//                }
//        	}],	
        
        	bbar: new Ext.PagingToolbar({
//            	pageSize: 25,
                store: cg_A_store,
                displayInfo: true,
                displayMsg: '本页显示{0}-{1}行 共{2}行',
                emptyMsg: '没有可用数据',
                listeners: {
    	            beforechange: function(){
    	            	//grid_store.removeAll();
    	            }
                }
            }),
//            plugins: [rowEditing],
            plugins: [
            	{
	            	ptype: 'rowexpander',
	            	rowBodyTpl : [
	                	'<p><b>营业厅分组:</b>第{group_id}组     <b>宣传单号:</b>{leaflet_no}号单</p>'
	            	]
        		}
        	],
            listeners: {
                
            }
            
        });
        
        this.callParent(arguments);
        
    }
});
﻿Ext.define('My.qb_grid', {
    extend: 'Ext.grid.Panel',
    
    constructor: function() {
    	
    	//创建grid
    	Ext.define('qb_grid', {
            extend: 'Ext.data.Model',
            fields: [
    		            //{ name: 'ask_date', type: 'date', dateFormat: 'Y-m-d' },
    		            //{ name: 'ask_time', type: 'date', dateFormat: 'H:i:s' },
            			'contract_name',
            			'big_id',
            			'hall_id',
            			'contract_type',
            			'sign_date',
            			'xq_open_date',
            			'gg_open_date',
            			'is_gg',
            			'is_xk',
            			'is_jz',
            			'jz_brand',
            			'live_num',
            			'gg_live_num',
            			'save_time',
            			'save_admin',
            			'bi_id'
            		]
        	});
        	
        	var qb_grid_store = Ext.create('Ext.data.Store', {
//        		 remoteSort:true,
        		 pageSize: 30,
    			 autoDestroy: true,
    			 model: 'qb_grid',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
    		         url: 'getQbInfo.jsp',
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
            id: 'qb_grid',
            name: 'qb_grid',
            store: qb_grid_store,
//            loadMask: true,
//            forceFit: true,
            border: false,
//            frame: true,
//            viewConfig: {forceFit: true},
            
            columns: [{
                header: '营业厅',
                dataIndex: 'hall_id',
                width: 110
            },{
                header: '虚拟编号',
                dataIndex: 'big_id',
                width: 90
            },{
                header: '合同名称',
                dataIndex: 'contract_name',
                width: 300
            },{
                header: '合同类型',
                dataIndex: 'contract_type',
                width: 100
            },{
                header: '签约时间',
                dataIndex: 'sign_date',
                width: 110
            },{
                header: '住户数',
                dataIndex: 'live_num',
                width: 90
            },{
                header: '光改住户数',
                dataIndex: 'gg_live_num',
                width: 100
            },{
                header: '竞争宽带',
                dataIndex: 'jz_brand',
                width: 180
            }],
            
            plugins: [{
	            ptype: 'rowexpander',	            
	            rowBodyTpl : [
	                '<p><b style="margin-left:40px;">小区开通时间&nbsp;:&nbsp;<font color="#8B0000">{xq_open_date}</font></b>',
	                '<b style="margin-left:40px;">是否光改&nbsp;:&nbsp;<font color="#8B0000">{is_gg}</font></b>',
	                '<b style="margin-left:40px;">光改开通时间&nbsp;:&nbsp;<font color="#8B0000">{gg_open_date}</font></b>',
	                '<b style="margin-left:40px;">是否新开小区&nbsp;:&nbsp;<font color="#8B0000">{is_xk}</font></b>',
	                '<b style="margin-left:40px;">是否有竞争&nbsp;:&nbsp;<font color="#8B0000">{is_jz}</font></b></p>',
	                '<p><b style="margin-left:40px;">操作人&nbsp;:&nbsp;<font color="#8B0000">{save_admin}</font></b>',
	                '<b style="margin-left:40px;">修改时间&nbsp;:&nbsp;<font color="#8B0000">{save_time}</font></b></p>'
	            ]
        	}],
            
//            tbar: [{
//                text: 'Add Employee',
//                handler : function() {
//                	grid_store.load({　params:　{　start:　0, limit: 25 }　});
//                }
        
        	bbar: new Ext.PagingToolbar({
                store: qb_grid_store,
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
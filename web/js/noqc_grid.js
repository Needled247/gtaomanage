Ext.define('My.noqc_grid', {
    extend: 'Ext.grid.Panel',
    title:'查询结果',
    
    constructor: function() {
    	
    	//创建grid
    	Ext.define('noqc_grid', {
            extend: 'Ext.data.Model',
            fields: [
    		            //{ name: 'ask_date', type: 'date', dateFormat: 'Y-m-d' },
    		            //{ name: 'ask_time', type: 'date', dateFormat: 'H:i:s' },
            			'bs_name',
            			'charge_date',
            			'realname',
            			'tel',
            			'addr',
            			'receipt_id',
            			'charge_type',
            			'pay_type',
            			{name:'charge_amount',type:'float'},
            			'note',
            			'contract_name',            			
            			'save_admin',
            			'save_time',
            			'charge_id'
            		]
        	});
        	
        	var noqc_grid_store = Ext.create('Ext.data.Store', {
//        		 remoteSort:true,
        		 storeId:'noqc_grid_store',
        		 pageSize: 30,
    			 autoDestroy: true,
    			 model: 'noqc_grid',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
    		         url: 'getnoQcInfo.jsp',
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
            id: 'noqc_grid',
            name: 'noqc_grid',
            store: noqc_grid_store,
//            loadMask: true,
//            forceFit: true,
            border: false,
//            frame: true,
//            viewConfig: {forceFit: true},            
            columns: [{
                header: '营业厅',
                dataIndex: 'bs_name',
                width: 110
            },{
                header: '收费日期',
                dataIndex: 'charge_date',
                width: 110
            },{
                header: '用户姓名',
                dataIndex: 'realname',
                width: 100
            },{
                header: '联系电话',
                dataIndex: 'tel',
                width: 200
            },{
                header: '用户住址',
                dataIndex: 'addr',
                width: 170
            },{
                header: '收据号码',
                dataIndex: 'receipt_id',
                width: 150
            },{
                header: '支付方式',
                dataIndex: 'pay_type',
                width: 140
            },{
                header: '收费类别',
                dataIndex: 'charge_type',
                width: 140
            },{
                header: '收费金额',
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
            }],
            
            plugins: [{
	            ptype: 'rowexpander',	            
	            rowBodyTpl : [
	                '<p><b>备注信息&nbsp;:&nbsp;<font color="#8B0000">{note}</font></b></p>',	                
	                '<p><b>所属合同&nbsp;:&nbsp;<font color="#8B0000">{contract_name}</font></b></p>',
	                '<p><b>录入人&nbsp;:&nbsp;<font color="#8B0000">{save_admin}</font></b>',
	                '<b style="margin-left:40px;">录入时间&nbsp;:&nbsp;<font color="#8B0000">{save_time}</font></b></p>'
	            ]
        	}],
            

        
        	bbar: new Ext.PagingToolbar({
                store: noqc_grid_store,
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
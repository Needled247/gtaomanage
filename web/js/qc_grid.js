Ext.define('My.qc_grid', {
    extend: 'Ext.grid.Panel',
    title:'查询结果',
    
    constructor: function() {
    	
    	//创建grid
    	Ext.define('qc_grid', {
            extend: 'Ext.data.Model',
            fields: [
    		            //{ name: 'ask_date', type: 'date', dateFormat: 'Y-m-d' },
    		            //{ name: 'ask_time', type: 'date', dateFormat: 'H:i:s' },
            			'bs_name',
            			'charge_date',
            			'username',
            			'is_new',
            			'is_gg',
            			'is_xzl',
            			'is_xk',
            			'group_id',
            			'realname',
            			'addr',
            			'tel',
            			'receipt_id',
            			'charge_type1',
                        'charge_type2',
                        'charge_type3',
                        'charge_type4',
            			'pay_type',
            			{name:'charge_amount',type:'float'},
            			'note',
            			'contract_name',            			
            			'save_admin',
            			'save_time',
            			'charge_id',
            			'fc_actsub',
            			'fc_act'
            		]
        	});
        	
        	var qc_grid_store = Ext.create('Ext.data.Store', {
//        		 remoteSort:true,
        		 storeId:'qc_grid_store',
        		 pageSize: 30,
    			 autoDestroy: true,
    			 model: 'qc_grid',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
                     //TODO:HERE
    		         url: 'getQcInfo.jsp',
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
            id: 'qc_grid',
            name: 'qc_grid',
            store: qc_grid_store,
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
                header: '所属片区',
                dataIndex: 'group_id',
                width: 90
            },{
                header: '用户姓名',
                dataIndex: 'realname',
                width: 100
            },{
                header: '用户账号',
                dataIndex: 'username',
                width: 100
            },{
                header: '联系电话',
                dataIndex: 'tel',
                width: 170
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
                width: 130
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
	                '<p><b>活动名称&nbsp;:&nbsp;<font color="#8B0000">{fc_act}</font></b>',
	                '<b style="margin-left:40px;">套餐名称&nbsp;:&nbsp;<font color="#8B0000">{fc_actsub}</font></b></p>',
	                '<p><b>备注信息&nbsp;:&nbsp;<font color="#8B0000">{note}</font></b></p>',
	                '<p><b>是否新装用户&nbsp;:&nbsp;<font color="#8B0000">{is_new}</font></b>',
	                '<b style="margin-left:40px;">是否光改小区&nbsp;:&nbsp;<font color="#8B0000">{is_gg}</font></b>',
	                '<b style="margin-left:40px;">是否写字楼&nbsp;:&nbsp;<font color="#8B0000">{is_xzl}</font></b>',
	                '<b style="margin-left:40px;">是否新开小区&nbsp;:&nbsp;<font color="#8B0000">{is_xk}</font></b>',
	                '<b style="margin-left:40px;">录入人&nbsp;:&nbsp;<font color="#8B0000">{save_admin}</font></b>',
	                '<b style="margin-left:40px;">录入时间&nbsp;:&nbsp;<font color="#8B0000">{save_time}</font></b></p>',
	                '<p><b>所属合同&nbsp;:&nbsp;<font color="#8B0000">{contract_name}</font></b></p>'	                
	            ]
        	}],
            

        
        	bbar: new Ext.PagingToolbar({
                store: qc_grid_store,
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
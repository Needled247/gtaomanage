Ext.define('My.cg_A', {
    extend: 'Ext.grid.Panel',
    
    constructor: function() {
    	
    	//创建grid
    	Ext.define('cg_A', {
            extend: 'Ext.data.Model',
            fields: [
    		            //{ name: 'ask_date', type: 'date', dateFormat: 'Y-m-d' },
    		            //{ name: 'ask_time', type: 'date', dateFormat: 'H:i:s' },
            			'bs_name',
    		            'username',
            			'realname',
            			'mealtype',
            			'starttime',
            			'opt_time',            			
            			'endtime',
            			'isit',
            			'address',
            			'group_id',
            			'leaflet_no',
            			'tel',
            			'email',
            			'house_type',
            			'line_type',
            			'save_admin',
            			'save_time',
            			'contract_name',
            			'mf_retime',
            			'mf_gm',
            			'mf_gg',
            			'mf_cxnote',
            			'mf_hdnote',
            			'mf_sbnote',
            			'mf_zhnote',
            			'mf_tsnote'
            		]
        	});
        	
        	var cg_A_store = Ext.create('Ext.data.Store', {
//        		 remoteSort:true,
        		 pageSize: 30,
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
    		     autoLoad: false
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
                header: '所属营业厅',
                dataIndex: 'bs_name',
                width: 110
            },{
                header: '启用时间',
                dataIndex: 'starttime',
                width: 90
            },{
                header: '重新启用时间',
                dataIndex: 'mf_retime',
                width: 100
            },{
                header: '社区分组',
                dataIndex: 'group_id',
                width: 90
            },{
                header: '宣传单号',
                dataIndex: 'leaflet_no',
                width: 90
            },{
                header: '用户账号',
                dataIndex: 'username',
                width: 100
            },{
                header: '帐号变更备注',
                dataIndex: 'mf_zhnote',
                width: 130
            },{
                header: '用户姓名',
                dataIndex: 'realname',
                width: 90
            },{
                header: '使用餐型',
                dataIndex: 'mealtype',
                width: 180
            },{
                header: '截止时间',
                dataIndex: 'endtime',
                width: 100
            },{
                header: '详细地址',
                dataIndex: 'address',
                width: 190
            },{
                header: '联系电话',
                dataIndex: 'tel',
                width: 200
            }],
            
            plugins: [{
	            ptype: 'rowexpander',	            
	            rowBodyTpl : [
	            	'<p><b>邮箱地址&nbsp;:&nbsp;<font color="#8B0000">{email}</font></b>',
	                '<b style="margin-left:40px;">房屋性质&nbsp;:&nbsp;<font color="#8B0000">{house_type}</font></b>',
	                '<b style="margin-left:40px;">走线方式&nbsp;:&nbsp;<font color="#8B0000">{line_type}</font></b>',	                
	                '<b style="margin-left:40px;">录入人&nbsp;:&nbsp;<font color="#8B0000">{save_admin}</font></b>',
	                '<b style="margin-left:40px;">录入时间&nbsp;:&nbsp;<font color="#8B0000">{save_time}</font></b></p>',
	                '<p><b>光猫类型&nbsp;:&nbsp;<font color="#8B0000">{mf_gm}</font></b>',
	                '<b style="margin-left:40px;">光改情况&nbsp;:&nbsp;<font color="#8B0000">{mf_gg}</font></b>',
	                '<b style="margin-left:40px;">是否IT卡用户&nbsp;:&nbsp;<font color="#8B0000">{isit}</font></b>',
	                '<b style="margin-left:40px;">光纤开通时间&nbsp;:&nbsp;<font color="#8B0000">{opt_time}</font></b></p>',	                
	                '<p><b>所属合同&nbsp;:&nbsp;<font color="#8B0000">{contract_name}</font></b></p>',	      
	                '<p><b>餐型备注&nbsp;:&nbsp;<font color="#8B0000">{mf_cxnote}</font></b></p>',
	                '<p><b>活动备注&nbsp;:&nbsp;<font color="#8B0000">{mf_hdnote}</font></b></p>',
	                '<p><b>设备备注&nbsp;:&nbsp;<font color="#8B0000">{mf_sbnote}</font></b></p>',
	                '<p><b>特殊备注&nbsp;:&nbsp;<font color="#8B0000">{mf_tsnote}</font></b></p>'
	            ]
        	}],
            
//            tbar: [{
//                text: 'Add Employee',
//                handler : function() {
//                	grid_store.load({　params:　{　start:　0, limit: 25 }　});
//                }
        
        	bbar: new Ext.PagingToolbar({
                store: cg_A_store,
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
Ext.define('My.cg_A', {
    extend: 'Ext.grid.Panel',
    title:'查询结果',
    
    constructor: function() {
         var cgModel;
        var cgStore;
    	//创建grid
        cgModel = Ext.define('cg_A', {
            extend: 'Ext.data.Model',
            title:'查询结果',
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
            			'mf_tsnote',
                        'onet_prop_value',
                        'user_prop_value',
                        'net_prop_value',
                        'user_mobile',
                        'user_phone',
                        'weixin',
                        'longNum',
                        'shortNum',
                        'balance',
                        'tt_open',
                        'tt_close',
                        'letv_start',
                        'letv_end',
                        'letv_mac',
                        'it_end',
                        'gm_mac',
                        'scertno',
                        'act_name',
                        'presentation'
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

        cgStore = Ext.apply(this, {
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
                header: '用户账号',
                dataIndex: 'username',
                width: 100
            },{
                header: '用户姓名',
                dataIndex: 'realname',
                width: 90
            },{
                header: '联系电话',
                dataIndex: 'tel',
                width: 200
            },{
                header: '截止时间',
                dataIndex: 'endtime',
                width: 100
            },{
                header: '启用时间',
                dataIndex: 'starttime',
                width: 90
            },{
                header: '重新启用时间',
                dataIndex: 'mf_retime',
                width: 100
            },
            {
                header: '身份证号',
                dataIndex: 'scertno',
                width: 180
            },{
                header: '网络性质',
                dataIndex: 'net_prop_value',
                width: 90
            },{
                header: '帐号变更备注',
                dataIndex: 'mf_zhnote',
                width: 130
            },{
                header: '使用餐型',
                dataIndex: 'mealtype',
                width: 180
            },{
                header: '详细地址',
                dataIndex: 'address',
                width: 190
            }],
            
            plugins: [{
	            ptype: 'rowexpander',
                rowBodyTpl : [
                    '<p><b>参加活动&nbsp;:&nbsp;<font color="#8B0000">{act_name}</font></b>',
                    '<b style="margin-left:40px;">赠送月份&nbsp;:&nbsp;<font color="#8B0000">{presentation}</font></b></p>',
	            	'<p><b>邮箱地址&nbsp;:&nbsp;<font color="#8B0000">{email}</font></b>',
                    '<b style="margin-left:40px;">社区分组&nbsp;:&nbsp;<font color="#8B0000">{group_id}</font></b>',
                    '<b style="margin-left:40px;">宣传单号&nbsp;:&nbsp;<font color="#8B0000">{leaflet_no}</font></b>',
	                '<b style="margin-left:40px;">房屋性质&nbsp;:&nbsp;<font color="#8B0000">{house_type}</font></b>',
	                '<b style="margin-left:40px;">走线方式&nbsp;:&nbsp;<font color="#8B0000">{line_type}</font></b>',	                
	                '<b style="margin-left:40px;">录入人&nbsp;:&nbsp;<font color="#8B0000">{save_admin}</font></b>',
	                '<b style="margin-left:40px;">录入时间&nbsp;:&nbsp;<font color="#8B0000">{save_time}</font></b></p>',
                    '<p><b>原网络性质&nbsp;:&nbsp;<font color="#8B0000">{onet_prop_value}</font></b>',
                    '<b style="margin-left:40px;">用户性质&nbsp;:&nbsp;<font color="#8B0000">{user_prop_value}</font></b>',
                    '<p><b>使用人电话&nbsp;:&nbsp;<font color="#8B0000">{user_mobile}</font></b>',
                    '<b style="margin-left:40px;">固定电话&nbsp;:&nbsp;<font color="#8B0000">{user_phone}</font></b>',
                    '<b style="margin-left:40px;">是否关注微信&nbsp;:&nbsp;<font color="#8B0000">{weixin}</font></b></p>',
	                '<p><b>光猫类型&nbsp;:&nbsp;<font color="#8B0000">{mf_gm}</font></b>',
                    '<b style="margin-left:40px;">光猫MAC地址&nbsp;:&nbsp;<font color="#8B0000">{gm_mac}</font></b>',
	                '<b style="margin-left:40px;">光改情况&nbsp;:&nbsp;<font color="#8B0000">{mf_gg}</font></b>',
	                '<b style="margin-left:40px;">是否IT卡用户&nbsp;:&nbsp;<font color="#8B0000">{isit}</font></b>',
                    '<b style="margin-left:40px;">IT卡到期时间&nbsp;:&nbsp;<font color="#8B0000">{it_end}</font></b>',
	                '<b style="margin-left:40px;">光纤开通时间&nbsp;:&nbsp;<font color="#8B0000">{opt_time}</font></b></p>',	                
	                '<p><b>所属合同&nbsp;:&nbsp;<font color="#8B0000">{contract_name}</font></b></p>',	      
	                '<p><b>餐型/带宽&nbsp;:&nbsp;<font color="#8B0000">{mf_cxnote}</font></b></p>',
	                '<p><b>活动备注&nbsp;:&nbsp;<font color="#8B0000">{mf_hdnote}</font></b></p>',
	                '<p><b>设备备注&nbsp;:&nbsp;<font color="#8B0000">{mf_sbnote}</font></b></p>',
	                '<p><b>特殊备注&nbsp;:&nbsp;<font color="#8B0000">{mf_tsnote}</font></b></p>',
                    '<p><b>铁通长号&nbsp;:&nbsp;<font color="#8B0000">{longNum}</font></b>',
                    '<b style="margin-left:40px;">铁通短号&nbsp;:&nbsp;<font color="#8B0000">{shortNum}</font></b>',
                    '<b style="margin-left:40px;">赠送时间&nbsp;:&nbsp;<font color="#8B0000">{balance}</font></b>',
                    '<b style="margin-left:40px;">开通时间&nbsp;:&nbsp;<font color="#8B0000">{tt_open}</font></b>',
                    '<b style="margin-left:40px;">到期时间&nbsp;:&nbsp;<font color="#8B0000">{tt_close}</font></b></p>',
                    '<p><b>乐视开通时间&nbsp;:&nbsp;<font color="#8B0000">{letv_start}</font></b>',
                    '<b style="margin-left:40px;">乐视到期时间&nbsp;:&nbsp;<font color="#8B0000">{letv_end}</font></b>',
                    '<b style="margin-left:40px;">乐视盒子MAC地址&nbsp;:&nbsp;<font color="#8B0000">{letv_mac}</font></b></p>'
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
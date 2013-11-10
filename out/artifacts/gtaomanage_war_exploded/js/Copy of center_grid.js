Ext.define('My.center_grid', {
    extend: 'Ext.grid.Panel',
    constructor: function() {
    	
    	//创建grid
    	Ext.define('center_grid', {
            extend: 'Ext.data.Model',
            fields: [
    		            //{ name: 'ask_date', type: 'date', dateFormat: 'Y-m-d' },
    		            //{ name: 'ask_time', type: 'date', dateFormat: 'H:i:s' },
            			'ask_date',
            			'ask_time',
    		            'business',
    		            'username',
    					'tel',
    					'address',
    					'source_type',
    					'ask_describe',
    					'admin',
    					'is_oa',
    					'note',
    					'is_setup',
    					'no_setup_reason',
    					'linkman'
            		]
        	});
        	
        	var grid_store = Ext.create('Ext.data.Store', {
//        		 remoteSort:true,
    			 autoDestroy: true,
    			 model: 'center_grid',
    		     proxy: {
    		         type: 'ajax',
    		         url: 'get_grid.jsp',
    		         reader: {
    		             type: 'json',
    		             root: 'data',
    		             totalProperty: 'totalCount'
    		         }
    		     },
    		     sorters: [{
    	            property: 'ask_date',
    	            direction: 'DESC'
            	 },{
    	            property: 'ask_time',
    	            direction: 'DESC'
            	 }],
    		     autoLoad: false
    		 });
    	
    	//创建营业厅
		Ext.define('combo_business', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'}
		     ]
		 });

		 var combo_business = Ext.create('Ext.data.Store', {
			 model: 'combo_business',
		     proxy: {
		         type: 'ajax',
		         url: 'combo_business.jsp',
		         reader: {
		             type: 'json',
		             root: 'combo'
		         }
		     },
		     autoLoad: false
		 });
		 
		 var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
		        clicksToMoveEditor: 2,
		        autoCancel: false,
				listeners: {
						        edit: function(editor,e){
						        	alert(e.record.data.is_oa);
						        }
						    }
		    	});
    	
        Ext.apply(this, {
//        	title: '报装跟进修改查询',
//            region: 'center',
            margin: '8 0 0 0',
            id: 'center_grid',
            name: 'center_grid',
            store: grid_store,
            loadMask: true,
            forceFit: true,
            border: false,
//            frame: true,
//            viewConfig: {forceFit: true},
            
            columns: [{
                header: '来电日期',
                dataIndex: 'ask_date',
                //width: 90,
                editor: {
                    readOnly: true
                }
            },{
                header: '来电时间',
                dataIndex: 'ask_time',
                //width: 90,
                editor: {
                    readOnly: true
                }
            },{
                header: '所属社区',
                dataIndex: 'business',
                //width: 130,
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnTab: true,
    				editable: false,
                    store: combo_business,
                    displayField: 'name',
        			valueField: 'id',
                    lazyRender: true
                    //listClass: 'x-combo-list-small'
                })
            },{
                header: '用户姓名',
                dataIndex: 'username',
                //width: 90,
                editor: {
                    allowBlank: false,
    				blankText: '请输入用户姓名',
    				maxLength: 10,
    		        enforceMaxLength: true,
    		        regex: /^[\u4e00-\u9fa5]{2,10}$/,
    		        regexText: '请输入正确的用户姓名(两个以上汉字)'
                }
            },{
                header: '联系电话',
                dataIndex: 'tel',
                //width: 90,
                editor: {
                    allowBlank: false,
    				blankText: '请输入联系电话',
    				maxLength: 11,
    		        enforceMaxLength: true,
    		        regex: /^((\d{11})|(\d{7,8}))$/,
    		        regexText: '请输入7到8位固话或11位手机号码'
                }
            },{
                header: '详细地址',
                dataIndex: 'address',
                //width: 90,
                editor: {
                    allowBlank: false,
    				blankText: '请输入详细地址',
    				maxLength: 30,
    			    enforceMaxLength: true,
    			    regex: /\w*[\u4e00-\u9fa5]+\w*/,
    			    regexText: '请输入正确的用户住址(以汉字开头)'
                }
            },{
                header: '资源类型',
                dataIndex: 'source_type',
                //width: 130,
                editor: {
                   	readOnly: true
                }
            },{
                header: '咨询描述',
                dataIndex: 'ask_describe',
                //width: 90,
                editor: {
                    readOnly: true
                }
            },{
                header: '记录人',
                dataIndex: 'admin',
                //width: 90,
                editor: {
                    readOnly: true
                }
            },{
                header: '是否转OA',
                dataIndex: 'is_oa',
                //width: 90,
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnTab: true,
    				editable: false,
    				displayField: 'name',
        			valueField: 'id',
                    store: Ext.create('Ext.data.Store', {
                    	fields: ['name', 'id'],
    				    data : [
    				        {'name':'否', 'id':'否'},
    				        {'name':'是', 'id':'是'}
    				    ]
                    }),
                    lazyRender: true
                    //listClass: 'x-combo-list-small'
                })
            },{
                header: '是否安装',
                dataIndex: 'is_setup',
                //width: 90,
                editor: {
                    readOnly: true
                }
            },{
                header: '未安装原因',
                dataIndex: 'no_setup_reason',
                //width: 90,
                editor: {
                    readOnly: true
                }
            },{
                header: '联系人',
                dataIndex: 'linkman',
                //width: 90,
                editor: {
                    readOnly: true
                }
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
                store: grid_store,
                displayInfo: true,
                displayMsg: '本页显示{0}-{1}行 共{2}行',
                emptyMsg: '没有可用数据',
                listeners: {
    	            beforechange: function(){
    	            	//grid_store.removeAll();
    	            }
                }
            }),
            plugins: [rowEditing],
            listeners: {
                
            }
            
        });
        
        this.callParent(arguments);
        
    }
});
Ext.define('My.AreaSettingGrid', {
    extend: 'Ext.grid.Panel',
    
    constructor: function() {
    	//创建grid
    	Ext.define('AreaSettingGrid', {
            extend: 'Ext.data.Model',
            fields: [
            			'id',
            			'department_id',
                        'area_name',
                        {name:'area_id',type:'auto'},
            			'new_quota',
                        'charge_quota',
                        'charge_year_quota',
                        'cancel_quota',
                        'money_quota',
                        'other_quota',
                        'charge_person'
            		]
        	});
        	
        	var area_quota_store = Ext.create('Ext.data.Store', {
        		 storeId:'area_quota_store',
        		 pageSize: 30,
    			 autoDestroy: true,
    			 model: 'AreaSettingGrid',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
                     extraParams:{
                         operation:'get',
                         department_id:Ext.bs_did
                     },
    		         url: '/gtaomanage/AreaQuotaServlet',
    		         reader: {
    		             type: 'json',
    		             root: 'data'
    		         }
    		     },
                listeners:{
                    update:function(store,record){
                        Ext.Ajax.request({
                            url:'/gtaomanage/AreaQuotaServlet',
                            params:{
                                'operation':'edit',
                                'id':record.get("id"),
                                'department_id':Ext.bs_did,
                                'area_name':record.get("area_name"),
                                'area_id':record.get('area_id'),
                                'new_quota':record.get('new_quota'),
                                'charge_quota':record.get('charge_quota'),
                                'charge_year_quota':record.get('charge_year_quota'),
                                'cancel_quota':record.get('cancel_quota'),
                                'money_quota':record.get('money_quota'),
                                'other_quota':record.get('other_quota'),
                                'charge_person':record.get('charge_person')
                            },
                            success:function(response){
                                store.removeAll();
                                store.load();
                            }
                        })
                    },
                    remove:function(store,record){
                        Ext.Ajax.request({
                            url:'/gtaomanage/AreaQuotaServlet',
                            params:{
                                id:record.get('id'),
                                department_id:Ext.bs_did,
                                operation:'delete'
                            },
                            success:function(response){
                                store.removeAll();
                                store.load();
                            }
                        })
                    }
                },
    		    autoLoad: true
    		 });

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        var grid = Ext.apply(this, {
            region: 'center',
            id: 'AreaSettingGrid',
            name: 'AreaSettingGrid',
            store: area_quota_store,
            border: false,
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit : 1
                })
            ],
            columns: [{
                header: 'ID',
                dataIndex: 'id',
                width: (window.screen.width)/18
            },{
                header: '营业厅',
                dataIndex: 'department_id',
                width: (window.screen.width)/11
            },{
                header: '片区名称',
                dataIndex: 'area_name',
                width: (window.screen.width)/11,
                editor : {
                    xtype: 'textfield',
                    allowBlank:false
                }
            },{
                header: '包含合同',
                dataIndex: 'area_id',
                width: (window.screen.width)/4,
                editor : {
                    xtype: 'combobox',
                    store:Ext.data.StoreManager.lookup('hetong'),
                    allowBlank:false,
                    multiSelect: true,
                    queryMode:'local',
                    valueField:'name',
                    displayField:'name',
                    listeners : {
                        beforequery : function(e){
                            var combo = e.combo;
                            if(!e.forceAll){
                                var value = e.query;
                                combo.store.filterBy(function(record,id){
                                    var text = record.get(combo.displayField);
                                    return (text.indexOf(value)!=-1);
                                });
                                combo.expand();
                                return false;
                            }
                        }
                    }
                }
            },{
                header: '新装定额',
                dataIndex: 'new_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false
                },
                width: (window.screen.width)/12
            },{
                header: '其他续费定额',
                dataIndex: 'charge_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false
                },
                width: (window.screen.width)/12
            },{
                header: '包年续费定额',
                dataIndex: 'charge_year_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false
                },
                width: (window.screen.width)/12
            },{
                header: '停机注销定额',
                dataIndex: 'cancel_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false
                },
                width: (window.screen.width)/12
            },
            {
                header: '收费定额',
                dataIndex: 'money_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false
                },
                width: (window.screen.width)/10
            },
            {
                header: '其他',
                dataIndex: 'other_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false
                },
                width: (window.screen.width)/12
            },{
                    header: '负责人',
                    dataIndex: 'charge_person',
                    width: (window.screen.width)/10,
                    editor : {
                        xtype: 'textfield',
                        allowBlank:false
                    }
            }],
            tbar: [{
                text: '添加片区',
                handler : function() {
                    rowEditing.cancelEdit();
                    // Create a model instance
                    var r = Ext.create('AreaSettingGrid', {
                        id: '',
                        department_id:Ext.bs_did,
                        area_name:'片区名称',
                        area_id:'请选择...',
                        new_quota:'0',
                        charge_quota:'0',
                        charge_year_quota:'0',
                        cancel_quota:'0',
                        money_quota:'0',
                        other_quota:'0',
                        charge_person:'负责人'
                    });
                    area_quota_store.insert(0, r);
                    rowEditing.startEdit(0, 0);
                }
            }, {
                itemId: 'removeArea',
                text: '删除片区',
                handler: function() {
                    var selection = grid.getSelectionModel().getSelection()[0];
                    rowEditing.cancelEdit();
                    if (selection) {
                        area_quota_store.remove(selection);
                    }
                    else{
                        Ext.Msg.alert('提示','请先选择一条数据...');
                    }
                }
            }],
            plugins: [rowEditing],
        	bbar: new Ext.PagingToolbar({
                store: area_quota_store,
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


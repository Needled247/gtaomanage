Ext.define('My.SettingGrid', {
    extend: 'Ext.grid.Panel',
    
    constructor: function() {
    	//创建grid
    	Ext.define('SettingGrid', {
            extend: 'Ext.data.Model',
            fields: [
            			'id',
            			'department_id',
            			'new_quota',
                        'charge_quota',
                        'charge_year_quota',
                        'cancel_quota',
                        'money_quota',
                        'other_quota'
            		]
        	});
        	
        	var bs_quota_store = Ext.create('Ext.data.Store', {
        		 storeId:'bs_quota_store',
        		 pageSize: 30,
    			 autoDestroy: true,
    			 model: 'SettingGrid',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
                     extraParams:{
                         operation:'get'
                     },
    		         url: '/gtaomanage/BusinessStationQuotaServlet',
    		         reader: {
    		             type: 'json',
    		             root: 'data'
    		         }
    		     },
    		     autoLoad: true
    		 });

    		 
    	
        var grid = Ext.apply(this, {
            region: 'center',
            id: 'SettingGrid',
            name: 'SettingGrid',
            store: bs_quota_store,
            border: false,
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit : 1
                })
            ],
            columns: [{
                header: 'ID',
                dataIndex: 'id',
                width: (window.screen.width)/10
            },{
                header: '营业厅',
                dataIndex: 'department_id',
                width: (window.screen.width)/10
            },{
                header: '新装定额',
                dataIndex: 'new_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false,
                    listeners : {
                        blur : function(field, e) {
                            Ext.Ajax.request({
                                url: '/gtaomanage/BusinessStationQuotaServlet', // your backend url
                                method: 'POST',
                                params: {
                                    'operation':'update',
                                    'id': grid.getSelectionModel().getSelection()[0].get('id'),
                                    'value': field.getValue(),
                                    'key': 'NEW_QUOTA'
                                }
                            });
                        }
                    }
                },
                width: (window.screen.width)/10
            },{
                header: '其他续费定额',
                dataIndex: 'charge_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false,
                    listeners : {
                        blur : function(field, e) {
                            Ext.Ajax.request({
                                url: '/gtaomanage/BusinessStationQuotaServlet', // your backend url
                                method: 'POST',
                                params: {
                                    'operation':'update',
                                    'id': grid.getSelectionModel().getSelection()[0].get('id'),
                                    'value': field.getValue(),
                                    'key': 'CHARGE_QUOTA'
                                }
                            });
                        }
                    }
                },
                width: (window.screen.width)/10
            },{
                header: '包年续费定额',
                dataIndex: 'charge_year_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false,
                    listeners : {
                        blur : function(field, e) {
                            Ext.Ajax.request({
                                url: '/gtaomanage/BusinessStationQuotaServlet', // your backend url
                                method: 'POST',
                                params: {
                                    'operation':'update',
                                    'id': grid.getSelectionModel().getSelection()[0].get('id'),
                                    'value': field.getValue(),
                                    'key': 'CHARGE_YEAR_QUOTA'
                                }
                            });
                        }
                    }
                },
                width: (window.screen.width)/10
            },{
                header: '停机注销定额',
                dataIndex: 'cancel_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false,
                    listeners : {
                        blur : function(field, e) {
                            Ext.Ajax.request({
                                url: '/gtaomanage/BusinessStationQuotaServlet', // your backend url
                                method: 'POST',
                                params: {
                                    'operation':'update',
                                    'id': grid.getSelectionModel().getSelection()[0].get('id'),
                                    'value': field.getValue(),
                                    'key': 'CANCEL_QUOTA'
                                }
                            });
                        }
                    }
                },
                width: (window.screen.width)/10
            },
            {
                header: '收费定额',
                dataIndex: 'money_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false,
                    listeners : {
                        blur : function(field, e) {
                            Ext.Ajax.request({
                                url: '/gtaomanage/BusinessStationQuotaServlet', // your backend url
                                method: 'POST',
                                params: {
                                    'operation':'update',
                                    'id': grid.getSelectionModel().getSelection()[0].get('id'),
                                    'value': field.getValue(),
                                    'key': 'MONEY_QUOTA'
                                }
                            });
                        }
                    }
                },
                width: (window.screen.width)/10
            },
            {
                header: '其他',
                dataIndex: 'other_quota',
                editor : {
                    xtype: 'textfield',
                    allowBlank:false,
                    listeners : {
                        blur : function(field, e) {
                            Ext.Ajax.request({
                                url: '/gtaomanage/BusinessStationQuotaServlet', // your backend url
                                method: 'POST',
                                params: {
                                    'operation':'update',
                                    'id': grid.getSelectionModel().getSelection()[0].get('id'),
                                    'value': field.getValue(),
                                    'key': 'OTHER_QUOTA'
                                }
                            });
                        }
                    }
                },
                width: (window.screen.width)/10
            }],

        	bbar: new Ext.PagingToolbar({
                store: bs_quota_store,
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
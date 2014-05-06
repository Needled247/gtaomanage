Ext.define('My.NetPay', {
    extend: 'Ext.panel.Panel',
	
    constructor: function() {    	

   	
		 
    	//初始化
        Ext.apply(this, {       	
        	title: '网上支付查询',
        	icon: '../../image/payment.png',
			scale: 'small',
            region: 'center',
            margin: '0 5 5 0',
            id: 'NetPay',
            name: 'NetPay',
//            border: false,
            layout: 'border',
            frame: true,
            items: [
            	Ext.create('My.np_grid')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'np_tb',
            	name:'np_tb',
            	border: false,
            	height: 40,
            	items: [
            	'-',
                {
                    xtype:'datefield',
                    emptyText: '起始时间',
                    id: 'np_start',
                    name: 'np_start',
                    value: Ext.Date.format(new Date(), 'Y-m-d'),
                    format: 'Y-m-d',
                    maxValue: new Date(),
                    width: 110,
                    editable: false,
                    listeners: {
                        change: function(obj){
                            Ext.getCmp('np_end').setMinValue(obj.getRawValue());
                        }
                    }
                },{
                    xtype:'datefield',
                    emptyText: '截止时间',
                    id: 'np_end',
                    name: 'np_end',
                    value: Ext.Date.format(new Date(), 'Y-m-d'),
                    format: 'Y-m-d',
                    maxValue: new Date(),
                    width: 110,
                    editable: false,
                    listeners: {
                        change: function(obj){
                            Ext.getCmp('np_start').setMaxValue(obj.getRawValue());
                        }
                    }
                },
                {
                    id: 'np_type',
                    name: 'np_type',
                    xtype:'combobox',
                    emptyText: '支付方式',
                    store:new Ext.data.SimpleStore(
                        {
                            fields:['id','name'],
                            data:[['快钱支付','快钱支付'],['银联支付','银联支付']]
                        }),
                    queryMode:'local',
                    width: 110,
                    valueField:'id',
                    displayField:'name',
                    editable: false
                },
            	{
            		xtype:'button',
	        		text: '查询',
	        		id:'qbtn',
	        		icon: '../../image/find_user1.png',
	        		scale: 'medium',
	        		handler: function(){
	        			var params = Ext.getCmp('np_grid').getStore().getProxy().extraParams;
	        			params['np_start']=Ext.getCmp('np_start').getValue();
	        			params['np_end']=Ext.getCmp('np_end').getValue();
	        			params['np_type']=Ext.getCmp('np_type').getValue();
	        			Ext.getCmp('np_grid').getStore().loadPage(1);
	        		}        		
        		},
        		{
        			xtype:'button',
        			id: 'reset_btn',
			        name: 'reset_btn',
	        		text: '重置查询',
	        		icon: '../../image/reset_btn.png',
	        		scale: 'medium',
	        		handler: function(){
	        			Ext.getCmp('np_start').reset();
	        			Ext.getCmp('np_end').reset();
	        			Ext.getCmp('np_type').reset();
	        		}
        		}
        	]})
        });
        
        this.callParent(arguments);
        
    }
});
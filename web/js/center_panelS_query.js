Ext.define('My.center_panelS_query', {
    extend: 'Ext.panel.Panel',
//    requires: [
//    	'My.center_grid'
//	],
    constructor: function() {
		
    	//初始化
        Ext.apply(this, {       	
        	title: '报装跟进修改查询',
            region: 'center',
            margin: '0 5 5 0',
            id: 'center_panelS_query',
            name: 'center_panelS_query',
//            border: false,
            layout: 'fit',
            frame: true,
            items: [          	
            	Ext.create('My.center_grid') 
            ],
            
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	border: false,
            	items: [
            			'-',
		        		{
		                    xtype: 'datefield',
		                    id: 'start_df',
		                    name: 'start_df',
		                    fieldLabel: '起始日期',
		                    labelAlign: 'right',
		                    labelWidth: 60,
//		                    pickerAlign: 'tr-br?',
		                    width: 180,
//		                    height: 25,
//		                    icon: '../image/clock.png',
//		                    value: Ext.Date.format(new Date(), 'Y-m-d'),
//		                    minValue: new Date(),
		                    maxValue: new Date(),
		                    //minText: '请选择今天的日期',
		                    //maxText: '请选择今天的日期',
		                    format: 'Y-m-d',
//		                    allowBlank: false,
//							blankText: '请选择起始日期',
		                    editable: false,
		                    listeners: {
		                    	change: function(obj){
		                    		Ext.getCmp('end_df').setMinValue(obj.getRawValue());
		                    	}
		                    }
        				},
        				'-',
        				{
        					text: '导出Excel',
        					icon: '../../image/excel_btn.gif',
        					handler: function(){
//        						window.print();
        						window.location.href = 'get_excel.jsp';
//        						window.open('get_excel.jsp');
        					}
        				},
        				{
		                    xtype: 'datefield',
		                    id: 'end_df',
		                    name: 'end_df',
		                    fieldLabel: '结束日期',
		                    labelAlign: 'right',
		                    labelWidth: 60,
//		                    pickerAlign: 'tr-br?',
		                    width: 180,
//		                    height: 25,
//		                    icon: '../image/clock.png',
//		                    value: Ext.Date.format(new Date(), 'Y-m-d'),
//		                    minValue: Ext.getComponent('start_df').getValue(),
		                    maxValue: new Date(),
		                    //minText: '请选择今天的日期',
		                    //maxText: '请选择今天的日期',
		                    format: 'Y-m-d',
//		                    allowBlank: false,
//							blankText: '请选择起始日期',
		                    editable: false,
		                    listeners: {
		                    	change: function(obj){
		                    		Ext.getCmp('start_df').setMaxValue(obj.getRawValue());
		                    	}
		                    }
        				},
        				'-',
        				{
        					
        				}
        				
        				]
            	
            })
            
        });
        
        this.callParent(arguments);
        
    }
});
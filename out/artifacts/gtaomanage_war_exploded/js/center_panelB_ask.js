Ext.define('My.center_panelB_ask', {
    extend: 'Ext.panel.Panel',
//    requires: [
//    	'My.center_grid'
//	],
    constructor: function() {
		
		
				 
    	//初始化
        Ext.apply(this, {       	
        	title: '咨询报装登记',
            region: 'center',
            margin: '0 5 5 0',
            id: 'center_panelB_ask',
            name: 'center_panelB_ask',
//            border: false,
//            layout: 'fit',
            frame: true,
            items: [
            	Ext.create('My.center_form_ask')
            ]
            
        });
        
        this.callParent(arguments);
        
    }
});
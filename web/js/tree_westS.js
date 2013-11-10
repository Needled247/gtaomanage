Ext.define('My.tree_westS', {
    extend: 'Ext.panel.Panel',
    constructor: function() {
        	
        
    	
        Ext.apply(this, {
            
        	region: 'west',
//            stateId: 'navigation-panel',
            id: 'west-panelS', // see Ext.getCmp() below
            title: '部门管理列表',
            //icon: '../../image/west_title.gif',
//            frame: true,
            split: true,
            width: 170,
            minWidth: 170,
            maxWidth: 170,
            collapsible: false,
            animCollapse: false,
            margins: '0 0 5 5',
            layout: 'accordion',
            items: [{
                contentEl: 'west_service',
                title: '客服中心',
                iconCls: 'service' // see the HEAD section for style used					
            }, {
                title: '用户设置',
                html: '<p>待定</p>',
                iconCls: 'user'
            }]
		
		});
        
        this.callParent(arguments);
        
    }
});
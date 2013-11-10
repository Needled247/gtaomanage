Ext.define('My.tree_panel', {
    extend: 'Ext.tree.Panel',
    constructor: function() {
        	
        	var tree_store = Ext.create('Ext.data.TreeStore', {
				root: {
					text: '客服中心',
					expanded: true,
					children: [
						{ text: '咨询报装登记', leaf: true}
					]
				},
				autoLoad: false
			});
    	
        Ext.apply(this, {
            
//			title: '11',
        	border: false,
			id: 'tree-panel',
//            margins: '0 0 5 0',
            useArrows: true,
			store: tree_store
		
		});
        
        this.callParent(arguments);
        
    }
});
Ext.define('My.tree_westBA', {
    extend: 'Ext.panel.Panel',
    constructor: function() {
        	
        
    	
        Ext.apply(this, {
            
        	region: 'west',
//            stateId: 'navigation-panel',
            id: 'west-panelBA', // see Ext.getCmp() below
            title: '功能管理列表',
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
//              contentEl: 'mf_div',
              title: '主表功能列表',
              iconCls: 'mf', // see the HEAD section for style used
              items:[{
	            	xtype:'button',
	            	width:169,
					text: '&nbsp;&nbsp;保存主表信息',
					textAlign: 'left',
					icon: '../../image/save_mf_btn.png',
					scale: 'medium',
					handler: function(){
						if(Ext.getCmp('save_mainform')==undefined){
							Ext.getCmp('viewport').remove('base_query_mfA');
							Ext.getCmp('viewport').add(Ext.create('My.save_mainform'));
						}
					}
				},{
	            	xtype:'button',
	            	width:169,
					text: '&nbsp;&nbsp;查询主表信息',
					textAlign: 'left',
					icon: '../../image/find_user.png',
					scale: 'medium',
					handler: function(){
						if(Ext.getCmp('base_query_mfA')==undefined){
							Ext.getCmp('viewport').remove('save_mainform');
							Ext.getCmp('viewport').add(Ext.create('My.base_query_mfA'));
						}
					}
				}]
          }
//          , 
//          {
//              title: '其它功能列表',
//              iconCls: 'etc',
//              items:[{
//						xtype:'button',
//						width:169,
//						text: '&nbsp;&nbsp;网上付费查询',
//						textAlign: 'left',
//						icon: '../../image/pay.png',
//						scale: 'medium',
//						handler: function(){
//							window.open('http://10.1.0.131:8080/Search/index.html');
//						}
//					}   
//              ]
//          }
          ]
        
		});
        
        this.callParent(arguments);
        
    }
});
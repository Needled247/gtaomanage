Ext.define('My.toolbar_north', {
    extend: 'Ext.toolbar.Toolbar',
    constructor: function() {
        	
    	
    	
        Ext.apply(this, {
            
        	region: 'north',
        	height: 65,
        	margin: '5 5 5 5',
//        	frame: true,
        	items: [{
        		xtype: 'label',
        		contentEl: 'north'
        	},
        	'->',//右对齐
        	{         		
        		xtype: 'button',
        		icon: '../../image/help.png',
        		scale: 'large',
        		text: '使用说明',
        		handler: function() {
        			window.open("../docs/help.pdf");
        		}
        	},
        	'-',
        	{         		
        		xtype: 'button',
        		icon: '../../image/pwd_btn.png',
        		scale: 'large',
        		text: '修改密码',
//        		tooltip: '修改用户名密码',
//        		tooltipType: 'title',
        		handler: function() {
        			Ext.create('My.modify_pwd').show();
        		}
        	},
        	'-',
        	{
        		xtype: 'button',
        		icon: '../../image/info_btn.png',
        		scale: 'large',
//        		tooltip: '软件信息',
//        		tooltipType: 'title'
        		text: '软件信息',
        		handler: function() {
        			Ext.create('My.version_info').show();
        		}
        	},
        	'-',
        	{
        		margin: '0 15 0 0',
        		xtype: 'button',
        		icon: '../../image/out.png',
        		scale: 'large',
        		text: '注销',
        		handler: function() {
        			window.location.href = '../logout.jsp';
        		}
        	}
        	]
		
		});
        
        this.callParent(arguments);
        
    }
});
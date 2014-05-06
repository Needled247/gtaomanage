Ext.define('My.AreaSettings', {
    extend: 'Ext.panel.Panel',

    constructor: function() {
        var settingMenu = new Ext.menu.Menu({
            ignoreParentClicks: true,
            plain: true,
            id:'area_setting_menu',
            name:'area_setting_menu',
            items: [
                {
                    text: '交易设置'
                },
                {
                    text: '活动设置'
                }]
        });

        var settingMenu2 = new Ext.menu.Menu({
            ignoreParentClicks: true,
            plain: true,
            id:'area_setting_menu2',
            name:'area_setting_menu2',
            items: [
                {
                    text: '人员设置'
                },
                {
                    text: '定额设置'
                }]
        });

    	//初始化
        Ext.apply(this, {       	
        	title: '设置',
        	icon: '../../image/settings_sm.png',
			scale: 'small',
            region: 'center',
            margin: '0 5 5 0',
            id: 'AreaSettings',
            name: 'AreaSettings',
            layout: 'border',
            frame: true,
            items: [
            	Ext.create('My.AreaSettingGrid')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'areaSettingToolbar',
            	name:'areaSettingToolbar',
            	border: false,
            	height: 40,
            	items: [
            	'-',
                {
                    text:'基础数据设置',
                    menu:settingMenu
                },
                {
                    text:'属性设置',
                    menu:settingMenu2
                }
        	]})
        });
        this.callParent(arguments);
    }
});


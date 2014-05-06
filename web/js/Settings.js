Ext.define('My.Settings', {
    extend: 'Ext.panel.Panel',

    constructor: function() {
        var settingMenu = new Ext.menu.Menu({
            ignoreParentClicks: true,
            plain: true,
            id:'setting_menu',
            name:'setting_menu',
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
            id:'setting_menu2',
            name:'setting_menu2',
            items: [
                {
                    text: '人员设置'
                },
                {
                    text: '定额设置'
                },
                {
                    text: '营业厅设置'
                }]
        });

        var settingMenu3 = new Ext.menu.Menu({
            ignoreParentClicks: true,
            plain: true,
            id:'setting_menu3',
            name:'setting_menu3',
            items: [
                {
                    text: '数据库配置'
                },
                {
                    text: '备份数据库'
                },
                {
                    text: '日志'
                },
                {
                    text: '退出'
                }]
        });
    	//初始化
        Ext.apply(this, {       	
        	title: '设置',
        	icon: '../../image/settings_sm.png',
			scale: 'small',
            region: 'center',
            margin: '0 5 5 0',
            id: 'Settings',
            name: 'Settings',
            layout: 'border',
            frame: true,
            items: [
            	Ext.create('My.SettingGrid')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'settingToolbar',
            	name:'settingToolbar',
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
                },
                {
                    text:'系统设置',
                    menu:settingMenu3
                }
        	]})
        });
        this.callParent(arguments);
    }
});


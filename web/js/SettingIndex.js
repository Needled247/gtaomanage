Ext.define('My.SettingIndex',{
    extend : 'Ext.panel.Panel',
    /*
    构造方法：加载时运行
     */
    constructor : function(){
        Ext.apply(this,{
            region : 'center',
            id : 'SettingIndex',
            scale : 'small',
            name : 'SettingIndex',
            title : '控制台',
            margin : '0 5 5 0',
            frame : true,
            layout : 'border',
            items : [
                Ext.create('My.SettingGrid')
            ]
        })
    }
})
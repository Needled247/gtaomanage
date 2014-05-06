Ext.define('My.SettingIndex',{
    extend : 'Ext.panel.Panel',
    /*
    ���췽��������ʱ����
     */
    constructor : function(){
        Ext.apply(this,{
            region : 'center',
            id : 'SettingIndex',
            scale : 'small',
            name : 'SettingIndex',
            title : '����̨',
            margin : '0 5 5 0',
            frame : true,
            layout : 'border',
            items : [
                Ext.create('My.SettingGrid')
            ]
        })
    }
})
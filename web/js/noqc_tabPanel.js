Ext.define('My.noqc_tabPanel',{
    extend:'Ext.tab.Panel',

    constructor : function(){
        Ext.apply(this,{
            id:'noqc_tabPanel',
            name:'noqc_tabPanel',
            region: 'center',
            layout:'border',
            frame:true,
            defaults: {
                autoScroll:true,
                bodyPadding: 10
            },
            activeTab: 0,
            items: [
                Ext.create('My.noqc_north'),
                Ext.create('My.noqc_grid')
            ]
        });
        this.callParent(arguments);
    }
});
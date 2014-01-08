Ext.define('My.qb_tabPanel',{
    extend:'Ext.tab.Panel',

    constructor : function(){
        Ext.apply(this,{
            id:'qb_tabPanel',
            name:'qb_tabPanel',
            region: 'center',
            layout:'border',
            frame:true,
            defaults: {
                autoScroll:true,
                bodyPadding: 10
            },
            activeTab: 0,
            items: [
                Ext.create('My.qb_north'),
                Ext.create('My.qb_grid')
            ]
        });
        this.callParent(arguments);
    }
});
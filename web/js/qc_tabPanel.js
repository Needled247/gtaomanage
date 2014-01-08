Ext.define('My.qc_tabPanel',{
    extend:'Ext.tab.Panel',

    constructor : function(){
        Ext.apply(this,{
            id:'qc_tabPanel',
            name:'qc_tabPanel',
            region: 'center',
            layout:'border',
            frame:true,
            defaults: {
                autoScroll:true,
                bodyPadding: 10
            },
            activeTab: 0,
            items: [
                Ext.create('My.qc_north'),
                Ext.create('My.qc_grid')
            ]
        });
        this.callParent(arguments);
    }
});
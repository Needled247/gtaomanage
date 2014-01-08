Ext.define('My.mfA_tabPanel',{
    extend:'Ext.tab.Panel',

    constructor:function(){
        Ext.apply(this,{
            id:'mfA_tabPanel',
            name:'mfA_tabPanel',
            region: 'center',
            layout:'border',
            frame:true,
            defaults: {
                autoScroll:true,
                bodyPadding: 10
            },
            activeTab: 0,
            items: [
                    Ext.create('My.mfA_north'),
                    Ext.create('My.cg_A')
                ]
        });
        this.callParent(arguments);
    }
});
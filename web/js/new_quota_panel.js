Ext.define('My.new_quota_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.define('new_quota_store', {
            extend: 'Ext.data.Model',
            fields: [
                'name',
                {name:'data1',type:'int'},
                {name:'data2',type:'int'}
            ]
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'new_quota_store',
            storeId:'new_quota_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/NewQuotaChartServlet',
                method: 'POST',
                actionMethods: { read: 'POST' },
                reader: {
                    type: 'json'
                }
            },
            autoLoad: false
        });
        store.load({params:{month:Ext.util.Format.date(Ext.getCmp('data_month').getValue(), 'Ym')}});

        var chart = Ext.create('Ext.chart.Chart', {
            id:'new_quota_chart',
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: store,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['data1','data2'],         //TODO
                minimum: 0,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                grid: true,
                title: '数量'
            }, {
                type: 'Category',
                position: 'left',
                fields: ['name'],
                title: '营业厅'
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                xField: 'name',
                yField: ['data1', 'data2']
            }]
        });

        Ext.apply(this, {
            region: 'center',
            id: 'user_panel',
            name: 'user_panel',
            title:'在网用户数量统计',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
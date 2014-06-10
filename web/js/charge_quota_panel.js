Ext.define('My.charge_quota_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.define('charge_quota_store', {
            extend: 'Ext.data.Model',
            fields: [
                'name',
                {name:'data1',type:'int'},
                {name:'data2',type:'int'},
                {name:'data3',type:'int'},
                {name:'data4',type:'int'}
            ]
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'charge_quota_store',
            storeId:'charge_quota_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/ChargeQuotaChartServlet',
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
            id:'charge_quota_chart',
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
                fields: ['data1','data2','data3','data4'],         //TODO
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
                yField: ['data1', 'data2','data3','data4'],
                title:['包年续费','包年定额','其他续费','其他定额'],
                label: {
                    display: 'outside',
                    'text-anchor': 'middle',
                    field: ['data1', 'data2','data3','data4'],
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    orientation: 'horizontal',
                    color: '#333'
                }
            }]
        });

        Ext.apply(this, {
            region: 'center',
            id: 'charge_quota_panel',
            name: 'charge_quota_panel',
            title:'续费指标分析',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
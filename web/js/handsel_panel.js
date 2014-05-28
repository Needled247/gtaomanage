Ext.define('My.handsel_panel', {
    extend: 'Ext.panel.Panel',

    constructor: function() {
        Ext.define('handsel_store', {
            extend: 'Ext.data.Model',
            fields: [
                'name',
                {name:'num',type:'int'}
            ]
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'handsel_store',
            storeId:'handsel_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/HandselChartServlet',
                method: 'POST',
                actionMethods: { read: 'POST' },
                reader: {
                    type: 'json'
                }
            },
            autoLoad: false
        });
        store.load(
            {
                params:{month:Ext.util.Format.date(Ext.getCmp('data_month').getValue(), 'Ym'),
                department_id:Ext.getCmp('data_bs').getValue()}
            });

        var chart = Ext.create('Ext.chart.Chart', {
            id:'handsel_chart',
            name:'handsel_chart',
            theme:'MyFancy',
            animate: true,
            store: store,
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['num'],
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    title: '数量',
                    grid: true,
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: '赠送月份'
                }
            ],
            series: [
                {
                    type: 'column',
                    xField: 'name',
                    yField: 'num',
                    style:{
                        width:'80'
                    },
                    highlight: true,
                    stacked: true,
                    label: {
                        display: 'outside',
                        'text-anchor': 'middle',
                        field: 'num',
                        renderer: Ext.util.Format.numberRenderer('0,0'),
                        orientation: 'horizontal',
                        color: '#333'
                    }
                }
            ]
        });

        Ext.apply(this, {
            region: 'center',
            id: 'handsel_panel',
            name: 'handsel_panel',
            title:'赠送时间统计',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
Ext.define('My.trend_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.define('trend_store', {
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
            model: 'trend_store',
            storeId:'trend_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/TrendChartServlet',
                method: 'POST',
                actionMethods: { read: 'POST' },
                reader: {
                    type: 'json'
                }
            },
            autoLoad: false
        });
        store.load({
            params:
            {
                start:Ext.util.Format.date(Ext.getCmp('data_start').getValue(), 'Ym'),
                end:Ext.util.Format.date(Ext.getCmp('data_end').getValue(), 'Ym'),
                department_id:Ext.getCmp('data_bs').getValue()
            }
        });

        var chart = Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            animate: true,
            store: store,
            shadow: true,
            theme: 'Category1',
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: ['data1', 'data2', 'data3','data4'],
                title: '数量',
                minorTickSteps: 1,
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: '月份'
            }],
            series: [{
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'name',
                yField: 'data1',
                markerConfig: {
                    type: 'cross',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                xField: 'name',
                yField: 'data2',
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                xField: 'name',
                yField: 'data3',
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                xField: 'name',
                yField: 'data4',
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }]
        });

        Ext.apply(this, {
            region: 'center',
            id: 'trend_panel',
            name: 'trend_panel',
            title:'业务走势图',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
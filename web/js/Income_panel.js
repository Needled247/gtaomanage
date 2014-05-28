Ext.define('My.Income_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.define('income_store', {
            extend: 'Ext.data.Model',
            fields: [
                {name:'name',type:'string'},
                {name:'num',type:'int'}
            ]
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'income_store',
            storeId:'income_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/getIncomeChartServlet',
                method: 'POST',
                actionMethods: { read: 'POST' },
                reader: {
                    type: 'json'
                }
            },
            autoLoad: false
        });
        store.load({params:{
            startDate:Ext.util.Format.date(Ext.getCmp('data_start').getValue(), 'Ym'),
            endDate:Ext.util.Format.date(Ext.getCmp('data_end').getValue(), 'Ym'),
            department_id:Ext.getCmp('data_bs').getValue()
        }});

        var chart = Ext.create('Ext.chart.Chart', {
            id:'income_chart',
            name:'income_chart',
            theme:'MyFancy',
            animate: true,
            store: store,
            legend: {
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: 'num',
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: '收入',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: '时间'
            }],
            series: [{
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                stacked: true,
                tips: {
                    trackMouse: true,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('name')+"收入");
                        this.update(storeItem.get('num')+"元");
                    }
                },
                axis: 'left',
                xField: 'name',
                yField: 'num',
                title:'收入',
                markerConfig: {
                    type: 'cross',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }]
        });

        Ext.apply(this, {
            region: 'center',
            id: 'income_panel',
            name: 'income_panel',
            title:'收入分析',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
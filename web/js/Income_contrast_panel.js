Ext.define('My.Income_contrast_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.define('income_contrast_store', {
            extend: 'Ext.data.Model',
            fields: [
                {name:'month',type:'string'},
                {name:'income',type:'int'}
            ]
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'income_contrast_store',
            storeId:'income_contrast_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/getIncomeContrastChartServlet',
                method: 'POST',
                actionMethods: { read: 'POST' },
                reader: {
                    type: 'json'
                }
            },
            autoLoad: false
        });
        store.load({params:{
            startDate:Ext.util.Format.date(Ext.getCmp('data_start_day').getValue(), 'Ymd'),
            endDate:Ext.util.Format.date(Ext.getCmp('data_end_day').getValue(), 'Ymd'),
            department_id:Ext.getCmp('data_bs').getValue()
        }});

        var chart = Ext.create('Ext.chart.Chart', {
            id:'income_contract_chart',
            name:'income_contract_chart',
            theme:'MyFancy',
            animate: true,
            store: store,
            legend: {
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: 'income',
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: '收入',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['month'],
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
                        this.setTitle("收入");
                        this.update(storeItem.get('income')+"元");
                    }
                },
                axis: 'left',
                xField: 'month',
                yField: 'income',
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
            id: 'income_contract_panel',
            name: 'income_contract_panel',
            title:'收入分析',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
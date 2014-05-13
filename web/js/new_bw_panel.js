Ext.define('My.new_bw_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.define('new_bw_store', {
            extend: 'Ext.data.Model',
            fields: [
                'name',
                {name:'data1',type:'int'}
            ]
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'new_bw_store',
            storeId:'new_bw_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/NewBandWidthChartServlet',
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
                month:Ext.util.Format.date(Ext.getCmp('data_month').getValue(), 'Y-m')
            }
        });

    var donut = false,
        chart = Ext.create('Ext.chart.Chart', {
            xtype: 'chart',
            animate: true,
            store: store,
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 60,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'data1',
                showInLegend: true,
                donut: donut,
                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function(storeItem, item) {
                        //calculate percentage.
                        var total = 0;
                        store.each(function(rec) {
                            total += rec.get('data1');
                        });
                        this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                    }
                },
                highlight: {
                    segment: {
                        margin: 20
                    }
                },
                label: {
                    field: 'name',
                    display: 'rotate',
                    contrast: true,
                    font: '18px Arial'
                }
            }]
        });

        Ext.apply(this, {
            region: 'center',
            id: 'new_bw_panel',
            name: 'new_bw_panel',
            title:'新装带宽分析',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
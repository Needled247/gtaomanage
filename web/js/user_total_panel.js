Ext.define('My.user_total_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.define('user_total_Store', {
            extend: 'Ext.data.Model',
            fields: [
                {name:'date',type:'string'},
                {name:'num',type:'int'},
                {name:'normalNum',type:'int'}
            ]
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'user_total_Store',
            storeId:'user_total_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/getMonthTotalUserChart',
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
            endDate:Ext.util.Format.date(Ext.getCmp('data_end').getValue(), 'Ym')}});

        var chart = Ext.create('Ext.chart.Chart', {
            id:'user_total_chart',
            name:'user_total_chart',
            theme:'MyFancy',
            animate: true,
            store: store,
            legend: {
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['num', 'normalNum'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: '用户数量（人）',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['date'],
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
                        this.setTitle(storeItem.get('date')+"在网用户数量");
                        this.update(storeItem.get('num')+"个");
                    }
                },
                axis: 'left',
                xField: 'date',
                yField: 'num',
                title:'在网用户总数',
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
                stacked: true,
                tips: {
                    trackMouse: true,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('date')+"正常状态用户");
                        this.update(storeItem.get('normalNum')+"个");
                    }
                },
                axis: 'left',
                fill: true,
                xField: 'date',
                yField: 'normalNum',
                title:'正常状态用户',
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
            id: 'user_total_panel',
            name: 'user_total_panel',
            title:'在网用户数量曲线',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
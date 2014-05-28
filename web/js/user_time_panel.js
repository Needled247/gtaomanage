Ext.define('My.user_time_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.define('user_time_Store', {
            extend: 'Ext.data.Model',
            fields: [
                'name',
                {name:'num',type:'int'}
            ]
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'user_time_Store',
            storeId:'user_time_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/UserUsedTimeChartServlet',
                method: 'POST',
                actionMethods: { read: 'POST' },
                reader: {
                    type: 'json'
                }
            },
            autoLoad: false
        });
        store.load();

        var chart = Ext.create('Ext.chart.Chart', {
            id:'user_time_chart',
            name:'user_time_chart',
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
                    title: '用户数量（人）',
                    grid: true,
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: '持续使用年数'
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
                    },
                    tips: {
                        trackMouse: true,
                        renderer: function(storeItem, item) {
                            this.setTitle("在网"+storeItem.get('name')+"用户数量");
                            this.update(storeItem.get('num')+"个");
                        }
                    }
                }
            ]
        });

        Ext.apply(this, {
            region: 'center',
            id: 'user_time_panel',
            name: 'user_time_panel',
            title:'在网时间分析',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
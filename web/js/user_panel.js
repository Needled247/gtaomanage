Ext.define('My.user_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.define('user_Store', {
            extend: 'Ext.data.Model',
            fields: [
                'name',
                {name:'num',type:'int'}
            ]
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'user_Store',
            storeId:'user_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/getUserMonthChart',
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
            id:'user_chart',
            name:'user_chart',
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
                    title: '营业厅'
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
                            this.setTitle(storeItem.get('name')+"在网用户数量");
                            this.update(storeItem.get('num')+"个");
                        }
                    }
                }
            ]
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
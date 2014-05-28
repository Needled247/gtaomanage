Ext.define('My.stop_user_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.define('stop_user_Store', {
            extend: 'Ext.data.Model',
            fields: ['name','num','num2','num3']
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'stop_user_Store',
            storeId:'stop_user_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/StopUserChartServlet',
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
            id:'stop_user_chart',
            name:'stop_user_chart',
            theme:'MyFancy',
            animate: true,
            store: store,
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['num', 'num2','num3'],
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
                    title: '名称'
                }
            ],
            series: [
                {
                    type: 'column',
                    xField: 'name',
                    yField: ['num','num2','num3'],
                    style:{
                        width:'80'
                    },
                    highlight: true,
                    stacked: true,
                    label: {
                        display: 'outside',
                        'text-anchor': 'middle',
                        field: ['num','num2','num3'],
                        renderer: Ext.util.Format.numberRenderer('0,0'),
                        orientation: 'horizontal',
                        color: '#333'
                    },
                    tips: {
                        trackMouse: true,
                        renderer: function(storeItem, item) {
                            this.setTitle(storeItem.get('name'));
                            this.update("本月"+storeItem.get('num')+"个<br>预存包年"+parseInt(storeItem.get('num2'))+"个<br>预存其他"+parseInt(storeItem.get('num3'))+"个");
                        }
                    }
                }
            ]
        });

        Ext.apply(this, {
            region: 'center',
            id: 'stop_user_panel',
            name: 'stop_user_panel',
            title:'停机用户统计',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
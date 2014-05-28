Ext.define('My.main_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.define('main_Store', {
            extend: 'Ext.data.Model',
            fields: ['num','num2', 'name']
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'main_Store',
            storeId:'main_chart_store',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/getChartInfo',
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
                params:{
                    bs_name:Ext.getCmp('data_bs').getValue(),
                    month:Ext.util.Format.date(Ext.getCmp('data_month').getValue(), 'Y-m')
                }
            });

        var chart = Ext.create('Ext.chart.Chart', {
            id:'main_data_chart',
            name:'main_data_chart',
            theme:'MyFancy',
            animate: true,
            store: store,
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['num', 'num2'],
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    title: '数量（本月）',
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
                    yField: ['num','num2'],
                    style:{
                        width:'80'
                    },
                    highlight: true,
                    stacked: true,
                    listeners:{
                        itemmousedown:function(obj){
                            Ext.chart_id = obj.storeItem.data['name'];
                            Ext.create('My.main_detail');
                            Ext.getCmp('main_detail').setTitle(obj.storeItem.data['name']);
                        }
                    },
                    label: {
                        display: 'outside',
                        'text-anchor': 'middle',
                        field: ['num','num2'],
                        renderer: Ext.util.Format.numberRenderer('0,0'),
                        orientation: 'horizontal',
                        color: '#333'
                    },
                    tips: {
                        trackMouse: true,
                        renderer: function(storeItem, item) {
                            this.setTitle(storeItem.get('name')+"数量");
                            this.update("完成"+storeItem.get('num')+"个<br>定额"+(parseInt(storeItem.get('num2'))+parseInt(storeItem.get('num')))+"个");
                        }
                    }
                }
            ]
        });

        Ext.apply(this, {
            region: 'center',
            id: 'main_panel',
            name: 'main_panel',
            title:'分析结果',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
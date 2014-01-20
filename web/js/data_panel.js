Ext.define('My.data_panel', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        /**
         * Creating a Store
         */
        Ext.define('setup_Store', {
            extend: 'Ext.data.Model',
            fields: ['num', 'name']
        });
        /**
         * 点数据
         * @type {*}
         */
        var store = Ext.create('Ext.data.Store', {
            model: 'setup_Store',
            /*
            autoLoad:false,
            proxy:{
                type:'ajax',
                actionMethods:{
                    read:'POST'
                },
                url:'getChartInfo.jsp',
                method:'POST',
                reader:{
                    type:'json',
                    root:'data'
                }
            },
            */
            data: [
                { num: 1515, name: '新装' },
                { num: 2313, name: '包年续费' },
                { num: 687, name: '其他续费' },
                { num: 139, name: '停机注销' }
            ]
        });

        var chart = Ext.create('Ext.chart.Chart', {
            id:'main_chart',
            name:'main_chart',
            animate: true,
            shadow: true,
            store: store,
            axes: [
                {
                    title: '数量',
                    type: 'Numeric',
                    position: 'left',
                    fields: ['num'],
                    minimum: 0
                },
                {
                    title: '名称',
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name']
                }
            ],
            series: [
                {
                    type: 'column',
                    xField: 'name',
                    yField: 'num',
                    highlight: true,
                    listeners:{
                        itemmousedown:function(obj){
                            Ext.create('My.data_detail');
                            Ext.getCmp('data_detail').setTitle(obj.storeItem.data['name']);
                        }
                    },
                    tips: {
                        trackMouse: true,
                        width: 110,
                        height: 60,
                        renderer: function(storeItem, item) {
                            this.setTitle(storeItem.get('name')+"数量");
                            this.update(storeItem.get('num')+"个");
                        }
                    },
                    markerConfig: {
                        type: 'circle',
                        size: 4,
                        radius: 4,
                        'stroke-width': 0,
                        fill: '#38B8BF',
                        stroke: '#38B8BF'
                    },
                    renderer:  function(sprite, storeItem, barAttr, i, store) {
                        var colors = ['rgb(0,229,238)',
                            'rgb(255,215,0)',
                            'rgb(0,238,118)',
                            'rgb(255,48,48)'];
                        barAttr.fill = colors[i % colors.length];
                        return barAttr;
                    }
                }
            ]
        });

        Ext.apply(this, {
            region: 'center',
            id: 'data_panel',
            name: 'data_panel',
            title:'分析结果',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
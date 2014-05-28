﻿Ext.define('My.pre_charge_panel', {
    extend: 'Ext.panel.Panel',

    constructor: function() {
        Ext.define('pre_charge_store', {
            extend: 'Ext.data.Model',
            fields: [
                'name',
                {name:'num',type:'int'}
            ]
        });
        var store = Ext.create('Ext.data.Store', {
            model: 'pre_charge_store',
            storeId:'pre_charge_chart',
            proxy: {
                type: 'ajax',
                url: '/gtaomanage/PreChargeChartServlet',
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
                params:{month:Ext.util.Format.date(Ext.getCmp('data_month').getValue(), 'Ym'),
                department_id:Ext.getCmp('data_bs').getValue()}
            });

        var chart = Ext.create('Ext.chart.Chart', {
            id:'pre_charge_chart',
            name:'pre_charge_chart',
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
                    title: '报装数量',
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
                    listeners:{
                        itemmousedown:function(obj){
                            Ext.chart_id = obj.storeItem.data['name'];
                            Ext.create('My.pre_charge_detail');
                            Ext.getCmp('pre_charge_detail').setTitle(obj.storeItem.data['name']);
                        }
                    },
                    tips: {
                        trackMouse: true,
                        renderer: function(storeItem, item) {
                            this.setTitle(storeItem.get('name'));
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
            title:'预存网费统计',
            layout:'fit',
            border: false,
            frame:true,
            items:chart
        });

        this.callParent(arguments);
    }
});
Ext.define('My.data_detail', {
    extend: 'Ext.Window',
    
    constructor: function() {

        Ext.define('chartModel',{
            extend:'Ext.data.Model',
            fields:[
                {name:'name',type:'string'},
                {name:'data',type:'string'}
            ]
        });

        var store = Ext.create('Ext.data.JsonStore', {
            /*
            model:'chartModel',
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
            fields: ['name', 'data1'],
            data: [
                { 'name': '4M',   'data1': 521},
                { 'name': '10M',   'data1': 1000},
                { 'name': '20M',   'data1': 750},
                { 'name': '50M', 'data1': 59},
                { 'name': '100M',  'data1': 92}
            ]
        });

        var store2 = Ext.create('Ext.data.JsonStore', {
            /*
             model:'chartModel',
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
            fields: ['name', 'data1'],
            data: [
                { 'name': '包年',   'data1': 2345},
                { 'name': '包月',   'data1': 1262},
                { 'name': '包季',   'data1': 514},
                { 'name': '其他', 'data1': 286}
            ]
        });

        var store3 = Ext.create('Ext.data.JsonStore', {
            /*
             model:'chartModel',
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
            fields: ['name', 'data1'],
            data: [
                { 'name': '光纤',   'data1': 2345},
                { 'name': '非光纤',   'data1': 1262}
            ]
        });

        var bandwitch_pie = Ext.create('Ext.chart.Chart', {
            title:'带宽比例',
            width:290,
            height:290,
            animate: true,
            store: store,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'data1',
                showInLegend: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function(storeItem, item) {
                        // calculate and display percentage on hover
                        var total = 0;
                        store.each(function(rec) {
                            total += rec.get('data1');
                        });
                        this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%      '+storeItem.get('data1')+'个');
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
                    font: '10px Arial'
                }
            }]
        });

        var package_pie = Ext.create('Ext.chart.Chart', {
            title:'餐型比例',
            width:290,
            height:290,
            animate: true,
            store: store2,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'data1',
                showInLegend: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function(storeItem, item) {
                        // calculate and display percentage on hover
                        var total = 0;
                        store.each(function(rec) {
                            total += rec.get('data1');
                        });
                        this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%      '+storeItem.get('data1')+'个');
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
                    font: '10px Arial'
                }
            }]
        });

        var type_pie = Ext.create('Ext.chart.Chart', {
            title:'光纤比例',
            width:290,
            height:290,
            animate: true,
            store: store3,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'data1',
                showInLegend: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function(storeItem, item) {
                        // calculate and display percentage on hover
                        var total = 0;
                        store.each(function(rec) {
                            total += rec.get('data1');
                        });
                        this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%      '+storeItem.get('data1')+'个');
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
                    font: '10px Arial'
                }
            }]
        });

        Ext.apply(this, {
        	id: 'data_detail',
            name: 'data_detail',
            title: '信息窗口',
        	layout:'fit',
        	width: 950,
        	height: 400,
        	modal:true,
        	resizable:false,
        	autoShow:true,
            draggable:true,
            maximizable:true,
            minimizable:true,
        items: [{
        	xtype: 'form',
        	id:'mf_form',
        	name:'mf_form',
            layout:'fit',
            bodyStyle:'background-color:transparent',
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	height: 25,
            	html:'<p>预留</p>'
            }),
        items: [{
            xtype: 'panel',
            margin: '2 2 2 2',
            frame:true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 3
		            },
		            items:[
                        bandwitch_pie,
                        package_pie,
                        type_pie
                    ]
    		}]
    		}],            
            buttons: [
            	{
    				text: '关闭窗口',
    				handler: function(){
    					Ext.getCmp('data_detail').close();
    				}        				
            	}
            ]
        });
        
        this.callParent(arguments);
        
    }
});
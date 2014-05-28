Ext.define('My.pre_charge_detail', {
    extend: 'Ext.Window',
    
    constructor: function() {

        Ext.define('chartModel',{
            extend:'Ext.data.Model',
            fields:[
                {name:'name',type:'string'},
                {name:'data',type:'string'}
            ]
        });
        var chartInfo = Ext.chart_id;

        var store1 = Ext.create('Ext.data.JsonStore', {
            model:'chartModel',
            storeId:'preYearStore',
            autoLoad:false,
            proxy:{
                type:'ajax',
                actionMethods:{read:'POST'},
                url:'/gtaomanage/PreChargeDetailServlet',
                method:'POST',
                reader:{type:'json'}
            }
        }).load(
            {
                params:{
                    chart_info:chartInfo,
                    month:Ext.util.Format.date(Ext.getCmp('data_month').getValue(), 'Y-m'),
                    department_id:Ext.getCmp('data_bs').getValue()
                    }
            });

        var pre_pie = Ext.create('Ext.chart.Chart', {
            width:(window.screen.width/2-200),
            height:(window.screen.height-350),
            animate: true,
            store: store1,
            theme: 'Base:gradients',
            legend: {
                position: 'right'
            },
            series: [{
                type: 'pie',
                field: 'data',
                showInLegend: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function(storeItem, item) {
                        // calculate and display percentage on hover
                        var total = 0;
                        store1.each(function(rec) {
                            total += parseInt(rec.get('data'));
                        });
                        this.setTitle(storeItem.get('name') + ': '+storeItem.get('data')+'个');
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
            title: '预装详细信息',
        	layout:'fit',
        	width: window.screen.width/2-150,
        	height: window.screen.height-180,
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
        items: [{
            xtype: 'panel',
            margin: '2 2 2 2',
            frame:true,
            autoScroll: true,
		            layout: {
		            	type: 'table'
		            },
		            items:[pre_pie]
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

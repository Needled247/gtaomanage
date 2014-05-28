Ext.define('My.main_detail', {
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

        var tblStore = Ext.create('Ext.data.JsonStore', {
            fields: ['class','thisMonth','lastMonth','plus'],//定义字段
            storeId:'mainTblStore',
            autoLoad:false,
            proxy:{
                type:'ajax',
                actionMethods:{read:'POST'},
                url:'/gtaomanage/getDetailTableInfo',
                method:'POST',
                reader:{type:'json'}
            }
        }).load({params:{
            chart_info:chartInfo,
            department_id:Ext.getCmp('data_bs').getValue(),
            month:Ext.util.Format.date(Ext.getCmp('data_month').getValue(), 'Y-m')
        }});

        var store1 = Ext.create('Ext.data.JsonStore', {
            model:'chartModel',
            storeId:'mainBandStore',
            autoLoad:false,
            proxy:{
                type:'ajax',
                actionMethods:{read:'POST'},
                url:'/gtaomanage/getMainChartDetail',
                method:'POST',
                reader:{type:'json'}
            }
        }).load({params:{
            type:1,
            chart_info:chartInfo,
            department_id:Ext.getCmp('data_bs').getValue(),
            month:Ext.util.Format.date(Ext.getCmp('data_month').getValue(), 'Y-m')
        }});

        var store2 = Ext.create('Ext.data.JsonStore', {
            model:'chartModel',
            storeId:'mainMtStore',
            autoLoad:false,
            proxy:{
                type:'ajax',
                actionMethods:{read:'POST'},
                url:'/gtaomanage/getMainChartDetail',
                method:'POST',
                reader:{type:'json'}
            }
        }).load({params:{
            type:2,
            chart_info:chartInfo,
            department_id:Ext.getCmp('data_bs').getValue(),
            month:Ext.util.Format.date(Ext.getCmp('data_month').getValue(), 'Y-m')
        }});


        var store3 = Ext.create('Ext.data.JsonStore', {
            model:'chartModel',
            storeId:'mMainStore',
            autoLoad:false,
            proxy:{
                type:'ajax',
                actionMethods:{read:'POST'},
                url:'/gtaomanage/getMainChartDetail',
                method:'POST',
                reader:{type:'json'}
            }
        }).load(
            {params:{
                type:0,
                chart_info:chartInfo,
                department_id:Ext.getCmp('data_bs').getValue(),
                month:Ext.util.Format.date(Ext.getCmp('data_month').getValue(), 'Y-m')
            }}
        );

        var detail_info = Ext.create('Ext.grid.Panel',{
            title : '详细信息',
            width:window.screen.width-220,
            height:window.screen.height-500,
            colspan:3,
            frame:false,
            viewConfig: {
                forceFit : true,
                stripeRows: true//在表格中显示斑马线
            },
            autoDestroy:true,
            store: tblStore,
            columns: [//配置表格列
                {header: "产品名",align:'center', width: (window.screen.width-220)/4, dataIndex: 'class', sortable: true},
                {header: "本月",align:'center', width: (window.screen.width-220)/4, dataIndex: 'thisMonth', sortable: true},
                {header: "上月",align:'center', width: (window.screen.width-220)/4, dataIndex: 'lastMonth', sortable: true},
                {header: "增长",align:'center', width: (window.screen.width-220)/4, dataIndex: 'plus', sortable: true,
                    renderer : function(val) {
                        if (val >= 0) {
                            return '<b><font color="green">' + val + '</font></b>';
                        } else if (val < 0) {
                            return '<b><font color="red">' + val + '</font></b>';
                        }
                        return val;
                    }
                }
            ]
        });

        var bandwitch_pie = Ext.create('Ext.chart.Chart', {
            title:'带宽比例（分解）',
            width:(window.screen.width-200)/3,
            height:(window.screen.height-420),
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

        var package_pie = Ext.create('Ext.chart.Chart', {
            title:'餐型比例（分解）',
            width:(window.screen.width-200)/3,
            height:(window.screen.height-420),
            animate: true,
            store: store2,
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
                        var total = 0;
                        store2.each(function(rec) {
                            total += rec.get('data');
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

        var all_pie = Ext.create('Ext.chart.Chart', {
            title:'餐型比例',
            width:(window.screen.width-150)/3,
            height:(window.screen.height-400),
            animate: true,
            store: store3,
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
                        var total = 0;
                        store2.each(function(rec) {
                            total += rec.get('data');
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
        	id: 'main_detail',
            name: 'main_detail',
            title: '信息窗口',
        	layout:'fit',
        	width: window.screen.width-150,
        	height: window.screen.height-200,
        	modal:true,
        	resizable:false,
        	autoShow:true,
            draggable:true,
            maximizable:true,
            minimizable:true,
        items: [{
        	xtype: 'form',
        	id:'m_form',
        	name:'m_form',
            layout:'fit',
            bodyStyle:'background-color:transparent',
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	height: 25,
            	html:'<p>打印此页面</p>'
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
                        all_pie,
                        bandwitch_pie,
                        package_pie,
                        detail_info
                    ]
    		    }]
    		}],            
            buttons: [
            	{
    				text: '关闭窗口',
    				handler: function(){
    					Ext.getCmp('main_detail').close();
    				}        				
            	}
            ]
        });
        this.callParent(arguments);
    }
});

function MergerSimilarItems(store){
    var arr = eval(store);
    for(var i=0;i<arr.length;i++){
        alert(arr[i].name);
    }
}
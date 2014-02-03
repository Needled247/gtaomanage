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

        var store1 = Ext.create('Ext.data.JsonStore', {
            model:'chartModel',
            storeId:'bandStore',
            autoLoad:false,
            proxy:{
                type:'ajax',
                actionMethods:{read:'POST'},
                url:'getMainChartDetail.jsp',
                method:'POST',
                reader:{type:'json'}
            }
        }).load({params:{type:1}});

        var store2 = Ext.create('Ext.data.JsonStore', {
            model:'chartModel',
            storeId:'mtStore',
            autoLoad:false,
            proxy:{
                type:'ajax',
                actionMethods:{read:'POST'},
                url:'getMainChartDetail.jsp',
                method:'POST',
                reader:{type:'json'}
            }
        }).load({params:{type:2}});

        var store3 = Ext.create('Ext.data.JsonStore', {
            model:'chartModel',
            storeId:'fiberStore',
            autoLoad:false,
            proxy:{
                type:'ajax',
                actionMethods:{read:'POST'},
                url:'getMainChartDetail.jsp',
                method:'POST',
                reader:{type:'json'}
            }
        }).load({params:{type:3}});

        var bandwitch_pie = Ext.create('Ext.chart.Chart', {
            title:'带宽比例',
            width:290,
            height:290,
            animate: true,
            store: store1,
            theme: 'Base:gradients',
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
                        this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%      '+storeItem.get('data')+'个');
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
                field: 'data',
                showInLegend: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function(storeItem, item) {
                        var total = 0;
                        store.each(function(rec) {
                            total += rec.get('data');
                        });
                        this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%      '+storeItem.get('data')+'个');
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
                field: 'data',
                showInLegend: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function(storeItem, item) {
                        // calculate and display percentage on hover
                        var total = 0;
                        store.each(function(rec) {
                            total += rec.get('data');
                        });
                        this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%      '+storeItem.get('data')+'个');
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

function MergerSimilarItems(store){
    var arr = eval(store);
    for(var i=0;i<arr.length;i++){
        alert(arr[i].name);
    }
    /*
    for(var i=0;i<store.length;i++){
        if(arr[store[i].name]!==undefined){
            arr[store[i].name].data = parseInt(arr[store[i].name].data)+parseInt(store[i].data);
        }else{
            arr[store[i].name] = store[i];
        }
    }
    console.log(arr);   */
}
Ext.define('My.user_count', {
    extend: 'Ext.panel.Panel',
	
    constructor: function() {
    	
    	//初始化
        Ext.apply(this, {       	
        	title: '社区用户统计',
            region: 'center',
            margin: '0 5 5 0',
            id: 'user_count',
            name: 'user_count',
//            border: false,
            layout: 'border',
            frame: true,
            items: [
            	Ext.create('My.uc_grid')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'uc_tb',
            	name:'uc_tb',
            	border: false,
            	height: 40,
            	items: [
            	'-',
            	{
            		id: 'bs_name',
	                name: 'bs_name',
	                xtype:'combobox',
	                emptyText:'请选择营业厅',
	                store: Ext.data.StoreManager.lookup('bs_name'),
			      	width: 110,
			      	valueField:'id',
	      			displayField:'name',
	      			queryMode:'local',
	      			value:'',
	      			hidden:true,
	      			//allowBlank: false,
					//blankText: '请选择营业厅',
					editable: false							
            	},
				{
					xtype:'button',
					id: 'reset_btn',
	                name: 'reset_btn',
    				text: '重置查询',
    				icon: '../../image/reset_btn.png',
    				scale: 'medium',
    				handler: function(){
    					Ext.getCmp('bs_name').reset();
    				}
				},
            	{
            		xtype:'button',
	        		text: '用户统计',
	        		id:'qbtn',
	        		icon: '../../image/find_user1.png',
	        		scale: 'medium',
	        		handler: function(){
	        			var params = Ext.getCmp('uc_grid').getStore().getProxy().extraParams;
	        			params['bs_name']=Ext.getCmp('bs_name').getValue();	        			
		        		Ext.getCmp('uc_grid').getStore().loadPage(1);      			
	        		}        		
        		},'-',
        		{
        			xtype:'button',
        			id: 'excel_btn',
			        name: 'excel_btn',
	        		text: '导出Excel',
	        		icon: '../../image/excel_btn.png',
	        		scale: 'medium',
	        		handler: function(){
	        			if(Ext.getCmp('uc_grid').getStore().getCount()==0){
	        				return;
	        			}
	        			var params = Ext.getCmp('uc_grid').getStore().getProxy().extraParams;
	        			var reqStr='';
	        			reqStr+='bs_name='+params['bs_name'];
//	        			window.location.href="get_uc_excel.jsp?"+reqStr;
	        			window.open("get_uc_excel.jsp?"+reqStr);
	        		}
        		}
        	]})
        });
        
        this.callParent(arguments);
        
    }
});
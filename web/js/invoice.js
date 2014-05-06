Ext.define('My.invoice', {
    extend: 'Ext.panel.Panel',
	
    constructor: function() {    	

   	
		 
    	//初始化
        Ext.apply(this, {       	
        	title: '发票管理',
        	icon: '../../image/invoice.png',
			scale: 'small',
            region: 'center',
            margin: '0 5 5 0',
            id: 'zc_charge',
            name: 'zc_charge',
//            border: false,
            layout: 'border',
            frame: true,
            items: [
            	Ext.create('My.invoice_north'),
            	Ext.create('My.invoice_grid')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'zc_tb',
            	name:'zc_tb',
            	border: false,
            	height: 40,
            	items: [
            	'-',
            	{
            		id: 'bs_name',
	                name: 'bs_name',
	                xtype:'combobox',
	                hidden:true,
	                emptyText:'请选择营业厅',
	                store: Ext.data.StoreManager.lookup('bs_name'),
			      	width: 110,
			      	valueField:'id',
	      			displayField:'name',
	      			value:'',
	      			//allowBlank: false,
					//blankText: '请选择营业厅',
					editable: false,
					queryMode:'local'
            	},
            	{
            		xtype:'button',
	        		text: '查询',
	        		id:'qbtn',
	        		icon: '../../image/find_user1.png',
	        		scale: 'medium',
	        		handler: function(){
	        			var params = Ext.getCmp('invoice_grid').getStore().getProxy().extraParams;
	        			params['invoice_bs']=Ext.getCmp('bs_name').getValue();
	        			params['startDate']=Ext.getCmp('invoice_startDate').getRawValue();
	        			params['endDate']=Ext.getCmp('invoice_endDate').getRawValue();
	        			params['used']=Ext.getCmp('used').getValue();
	        			Ext.getCmp('invoice_grid').getStore().loadPage(1);
	        		}        		
        		},
        		{
        			xtype:'button',
        			id: 'reset_btn',
			        name: 'reset_btn',
	        		text: '重置查询',
	        		icon: '../../image/reset_btn.png',
	        		scale: 'medium',
	        		handler: function(){
	        			if(!Ext.getCmp('bs_name').isHidden()){
							Ext.getCmp('bs_name').reset();
						}
	        			Ext.getCmp('invoice_startDate').reset();
	        			Ext.getCmp('invoice_endDate').reset();
	        			Ext.getCmp('used').reset();
	        		}
        		},
        		{
        			id: 'admin_fn',
					text: '管理',
					icon: '../../image/admin_fn.png',
					scale: 'medium',
					hidden:true,
		            menu: [
					{
						text: '删除所选',
						icon: '../../image/delete.png',
						scale: 'small',
						handler: function(){
							var sm=Ext.getCmp('invoice_grid').getSelectionModel().getSelection();
    						if(sm!=null){
    								if(confirm("您确定要删除这些发票信息吗?")){
                                        var str = '';
                                        for(var i=0;i<sm.length;i++){
                                            str += sm[i].get('invoice_id')+',';
                                        }
                                        str  = str.replace(/,$/gi,'');
	    	        					Ext.Ajax.request({
	    							    		url: 'invoice_del.jsp',
	    							    		method: 'POST',
	    									    params: {
	    									        invoice_id : str
	    									    }
	    								});
	    	        					Ext.data.StoreManager.lookup('invoice_grid_store').remove(sm);
	            					}
                            }else{
    							alert('请先选择记录');
    						}										
						}
					},{
                            text: '添加发票',
                            icon: '../../image/add.png',
                            scale: 'small',
                            handler: function(){
                                Ext.create('My.invoice_save');
                                Ext.getCmp('invoice_save').setTitle('添加发票信息');
                            }
                    }]
            	}
        	]})
        });
        
        this.callParent(arguments);
        
    }
});
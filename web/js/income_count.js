Ext.define('My.income_count', {
    extend: 'Ext.panel.Panel',
	
    constructor: function() {    	
    	
    	//初始化
        Ext.apply(this, {       	
        	title: '社区收入统计',
        	icon: '../../image/income_count.png',
			scale: 'small',
            region: 'center',
            margin: '0 5 5 0',
            id: 'income_count',
            name: 'income_count',
//            border: false,
            layout: 'border',
            frame: true,
            items: [
            	Ext.create('My.ic_grid')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'ic_tb',
            	name:'ic_tb',
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
            		xtype:'datefield',
	                fieldLabel: '起始日期',
	                id: 'startDate',
	                name: 'startDate',
	              	value: Ext.Date.format(new Date(), 'Y-m-d'),
	              	format: 'Y-m-d',
	              	maxValue: new Date(),
	                labelWidth: 60,
	                width: 180,
					allowBlank: false,
					blankText: '请输入起始日期',
					editable: false,
					listeners: {
                    	change: function(obj){
                    		Ext.getCmp('endDate').setMinValue(obj.getRawValue());
                    	}
                    }
            	},
            	'-',
            	{
            		xtype:'datefield',
	                fieldLabel: '截止日期',
	                id: 'endDate',
	                name: 'endDate',
	              	value: Ext.Date.format(new Date(), 'Y-m-d'),
	              	format: 'Y-m-d',
	              	maxValue: new Date(),
	                labelWidth: 60,
	                width: 180,	                
					allowBlank: false,
					blankText: '请输入截止日期',
					editable: false,
					listeners: {
                    	change: function(obj){
                    		Ext.getCmp('startDate').setMaxValue(obj.getRawValue());
                    	}
                    }
            	},
            	'-',
            	{
            		xtype:'button',
	        		text: '收入统计',
	        		id:'qbtn',
	        		icon: '../../image/find_user1.png',
	        		scale: 'medium',
	        		handler: function(){
	        			if(Ext.getCmp('startDate').isValid()){	        				
	        				if(Ext.getCmp('endDate').isValid()){	        					
	        					var params = Ext.getCmp('ic_grid').getStore().getProxy().extraParams;
	        					params['bs_name']=Ext.getCmp('bs_name').getValue();
	        					params['startDate']=Ext.getCmp('startDate').getRawValue();
	    	        			params['endDate']=Ext.getCmp('endDate').getRawValue();
	    	        			Ext.getCmp('ic_grid').getStore().loadPage(1);
	        				}
						}
	        		}        		
        		},
		        '-',
        		{
        			xtype:'button',
        			id: 'ex_fn',
			        name: 'ex_fn',
	        		text: '导出Excel',
	        		icon: '../../image/excel_btn.png',
	        		scale: 'medium',
	        		hidden: true,
	        		menu: [
					{
						text: '财务对账表',
		        		handler: function(){
		        			var reqStr='';
		        			reqStr+='bs_id='+Ext.getCmp('bs_name').getValue();
		        			reqStr+='&bs_name='+encodeURI(encodeURI(Ext.getCmp('bs_name').getRawValue()));
		        			reqStr+='&startDate='+Ext.getCmp('startDate').getRawValue();
		        			reqStr+='&endDate='+Ext.getCmp('endDate').getRawValue();
	//	        			window.location.href="get_ic_excel.jsp?"+reqStr;
		        			window.open("get_dz_excel.jsp?"+reqStr);
		        		}
					},
                    {
                        text: '财务对账表（汇总）',
                        handler: function(){
                            var reqStr='';
                            reqStr+='bs_id=';
                            reqStr+='&bs_name=';
                            reqStr+='&startDate='+Ext.getCmp('startDate').getRawValue();
                            reqStr+='&endDate='+Ext.getCmp('endDate').getRawValue();
                            //	        			window.location.href="get_ic_excel.jsp?"+reqStr;
                            window.open("get_dz_excel.jsp?"+reqStr);
                        }
                    },
					{
						text: '社区收入表',
		        		handler: function(){
		        			var reqStr='';
		        			reqStr+='bs_name='+Ext.getCmp('bs_name').getValue();
		        			reqStr+='&startDate='+Ext.getCmp('startDate').getRawValue();
		        			reqStr+='&endDate='+Ext.getCmp('endDate').getRawValue();
	//	        			window.location.href="get_ic_excel.jsp?"+reqStr;
		        			window.open("get_ic_excel.jsp?"+reqStr);
		        		}
					},
					{
						text: '活动汇总表',
		        		handler: function(){
		        			var reqStr='';
		        			reqStr+='bs_id='+Ext.getCmp('bs_name').getValue();
		        			reqStr+='&bs_name='+encodeURI(encodeURI(Ext.getCmp('bs_name').getRawValue()));
		        			reqStr+='&startDate='+Ext.getCmp('startDate').getRawValue();
		        			reqStr+='&endDate='+Ext.getCmp('endDate').getRawValue();
	//	        			window.location.href="get_ic_excel.jsp?"+reqStr;
		        			window.open("get_hd_excel.jsp?"+reqStr);
		        		}
					}]
        		}
        	]})
        });
        
        this.callParent(arguments);
        
    }
});
Ext.define('My.noqc_grid', {
    extend: 'Ext.grid.Panel',
    
    constructor: function() {
    	
    	//创建grid
    	Ext.define('noqc_grid', {
            extend: 'Ext.data.Model',
            fields: [
    		            //{ name: 'ask_date', type: 'date', dateFormat: 'Y-m-d' },
    		            //{ name: 'ask_time', type: 'date', dateFormat: 'H:i:s' },
            			'bs_name',
            			'charge_date',
            			'realname',
            			'tel',
            			'addr',
            			'receipt_id',
            			'charge_type',
            			'pay_type',
            			{name:'charge_amount',type:'float'},
            			'note',
            			'contract_name',            			
            			'save_admin',
            			'save_time',
            			'charge_id'
            		]
        	});
        	
        	var noqc_grid_store = Ext.create('Ext.data.Store', {
//        		 remoteSort:true,
        		 storeId:'noqc_grid_store',
        		 pageSize: 30,
    			 autoDestroy: true,
    			 model: 'noqc_grid',
    		     proxy: {
    		         type: 'ajax',
    		         actionMethods : {
    		        	 read : 'POST'
    		         },
    		         url: 'getnoQcInfo.jsp',
    		         reader: {
    		             type: 'json',
    		             root: 'data',
    		             totalProperty: 'totalCount'
    		         }
    		     },
//    		     sorters: [{
//    	            property: 'ask_date',
//    	            direction: 'DESC'
//            	 },{
//    	            property: 'ask_time',
//    	            direction: 'DESC'
//            	 }],
    		     autoLoad: false
    		 });
    		 
    		 
    	
        Ext.apply(this, {
            region: 'center',
            id: 'noqc_grid',
            name: 'noqc_grid',
            store: noqc_grid_store,
//            loadMask: true,
//            forceFit: true,
            border: false,
//            frame: true,
//            viewConfig: {forceFit: true},            
            columns: [{
                header: '营业厅',
                dataIndex: 'bs_name',
                width: 110
            },{
                header: '收费日期',
                dataIndex: 'charge_date',
                width: 110
            },{
                header: '用户姓名',
                dataIndex: 'realname',
                width: 100
            },{
                header: '联系电话',
                dataIndex: 'tel',
                width: 200
            },{
                header: '用户住址',
                dataIndex: 'addr',
                width: 170
            },{
                header: '收据号码',
                dataIndex: 'receipt_id',
                width: 150
            },{
                header: '支付方式',
                dataIndex: 'pay_type',
                width: 140
            },{
                header: '收费类别',
                dataIndex: 'charge_type',
                width: 140
            },{
                header: '收费金额',
                dataIndex: 'charge_amount',
                width: 160,
                renderer : function(val) {
			        if (val >= 0) {
			            return '<b>￥<font color="green">' + val + '</font></b>';
			        } else if (val < 0) {
			            return '<b>￥<font color="red">' + val + '</font></b>';
			        }
	        		return val;
    			}
            }],
            
            plugins: [{
	            ptype: 'rowexpander',	            
	            rowBodyTpl : [
	                '<p><b>备注信息&nbsp;:&nbsp;<font color="#8B0000">{note}</font></b></p>',	                
	                '<p><b>所属合同&nbsp;:&nbsp;<font color="#8B0000">{contract_name}</font></b></p>',
	                '<p><b>录入人&nbsp;:&nbsp;<font color="#8B0000">{save_admin}</font></b>',
	                '<b style="margin-left:40px;">录入时间&nbsp;:&nbsp;<font color="#8B0000">{save_time}</font></b></p>'
	            ]
        	}],
            
			tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'qc_tb',
            	name:'qc_tb',
            	border: false,
            	margin: '0 0 10 0',
//            	height: 40,
            	items: [
            	'-',
            	{
        			id: 'addmf',
					text: '添加修改',
					icon: '../../image/addmf.png',
					scale: 'medium',
					hidden:true,
		            menu: [
					{        				    
						text: '添加收费信息',
						icon: '../../image/add.png',
						scale: 'small',
						handler: function(){
							Ext.create('My.nofc_save');
							Ext.getCmp('nofc_save').setTitle('添加收费信息');
							if(Ext.getCmp('bs_name').isHidden()){
								var did=Ext.data.StoreManager.lookup('bs_name').findRecord('id',Ext.bs_did);        						
	    						Ext.getCmp('nofc_bs').setRawValue(did.get('name'));
								Ext.getCmp('nofc_bs').setReadOnly(true);
							}
						}
					},
					{
					text: '修改收费信息',
					icon: '../../image/modify.png',
					scale: 'small',
					handler: function(){						
						var sm=Ext.getCmp('noqc_grid').getSelectionModel();
						if(sm.hasSelection()){
							var r=sm.getLastSelected();
							var cur_year=Ext.Date.format(new Date(),'Y');
							var cur_month=Ext.Date.format(new Date(),'m');    							
							var charge_date=r.get('charge_date').split('-');
							if(cur_year==charge_date[0]){
								if(cur_month==charge_date[1]){
									Ext.create('My.nofc_save');
									Ext.getCmp('nofc_save').setTitle('修改收费信息');
									Ext.getCmp('nofc_bs').setRawValue(r.get('bs_name'));
									if(Ext.getCmp('bs_name').isHidden()){
										Ext.getCmp('nofc_bs').setReadOnly(true);
									}
									Ext.getCmp('nofc_rname').setRawValue(r.get('realname'));
									Ext.getCmp('nofc_date').setValue(r.get('charge_date'));
									Ext.getCmp('nofc_id').setValue(r.get('charge_id'));
									Ext.getCmp('nofc_rid').setValue(r.get('receipt_id'));
				        			Ext.getCmp('nofc_amount').setValue(r.get('charge_amount'));			        			
				        			Ext.getCmp('nofc_pt').setValue(r.get('pay_type'));
				        			Ext.getCmp('nofc_ct').setValue(r.get('charge_type'));
				        			Ext.getCmp('nofc_note').setValue(r.get('note'));
				        			Ext.getCmp('nofc_tel').setValue(r.get('tel'));
				        			Ext.getCmp('nofc_addr').setValue(r.get('addr'));
				        			Ext.getCmp('nofc_hetong').setValue(r.get('contract_name'));									
								}else{
									alert('很抱歉，您只能修改当月收费信息');
								}
							}else{
								alert('很抱歉，您只能修改当月收费信息');
							}
						}else{
							alert('请先选择一行记录');
						}
					}
				    }]
				},{
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
	        		text: '查询信息',
	        		id:'qbtn',
	        		icon: '../../image/find_user1.png',
	        		scale: 'medium',
	        		handler: function(){
	        			
	        			if(!Ext.getCmp('startDate').isValid()){
	        				return;
	        			}
	        			
	        			if(!Ext.getCmp('endDate').isValid()){
	        				return;
	        			}
	        			
	        			if(Ext.getCmp('charge_type').getValue()!=''){
    						if(Ext.getCmp('charge_type').getValue()==Ext.getCmp('charge_type').getRawValue()){
        						return;
        					}
						}
	        			var params = Ext.getCmp('noqc_grid').getStore().getProxy().extraParams;
	        			params['qc_bs_name']=Ext.getCmp('bs_name').getValue();
	        			params['startDate']=Ext.getCmp('startDate').getRawValue();
	        			params['endDate']=Ext.getCmp('endDate').getRawValue();
	        			params['receipt_id']=Ext.getCmp('receipt_id').getValue();
	        			params['pay_type']=Ext.getCmp('pay_type').getValue();
	        			params['charge_type']=Ext.getCmp('charge_type').getValue();
	        			params['note']=Ext.getCmp('note').getValue();
	        			params['realname']=Ext.getCmp('realname').getValue();
	        			params['addr']=Ext.getCmp('addr').getValue();
	        			params['save_admin']=Ext.getCmp('save_admin').getValue();
	        			params['tel']=Ext.getCmp('tel').getValue();
	        			Ext.getCmp('noqc_grid').getStore().loadPage(1);
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
	        			Ext.getCmp('startDate').reset();
	        			Ext.getCmp('endDate').reset();
	        			Ext.getCmp('receipt_id').reset();
	        			Ext.getCmp('pay_type').reset();
	        			Ext.getCmp('charge_type').reset();
	        			Ext.getCmp('note').reset();
	        			Ext.getCmp('realname').reset();
	        			Ext.getCmp('addr').reset();
	        			Ext.getCmp('save_admin').reset();
	        			Ext.getCmp('tel').reset();
	        		}
        		},
        		{
        			xtype:'button',
        			id: 'ex_fn',
			        name: 'ex_fn',
	        		text: '导出Excel',
	        		icon: '../../image/excel_btn.png',
	        		scale: 'medium',
	        		hidden: true,
	        		handler: function(){
	        			if(Ext.getCmp('noqc_grid').getStore().getCount()==0){
	        				return;
	        			}	        					
	        			var params = Ext.getCmp('noqc_grid').getStore().getProxy().extraParams;
	        			var reqStr='';
	        			reqStr+='qc_bs_name='+params['qc_bs_name'];
	        			reqStr+='&startDate='+params['startDate'];
	        			reqStr+='&endDate='+params['endDate'];
	        			reqStr+='&receipt_id='+encodeURI(encodeURI(params['receipt_id']));
	        			reqStr+='&pay_type='+params['pay_type'];
	        			if(params['charge_type']==null){
	        				reqStr+='&charge_type=';
	        			}else{
	        				reqStr+='&charge_type='+params['charge_type'];
	        			}
	        			reqStr+='&note='+encodeURI(encodeURI(params['note']));
	        			reqStr+='&realname='+encodeURI(encodeURI(params['realname']));
	        			reqStr+='&addr='+encodeURI(encodeURI(params['addr']));
	        			reqStr+='&save_admin='+encodeURI(encodeURI(params['save_admin']));
	        			reqStr+='&tel='+encodeURI(encodeURI(params['tel']));
//	        			window.location.href="get_qc_excel.jsp?"+reqStr;
	        			window.open("get_noqc_excel.jsp?"+reqStr);
	        		}
        		},
        		{
        			id: 'admin_fn',
					text: '管理员功能',
					icon: '../../image/admin_fn.png',
					scale: 'medium',
					hidden:true,
		            menu: [
					{
						text: '删除收费信息',
						icon: '../../image/delete.png',
						scale: 'small',
						handler: function(){
							var sm=Ext.getCmp('noqc_grid').getSelectionModel();
    						if(sm.hasSelection()){
    							var r=sm.getLastSelected();
    							var cur_date=Ext.Date.format(new Date(),'Y-m-d');
    							var charge_date=r.get('charge_date');
    							if(cur_date==charge_date){
    								if(confirm("您确定要删除此条收费信息吗?")){
	    	        					Ext.Ajax.request({
	    							    		url: 'nocharge_del.jsp',
	    							    		method: 'POST',
	    									    params: {
	    									        charge_id : r.get('charge_id'),
	    									        list_name : Ext.getCmp('fyh_qc').text
	    									    }
	    								});
	    	        					Ext.data.StoreManager.lookup('noqc_grid_store').remove(r);
	            					}
    							}else{
            						alert('很抱歉，您只能删除当日收费信息');
                				}
    							
//    							var cur_year=Ext.Date.format(new Date(),'Y');
//    							var cur_month=Ext.Date.format(new Date(),'m');    							
//    							var charge_date=r.get('charge_date').split('-');
//    							if(cur_year==charge_date[0]){
//    								if(cur_month==charge_date[1]){
//    									if(confirm("您确定要删除此条收费信息吗?")){
//    	    	        					Ext.Ajax.request({
//    	    							    		url: 'nocharge_del.jsp',
//    	    							    		method: 'POST',
//    	    									    params: {
//    	    									        charge_id : r.get('charge_id'),
//    	    									        list_name : Ext.getCmp('fyh_qc').text
//    	    									    }
//    	    								});
//    	    	        					Ext.data.StoreManager.lookup('noqc_grid_store').remove(r);
//    	            					}    									
//    								}else{
//    									alert('很抱歉，您只能删除当月收费信息');
//    								}
//    							}else{
//    								alert('很抱歉，您只能删除当月收费信息');
//    							}
    						}else{
    							alert('请先选择一行记录');
    						}										
						}
					},{
						text: '查看操作记录',
						icon: '../../image/log.png',
						scale: 'small',
						handler: function(){
							var sm=Ext.getCmp('noqc_grid').getSelectionModel();
    						if(sm.hasSelection()){
    							Ext.create('My.log_window');
								Ext.getCmp('log_window').setTitle('查看操作记录');
    							var r=sm.getLastSelected();
    	        				var params=Ext.data.StoreManager.lookup('log_grid_store').getProxy().extraParams;
		            			params['username']=r.get('charge_id');
		            			params['list_name']=Ext.getCmp('fyh_qc').text;
		            			Ext.data.StoreManager.lookup('log_grid_store').loadPage(1);
    						}else{
    							alert('请先选择一行记录');
    						}										
						}
					}]
            	}
        	]}),
        
        	bbar: new Ext.PagingToolbar({
                store: noqc_grid_store,
                displayInfo: true,
                displayMsg: '本页显示{0}-{1}行 共<b><font color="red">{2}</font></b>行',
                emptyMsg: '没有可用数据',
                listeners: {
    	            beforechange: function(){
    	            	
    	            }
                }
            })            
        });
        
        this.callParent(arguments);
        
    }
});
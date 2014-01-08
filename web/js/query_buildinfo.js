Ext.define('My.query_buildinfo', {
    extend: 'Ext.panel.Panel',
	
    constructor: function() {    	
    	
    	//初始化
        Ext.apply(this, {       	
        	title: '楼宇覆盖信息',
        	icon: '../../image/add_contract.png',
			scale: 'small',
            region: 'center',
            margin: '0 5 5 0',
            id: 'query_buildinfo',
            name: 'query_buildinfo',
//            border: false,
            layout: 'border',
            frame: true,
            items: [
            	Ext.create('My.qb_tabPanel')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'qb_tb',
            	name:'qb_tb',
            	border: false,
            	height: 40,
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
						text: '添加楼宇信息',
						icon: '../../image/add.png',
						scale: 'small',
						handler: function(){
								Ext.create('My.bi_save');
								Ext.getCmp('bi_save').setTitle('添加楼宇信息');
    							if(Ext.getCmp('bs_name').isHidden()){
    								var did=Ext.data.StoreManager.lookup('bs_name').findRecord('id',Ext.bs_did);        						
    	    						Ext.getCmp('bi_bs_name').setRawValue(did.get('name'));
    								Ext.getCmp('bi_bs_name').setReadOnly(true);
    							} 
						}
					},
					{        				    
						text: '修改楼宇信息',
						icon: '../../image/modify.png',
						scale: 'small',
						handler: function(){
							var sm=Ext.getCmp('qb_grid').getSelectionModel();
    						if(sm.hasSelection()){
    							Ext.create('My.bi_save');
    							Ext.getCmp('bi_save').setTitle('修改楼宇信息');
    							var r=sm.getLastSelected();
    							Ext.getCmp('bi_hetong_txt').setValue(r.get('contract_name'));
    							Ext.getCmp('bi_bs_name').setRawValue(r.get('hall_id'));
    							if(Ext.getCmp('bs_name').isHidden()){
    								Ext.getCmp('bi_bs_name').setReadOnly(true);
    							}    							
    							Ext.getCmp('bi_big_id').setValue(r.get('big_id'));
    							Ext.getCmp('bi_ht_type').setRawValue(r.get('contract_type'));
    							Ext.getCmp('bi_qydate').setValue(r.get('sign_date'));
    							Ext.getCmp('bi_xqtime').setValue(r.get('xq_open_date'));
    							Ext.getCmp('bi_ggtime').setValue(r.get('gg_open_date'));
    							Ext.getCmp('bi_isgg').setRawValue(r.get('is_gg'));
    							Ext.getCmp('bi_isxk').setRawValue(r.get('is_xk'));
    							Ext.getCmp('bi_live_num').setValue(r.get('live_num'));
    							Ext.getCmp('bi_gglive_num').setValue(r.get('gg_live_num'));
    							Ext.getCmp('bi_isjz').setRawValue(r.get('is_jz'));
    							Ext.getCmp('bi_jzbrand').setValue(r.get('jz_brand'));
    							Ext.getCmp('bi_id').setValue(r.get('bi_id'));
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
	        			if(Ext.getCmp('qb_hetong').getValue()!=''){
    						if(Ext.getCmp('qb_hetong').getValue()==Ext.getCmp('qb_hetong').getRawValue()){
        						return;
        					}
						}
	        			var params = Ext.getCmp('qb_grid').getStore().getProxy().extraParams;
	        			params['qb_hetong']=Ext.getCmp('qb_hetong').getValue();
	        			params['big_id']=Ext.getCmp('big_id').getValue();
	        			params['qydate']=Ext.getCmp('qydate').getRawValue();
	        			params['xqtime']=Ext.getCmp('xqtime').getRawValue();
	        			params['ggtime']=Ext.getCmp('ggtime').getRawValue();
	        			params['qb_bs_name']=Ext.getCmp('bs_name').getValue();
	        			params['ht_type']=Ext.getCmp('ht_type').getValue();
	        			params['isgg']=Ext.getCmp('isgg').getValue();
	        			params['isxk']=Ext.getCmp('isxk').getValue();
	        			params['isjz']=Ext.getCmp('isjz').getValue();
	        			params['jzbrand']=Ext.getCmp('jzbrand').getValue();
	        			params['startDate']=Ext.getCmp('startDate').getRawValue();
	        			params['endDate']=Ext.getCmp('endDate').getRawValue();
	        			params['save_admin']=Ext.getCmp('save_admin').getValue();
	        			Ext.getCmp('qb_grid').getStore().loadPage(1);
	        		}        		
        		},
		        '-',
        		{
        			xtype:'button',
        			id: 'reset_btn',
			        name: 'reset_btn',
	        		text: '重置查询',
	        		icon: '../../image/reset_btn.png',
	        		scale: 'medium',
	        		handler: function(){
	        			Ext.getCmp('qb_hetong').reset();
	        			Ext.getCmp('big_id').reset();
	        			Ext.getCmp('qydate').reset();
	        			Ext.getCmp('xqtime').reset();
	        			Ext.getCmp('ggtime').reset();
	        			if(!Ext.getCmp('bs_name').isHidden()){
							Ext.getCmp('bs_name').reset();
						}
	        			Ext.getCmp('ht_type').reset();
	        			Ext.getCmp('isgg').reset();
	        			Ext.getCmp('isxk').reset();
	        			Ext.getCmp('isjz').reset();
	        			Ext.getCmp('jzbrand').reset();
	        			Ext.getCmp('startDate').reset();
	        			Ext.getCmp('endDate').reset();
	        			Ext.getCmp('save_admin').reset();
	        		}
        		},'-',
        		{
        			xtype:'button',
        			id: 'ex_fn',
			        name: 'ex_fn',
	        		text: '导出Excel',
	        		icon: '../../image/excel_btn.png',
	        		scale: 'medium',
	        		hidden: true,
	        		handler: function(){
	        			if(Ext.getCmp('qb_grid').getStore().getCount()==0){
	        				return;
	        			}	        					
	        			var params = Ext.getCmp('qb_grid').getStore().getProxy().extraParams;
	        			var reqStr='';
	        			if(params['qb_hetong']==null){
	        				reqStr+='qb_hetong=';
	        			}else{
	        				reqStr+='qb_hetong='+params['qb_hetong'];
	        			}	        			
	        			if(params['big_id']==null){
	        				reqStr+='&big_id=';
	        			}else{
	        				reqStr+='&big_id='+params['big_id'];
	        			}
	        			reqStr+='&qydate='+params['qydate'];
	        			reqStr+='&xqtime='+params['xqtime'];
	        			reqStr+='&ggtime='+params['ggtime'];
	        			reqStr+='&jzbrand='+encodeURI(encodeURI(params['jzbrand']));
	        			reqStr+='&qb_bs_name='+params['qb_bs_name'];
	        			reqStr+='&ht_type='+params['ht_type'];
	        			reqStr+='&isgg='+params['isgg'];
	        			reqStr+='&isxk='+params['isxk'];
	        			reqStr+='&isjz='+params['isjz'];
	        			reqStr+='&startDate='+params['startDate'];
	        			reqStr+='&endDate='+params['endDate'];
	        			reqStr+='&save_admin='+encodeURI(encodeURI(params['save_admin']));	        			
//	        			window.location.href="get_qb_excel.jsp?"+reqStr;
	        			window.open("get_qb_excel.jsp?"+reqStr);
	        		}
        		},{
        			id: 'admin_fn',
					text: '管理员功能',
					icon: '../../image/admin_fn.png',
					scale: 'medium',
					hidden:true,
		            menu: [
					{        				    
						text: '修改组别',
						icon: '../../image/modify.png',
						scale: 'small',
						handler: function(){
							var sm=Ext.getCmp('qb_grid').getSelectionModel();
    						if(sm.hasSelection()){
	    							Ext.create('My.modify_gi');
	    							var r=sm.getLastSelected();
	    							Ext.getCmp('contract_name').setValue(r.get('contract_name'));    							
	    							Ext.getCmp('gi_cid').setValue(r.get('bi_id'));
    						}else{
    							alert('请先选择一行记录');
    						}										
						}
					},{
						text: '删除楼宇信息',
						icon: '../../image/delete.png',
						scale: 'small',
						handler: function(){
							var sm=Ext.getCmp('qb_grid').getSelectionModel();
    						if(sm.hasSelection()){
    							var r=sm.getLastSelected();
    							if(r.get('user_num')>0){
    								alert("此楼宇包含用户信息，不能删除");
    							}else if(confirm("您确定要删除此条楼宇信息吗?")){							    								
    								Ext.Ajax.request({
    							    		url: 'buildinfo_del.jsp',
    							    		method: 'POST',
    									    params: {
    									        hetong_id : r.get('bi_id'),
    									        list_name : '楼宇覆盖信息'
    									    }
    								});    								
    								var hr=Ext.data.StoreManager.lookup('hetong').findRecord('id',r.get('bi_id'));
    								Ext.data.StoreManager.lookup('hetong').remove(hr);
    								Ext.getCmp('qb_hetong').setValue('');
    								Ext.data.StoreManager.lookup('qb_grid_store').remove(r);    								
            					}
    						}else{
    							alert('请先选择一行记录');
    						}										
						}
					},{
						text: '查看操作记录',
						icon: '../../image/log.png',
						scale: 'small',
						handler: function(){
							var sm=Ext.getCmp('qb_grid').getSelectionModel();
    						if(sm.hasSelection()){
    							Ext.create('My.log_window');
								Ext.getCmp('log_window').setTitle('查看操作记录');
    							var r=sm.getLastSelected();
    	        				var params=Ext.data.StoreManager.lookup('log_grid_store').getProxy().extraParams;
		            			params['username']=r.get('bi_id');
		            			params['list_name']=Ext.getCmp('query_buildinfo').title;
		            			Ext.data.StoreManager.lookup('log_grid_store').loadPage(1);
    						}else{
    							alert('请先选择一行记录');
    						}										
						}
					}]
            	}
        	]})
        });
        
        this.callParent(arguments);
        
    }
});
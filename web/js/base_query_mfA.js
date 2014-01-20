Ext.define('My.base_query_mfA', {
    extend: 'Ext.panel.Panel',
	
    constructor: function() {

    	//初始化
        Ext.apply(this, {       	
        	title: '用户主要信息',
        	icon: '../../image/save_btn1.png',
			scale: 'small',
            region: 'center',
            margin: '0 5 5 0',
            id: 'base_query_mfA',
            name: 'base_query_mfA',
//            border: false,
            layout: 'border',
            frame: true,
            items: [
            	Ext.create('My.mfA_tabPanel')
            ],
            
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'mfA_tb',
            	name:'mfA_tb',
            	border: false,
            	height: 40,
            	autoScroll: true,
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
								text: '添加用户信息',
								icon: '../../image/add.png',
								scale: 'small',
								handler: function(){
									Ext.create('My.mf_save');
									Ext.getCmp('mf_save').setTitle('添加用户信息');
								}
							},
							{        				    
								text: '修改用户信息',
								icon: '../../image/modify.png',
								scale: 'small',
								handler: function(){
									var sm=Ext.getCmp('cg_A').getSelectionModel();
	        						if(sm.hasSelection()){
	        							Ext.create('My.mf_modify');
	        							Ext.getCmp('mf_modify').setTitle('修改用户信息');
	        							var r=sm.getLastSelected();
	        							Ext.getCmp('mf_rname').setValue(r.get('realname'));
	        							Ext.getCmp('mf_bs').setRawValue(r.get('bs_name'));
	        							Ext.getCmp('mf_user').setValue(r.get('username'));
	        							Ext.getCmp('mf_id').setValue(r.get('username'));
	        							Ext.getCmp('mf_bandtype').setValue(r.get('mealtype'));
	        							Ext.getCmp('mf_addr').setValue(r.get('address'));
	        							Ext.getCmp('mf_futime').setValue(r.get('starttime'));
	        							Ext.getCmp('mf_opt').setValue(r.get('opt_time'));
	        							Ext.getCmp('mf_leaflet').setValue(r.get('leaflet_no'));
	        							Ext.getCmp('mf_group').setValue(r.get('group_id'));
	        							Ext.getCmp('mf_ht').setRawValue(r.get('house_type'));
	        							Ext.getCmp('mf_lt').setRawValue(r.get('line_type'));
	        							Ext.getCmp('mf_isit').setRawValue(r.get('isit'));
	        							Ext.getCmp('mf_hetong').setRawValue(r.get('contract_name'));
	        							Ext.getCmp('mf_retime').setValue(r.get('mf_retime'));
	        							Ext.getCmp('mf_gm').setRawValue(r.get('mf_gm'));
	        							Ext.getCmp('mf_gg').setRawValue(r.get('mf_gg'));
	        							Ext.getCmp('mf_cxnote').setValue(r.get('mf_cxnote'));
	        							Ext.getCmp('mf_hdnote').setValue(r.get('mf_hdnote'));
	        							Ext.getCmp('mf_sbnote').setValue(r.get('mf_sbnote'));
	        							Ext.getCmp('mf_zhnote').setValue(r.get('mf_zhnote'));
	        							Ext.getCmp('mf_tsnote').setValue(r.get('mf_tsnote'));
                                        Ext.getCmp('mf_payee').setValue(r.get('payee'));
                                        Ext.getCmp('mf_admit').setValue(r.get('admit'));
                                        Ext.getCmp('mf_user_mobile').setValue(r.get('user_mobile'));
                                        Ext.getCmp('mf_user_phone').setValue(r.get('user_phone'));
                                        Ext.getCmp('mf_onet_prop').setRawValue(r.get('onet_prop_value'));
                                        Ext.getCmp('mf_user_prop').setRawValue(r.get('user_prop_value'));
                                        Ext.getCmp('mf_net_prop').setRawValue(r.get('net_prop_value'));
                                        Ext.getCmp('mf_weixin').setRawValue(r.get('weixin'));
                                        Ext.getCmp('mdf_letv_start').setValue(r.get('letv_start'));
                                        Ext.getCmp('mdf_letv_end').setValue(r.get('letv_end'));
                                        Ext.getCmp('mdf_letv_mac').setValue(r.get('letv_mac'));
                                        Ext.getCmp('mdf_it_end').setValue(r.get('it_end'));
	        						}else{
	        							alert('请先选择一行记录');
	        						}										
								}
							},
							{        				    
								text: '添加收费信息',
								icon: '../../image/add.png',
								scale: 'small',
								handler: function(){        						
									var sm=Ext.getCmp('cg_A').getSelectionModel();
									if(sm.hasSelection()){
										Ext.create('My.fc_save');
										Ext.getCmp('fc_save').setTitle('添加收费信息');
										var r=sm.getLastSelected();
										Ext.getCmp('fc_rname').setValue(r.get('realname'));
										Ext.getCmp('fc_bs').setRawValue(r.get('bs_name'));
										Ext.getCmp('fc_user').setValue(r.get('username'));
										//Ext.data.StoreManager.lookup('huodong_sub').filterBy(function(record,id){
											//var text = record.get('name');
											//return (text==Ext.getCmp('fc_act').getValue());
										//});
									}else{
										alert('请先选择一行记录');
									}
								}
							},
                            {
                                text: '添加代收费信息',
                                icon: '../../image/add.png',
                                scale: 'small',
                                handler: function(){
                                    Ext.create('My.mf_agent_save');
                                }
                            }
				            ]
            			},
            			{
							id: 'select_btn',
							text: '基本功能查询',
							icon: '../../image/sq.png',
							scale: 'medium',
				            menu: [{
				            		text: '基本功能查询',
				            		icon: '../../image/sq1.png',
				            		handler: function() {
				            			var params=Ext.getCmp('cg_A').getStore().getProxy().extraParams;
				            			params['menu_txt']='0';
//				            			Ext.getCmp('cg_A').getStore().loadPage(0);
				            			Ext.getCmp('cg_A').getStore().removeAll();
				            			Ext.getCmp('select_btn').setText(this.text);
//				            			if(Ext.getCmp('reset_btn').isHidden()){
//				            				Ext.getCmp('reset_btn').show();
//				            			}
				            			Ext.getCmp('de_type').hide();
				            			Ext.getCmp('ml_type').hide();
                                        Ext.getCmp('tt_num').hide();
                                        Ext.getCmp('tt_userid').hide();
                                        Ext.getCmp('tt_start').hide();
                                        Ext.getCmp('tt_end').hide();
                                        Ext.getCmp('tt_type').hide();
                                        if(Ext.getCmp('bs_name').isHidden()){
                                            Ext.getCmp('bs_name').show();
                                        }
				                        if(Ext.getCmp('mfA_north')==undefined){
											Ext.getCmp('base_query_mfA').add(Ext.create('My.mfA_north'));
										}
				                    }
				            	  },{
				            		text: '其他餐型续费',
				            		icon: '../../image/sq1.png',
				            		handler: function() {
				            			var params=Ext.getCmp('cg_A').getStore().getProxy().extraParams;
				            			params['menu_txt']='0';
//				            			Ext.getCmp('cg_A').getStore().loadPage(0);
				            			Ext.getCmp('cg_A').getStore().removeAll();
				            			Ext.getCmp('select_btn').setText(this.text);
//				            			Ext.getCmp('reset_btn').hide();
				            			Ext.getCmp('base_query_mfA').remove('mfA_north');
				            			if(Ext.getCmp('de_type').isHidden()){
				            				Ext.getCmp('de_type').show();
				            			}
				            			if(Ext.getCmp('ml_type').isHidden()){
				            				Ext.getCmp('ml_type').show();
				            			}
                                        if(Ext.getCmp('bs_name').isHidden()){
                                            Ext.getCmp('bs_name').show();
                                        }
                                        Ext.getCmp('tt_num').hide();
                                        Ext.getCmp('tt_userid').hide();
                                        Ext.getCmp('tt_start').hide();
                                        Ext.getCmp('tt_end').hide();
                                        Ext.getCmp('tt_type').hide();
				                    }
				            	  },{
				            		text: '注销续费',
				            		icon: '../../image/sq1.png',
				            		handler: function() {
				            			var params=Ext.getCmp('cg_A').getStore().getProxy().extraParams;
				            			params['menu_txt']='0';
//				            			Ext.getCmp('cg_A').getStore().loadPage(0);
				            			Ext.getCmp('cg_A').getStore().removeAll();
				            			Ext.getCmp('select_btn').setText(this.text);
//				            			Ext.getCmp('reset_btn').hide();
				            			Ext.getCmp('base_query_mfA').remove('mfA_north');
				            			if(Ext.getCmp('de_type').isHidden()){
				            				Ext.getCmp('de_type').show();
				            			}
				            			if(Ext.getCmp('ml_type').isHidden()){
				            				Ext.getCmp('ml_type').show();
				            			}
                                        if(Ext.getCmp('bs_name').isHidden()){
                                            Ext.getCmp('bs_name').show();
                                        }
                                        Ext.getCmp('tt_num').hide();
                                        Ext.getCmp('tt_userid').hide();
                                        Ext.getCmp('tt_start').hide();
                                        Ext.getCmp('tt_end').hide();
                                        Ext.getCmp('tt_type').hide();
				                    }
				            	  },{
                                text: '铁通业务查询',
                                icon: '../../image/sq1.png',
                                handler: function() {
                                    var params=Ext.getCmp('cg_A').getStore().getProxy().extraParams;
                                    params['menu_txt']='10';
//				            			Ext.getCmp('cg_A').getStore().loadPage(0);
                                    Ext.getCmp('cg_A').getStore().removeAll();
                                    Ext.getCmp('select_btn').setText(this.text);
//				            			Ext.getCmp('reset_btn').hide();
                                    Ext.getCmp('base_query_mfA').remove('mfA_north');
                                    if(Ext.getCmp('tt_num').isHidden()){
                                        Ext.getCmp('tt_num').show();
                                    }
                                    if(Ext.getCmp('tt_userid').isHidden()){
                                        Ext.getCmp('tt_userid').show();
                                    }
                                    if(Ext.getCmp('tt_start').isHidden()){
                                        Ext.getCmp('tt_start').show();
                                    }
                                    if(Ext.getCmp('tt_end').isHidden()){
                                        Ext.getCmp('tt_end').show();
                                    }
                                    if(Ext.getCmp('tt_type').isHidden()){
                                        Ext.getCmp('tt_type').show();
                                    }
                                    Ext.getCmp('bs_name').hide();
                                    Ext.getCmp('de_type').hide();
                                    Ext.getCmp('ml_type').hide();
                                }
                            }]
				        },
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
		            		id: 'ml_type',
							name: 'ml_type',
							xtype:'combobox',
							margin:'0 5 0',
							emptyText:'选择套餐类型',
							hidden: true,
							store: Ext.data.StoreManager.lookup('ml_type'),
							width: 130,
							valueField:'id',
							displayField:'name',
							editable: true,
//							allowBlank: false,
//							blankText: '请选择套餐类型',
							minChars:1,
							queryMode:'local',
							value:'',
							listeners:{
								specialkey:function(f,e){
			            			if (e.getKey() == e.ENTER) {
			            				document.getElementById('qbtn').click();
			            			}
			            		},
								beforequery : function(e){
									var combo = e.combo;
									if(!e.forceAll){
										var value = e.query;
										combo.store.filterBy(function(record,id){
											var text = record.get(combo.displayField);
											return (text.indexOf(value)!=-1);
										});
										combo.expand();
										return false;
									}
								}
			            	}
		            	},{
		            		id: 'de_type',
							name: 'de_type',
							xtype:'combobox',
							margin:'0 5 0',
							emptyText:'查询条件',
							hidden: true,
							store:new Ext.data.SimpleStore(
							{
								fields:['id','name'],
								data:[['1','定额查询'],['2','完成定额'],['3','未完成定额']]
							}),
							width: 95,
							valueField:'id',
							displayField:'name',
							queryMode:'local',
							editable: false,
							allowBlank: false,
							blankText: '请选择查询条件'
		            	},{
                        id: 'tt_num',
                        name: 'tt_num',
                        xtype:'textfield',
                        hidden:true,
                        emptyText:'铁通号码',
                        width: 110,
                        value:'',
                        editable: true,
                        queryMode:'local'
                        },{
                        id: 'tt_userid',
                        name: 'tt_userid',
                        xtype:'textfield',
                        hidden:true,
                        emptyText:'用户账号',
                        width: 110,
                        value:'',
                        editable: true,
                        queryMode:'local'
                        }, {
                        id: 'tt_start',
                        name: 'tt_start',
                        xtype:'datefield',
                        format: 'Y-m-d',
                        hidden:true,
                        emptyText:'开通时间',
                        width: 110,
                        value:'',
                        editable: true,
                        queryMode:'local'
                        }, {
                        id: 'tt_end',
                        name: 'tt_end',
                        xtype:'datefield',
                        format: 'Y-m-d',
                        hidden:true,
                        emptyText:'到期时间',
                        width: 110,
                        value:'',
                        editable: true,
                        queryMode:'local'
                        }, {
                        id: 'tt_type',
                        name: 'tt_type',
                        xtype:'checkboxfield',
                        hidden:true,
                        boxLabel: '月查询',
                        inputValue: '1'
                        },
        				{
        					xtype:'button',
	        				text: '查询信息',
	        				id:'qbtn',
	        				icon: '../../image/find_user1.png',
	        				scale: 'medium',
	        				handler: function(){
//	        					if(!Ext.getCmp('bs_name').isValid()){
//	        						return;
//	        					}
	        					
	        					var params = Ext.getCmp('cg_A').getStore().getProxy().extraParams;
	        					if(Ext.getCmp('select_btn').getText()=='基本功能查询'){	        						
	        						if(Ext.getCmp('mfA_ml_type').getValue()!=''){
		        						if(Ext.getCmp('mfA_ml_type').getValue()==Ext.getCmp('mfA_ml_type').getRawValue()){
			        						return;
			        					}
	        						}
	        						if(Ext.getCmp('hetong').getValue()!=''){
		        						if(Ext.getCmp('hetong').getValue()==Ext.getCmp('hetong').getRawValue()){
			        						return;
			        					}
	        						}	        						
	        						params['menu_txt']='1';
	        						params['bs_name']=Ext.getCmp('bs_name').getValue();
	        						params['leaflet_no']=Ext.getCmp('leaflet_no').getValue();
	        						params['start_time']=Ext.getCmp('start_time').getRawValue();
	        						params['end_time']=Ext.getCmp('end_time').getRawValue();
	        						params['group_id']=Ext.getCmp('group_id').getValue();
	        						params['house_type']=Ext.getCmp('house_type').getValue();
	        						params['user_ads']=Ext.getCmp('user_ads').getValue();
	        						params['un']=Ext.getCmp('un').getValue();
	        						params['rname']=Ext.getCmp('rname').getValue();
	        						params['tel']=Ext.getCmp('tel').getValue();	      						
	        						params['mfA_ml_type']=Ext.getCmp('mfA_ml_type').getValue();
	        						params['hetong']=Ext.getCmp('hetong').getValue();	        						
	        						params['isit']=Ext.getCmp('isit').getValue();
	        						params['retime']=Ext.getCmp('re_time').getRawValue();
	        						params['gm']=Ext.getCmp('mf_cat').getValue();
	        						params['gg']=Ext.getCmp('mf_gg_state').getValue();
	        						params['cxnote']=Ext.getCmp('cxnote').getValue();
	        						params['hdnote']=Ext.getCmp('hdnote').getValue();
	        						params['sbnote']=Ext.getCmp('sbnote').getValue();
	        						params['zhnote']=Ext.getCmp('zhnote').getValue();
	        						params['tsnote']=Ext.getCmp('tsnote').getValue();
	        						params['startDate']=Ext.getCmp('startDate').getRawValue();
	        						params['endDate']=Ext.getCmp('endDate').getRawValue();
	        						params['save_admin']=Ext.getCmp('save_admin').getValue();
									params['opt_time']=Ext.getCmp('opt_time').getRawValue();
                                    params['letv_start']=Ext.getCmp('letv_start').getRawValue();
                                    params['letv_end']=Ext.getCmp('letv_end').getRawValue();
                                    params['letv_mac']=Ext.getCmp('letv_mac').getValue();
                                    params['it_end']=Ext.getCmp('mf_it_end').getRawValue();
                                    params['user_prop']=Ext.getCmp('user_prop').getValue();
                                    params['net_prop']=Ext.getCmp('net_prop').getValue();
                                    params['old_net_prop']=Ext.getCmp('old_net_prop').getValue();
                                    params['user_mobile']=Ext.getCmp('user_mobile').getValue();
                                    params['user_phone']=Ext.getCmp('user_phone').getValue();
                                    params['user_email']=Ext.getCmp('user_email').getValue();
                                    params['weixin']=Ext.getCmp('weixin').getValue();
                                    params['payee']=Ext.getCmp('payee').getValue();
                                    params['admit']=Ext.getCmp('admit').getValue();
                                    params['gm_mac']=Ext.getCmp('gm_mac').getValue();
	        					}else if(Ext.getCmp('select_btn').getText()=='其他餐型续费'){	        						
	        						if(!Ext.getCmp('de_type').isValid()){
	        							return;
	        						}else if(Ext.getCmp('ml_type').getValue()!=''){
		        						if(Ext.getCmp('ml_type').getValue()==Ext.getCmp('ml_type').getRawValue()){
		        							return;
		        						}
	        						}
	        						
	        						if(Ext.getCmp('de_type').getValue()==1){
	        							params['menu_txt']='4';
	        						}else if(Ext.getCmp('de_type').getValue()==2){
	        							params['menu_txt']='5';
	        						}else if(Ext.getCmp('de_type').getValue()==3){
	        							params['menu_txt']='6';
	        						}
	        						params['bs_name']=Ext.getCmp('bs_name').getValue();
	        						params['ml_type']=Ext.getCmp('ml_type').getValue();
	        					}else if(Ext.getCmp('select_btn').getText()=='注销续费'){
	        						if(!Ext.getCmp('de_type').isValid()){
	        							return;
	        						}else if(Ext.getCmp('ml_type').getValue()!=''){
		        						if(Ext.getCmp('ml_type').getValue()==Ext.getCmp('ml_type').getRawValue()){
		        							return;
		        						}
	        						}
	        						
	        						if(Ext.getCmp('de_type').getValue()==1){
	        							params['menu_txt']='7';
	        						}else if(Ext.getCmp('de_type').getValue()==2){
	        							params['menu_txt']='8';
	        						}else if(Ext.getCmp('de_type').getValue()==3){
	        							params['menu_txt']='9';
	        						}
	        						params['bs_name']=Ext.getCmp('bs_name').getValue();
	        						params['ml_type']=Ext.getCmp('ml_type').getValue();
	        					}
                                //铁通查询
                                else if(Ext.getCmp('select_btn').getText()=='铁通业务查询'){
                                    params['menu_txt']='10';
                                    //铁通字段
                                    params['tt_num']=Ext.getCmp('tt_num').getValue();
                                    params['tt_userid']=Ext.getCmp('tt_userid').getValue();
                                    params['tt_start']=Ext.getCmp('tt_start').getRawValue();
                                    params['tt_end']=Ext.getCmp('tt_end').getRawValue();
                                    params['tt_type']=Ext.getCmp('tt_type').getValue();
                                }
	        					
	        					Ext.getCmp('cg_A').getStore().loadPage(1);
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
	        					Ext.getCmp('de_type').reset();
	        					Ext.getCmp('ml_type').reset();
	        					if(!Ext.getCmp('bs_name').isHidden()){
									Ext.getCmp('bs_name').reset();
								}	        					
	        					Ext.getCmp('leaflet_no').reset();
	        					Ext.getCmp('start_time').reset();
	        					Ext.getCmp('group_id').reset();
	        					Ext.getCmp('house_type').reset();
	        					Ext.getCmp('user_ads').reset();
	        					Ext.getCmp('un').reset();
	        					Ext.getCmp('end_time').reset();
	        					Ext.getCmp('mfA_ml_type').reset();
	        					Ext.getCmp('rname').reset();
	        					Ext.getCmp('tel').reset();
	        					Ext.getCmp('hetong').reset();	        					
	        					Ext.getCmp('isit').reset();
	        					Ext.getCmp('re_time').reset();
	        					Ext.getCmp('mf_cat').reset();
	        					Ext.getCmp('mf_gg_state').reset();
	        					Ext.getCmp('cxnote').reset();
	        					Ext.getCmp('hdnote').reset();
	        					Ext.getCmp('sbnote').reset();
	        					Ext.getCmp('zhnote').reset();
	        					Ext.getCmp('tsnote').reset();
	        					Ext.getCmp('startDate').reset();
	        					Ext.getCmp('endDate').reset();
	        					Ext.getCmp('save_admin').reset();
								Ext.getCmp('opt_time').reset();
                                Ext.getCmp('tt_num').reset();
                                Ext.getCmp('tt_userid').reset();
                                Ext.getCmp('tt_start').reset();
                                Ext.getCmp('tt_end').reset();
                                Ext.getCmp('mf_it_end').reset();
                                Ext.getCmp('letv_start').reset();
                                Ext.getCmp('letv_end').reset();
                                Ext.getCmp('letv_mac').reset();
                                Ext.getCmp('gm_mac').reset();
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
	        					if(Ext.getCmp('cg_A').getStore().getCount()==0){
	        						return;
	        					}	        					
	        					var params = Ext.getCmp('cg_A').getStore().getProxy().extraParams;
	        					var reqStr='';
	        					if(Ext.getCmp('select_btn').getText()=='基本功能查询'){
	        						reqStr+='menu_txt='+params['menu_txt'];
	        						reqStr+='&bs_name='+params['bs_name'];
	        						if(params['leaflet_no']==null){
	        							reqStr+='&leaflet_no=';
	        						}else{
	        							reqStr+='&leaflet_no='+params['leaflet_no'];
	        						}
	        						reqStr+='&start_time='+params['start_time'];
	        						if(params['group_id']==null){
	        							reqStr+='&group_id=';
	        						}else{
	        							reqStr+='&group_id='+params['group_id'];
	        						}	        						
	        						reqStr+='&house_type='+params['house_type'];
	        						reqStr+='&user_ads='+encodeURI(encodeURI(params['user_ads']));
	        						reqStr+='&un='+params['un'];
	        						reqStr+='&rname='+encodeURI(encodeURI(params['rname']));
	        						reqStr+='&tel='+encodeURI(encodeURI(params['tel']));
	        						reqStr+='&end_time='+params['end_time'];
	        						if(params['mfA_ml_type']==null){
	        							reqStr+='&mfA_ml_type=';
	        						}else{
	        							reqStr+='&mfA_ml_type='+params['mfA_ml_type'];
	        						}
	        						if(params['hetong']==null){
	        							reqStr+='&hetong=';
	        						}else{
	        							reqStr+='&hetong='+params['hetong'];
	        						}	        						
	        						reqStr+='&isit='+params['isit'];
	        						reqStr+='&retime='+params['retime'];
	        						reqStr+='&gm='+params['gm'];
	        						reqStr+='&gg='+params['gg'];
	        						reqStr+='&cxnote='+encodeURI(encodeURI(params['cxnote']));
	        						reqStr+='&hdnote='+encodeURI(encodeURI(params['hdnote']));
	        						reqStr+='&sbnote='+encodeURI(encodeURI(params['sbnote']));
	        						reqStr+='&zhnote='+encodeURI(encodeURI(params['zhnote']));
	        						reqStr+='&tsnote='+encodeURI(encodeURI(params['tsnote']));
	        						reqStr+='&startDate='+params['startDate'];
	        						reqStr+='&endDate='+params['endDate'];
	        						reqStr+='&save_admin='+encodeURI(encodeURI(params['save_admin']));
									reqStr+='&opt_time='+params['opt_time'];
                                    reqStr+='&letv_start='+params['letv_start'];
                                    reqStr+='&letv_end='+params['letv_end'];
                                    reqStr+='&letv_mac='+encodeURI(encodeURI(params['letv_mac']));
                                    reqStr+='&it_end='+params['it_end'];
                                    reqStr+='&user_prop='+params['user_prop'];
                                    reqStr+='&net_prop='+params['net_prop'];
                                    reqStr+='&old_net_prop='+params['old_net_prop'];
                                    reqStr+='&user_mobile='+params['user_mobile'];
                                    reqStr+='&user_phone='+params['user_phone'];
                                    reqStr+='&user_email='+encodeURI(encodeURI(params['user_email']));
                                    reqStr+='&weixin='+params['weixin'];
                                    reqStr+='&payee='+encodeURI(encodeURI(params['payee']));
                                    reqStr+='&admit='+encodeURI(encodeURI(params['admit']));
                                    reqStr+='&gm_mac='+encodeURI(encodeURI(params['gm_mac']));
                                }else if(Ext.getCmp('select_btn').getText()=='其他餐型续费'){
	        						if(!Ext.getCmp('de_type').isValid()){
	        							return;
	        						}
	        						if(!Ext.getCmp('ml_type').isValid()){
	        							return;
	        						}
	        						reqStr+='menu_txt='+params['menu_txt'];
	        						reqStr+='&bs_name='+params['bs_name'];
	        						if(params['ml_type']==null){
	        							reqStr+='&ml_type=';
	        						}else{
	        							reqStr+='&ml_type='+params['ml_type'];
	        						}
	        					}else if(Ext.getCmp('select_btn').getText()=='注销续费'){
	        						if(!Ext.getCmp('de_type').isValid()){
	        							return;
	        						}
	        						if(!Ext.getCmp('ml_type').isValid()){
	        							return;
	        						}
	        						reqStr+='menu_txt='+params['menu_txt'];
	        						reqStr+='&bs_name='+params['bs_name'];
	        						if(params['ml_type']==null){
	        							reqStr+='&ml_type=';
	        						}else{
	        							reqStr+='&ml_type='+params['ml_type'];
	        						}
	        					}
                                //TODO:铁通导出
//	        					window.location.href="get_excel.jsp?"+reqStr;
	        					window.open("get_excel.jsp?"+reqStr);
	        				}
        				}
        				,
        				{
		        			id: 'admin_fn',
							text: '管理员功能',
							icon: '../../image/admin_fn.png',
							scale: 'medium',
							hidden:true,
				            menu: [
							{
								text: '查看操作记录',
								icon: '../../image/log.png',
								scale: 'small',
								handler: function(){
									var sm=Ext.getCmp('cg_A').getSelectionModel();
		    						if(sm.hasSelection()){
		    							Ext.create('My.log_window');
										Ext.getCmp('log_window').setTitle('查看操作记录');
		    							var r=sm.getLastSelected();
		    	        				var params=Ext.data.StoreManager.lookup('log_grid_store').getProxy().extraParams;
				            			params['username']=r.get('username');
				            			params['list_name']=Ext.getCmp('base_query_mfA').title;
				            			Ext.data.StoreManager.lookup('log_grid_store').loadPage(1);
		    						}else{
		    							alert('请先选择一行记录');
		    						}										
								}
							}]
		            	},
        				{
        					xtype:'button',
        					id: 'print_btn',
			                name: 'print_btn',
	        				text: '打印',
	        				icon: '../../image/print_btn.png',
	        				scale: 'medium',
	        				hidden: true,
	        				handler: function(){
	        					if(Ext.getCmp('cg_A').getStore().getCount()==0){
	        						return;
	        					}
	        					var params = Ext.getCmp('cg_A').getStore().getProxy().extraParams;
	        					var reqStr='';
	        					if(Ext.getCmp('select_btn').getText()=='基本功能查询'){
	        						reqStr+='menu_txt='+params['menu_txt'];
	        						reqStr+='&bs_name='+params['bs_name'];
	        						reqStr+='&leaflet_no='+params['leaflet_no'];
	        						reqStr+='&start_time='+params['start_time'];
	        						reqStr+='&group_id='+params['group_id'];
	        						reqStr+='&house_type='+params['house_type'];
	        						reqStr+='&user_ads='+encodeURI(encodeURI(params['user_ads']));
	        						reqStr+='&un='+params['un'];
	        						reqStr+='&rname='+encodeURI(encodeURI(params['rname']));
	        						reqStr+='&tel='+params['tel'];
	        					}else if(Ext.getCmp('select_btn').getText()=='3个月未使用用户'){
	        						reqStr+='menu_txt='+params['menu_txt'];
	        						reqStr+='&bs_name='+params['bs_name'];
	        					}else if(Ext.getCmp('select_btn').getText()=='按套餐类型筛选'){
	        						if(!Ext.getCmp('ml_type').isValid()){
	        							return;
	        						}
	        						if(!Ext.getCmp('ymt_start').isValid()){
	        							return;
	        						}
	        						reqStr+='menu_txt='+params['menu_txt'];
	        						reqStr+='&bs_name='+params['bs_name'];
	        						reqStr+='&ml_type='+params['ml_type'];
	        						reqStr+='&ymt_start='+params['ymt_start'];
	        					}
//	        					Ext.create('My.printer').print(Ext.getCmp('cg_A'));
//	        					var win = window.open('','print');
//								win.document.write("");
	        					window.open("get_print.jsp?"+reqStr);
//								win.document.close();
//								win.print();
//								win.close();
	        				}
        				}
        				]
            	
            })
            
        });
        
        this.callParent(arguments);
        
    }
});
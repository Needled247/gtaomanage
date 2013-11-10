Ext.define('My.save_buildinfo', {
    extend: 'Ext.form.Panel',
//    requires: [
//    	'My.center_grid'
//	],
    constructor: function() {
		 
    	//初始化
        Ext.apply(this, {
        	
        	title: '添加合同信息',
        	region: 'center',
            margin: '0 5 5 0',
            id: 'save_buildinfo',
            name: 'save_buildinfo',
            layout:'border',
            frame: true,
//            border: true,
            tbar: Ext.create('Ext.toolbar.Toolbar',{
//            	border: false,
            	height: 40,
            	items: [
            			'-',
	            	{
            		id: 'hetong',
					name: 'hetong',
					xtype:'combobox',
					fieldLabel: '合同名称',
					labelWidth: 60,
					store: Ext.data.StoreManager.lookup('hetong'),
					width: 400,
					valueField:'id',
					displayField:'name',
					submitValue:false,
//					triggerAction: 'all',
//					typeAhead:true,
					minChars:1,
					queryMode:'local',
//					forceSelection: true,
					editable: true,
					value:'',
//					allowBlank: false,
//					blankText: '请选择合同名称',
//					selectOnFocus: true,
//					enableKeyEvents: true,
					listeners:{
//						f.onTriggerClick();
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
									return (text.indexOf(value.toUpperCase())!=-1);
								});
								combo.expand();
								return false;
							}
						}
//						,
//            			focus : function(cb,e){
//            				if(cb.store.getTotalCount()==0){
//            						cb.store.load();
//            				}
//            			}
	            	}
            	},'-',{
	            		xtype:'button',
        				text: '搜索合同信息',
        				id:'qbtn',
        				icon: '../../image/find_user.png',
        				scale: 'medium',
        				handler: function(){
        					var ishetong=Ext.getCmp('hetong').getStore().findRecord('name',Ext.getCmp('hetong').getRawValue(),0,false,true,true);        						
        					if(ishetong==null){
        						alert('请选择合同名称');
        						return;
        					}        					
        					Ext.Ajax.request({
						    		url: 'getBuildInfo.jsp',
						    		method: 'POST',
								    params: {
								        hetong_id : ishetong.get('id')
								    },
								    success: function(response){
								        var result = Ext.decode(response.responseText);
								        	Ext.getCmp('bs_name').setValue(result.bs_name);
											Ext.getCmp('big_id').setValue(result.big_id);
											Ext.getCmp('hetong_txt').setValue(result.hetong_txt);
											var ht_type=Ext.getCmp('ht_type').getStore().findRecord('id',result.ht_type,0,false,true,true);											
        									Ext.getCmp('ht_type').setValue(ht_type.get('name'));
											Ext.getCmp('qydate').setValue(result.qydate);
											Ext.getCmp('xqtime').setValue(result.xqtime);
											Ext.getCmp('ggtime').setValue(result.ggtime);
											var isgg=Ext.getCmp('isgg').getStore().findRecord('id',result.isgg,0,false,true,true);
											Ext.getCmp('isgg').setValue(isgg.get('name'));
											var isxk=Ext.getCmp('isxk').getStore().findRecord('id',result.isxk,0,false,true,true);
											Ext.getCmp('isxk').setValue(isxk.get('name'));											
											Ext.getCmp('live_num').setValue(result.live_num);
											Ext.getCmp('gglive_num').setValue(result.gglive_num);
											var isjz=Ext.getCmp('isjz').getStore().findRecord('id',result.isjz,0,false,true,true);
											Ext.getCmp('isjz').setValue(isjz.get('name'));
											Ext.getCmp('jzbrand').setValue(result.jzbrand);
											Ext.getCmp('hetong_id').setValue(result.hetong_id);
											
								    },
								    failure: function(response) {
	//							        response.status;
//								        alert("网络故障,请稍后再试");
								    }
							});
        				}        				
	            	},'-',{
	            		xtype:'button',
        				text: '保存合同信息',
        				icon: '../../image/save_mf_btn.png',
        				scale: 'medium',
        				handler: function(){
        					var form = this.up('form').getForm();
        					if (form.isValid()) {
//        						Ext.getCmp('bs_name').getStore().load(
//        							function(records, operation, success){
        								var bs_id=Ext.getCmp('bs_name').getStore().findRecord('name',Ext.getCmp('bs_name').getRawValue());
		        						Ext.getCmp('bs_name').setValue(bs_id.get('id'));
		        						var ht_type=Ext.getCmp('ht_type').getStore().findRecord('name',Ext.getCmp('ht_type').getRawValue());        						
		        						Ext.getCmp('ht_type').setValue(ht_type.get('id'));
		        						var isgg=Ext.getCmp('isgg').getStore().findRecord('name',Ext.getCmp('isgg').getRawValue());        						
		        						Ext.getCmp('isgg').setValue(isgg.get('id'));
		        						var isxk=Ext.getCmp('isxk').getStore().findRecord('name',Ext.getCmp('isxk').getRawValue());        						
		        						Ext.getCmp('isxk').setValue(isxk.get('id'));
		        						var isjz=Ext.getCmp('isjz').getStore().findRecord('name',Ext.getCmp('isjz').getRawValue());        						
		        						Ext.getCmp('isjz').setValue(isjz.get('id'));
				                		form.submit({
				                    		success: function(form, action) {
					                       		if(action.result.msg){
					                       			alert("合同信息保存成功");
					                       		}else{
					                       			alert("合同信息修改成功");
					                       		}
					                       		form.reset();
					                       		Ext.getCmp('hetong').getStore().reload();
				                    		},
				                    		failure: function(form, action) {
	//			                        		alert("网络故障,请稍后再试");
				                    		}
				                		});
//        							}
//        						);
			            	}
        				}        				
	            	},'-',{
	            		xtype:'button',
        				text: '重置合同信息',
        				icon: '../../image/reset_btn.png',
        				scale: 'medium',
        				handler: function(){
        					this.up('form').getForm().reset();
        				}
	            	}
//	            	,'-',{
//	            		xtype:'button',
//        				text: '删除合同信息',
//        				icon: '../../image/qc_del.png',
//        				scale: 'medium',
//        				handler: function(){
//        					if(Ext.getCmp('hetong_id').getValue()==''){
//        						return;
//        					}
//        					if(confirm("确定要删除此条合同信息吗?")){
//	        					Ext.Ajax.request({
//							    		url: 'buildinfo_del.jsp',
//							    		method: 'POST',
//									    params: {
//									        hetong_id : Ext.getCmp('hetong_id').getValue()
//									    },
//									    success: function(response){
//									        var result = Ext.decode(response.responseText);								        	
//									        if(result.msg=="1"){								        	
//									        	Ext.getCmp('save_buildinfo').getForm().reset();
//									        	Ext.getCmp('hetong').getStore().reload();
//									        	alert("合同信息删除成功");
//									        }else{
//									        	Ext.getCmp('save_buildinfo').getForm().reset();
//									        	alert("此合同包含用户信息，不能删除");
//									        }	
//									    },
//									    failure: function(response) {
//		//							        response.status;
//	//								        alert("网络故障,请稍后再试");
//									    }
//								});
//        					}
//        				}        				
//	            	}
            	]
            }),
            
            fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'qtip',
            margin: '20 0 0 0'
//            afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required"> *</span>'
        },
        
        items: [{
			region:'center',
            xtype: 'fieldset',
            autoScroll: true,
			title: '<font color="red">*</font>合同信息<font color="red">*</font>',
			//collapsible: true,
            margin: '15 10 10 10',
            layout: {
            	type: 'table',
            	columns: 2
            },
            items:[{
	            	xtype:'textfield',
	                fieldLabel: '合同名称',
	                id: 'hetong_txt',
	                name: 'hetong_txt',
	                margin: '40 0 10 60',
	                colspan:2,
	//              	value: 1,
	                labelWidth: 90,
	                width: 670,
					allowBlank: false,
					blankText: '请输入合同名称',
					enforceMaxLength: true,
	                maxLength: 180
            	},{
		            id: 'bs_name',
			        name: 'bs_name',
			        xtype:'combobox',
			        margin: '20 0 10 60',
			        fieldLabel:'选择营业厅',
			        store: Ext.data.StoreManager.lookup('bs_name'),
			        labelWidth: 90,
					width: 300,
					valueField:'id',
			      	displayField:'name',
					editable: false,
					allowBlank: false,
					blankText: '请选择营业厅'
		        },{
	               	xtype:'numberfield',
	                fieldLabel: '虚拟编号',
	                id: 'big_id',
	                name: 'big_id',
	                margin: '20 0 10 70',
	//              	value: 1,
	                labelWidth: 90,
	                width: 300,
	        		maxValue: 100000,
	        		minValue: 1,
					allowBlank: false,
					blankText: '请输入虚拟编号'
            	},{
	                id: 'ht_type',
	                name: 'ht_type',
	                margin: '20 0 10 60',
	                xtype:'combobox',
	                fieldLabel: '合同类型',
	                labelWidth: 90,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','社区合同'],['2','写字楼合同'],['3','无合同']]
			      	}),
			      	queryMode:'local',
			      	width: 300,
			      	valueField:'id',
	      			displayField:'name',
					allowBlank: false,
					blankText: '请选择合同类型',
					editable: false
            	},{
	            	xtype:'datefield',
	                fieldLabel: '签约日期',
	                id: 'qydate',
	                name: 'qydate',
	                margin: '20 0 10 70',
	//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
	                value: '',
	              	format: 'Y-m-d',
	                labelWidth: 90,
	                width: 300,
//					allowBlank: false,
//					blankText: '请选择签约日期',
					editable: true
            	},{
	            	xtype:'datefield',
	                fieldLabel: '小区开通时间',
	                id: 'xqtime',
	                name: 'xqtime',
	                margin: '20 0 10 60',
	//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
	                value: '',
	              	format: 'Y-m-d',
	                labelWidth: 90,
	                width: 300,
//					allowBlank: false,
//					blankText: '请选择小区开通时间',
					editable: true
            	},{
	            	xtype:'datefield',
	                fieldLabel: '光改开通时间',
	                id: 'ggtime',
	                name: 'ggtime',
	                margin: '20 0 10 70',
	                value: '',
	                labelWidth: 90,
	                width: 300,
	                format: 'Y-m-d',
//					allowBlank: false,
//					blankText: '请选择光改开通时间',
					editable: true
            	},{
	                id: 'isgg',
	                name: 'isgg',
	                margin: '20 0 10 60',
	                xtype:'combobox',
	                fieldLabel: '是否已光改',
	                labelWidth: 90,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','是'],['0','否']]
			      	}),
			      	queryMode:'local',
			      	width: 300,
			      	valueField:'id',
	      			displayField:'name',
					allowBlank: false,
					blankText: '请选择是否已光改',
					editable: false
            	},{
            		id: 'isxk',
	                name: 'isxk',
	                margin: '20 0 10 70',
	                xtype:'combobox',
	                fieldLabel: '是否新开小区',
	                labelWidth: 90,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','是'],['0','否']]
			      	}),
			      	queryMode:'local',
			      	width: 300,
			      	valueField:'id',
	      			displayField:'name',
					allowBlank: false,
					blankText: '请选择是否新开小区',
					editable: false
            	},{
	               	xtype:'numberfield',
	                fieldLabel: '住户数',
	                id: 'live_num',
	                name: 'live_num',
	                margin: '20 0 10 60',
	//              	value: 1,
	                labelWidth: 90,
	                width: 300,
	        		maxValue: 1000000,
	        		minValue: 0,
					allowBlank: false,
					blankText: '请输入住户数'
            	},{
	               	xtype:'numberfield',
	                fieldLabel: '光改住户数',
	                id: 'gglive_num',
	                name: 'gglive_num',
	                margin: '20 0 10 70',
	//              	value: 1,
	                labelWidth: 90,
	                width: 300,
	        		maxValue: 1000000,
	        		minValue: 0,
					allowBlank: false,
					blankText: '请输入光改住户数'
            	},{
	                id: 'isjz',
	                name: 'isjz',
	                margin: '20 0 10 60',
	                xtype:'combobox',
	                fieldLabel: '是否有竞争',
	                labelWidth: 90,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','是'],['0','否']]
			      	}),
			      	queryMode:'local',
			      	width: 300,
			      	valueField:'id',
	      			displayField:'name',
					allowBlank: false,
					blankText: '请选择是否有竞争',
					editable: false
            	},{
	            	xtype:'textfield',
	                fieldLabel: '竞争宽带',
	                id: 'jzbrand',
	                name: 'jzbrand',
	                margin: '20 0 10 70',
	              	value: '',
	                labelWidth: 90,
//					allowBlank: false,
//					blankText: '请输入竞争宽带',
	                width: 300,
	                enforceMaxLength: true,
	                maxLength: 180
            	},{
			        xtype: 'hiddenfield',
			        id: 'hetong_id',
			        name: 'hetong_id',
			        value: ''
			    }]
        }],
        
        url: 'save_buildinfo.jsp'
        
        });
        
        this.callParent(arguments);
        
    }
});
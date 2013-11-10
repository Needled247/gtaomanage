Ext.define('My.save_mainform', {
    extend: 'Ext.form.Panel',
//    requires: [
//    	'My.center_grid'
//	],
    constructor: function() {
		 
    	//初始化
        Ext.apply(this, {
        	
        	title: '添加主表信息',
        	region: 'center',
            margin: '0 5 5 0',
            id: 'save_mainform',
            name: 'save_mainform',
//            autoScroll: true,
//            loadMask: true,
//            forceFit: true,
            layout:'border',
//            layout: {
//            	type:'table',
//            	columns:1
//            },
            frame: true,
//            border: true,
            tbar: Ext.create('Ext.toolbar.Toolbar',{
//            	border: false,
            	height: 40,
            	items: [
            			'-',
	            	{
	            		xtype:'textfield',
	            		id: 'username',
	            		name: 'username',
	                    fieldLabel: '请输入用户账号',
	                    width: 240,
						allowBlank: false,
						blankText: '请输入用户账号',
						maxLength: 20,
			            enforceMaxLength: true,
//			            regex: /[a-zA-Z]{2}\d+/,
//		            	regexText: '请输入正确的用户账号(以两位字母开头)',
		            	submitValue: false,
		            	listeners:{
		            		specialkey:function(f,e){
		            			if (e.getKey() == e.ENTER) {
		            				document.getElementById('qbtn').click();
		            			}
		            		}
		            	}
	            	},'-',{
	            		xtype:'button',
        				text: '搜索用户信息',
        				id:'qbtn',
        				icon: '../../image/find_user.png',
        				scale: 'medium',
        				handler: function(){
        					if(!Ext.getCmp('username').isValid()){
        						alert('请输入正确的用户账号(以两位字母开头)');
        						return;
        					}
        					Ext.Ajax.request({
						    		url: 'getUserInfo.jsp',
						    		method: 'POST',
								    params: {
								        username : Ext.getCmp('username').value
								    },
								    success: function(response){
								        var result = Ext.decode(response.responseText);
										if(result.isExist=="1"){
											Ext.getCmp('realname').setValue(result.realname);
											Ext.getCmp('bandtype').setValue(result.bandtype);
											Ext.getCmp('certid').setValue(result.certid);
											Ext.getCmp('tel').setValue(result.tel);
											Ext.getCmp('startTime').setValue(result.startTime);
											Ext.getCmp('email').setValue(result.email);
											Ext.getCmp('endTime').setValue(result.endTime);
											Ext.getCmp('addr').setValue(result.addr);
											Ext.getCmp('uname').setValue(result.username);
											
											Ext.getCmp('bs_name').setRawValue(result.bs_name);
											Ext.getCmp('leaflet_no').setValue(result.leaflet_no);
											Ext.getCmp('group_id').setValue(result.group_id);
											Ext.getCmp('opt_usetime').setValue(result.opt_usetime);
											Ext.getCmp('futime').setValue(result.futime);
											Ext.getCmp('hetong').setRawValue(result.hetong_name);
											Ext.getCmp('house_type').setRawValue(result.house_type_name);
											Ext.getCmp('line_type').setRawValue(result.line_type_name);
											Ext.getCmp('note').setValue(result.note);
										}else{
											Ext.getCmp('save_mainform').getForm().reset();
											alert("您搜索的用户账号不存在");
										}
								    },
								    failure: function(response) {
	//							        response.status;
//								        alert("网络故障,请稍后再试");
								    }
							});
        				}        				
	            	},'-',{
	            		xtype:'button',
        				text: '保存用户信息',
        				icon: '../../image/save_mf_btn.png',
        				scale: 'medium',
        				handler: function(){
        					var form = this.up('form').getForm();
        					if(Ext.getCmp('uname').value==''){
        						alert('请先搜索用户信息');
        						return;
        					}else if (form.isValid()) {
        						var did=Ext.getCmp('bs_name').getStore().findRecord('name',Ext.getCmp('bs_name').getRawValue());        						
        						Ext.getCmp('bs_name').setValue(did.get('id'));
        						var isht=Ext.getCmp('house_type').getStore().findRecord('name',Ext.getCmp('house_type').getRawValue());        						
        						Ext.getCmp('house_type').setValue(isht.get('id'));
        						var islt=Ext.getCmp('line_type').getStore().findRecord('name',Ext.getCmp('line_type').getRawValue());        						
        						Ext.getCmp('line_type').setValue(islt.get('id'));
        						var ishetong=Ext.getCmp('hetong').getStore().findRecord('name',Ext.getCmp('hetong').getRawValue(),0,false,true,true);        						
        						if(ishetong==null){
        							alert('请选择合同名称');
        						}else{
        							Ext.getCmp('hetong').setValue(ishetong.get('id'));
				                	form.submit({
				                    	success: function(form, action) {
				                       		if(action.result.msg){
				                       			alert("用户信息保存成功");
				                       		}else{
				                       			alert("用户信息修改成功");
				                       		}
				                       		form.reset();
				                    	},
				                    	failure: function(form, action) {
	//			                        	alert("网络故障,请稍后再试");
				                    	}
				                	});
        						}
			            	}
        				}        				
	            	}
	            	,'-',{
    					xtype:'button',
    					id: 'reset_btn',
		                name: 'reset_btn',
        				text: '重置用户信息',
        				icon: '../../image/reset_btn.png',
        				scale: 'medium',
        				handler: function(){
        					this.up('form').getForm().reset();
        				}
    				}
            	]
            }),
            
            fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'qtip',
            margin: '20 0 0 0'
//            afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required"> *</span>'
        },
        
        items: [{
			region:'north',
            xtype: 'fieldset',
            autoScroll: true,
			title: '<font color="red">*</font>手工填写信息区域<font color="red">*</font>',
			//collapsible: true,
            margin: '15 10 0 10',
            layout: {
            	type: 'table',
            	columns: 4
            },
            items:[{
        		id: 'bs_name',
                name: 'bs_name',
                xtype:'combobox',
                fieldLabel:'所属营业厅',
                store: Ext.data.StoreManager.lookup('bs_name'),
                margin: '20 0 10 50',
                labelWidth: 70,
		      	width: 310,
		      	colspan:2,
		      	valueField:'id',
      			displayField:'name',
      			value:'',
      			allowBlank: false,
				blankText: '请选择营业厅',
				editable: false							
        	},{
	            	xtype:'datefield',
	                fieldLabel: '启用时间',
	                id: 'futime',
	                name: 'futime',
	                margin: '20 0 10 40',
	//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
	                value: '',
	              	format: 'Y-m',
	                labelWidth: 60,
	                width: 170,
					allowBlank: false,
					blankText: '请选择启用时间',
					editable: true
            	},{
	            	xtype:'datefield',
	                fieldLabel: '光纤开通时间',
	                id: 'opt_usetime',
	                name: 'opt_usetime',
	                margin: '20 0 10 40',
	//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
	                value: '',
	              	format: 'Y-m-d',
	                labelWidth: 85,
	                width: 200,
	//				allowBlank: false,
	//				blankText: '请选择光纤开通时间',
					editable: true
            	},{
	               	xtype:'numberfield',
	                fieldLabel: '宣传单号',
	                id: 'leaflet_no',
	                name: 'leaflet_no',
	                margin: '20 0 10 50',
	//              	value: 1,
	                labelWidth: 70,
	                width: 140,
	        		maxValue: 99,
	        		minValue: 1,
					allowBlank: false,
					blankText: '请选择宣传单号',
					editable: true
            	},{
	            	xtype:'numberfield',
	                fieldLabel: '社区分组',
	                id: 'group_id',
	                name: 'group_id',
	                margin: '20 0 10 40',
	//              	value: 1,
	                labelWidth: 60,
	                width: 130,
	        		maxValue: 99,
	        		minValue: 1,
					allowBlank: false,
					blankText: '请选择营业厅分组',
					editable: true
            	},{
            		id: 'hetong',
					name: 'hetong',
					xtype:'combobox',
					fieldLabel: '合同名称',
					margin: '20 0 10 40',
					labelWidth: 60,
					store: Ext.data.StoreManager.lookup('hetong'),
					width: 410,
					valueField:'id',
					displayField:'name',
					colspan:2,
//					triggerAction: 'all',
//					typeAhead:true,
					minChars:1,
					queryMode:'local',
//					forceSelection: true,
					editable: true,
					value:'',
					allowBlank: false,
					blankText: '请选择合同名称',
//					selectOnFocus: true,
//					enableKeyEvents: true,
					listeners:{
//						f.onTriggerClick();
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
	            	}
            	},{
	                id: 'house_type',
	                name: 'house_type',
	                margin: '20 0 20 50',
	                xtype:'combobox',
	                fieldLabel: '房屋性质',
	                labelWidth: 70,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','租用'],['2','私有']]
			      	}),
			      	queryMode:'local',
			      	width: 140,
			      	valueField:'id',
	      			displayField:'name',
					allowBlank: false,
					blankText: '请选择房屋性质',
					editable: false
            	},{
            		id: 'line_type',
	                name: 'line_type',
	                margin: '20 0 20 40',
	                xtype:'combobox',
	                fieldLabel: '走线方式',
	                labelWidth: 60,
	                store:new Ext.data.SimpleStore(
			      	{
			       		fields:['id','name'],
			       		data:[['1','明线'],['2','暗线']]
			      	}),
			      	queryMode:'local',
			      	width: 130,
			      	valueField:'id',
	      			displayField:'name',
					allowBlank: false,
					blankText: '请选择走线方式',
					editable: false
            	},{
	                xtype:'textfield',
	                fieldLabel: '备注信息',
	                id: 'note',
	                name: 'note',
	                colspan:2,
	                labelWidth: 60,
	                margin: '20 0 20 40',
	                width: 410,
	                value:''
            	}]
        },{
			region:'center',
            xtype: 'fieldset',
            autoScroll: true,
			title: '<font color="red">*</font>自动填写信息区域<font color="red">*</font>',
			//collapsible: true,
            margin: '15 10 10 10',
            layout: {
            	type: 'table',
            	columns: 2
            },
            items:[{
	               	xtype:'textfield',
	                fieldLabel: '用户姓名',
	                id: 'realname',
	                name: 'realname',
	                value: '',
	                labelWidth: 60,
	                margin: '30 0 10 50',
	                width: 300,
					readOnly: true,
					submitValue: false
            	},{
	            	xtype:'textfield',
	                fieldLabel: '使用餐型',
	                id: 'bandtype',
	                name: 'bandtype',
	                labelWidth: 60,
	                margin: '30 0 10 60',
	                width: 360,
					readOnly: true,
					submitValue: false
            	},{
	            	xtype:'textfield',
	                fieldLabel: '证件号码',
	                id: 'certid',
	                name: 'certid',
	                labelWidth: 60,
	                margin: '20 0 10 50',
	                width: 300,
					readOnly: true,
					submitValue: false
            	},{
	            	xtype:'textfield',
	                fieldLabel: '用户手机',
	                id: 'tel',
	                name: 'tel',
	                labelWidth: 60,
	                margin: '20 0 10 60',
	                width: 360,
					readOnly: true,
					submitValue: false
            	},{
	            	xtype:'textfield',
	                fieldLabel: '首次上线',
	                id: 'startTime',
	                name: 'startTime',
	                labelWidth: 60,
	                margin: '20 0 10 50',
	                width: 300,
					readOnly: true,
					submitValue: false
            	},{
	                xtype:'textfield',
	                fieldLabel: '用户邮箱',
	                id: 'email',
	                name: 'email',
	                labelWidth: 60,
	                margin: '20 0 10 60',
	                width: 360,
					readOnly: true,
					submitValue: false
            	},{
	            	xtype:'textfield',
	                fieldLabel: '截止时间',
	                id: 'endTime',
	                name: 'endTime',
	                labelWidth: 60,
	                margin: '20 0 10 50',
	                width: 300,
					readOnly: true,
					submitValue: false
            	},{
	                xtype:'textfield',
	                fieldLabel: '详细地址',
	                id: 'addr',
	                name: 'addr',
	                labelWidth: 60,
	                margin: '20 0 10 60',
	                width: 360,
					readOnly: true,
					submitValue: false
            	},{
	               	xtype:'textfield',
	                fieldLabel: '用户账号',
	                id: 'uname',
	                name: 'uname',
	                labelWidth: 60,
	                margin: '20 0 10 50',
	                width: 300,
	                value: '',
	                hidden: true,
					readOnly: true
            }]
        }],
        
        url: 'save_mainform.jsp'
        
        });
        
        this.callParent(arguments);
        
    }
});
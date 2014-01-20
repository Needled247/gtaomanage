Ext.define('My.mf_agent_save', {
    extend: 'Ext.Window',
    
    constructor: function() {
		
        Ext.apply(this, {
        	id: 'mf_agent_save',
            name: 'mf_agent_save',
            title: '添加代收费信息',
        	layout:'fit',
        	width: 620,
        	height: 590,
        	modal:true,
        	resizable:false,
        	autoShow:true,
//        	draggable:false,
        items: [{
        	xtype: 'form',
//            margin: '5 0 5 0',
        	id:'mf_agent_form',
        	name:'mf_agent_form',
            layout:'fit',
            bodyStyle:'background-color:transparent',
            tbar: Ext.create('Ext.toolbar.Toolbar',{
//            	border: false,
            	height: 40,
            	items: [
            			'-',
	            	{
	            		xtype:'textfield',
	            		id: 'mf_agent_userInput',
	            		name: 'mf_agent_userInput',
	                    width: 200,
						allowBlank: false,
						blankText: '请输入用户账号',
						fieldLabel: '用户账号',
						labelWidth: 60,
						maxLength: 20,
			            enforceMaxLength: true,
//			            regex: /[a-zA-Z]{2}\d+/,
//		            	regexText: '请输入正确的用户账号(以两位字母开头)',
		            	submitValue: false,
		            	listeners:{
		            		specialkey:function(f,e){
		            			if (e.getKey() == e.ENTER) {
		            				document.getElementById('mf_agent_btn').click();
		            			}
		            		}
		            	}
	            	},'-',{
	            		xtype:'button',
        				text: '搜索用户信息',
        				id:'mf_agent_btn',
        				icon: '../../image/find_user.png',
        				scale: 'medium',
        				handler: function(){
        					if(!Ext.getCmp('mf_agent_userInput').isValid()){
        						alert('请输入用户账号');
        						return;
        					}
        					var bsn="";
        					if(Ext.getCmp('bs_name').isHidden()){
        						bsn=Ext.bs_did;
        					}
        					Ext.Ajax.request({
						    		url: 'getAgentUserInfo.jsp',
						    		method: 'POST',
								    params: {
								        username : Ext.getCmp('mf_agent_userInput').value,
								        gluser : '',
								        bs_name : bsn
								    },
								    success: function(response){
								        var result = Ext.decode(response.responseText);
										if(result.isExist=="1"||result.isExist=="2"){
											Ext.getCmp('mf_agent_bs').setRawValue(result.bs_name);
											Ext.getCmp('mf_agent_rname').setValue(result.realname);
											Ext.getCmp('mf_agent_user').setValue(result.username);
										}else{
											alert("您搜索的用户账号不存在");
											Ext.getCmp('mf_agent_form').getForm().reset();
										}
								    }
							});
        				}        				
	            	}
            	]
            }),
        items: [{
            xtype: 'fieldset',
            title: '<font color="red">*</font>请填写<font color="red">*</font>',
            margin: '10 10 10 10',
//            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 1
		            },
		            items:[
                        {
                            xtype:'textfield',
                            fieldLabel: '用户姓名',
                            id: 'mf_agent_rname',
                            name: 'mf_agent_rname',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 420,
                            readOnly:true,
                            submitValue: false
                        },{
                            xtype:'textfield',
                            fieldLabel: '收费日期',
                            id: 'mf_agent_date',
                            name: 'mf_agent_date',
                            margin: '10 30 10 30',
                            value: Ext.Date.format(new Date(), 'Y-m-d'),
                            labelWidth: 90,
                            width: 420,
                            readOnly: true
                        },{
                            id: 'mf_agent_bs',
                            name: 'mf_agent_bs',
                            name: 'mf_agent_bs',
                            xtype:'combobox',
                            margin: '10 30 10 30',
                            fieldLabel:'选择营业厅',
                            store: Ext.data.StoreManager.lookup('bs_name'),
                            labelWidth: 90,
                            width: 420,
                            valueField:'id',
                            displayField:'name',
                            editable: false,
                            readOnly: true,
                            queryMode:'local',
                            allowBlank: false,
                            blankText: '请选择营业厅'
                        },{
                            xtype:'textfield',
                            fieldLabel: '用户账号',
                            id: 'mf_agent_user',
                            name: 'mf_agent_user',
                            margin: '10 30 10 30',
//	              	value: '',
                            labelWidth: 90,
//					allowBlank: false,
//					blankText: '请输入用户账号',
                            enforceMaxLength: true,
                            maxLength: 30,
                            width: 420,
                            readOnly: true
                        },{
                            xtype:'textfield',
                            fieldLabel: '收据号码',
                            id: 'mf_agent_rid',
                            name: 'mf_agent_rid',
                            margin: '10 30 10 30',
//	              	value: '',
                            labelWidth: 90,
                            allowBlank: false,
                            blankText: '请输入收据号码',
                            enforceMaxLength: true,
                            maxLength: 40,
                            width: 420,
                            regex: /(?!.*')^.*$/,
                            regexText: '字符串中不能包含单引号'
                        },{
                            id: 'mf_agent_pt',
                            name: 'mf_agent_pt',
                            xtype:'combobox',
                            fieldLabel: '支付方式',
                            store: Ext.data.StoreManager.lookup('pay_type'),
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 420,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择支付方式',
                            minChars:1,
                            queryMode:'local',
                            editable: false
                        },{
                            id: 'mf_agent_ct',
                            name: 'mf_agent_ct',
                            xtype:'combobox',
                            fieldLabel: '收费类别',
                            store: Ext.data.StoreManager.lookup('charge_type'),
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 420,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择收费类别',
                            minChars:1,
                            queryMode:'local',
                            editable: false,
                            typeAhead:true,
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
                            xtype:'textfield',
                            fieldLabel: '收费金额',
                            id: 'mf_agent_amount',
                            name: 'mf_agent_amount',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            allowBlank: false,
                            blankText: '请输入收费金额',
                            width: 420,
                            enforceMaxLength: true,
                            maxLength: 12,
                            regex: /(^-?\d{1,8}$)|(^-?\d{1,8}\.\d{1,2}$)/,
                            regexText: '请输入正确的收费金额'
                        },{
                            id: 'mf_agent_isnew',
                            name: 'mf_agent_isnew',
                            margin: '10 30 10 30',
                            xtype:'combobox',
                            fieldLabel: '是否新装用户',
                            labelWidth: 90,
                            store:new Ext.data.SimpleStore(
                                {
                                    fields:['id','name'],
                                    data:[['1','是'],['0','否']]
                                }),
                            queryMode:'local',
                            width: 420,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择是否新装用户',
                            editable: false
                        },{
                            id: 'mf_agent_act',
                            name: 'mf_agent_act',
                            xtype:'combobox',
                            fieldLabel: '活动名称',
                            store: Ext.data.StoreManager.lookup('huodong'),
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 420,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择活动名称',
                            minChars:1,
                            queryMode:'local',
                            editable: false,
                            //value:'不选择',
                            value:'',
                            submitValue: false,
                            listeners:{
                                select : function(c,rec){
                                    Ext.getCmp('mf_agent_actsub').setValue('');
                                    Ext.data.StoreManager.lookup('huodong_sub').filterBy(function(record,id){
                                        var text = record.get('huodong_id');
                                        return (text==rec[0].get('id'));
                                    });
                                }
                            }
                        },{
                            id: 'mf_agent_actsub',
                            name: 'mf_agent_actsub',
                            xtype:'combobox',
                            fieldLabel: '套餐名称',
                            store: Ext.data.StoreManager.lookup('huodong_sub'),
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 420,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择套餐名称',
                            minChars:1,
                            queryMode:'local',
                            editable: false,
                            //value:'不选择',
                            value:''
                        },{
                            xtype:'textarea',
                            fieldLabel: '备注信息',
                            id: 'mf_agent_note',
                            name: 'mf_agent_note',
                            rows: 4,
                            margin: '10 30 15 30',
                            labelWidth: 90,
                            allowBlank: false,
                            blankText: '请输入备注',
                            enforceMaxLength: true,
                            maxLength: 290,
//					emptyText: '',
                            width: 420
                            //,
                            //regex: /(?![^.]*')^[^.]*$/,
                            //regexText: '字符串中不能包含单引号'
                        },{
                            xtype: 'hiddenfield',
                            id: 'mf_agent_id',
                            name: 'mf_agent_id',
                            value: ''
                        },{
                            xtype: 'hiddenfield',
                            id: 'mf_agent_list_name',
                            name: 'mf_agent_list_name',
                            value: '用户收费信息'
                        },{
                            xtype: 'hiddenfield',
                            id: 'mf_agent_changedStr',
                            name: 'mf_agent_changedStr',
                            value: ''
                        }
                    ]
    		}]
    		}],
            buttons: [
                {
                    text: '提交信息',
                    handler: function(){
                        var form = Ext.getCmp('mf_agent_form').getForm();
                        if (form.isValid()) {
                            var did=Ext.data.StoreManager.lookup('bs_name').findRecord('name',Ext.getCmp('mf_agent_bs').getRawValue());
                            Ext.getCmp('mf_agent_bs').setValue(did.get('id'));
                            var ct=Ext.data.StoreManager.lookup('charge_type').findRecord('name',Ext.getCmp('mf_agent_ct').getRawValue());
                            Ext.getCmp('mf_agent_ct').setValue(ct.get('id'));
                            var pt=Ext.data.StoreManager.lookup('pay_type').findRecord('name',Ext.getCmp('mf_agent_pt').getRawValue());
                            Ext.getCmp('mf_agent_pt').setValue(pt.get('id'));
                            var fi=Ext.getCmp('mf_agent_isnew').getStore().findRecord('name',Ext.getCmp('mf_agent_isnew').getRawValue());
                            Ext.getCmp('mf_agent_isnew').setValue(fi.get('id'));
                            var as=Ext.data.StoreManager.lookup('huodong_sub').findRecord('name',Ext.getCmp('mf_agent_actsub').getRawValue());
                            Ext.getCmp('mf_agent_actsub').setValue(as.get('id'));
                            var changedStr='';
                            form.submit({
                                url: 'save_agent_charge.jsp'
                            });
                            Ext.getCmp('mf_agent_save').close();
                        }
                    }
                },{
                    text: '关闭窗口',
                    handler: function(){
                        Ext.getCmp('mf_agent_save').close();
                    }
                }
            ]
        });
        
        this.callParent(arguments);
        
    }
});
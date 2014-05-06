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
	            	},
                    {
                        boxLabel:'光猫款',
                        xtype:'checkboxfield',
                        name:'ag_gm_cost',
                        id:'ag_gm_cost',
                        inputValue: '1',
                        uncheckedValues: '0',
                        listeners:{
                            change:function(obj,checked){
                                var gm = Ext.getCmp('ag_gm_cash');
                                if(checked==true){
                                    gm.setDisabled(false);
                                }
                                else{
                                    gm.setDisabled(true);
                                    gm.setValue('');
                                }
                            }
                        }
                    },
                    {
                        boxLabel:'安装费',
                        name:'ag_setup_cost',
                        id:'ag_setup_cost',
                        inputValue: '1',
                        uncheckedValues: '0',
                        xtype:'checkboxfield',
                        listeners:{
                            change:function(obj,checked){
                                var setup = Ext.getCmp('ag_setup_cash');
                                if(checked==true){
                                    setup.setDisabled(false);
                                }
                                else{
                                    setup.setDisabled(true);
                                    setup.setValue('');
                                }
                            }
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
                            labelWidth: 90,
                            enforceMaxLength: true,
                            maxLength: 30,
                            width: 420,
                            readOnly: true
                        },{
                            xtype:'textfield',
                            fieldLabel: '收款人',
                            id: 'ag_payee',
                            name: 'ag_payee',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            enforceMaxLength: true,
                            maxLength: 30,
                            width: 420,
                            editable:true
                        },{
                            xtype:'textfield',
                            fieldLabel: '接待人',
                            id: 'ag_admit',
                            name: 'ag_admit',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            enforceMaxLength: true,
                            maxLength: 30,
                            width: 420,
                            editable:true
                        },

                        {
                            id: 'mf_agent_rid',
                            name: 'mf_agent_rid',
                            xtype:'combobox',
                            fieldLabel: '发票号',
                            store: Ext.data.StoreManager.lookup('invoice_store'),
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 420,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: true,
                            blankText: '请输入发票号',
                            minChars:1,
                            queryMode:'local',
                            editable: true,
                            value:''
                        },{
                            id: 'ag_shouju',
                            name: 'ag_shouju',
                            xtype:'textfield',
                            fieldLabel: '收据号',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 420,
                            valueField:'id',
                            allowBlank: true,
                            minChars:1,
                            queryMode:'local',
                            editable: true,
                            value:''
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
                            editable: false,
                            listeners:{
                                select:function(r){
                                    var temp = Ext.getCmp('mf_agent_pt').getRawValue();
                                    if(temp=='固定POS支付'||temp=='移动POS支付'||temp=='代扣'){
                                        Ext.getCmp('ag_bank_card').setDisabled(false);
                                        Ext.getCmp('ag_netpay_id').setDisabled(true);
                                        Ext.getCmp('ag_netpay_id').setValue('');
                                    }
                                    else if(temp=='银联网上支付'||temp=='快钱网上支付'){
                                        Ext.getCmp('ag_netpay_id').setDisabled(false);
                                        Ext.getCmp('ag_bank_card').setDisabled(true);
                                        Ext.getCmp('ag_bank_card').setValue('');
                                    }
                                    else{
                                        Ext.getCmp('ag_netpay_id').setDisabled(true);
                                        Ext.getCmp('ag_bank_card').setDisabled(true);
                                        Ext.getCmp('ag_bank_card').setValue('');
                                        Ext.getCmp('ag_netpay_id').setValue('');
                                    }
                                }
                            }
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
                            listeners:{
                                select:function(r){
                                    var temp=parseInt(Ext.data.StoreManager.lookup('charge_type').findRecord('name',Ext.getCmp('mf_agent_ct').getRawValue()).get('id'));
                                    if(temp>=2&&temp<=9){
                                        Ext.getCmp('ag_quota').setDisabled(false);
                                        Ext.getCmp('ag_quota').allowBlank=false;
                                        Ext.getCmp('ag_bw').setDisabled(false);
                                        Ext.getCmp('ag_bw').allowBlank=false;
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
                            xtype:'textfield',
                            fieldLabel: '银行卡号',
                            id: 'ag_bank_card',
                            name: 'ag_bank_card',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 420,
                            disabled:true,
                            enforceMaxLength: true
                        },{
                            xtype:'textfield',
                            fieldLabel: '网银订单号',
                            id: 'ag_netpay_id',
                            name: 'ag_netpay_id',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 420,
                            disabled:true,
                            enforceMaxLength: true
                        },{
                            xtype:'textfield',
                            fieldLabel: '光猫款',
                            id: 'ag_gm_cash',
                            name: 'ag_gm_cash',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            blankText: '请输入金额',
                            width: 420,
                            disabled:true,
                            enforceMaxLength: true,
                            maxLength: 12,
                            regex: /(^-?\d{1,8}$)|(^-?\d{1,8}\.\d{1,2}$)/,
                            regexText: '请输入正确的金额'
                        },
                        {
                            xtype:'textfield',
                            fieldLabel: '安装费用',
                            id: 'ag_setup_cash',
                            name: 'ag_setup_cash',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            blankText: '请输入金额',
                            width: 420,
                            disabled:true,
                            enforceMaxLength: true,
                            maxLength: 12,
                            regex: /(^-?\d{1,8}$)|(^-?\d{1,8}\.\d{1,2}$)/,
                            regexText: '请输入正确的金额'
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
                            margin: '10 30 10 30',
                            store: Ext.data.StoreManager.lookup('huodong'),
                            labelWidth: 90,
                            width: 420,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择活动名称',
                            minChars:1,
                            editable: false,
                            value:''
                        },{
                            id: 'ag_presentation',
                            name: 'ag_presentation',
                            xtype:'combobox',
                            fieldLabel: '赠送月份',
                            margin: '10 30 10 30',
                            store:new Ext.data.SimpleStore(
                            {
                                fields:['id','name'],
                                data:
                                    [
                                        [0,'无'],
                                        [1,'1'],
                                        [2,'2'],
                                        [3,'3'],
                                        [4,'4'],
                                        [5,'5'],
                                        [6,'6'],
                                        [7,'7'],
                                        [8,'8'],
                                        [9,'9'],
                                        [10,'10']
                                    ]
                            }),
                            labelWidth: 90,
                            width: 420,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择赠送月份',
                            minChars:1,
                            editable: false,
                            value:''
                        },{
                            id: 'ag_quota',
                            name: 'ag_quota',
                            xtype:'combobox',
                            fieldLabel: '餐型类别',
                            margin: '10 30 10 30',
                            store:new Ext.data.SimpleStore(
                                {
                                    fields:['id','name'],
                                    data:[['包年','包年'],['包月','包月'],['计时','计时']]
                                }),
                            labelWidth: 90,
                            width: 420,
                            valueField:'id',
                            displayField:'name',
                            disabled:true,
                            allowBlank: true,
                            blankText: '请选择餐型',
                            minChars:1,
                            editable: false,
                            value:''
                        },{
                            id: 'ag_bw',
                            name: 'ag_bw',
                            xtype:'combobox',
                            fieldLabel: '带宽',
                            margin: '10 30 10 30',
                            store:new Ext.data.SimpleStore(
                                {
                                    fields:['id','name'],
                                    data:[['2M','2M'],['4M','4M'],['10M','10M'],['20M','20M'],['50M','50M'],['100M','100M']]
                                }),
                            labelWidth: 90,
                            width: 420,
                            disabled:true,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: true,
                            blankText: '请选择带宽',
                            minChars:1,
                            editable: false,
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
                            var as=Ext.data.StoreManager.lookup('huodong').findRecord('name',Ext.getCmp('mf_agent_act').getRawValue());
                            Ext.getCmp('mf_agent_act').setValue(as.get('id'));
                            var changedStr='';
                            form.submit({
                                url: 'save_agent_charge.jsp',
                                method : 'POST',
                                waitTitle : "提示",
                                waitMsg : '正在提交数据，请稍后 ……',
                                success : function(form, action) {
                                    Ext.Msg.alert('操作结果',action.result.msg);
                                    this.close();
                                },
                                failure : function(form, action) {
                                    Ext.Msg.alert('操作结果', action.result.msg);
                                    this.close();
                                }
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
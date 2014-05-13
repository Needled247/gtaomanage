Ext.define('My.fc_save', {
    extend: 'Ext.Window',
    
    constructor: function() {
		
        Ext.apply(this, {
        	id: 'fc_save',
            name: 'fc_save',
            title: '信息窗口',
        	layout:'fit',
        	width: 560,
        	height: 570,
        	modal:true,
        	resizable:false,
        	autoShow:true,
//        	draggable:false,
        items: [{
        	xtype: 'form',
//            margin: '5 0 5 0',
        	id:'fc_form',
        	name:'fc_form',
            layout:'fit',
            bodyStyle:'background-color:transparent',
            tbar: Ext.create('Ext.toolbar.Toolbar',{
//            	border: false,
                height: 40,
                items: [
                    '-',
                    {
                        xtype:'textfield',
                        id: 'fc_save_userId',
                        name: 'fc_save_userId',
                        width: 200,
                        allowBlank: true,
                        blankText: '请输入用户账号',
                        fieldLabel: '用户账号',
                        labelWidth: 60,
                        maxLength: 20,
                        enforceMaxLength: true,
                        submitValue: false,
                        listeners:{
                            specialkey:function(f,e){
                                if (e.getKey() == e.ENTER) {
                                    document.getElementById('fc_search_btn').click();
                                }
                            }
                        }
                    },'-',{
                        xtype:'button',
                        text: '搜索用户信息',
                        id:'fc_search_btn',
                        icon: '../../image/find_user.png',
                        scale: 'medium',
                        handler: function(){
                            if(!Ext.getCmp('fc_save_userId').isValid()){
                                alert('请输入用户账号');
                                return;
                            }
                            var bsn="";
                            if(Ext.getCmp('bs_name').isHidden()){
                                bsn=Ext.bs_did;
                            }
                            Ext.Ajax.request({
                                url: 'get_fc_save_user.jsp',
                                method: 'POST',
                                params: {
                                    userid : Ext.getCmp('fc_save_userId').value,
                                    bs_name : bsn
                                },
                                success: function(response){
                                    var result = Ext.decode(response.responseText);
                                    if(result.realname.length>0){
                                        Ext.getCmp('fc_bs').setRawValue(result.station);
                                        Ext.getCmp('fc_rname').setValue(result.realname);
                                        Ext.getCmp('fc_user').setValue(Ext.getCmp('fc_save_userId').value);
                                    }else{
                                        alert("您搜索的用户账号不存在");
                                    }
                                }
                            });
                        }
                    },
                    {
                        boxLabel:'光猫款',
                        xtype:'checkboxfield',
                        name:'gm_cost',
                        id:'gm_cost',
                        inputValue: '1',
                        uncheckedValues: '0',
                        listeners:{
                            change:function(obj,checked){
                                var gm = Ext.getCmp('gm_cash');
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
                        name:'setup_cost',
                        id:'setup_cost',
                        inputValue: '1',
                        uncheckedValues: '0',
                        xtype:'checkboxfield',
                        listeners:{
                            change:function(obj,checked){
                                var setup = Ext.getCmp('setup_cash');
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
            title: '<font color="red">*</font>营业厅收费信息<font color="red">*</font>',
            margin: '10 10 10 10',
//            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 1
		            },
		            items:[{
		            	xtype:'textfield',
		                fieldLabel: '用户姓名',
		                id: 'fc_rname',
		                name: 'fc_rname',
		                margin: '10 30 10 30',
		                labelWidth: 90,
		                width: 420,
		                readOnly:true,
		                submitValue: false
			        },{
                        xtype:'textfield',
                        fieldLabel: '收费日期',
                        id: 'fc_date',
                        name: 'fc_date',
                        margin: '10 30 10 30',
                        value: Ext.Date.format(new Date(), 'Y-m-d'),
                        labelWidth: 90,
                        width: 420,
                        readOnly: true
                    },{
                        id: 'fc_bs',
                        name: 'fc_bs',
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
                        id: 'fc_user',
                        name: 'fc_user',
                        margin: '10 30 10 30',
                        labelWidth: 90,
                        enforceMaxLength: true,
                        maxLength: 30,
                        width: 420,
                        readOnly: true
                    },{
                        xtype:'textfield',
                        fieldLabel: '收款人',
                        id: 'fc_payee',
                        name: 'fc_payee',
                        margin: '10 30 10 30',
                        labelWidth: 90,
                        enforceMaxLength: true,
                        maxLength: 30,
                        width: 420,
                        editable:true
                    },{
                        xtype:'textfield',
                        fieldLabel: '接待人',
                        id: 'fc_admit',
                        name: 'fc_admit',
                        margin: '10 30 10 30',
                        labelWidth: 90,
                        enforceMaxLength: true,
                        maxLength: 30,
                        width: 420,
                        editable:true
                    },
                    //收据，收款人，接待人，餐型，带宽，银行卡号，网银订单号，支付方式+代扣
                    {
                        id: 'fc_rid',
                        name: 'fc_rid',
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
                        id: 'fc_shouju',
                        name: 'fc_shouju',
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
            		id: 'fc_pt',
					name: 'fc_pt',
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
                            var temp = Ext.getCmp('fc_pt').getRawValue();
                            if(temp=='固定POS支付'||temp=='移动POS支付'||temp=='代扣'){
                                Ext.getCmp('bank_card').setDisabled(false);
                                Ext.getCmp('netpay_id').setDisabled(true);
                                Ext.getCmp('netpay_id').setValue('');
                            }
                            else if(temp=='银联网上支付'||temp=='快钱网上支付'){
                                Ext.getCmp('netpay_id').setDisabled(false);
                                Ext.getCmp('bank_card').setDisabled(true);
                                Ext.getCmp('bank_card').setValue('');
                            }
                            else{
                                Ext.getCmp('netpay_id').setDisabled(true);
                                Ext.getCmp('bank_card').setDisabled(true);
                                Ext.getCmp('bank_card').setValue('');
                                Ext.getCmp('netpay_id').setValue('');
                            }
                        }
                    }
            	},{
            		id: 'fc_ct',
					name: 'fc_ct',
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
                            var temp=parseInt(Ext.data.StoreManager.lookup('charge_type').findRecord('name',Ext.getCmp('fc_ct').getRawValue()).get('id'));
                            if(temp>=2&&temp<=9){
                                Ext.getCmp('fc_quota').setDisabled(false);
                                Ext.getCmp('fc_quota').allowBlank=false;
                                Ext.getCmp('fc_bw').setDisabled(false);
                                Ext.getCmp('fc_bw').allowBlank=false;
                            }
                            if(temp==4||temp==5){
                                Ext.getCmp('fc_pre_month').setDisabled(false);
                                Ext.getCmp('fc_pre_month').allowBlank=false;
                            }
                        }
                    }
            	},{
	            	xtype:'textfield',
	                fieldLabel: '收费金额',
	                id: 'fc_amount',
	                name: 'fc_amount',
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
                    id: 'bank_card',
                    name: 'bank_card',
                    margin: '10 30 10 30',
                    labelWidth: 90,
                    width: 420,
                    disabled:true,
                    enforceMaxLength: true
                },{
                    xtype:'textfield',
                    fieldLabel: '网银订单号',
                    id: 'netpay_id',
                    name: 'netpay_id',
                    margin: '10 30 10 30',
                    labelWidth: 90,
                    width: 420,
                    disabled:true,
                    enforceMaxLength: true
                },{
                    xtype:'textfield',
                    fieldLabel: '光猫款',
                    id: 'gm_cash',
                    name: 'gm_cash',
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
                    id: 'setup_cash',
                    name: 'setup_cash',
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
	                id: 'fc_isnew',
	                name: 'fc_isnew',
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
            		id: 'fc_actsub',
					name: 'fc_actsub',
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
                    id: 'fc_presentation',
                    name: 'fc_presentation',
                    xtype:'combobox',
                    fieldLabel: '赠送月份',
                    margin: '10 30 10 30',
                    store:new Ext.data.SimpleStore(
                        {
                            fields:['id','name'],
                            data:
                                [
                                    [0,'0'],
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
                    value:'0'
                },{
                    id: 'fc_quota',
                    name: 'fc_quota',
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
                    id: 'fc_bw',
                    name: 'fc_bw',
                    xtype:'combobox',
                    fieldLabel: '带宽',
                    margin: '10 30 10 30',
                    store:new Ext.data.SimpleStore(
                    {
                        fields:['id','name'],
                        data:[['2M','2M'],['4M','4M'],['10M','10M'],['20M','20M'],['50M','50M'],['100M','100M']]  //TODO
                    }),
                    labelWidth: 90,
                    width: 420,
                    disabled:true,
                    valueField:'id',
                    displayField:'name',
                    allowBlank: true,
                    blankText: '请选择带宽',
                    minChars:1,
                    queryMode:'local',
                    editable: false,
                    value:''
                },{
                    xtype:'datefield',
                    fieldLabel: '预收月份',
                    id: 'fc_pre_month',
                    name: 'fc_pre_month',
                    margin: '10 30 10 30',
                    format:'Y-m',
                    allowBlank: true,
                    queryMode:'local',
                    editable: false,
                    value: Ext.Date.format(new Date(), 'Y-m'),
                    labelWidth: 90,
                    width: 420,
                    disabled:true
                },{
	            	xtype:'textarea',
	                fieldLabel: '备注信息',
	                id: 'fc_note',
	                name: 'fc_note',
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
			        id: 'fc_id',
			        name: 'fc_id',
			        value: ''
    			},{
			        xtype: 'hiddenfield',
			        id: 'list_name',
			        name: 'list_name',
			        value: '用户收费信息'
    			},{
			        xtype: 'hiddenfield',
			        id: 'changedStr',
			        name: 'changedStr',
			        value: ''
    			}]
    		}]
    		}],            
            buttons: [
            	{
    				text: '提交信息',
    				handler: function(){
                        //这里访问语音计费系统的接口，获取这个账号的话单信息。
    					var form = Ext.getCmp('fc_form').getForm();
        				if (form.isValid()) {
        						var did=Ext.data.StoreManager.lookup('bs_name').findRecord('name',Ext.getCmp('fc_bs').getRawValue());        						
        						Ext.getCmp('fc_bs').setValue(did.get('id'));
        						var ct=Ext.data.StoreManager.lookup('charge_type').findRecord('name',Ext.getCmp('fc_ct').getRawValue());        						
        						Ext.getCmp('fc_ct').setValue(ct.get('id'));
        						var pt=Ext.data.StoreManager.lookup('pay_type').findRecord('name',Ext.getCmp('fc_pt').getRawValue());        						
        						Ext.getCmp('fc_pt').setValue(pt.get('id'));
        						var fi=Ext.getCmp('fc_isnew').getStore().findRecord('name',Ext.getCmp('fc_isnew').getRawValue());        						
        						Ext.getCmp('fc_isnew').setValue(fi.get('id'));
        						var as=Ext.data.StoreManager.lookup('huodong').findRecord('name',Ext.getCmp('fc_actsub').getRawValue());
        						Ext.getCmp('fc_actsub').setValue(as.get('id'));
        						var changedStr='';
        						if(Ext.getCmp('fc_id').getValue()==''){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_rid').fieldLabel+' : </font>'+Ext.getCmp('fc_rid').getValue()+'; ';
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_pt').fieldLabel+' : </font>'+Ext.getCmp('fc_pt').getRawValue()+'; ';
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_ct').fieldLabel+' : </font>'+Ext.getCmp('fc_ct').getRawValue()+'; ';
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_amount').fieldLabel+' : </font>'+Ext.getCmp('fc_amount').getValue()+'; ';
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_isnew').fieldLabel+' : </font>'+Ext.getCmp('fc_isnew').getRawValue()+'; ';
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_actsub').fieldLabel+' : </font>'+Ext.getCmp('fc_actsub').getRawValue()+'; ';
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_note').fieldLabel+' : </font>'+Ext.getCmp('fc_note').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+'; ';
        							Ext.getCmp('changedStr').setValue(Ext.getCmp('fc_save').title+' [ '+changedStr+']');
        						}else{
	        						var r=Ext.getCmp('qc_grid').getSelectionModel().getLastSelected();
	        						if(Ext.getCmp('fc_rid').getValue()!=r.get('receipt_id')){
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_rid').fieldLabel+' : </font>'+Ext.getCmp('fc_rid').getValue()+'; ';
	        							r.set('receipt_id',Ext.getCmp('fc_rid').getValue());        							
	        						}
	        						if(Ext.getCmp('fc_pt').getRawValue()!=r.get('pay_type')){
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_pt').fieldLabel+' : </font>'+Ext.getCmp('fc_pt').getRawValue()+'; ';
	        							r.set('pay_type',Ext.getCmp('fc_pt').getRawValue());
	        						}
	        						if(Ext.getCmp('fc_ct').getRawValue()!=r.get('charge_type')){
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_ct').fieldLabel+' : </font>'+Ext.getCmp('fc_ct').getRawValue()+'; ';
	        							r.set('charge_type',Ext.getCmp('fc_ct').getRawValue());
	        						}
	        						if(Ext.getCmp('fc_amount').getValue()!=r.get('charge_amount')){
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_amount').fieldLabel+' : </font>'+Ext.getCmp('fc_amount').getValue()+'; ';
	        							r.set('charge_amount',Ext.getCmp('fc_amount').getValue());
	        						}
	        						if(Ext.getCmp('fc_isnew').getRawValue()!=r.get('is_new')){
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_isnew').fieldLabel+' : </font>'+Ext.getCmp('fc_isnew').getRawValue()+'; ';
	        							r.set('is_new',Ext.getCmp('fc_isnew').getRawValue());
	        						}
	        						if(Ext.getCmp('fc_actsub').getRawValue()!=r.get('act_name')){
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_actsub').fieldLabel+' : </font>'+Ext.getCmp('fc_actsub').getRawValue()+'; ';
	        							r.set('act_name',Ext.getCmp('fc_actsub').getRawValue());
	        						}
	        						if(Ext.getCmp('fc_note').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')!=r.get('note')){
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_note').fieldLabel+' : </font>'+Ext.getCmp('fc_note').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+'; ';
	        							r.set('note',Ext.getCmp('fc_note').getValue().replace(/\r|\n/g,' ').replace(/'/g,''));
	        						}
//	        						if(changedStr==''){
//	        							alert('您没有修改任何数据');
//	        							return;
//	        						}else{
	        							Ext.getCmp('changedStr').setValue(Ext.getCmp('fc_save').title+' [ '+changedStr+']');
        								Ext.getCmp('qc_grid').getView().refresh();        								
//	        						}
		        				}
        						form.submit({
				                	url: 'save_charge.jsp',
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
        						Ext.getCmp('fc_save').close();
			            	}
        				}        			      				
            	},{
    				text: '关闭窗口',
    				handler: function(){
    					Ext.getCmp('fc_save').close();
    				}        				
            	}
            ]
        });
        this.callParent(arguments);
        
    }
});
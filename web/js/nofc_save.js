Ext.define('My.nofc_save', {
    extend: 'Ext.Window',
    
    constructor: function() {
		
        Ext.apply(this, {
        	id: 'nofc_save',
            name: 'nofc_save',
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
        	id:'nofc_form',
        	name:'nofc_form',
            layout:'fit',
            bodyStyle:'background-color:transparent',
        items: [{
            xtype: 'fieldset',
            title: '<font color="red">*</font>非用户收费信息<font color="red">*</font>',
            margin: '10 10 10 10',
//            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 1
		            },
		            items:[{
		            	xtype:'textfield',
		                fieldLabel: '收费日期',
		                id: 'nofc_date',
		                name: 'nofc_date',
		                margin: '10 30 10 30',
		              	value: Ext.Date.format(new Date(), 'Y-m-d'),
		                labelWidth: 90,
		                width: 420,
		                readOnly: true
	            	},{
		            id: 'nofc_bs',
			        name: 'nofc_bs',
			        xtype:'combobox',
			        margin: '10 30 10 30',
			        fieldLabel:'选择营业厅',
			        store: Ext.data.StoreManager.lookup('bs_name'),
			        labelWidth: 90,
					width: 420,
					valueField:'id',
			      	displayField:'name',
					editable: false,
					queryMode:'local'
//					allowBlank: false,
//					blankText: '请选择营业厅'
		        },{
                    xtype:'textfield',
                    fieldLabel: '用户姓名',
                    id: 'nofc_rname',
                    name: 'nofc_rname',
                    margin: '10 30 10 30',
                    labelWidth: 90,
                    width: 420,
                    value:'',
                    enforceMaxLength: true,
                    maxLength: 25,
                    allowBlank: false,
                    blankText: '请输入用户姓名',
                    regex: /(?!.*')^.*$/,
                    regexText: '字符串中不能包含单引号'
			    },{
                    xtype:'textfield',
                    fieldLabel: '联系电话',
                    id: 'nofc_tel',
                    name: 'nofc_tel',
                    margin: '10 30 10 30',
                    labelWidth: 90,
                    width: 420,
                    value:'',
                    enforceMaxLength: true,
                    maxLength: 50,
                    allowBlank: false,
                    blankText: '请输入联系电话',
                    regex: /(?!.*')^.*$/,
                    regexText: '字符串中不能包含单引号'
            	},{
                    xtype:'textfield',
                    fieldLabel: '联系地址',
                    id: 'nofc_addr',
                    name: 'nofc_addr',
                    margin: '10 30 10 30',
                    labelWidth: 90,
                    width: 420,
                    value:'',
                    enforceMaxLength: true,
                    maxLength: 100,
                    allowBlank: false,
                    blankText: '请输入联系地址',
                    regex: /(?!.*')^.*$/,
                    regexText: '字符串中不能包含单引号'
            	},{
                    xtype:'textfield',
                    fieldLabel: '收款人',
                    id: 'qc_payee',
                    name: 'qc_payee',
                    margin: '10 30 10 30',
                    labelWidth: 90,
                    enforceMaxLength: true,
                    maxLength: 30,
                    width: 420,
                    editable:true
                },{
                    xtype:'textfield',
                    fieldLabel: '接待人',
                    id: 'qc_admit',
                    name: 'qc_admit',
                    margin: '10 30 10 30',
                    labelWidth: 90,
                    enforceMaxLength: true,
                    maxLength: 30,
                    width: 420,
                    editable:true
                },{
                    id: 'nofc_hetong',
                    name: 'nofc_hetong',
                    xtype:'combobox',
                    fieldLabel: '合同名称',
                    margin: '10 30 10 30',
                    labelWidth: 90,
                    width: 420,
                    store: Ext.data.StoreManager.lookup('hetong'),
                    valueField:'id',
                    displayField:'name',
                    colspan:2,
                    minChars:1,
                    queryMode:'local',
                    editable: true,
                    value:'',
                    allowBlank: false,
                    blankText: '请选择合同名称',
                    listeners:{
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
	                fieldLabel: '收据号码',
	                id: 'nofc_rid',
	                name: 'nofc_rid',
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
                    id: 'qc_rid',
                    name: 'qc_rid',
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
            		id: 'nofc_pt',
					name: 'nofc_pt',
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
					editable: false,listeners:{
                            select:function(r){
                                var temp = Ext.getCmp('nofc_pt').getRawValue();
                                if(temp=='固定POS支付'||temp=='移动POS支付'||temp=='代扣'){
                                    Ext.getCmp('qc_bank_card').setDisabled(false);
                                }
                                else{
                                    Ext.getCmp('qc_bank_card').setDisabled(true);
                                    Ext.getCmp('qc_bank_card').setValue('');
                                }
                            }
                        }
            	},{
            		id: 'nofc_ct',
					name: 'nofc_ct',
					xtype:'combobox',
	                fieldLabel: '收费类别',
	                store: Ext.data.StoreManager.lookup('charge_type'),
	                margin: '10 30 10 30',
	                labelWidth: 90,
	                width: 420,
	                valueField:'id',
					displayField:'name',
					allowBlank: false,
					blankText: '请输入收费类别',
					minChars:1,
					queryMode:'local',
					editable: false
            	},{
	            	xtype:'textfield',
	                fieldLabel: '收费金额',
	                id: 'nofc_amount',
	                name: 'nofc_amount',
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
                        id: 'qc_bank_card',
                        name: 'qc_bank_card',
                        margin: '10 30 10 30',
                        labelWidth: 90,
                        width: 420,
                        disabled:true
                    },{
	            	xtype:'textarea',
	                fieldLabel: '备注信息',
	                id: 'nofc_note',
	                name: 'nofc_note',
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
			        id: 'nofc_id',
			        name: 'nofc_id',
			        value: ''
    			},{
			        xtype: 'hiddenfield',
			        id: 'list_name',
			        name: 'list_name',
			        value: Ext.getCmp('fyh_qc').text
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
    					var form = Ext.getCmp('nofc_form').getForm();
        				if (form.isValid()) {
        						var did=Ext.data.StoreManager.lookup('bs_name').findRecord('name',Ext.getCmp('nofc_bs').getRawValue());        						
        						Ext.getCmp('nofc_bs').setValue(did.get('id'));
        						var ct=Ext.data.StoreManager.lookup('charge_type').findRecord('name',Ext.getCmp('nofc_ct').getRawValue());        						
        						Ext.getCmp('nofc_ct').setValue(ct.get('id'));
        						var pt=Ext.data.StoreManager.lookup('pay_type').findRecord('name',Ext.getCmp('nofc_pt').getRawValue());        						
        						Ext.getCmp('nofc_pt').setValue(pt.get('id')); 
        						var ht=Ext.data.StoreManager.lookup('hetong').findRecord('name',Ext.getCmp('nofc_hetong').getRawValue());        						
        						if(ht==null){
        							alert('您输入的合同名称不正确');
        						}else{
        							Ext.getCmp('nofc_hetong').setValue(ht.get('id'));
        							var changedStr='';
	        						if(Ext.getCmp('nofc_id').getValue()==''){
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_rname').fieldLabel+' : </font>'+Ext.getCmp('nofc_rname').getValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_tel').fieldLabel+' : </font>'+Ext.getCmp('nofc_tel').getValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_addr').fieldLabel+' : </font>'+Ext.getCmp('nofc_addr').getValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_hetong').fieldLabel+' : </font>'+Ext.getCmp('nofc_hetong').getRawValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_rid').fieldLabel+' : </font>'+Ext.getCmp('nofc_rid').getValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_pt').fieldLabel+' : </font>'+Ext.getCmp('nofc_pt').getRawValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_ct').fieldLabel+' : </font>'+Ext.getCmp('nofc_ct').getRawValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_amount').fieldLabel+' : </font>'+Ext.getCmp('nofc_amount').getValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_note').fieldLabel+' : </font>'+Ext.getCmp('nofc_note').getValue().replace(/\r|\n/g,'').replace(/'/g,'')+'; ';
	        							Ext.getCmp('changedStr').setValue(Ext.getCmp('nofc_save').title+' [ '+changedStr+']');
	        						}else{
		        						var r=Ext.getCmp('noqc_grid').getSelectionModel().getLastSelected();
		        						if(Ext.getCmp('nofc_bs').getRawValue()!=r.get('bs_name')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_bs').fieldLabel+' : </font>'+Ext.getCmp('nofc_bs').getRawValue()+'; ';
		        							r.set('bs_name',Ext.getCmp('nofc_bs').getRawValue());
		        						}
		        						if(Ext.getCmp('nofc_rname').getValue()!=r.get('realname')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_rname').fieldLabel+' : </font>'+Ext.getCmp('nofc_rname').getValue()+'; ';
		        							r.set('realname',Ext.getCmp('nofc_rname').getValue());
		        						}
		        						if(Ext.getCmp('nofc_tel').getValue()!=r.get('tel')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_tel').fieldLabel+' : </font>'+Ext.getCmp('nofc_tel').getValue()+'; ';
		        							r.set('tel',Ext.getCmp('nofc_tel').getValue());
		        						}
		        						if(Ext.getCmp('nofc_addr').getValue()!=r.get('addr')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_addr').fieldLabel+' : </font>'+Ext.getCmp('nofc_addr').getValue()+'; ';
		        							r.set('addr',Ext.getCmp('nofc_addr').getValue());
		        						}
		        						if(Ext.getCmp('nofc_hetong').getRawValue()!=r.get('contract_name')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_hetong').fieldLabel+' : </font>'+Ext.getCmp('nofc_hetong').getRawValue()+'; ';		        							
		        							r.set('contract_name',Ext.getCmp('nofc_hetong').getRawValue());
		        						}
		        						if(Ext.getCmp('nofc_rid').getValue()!=r.get('receipt_id')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_rid').fieldLabel+' : </font>'+Ext.getCmp('nofc_rid').getValue()+'; ';
		        							r.set('receipt_id',Ext.getCmp('nofc_rid').getValue());        							
		        						}
		        						if(Ext.getCmp('nofc_pt').getRawValue()!=r.get('pay_type')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_pt').fieldLabel+' : </font>'+Ext.getCmp('nofc_pt').getRawValue()+'; ';
		        							r.set('pay_type',Ext.getCmp('nofc_pt').getRawValue());
		        						}
		        						if(Ext.getCmp('nofc_ct').getRawValue()!=r.get('charge_type')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_ct').fieldLabel+' : </font>'+Ext.getCmp('nofc_ct').getRawValue()+'; ';
		        							r.set('charge_type',Ext.getCmp('nofc_ct').getRawValue());
		        						}
		        						if(Ext.getCmp('nofc_amount').getValue()!=r.get('charge_amount')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_amount').fieldLabel+' : </font>'+Ext.getCmp('nofc_amount').getValue()+'; ';
		        							r.set('charge_amount',Ext.getCmp('nofc_amount').getValue());
		        						}		        						
		        						if(Ext.getCmp('nofc_note').getValue().replace(/\r|\n/g,'').replace(/'/g,'')!=r.get('note')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('nofc_note').fieldLabel+' : </font>'+Ext.getCmp('nofc_note').getValue().replace(/\r|\n/g,'').replace(/'/g,'')+'; ';
		        							r.set('note',Ext.getCmp('nofc_note').getValue().replace(/\r|\n/g,'').replace(/'/g,''));
		        						}
//		        						if(changedStr==''){
//		        							alert('您没有修改任何数据');
//		        							return;
//		        						}else{
		        							Ext.getCmp('changedStr').setValue(Ext.getCmp('nofc_save').title+' [ '+changedStr+']');
	        								Ext.getCmp('noqc_grid').getView().refresh();	        								
//		        						}
			        				}
	        						form.submit({
					                	url: 'save_nocharge.jsp'
					                });
	        						Ext.getCmp('nofc_save').close();
        						}
			            	}
        				}        			      				
            	},{
    				text: '关闭窗口',
    				handler: function(){
    					Ext.getCmp('nofc_save').close();
    				}        				
            	}
            ]
        });
        
        this.callParent(arguments);
        
    }
});
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
	                id: 'fc_rid',
	                name: 'fc_rid',
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
					editable: false
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
					editable: false
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
            		id: 'fc_act',
					name: 'fc_act',
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
							Ext.getCmp('fc_actsub').setValue('');
							Ext.data.StoreManager.lookup('huodong_sub').filterBy(function(record,id){
									var text = record.get('huodong_id');
									return (text==rec[0].get('id'));
							});							
						}
	            	}
            	},{
            		id: 'fc_actsub',
					name: 'fc_actsub',
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
					//,
		            //regex: /(?![^.]*')^[^.]*$/,
			        //regexText: '字符串中不能包含单引号'
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
    					var form = Ext.getCmp('fc_form').getForm();
        				if (form.isValid()) {
//        						if(Ext.getCmp('fc_ct').getRawValue().search(/^退/)==-1){
//        							if(Ext.getCmp('fc_amount').getValue().search(/^-/)!=-1){
//        								alert('您输入的收费金额为负数,请在收费类别中选择退费选项');
//        								return;
//        							}
//        						}else{
//        							if(Ext.getCmp('fc_amount').getValue().search(/^-/)==-1){
//        								alert('您选择退费选项时,请在收费金额前面加上"-"号');
//        								return;
//        							}	
//        						}
        						var did=Ext.data.StoreManager.lookup('bs_name').findRecord('name',Ext.getCmp('fc_bs').getRawValue());        						
        						Ext.getCmp('fc_bs').setValue(did.get('id'));
        						var ct=Ext.data.StoreManager.lookup('charge_type').findRecord('name',Ext.getCmp('fc_ct').getRawValue());        						
        						Ext.getCmp('fc_ct').setValue(ct.get('id'));
        						var pt=Ext.data.StoreManager.lookup('pay_type').findRecord('name',Ext.getCmp('fc_pt').getRawValue());        						
        						Ext.getCmp('fc_pt').setValue(pt.get('id'));
        						var fi=Ext.getCmp('fc_isnew').getStore().findRecord('name',Ext.getCmp('fc_isnew').getRawValue());        						
        						Ext.getCmp('fc_isnew').setValue(fi.get('id'));
        						var as=Ext.data.StoreManager.lookup('huodong_sub').findRecord('name',Ext.getCmp('fc_actsub').getRawValue());        						
        						Ext.getCmp('fc_actsub').setValue(as.get('id'));
        						var changedStr='';
        						if(Ext.getCmp('fc_id').getValue()==''){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_rid').fieldLabel+' : </font>'+Ext.getCmp('fc_rid').getValue()+'; ';
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_pt').fieldLabel+' : </font>'+Ext.getCmp('fc_pt').getRawValue()+'; ';
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_ct').fieldLabel+' : </font>'+Ext.getCmp('fc_ct').getRawValue()+'; ';
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_amount').fieldLabel+' : </font>'+Ext.getCmp('fc_amount').getValue()+'; ';
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_isnew').fieldLabel+' : </font>'+Ext.getCmp('fc_isnew').getRawValue()+'; ';
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_act').fieldLabel+' : </font>'+Ext.getCmp('fc_act').getRawValue()+'; ';        							
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
	        						if(Ext.getCmp('fc_act').getRawValue()!=r.get('fc_act')){
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_act').fieldLabel+' : </font>'+Ext.getCmp('fc_act').getRawValue()+'; ';
	        							r.set('fc_act',Ext.getCmp('fc_act').getRawValue());
	        						}
	        						if(Ext.getCmp('fc_actsub').getRawValue()!=r.get('fc_actsub')){
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('fc_actsub').fieldLabel+' : </font>'+Ext.getCmp('fc_actsub').getRawValue()+'; ';
	        							r.set('fc_actsub',Ext.getCmp('fc_actsub').getRawValue());
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
				                	url: 'save_charge.jsp'
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
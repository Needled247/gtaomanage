function fn(){	

		Ext.QuickTips.init();		
					 
		var center_ask=Ext.create('Ext.form.Panel', {
		renderTo: 'form',
        id: 'center_ask',
        frame: true,
        margin: '5 5 5 5',
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'side',
            labelWidth: 100,
            margin: '20 0 0 0',
            afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
        },
//		layout: 'column',
        items: [{
            xtype: 'fieldset',
//            columnWidth: 0.8,
			title: '(*)号表示必填项',
//			collapsible: true,
            margin: '20 40 20 40',
            anchor: '100%',
            layout: 'anchor',
            items:[{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                margin: '30 0 0 140',
                items: [{
                	xtype:'textfield',
                    fieldLabel: '用户姓名',
                    name: 'username',
                    id: 'username',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入您的姓名',
					maxLength: 16,
		            enforceMaxLength: true,
		            regex: /[\u4e00-\u9fa5]+/,
		            regexText: '请输入中文汉字'
                },{
                    xtype:'textfield',
                    fieldLabel: '用户电话',
                    name: 'phone',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入您的联系电话',
					maxLength: 11,
		            enforceMaxLength: true,
		            regex: /(^\d{7,8}$)|(^\d{11}$)/,
//		            regex: /^(13[0-9]{9})|(15[89][0-9]{8})$/,
		            regexText: '请输入正确的电话号码'
                },{
                    xtype:'textfield',
                    fieldLabel: '邮箱地址',
                    name: 'email',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入您的邮箱地址',
					maxLength: 25,
		            enforceMaxLength: true,
		            regex: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		            regexText: '请您输入正确的邮箱地址'
                },{
                    xtype:'textfield',
                    fieldLabel: '用户详细地址',
                    name: 'address',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入您的详细地址',
					maxLength: 25,
		            enforceMaxLength: true
//		            regex: /\w*[\u4e00-\u9fa5]+\w*/,
//		            regexText: '请您输入详细地址(以汉字开头)'
                },{
//                	name: 'band',
                	anchor:'70%',
                	xtype: 'radiogroup',
            		fieldLabel: '预约光网带宽',
            		allowBlank: false,
            		blankText: '请选择您使用的带宽',
            		columns: 4,
            		items: [{
                    		boxLabel: '4M', inputValue: '4M', name: 'band'
                		}, {
                    		boxLabel: '10M', inputValue: '10M', name: 'band'    	
                		}, {
                    		boxLabel: '15M', inputValue: '15M', name: 'band'        	
                		}, {
                    		boxLabel: '25M', inputValue: '25M', name: 'band'       	
                		}
                	]
            	},{
            		anchor:'70%',
                	name: 'setup_date',
                    xtype: 'datefield',
                    fieldLabel: '预约开通时间',
                    value: Ext.Date.format(new Date(), 'Y-m-d'),
                    minValue: new Date(),
                    format: 'Y-m-d',
                    //minText: '您选择的日期不能早于今天',
                    editable: false
                },{
                	anchor:'70%',
                	name: 'account',
			        xtype:'textfield',
			        fieldLabel: '用户账号',
			        maxLength: 20,
		            enforceMaxLength: true,
		            afterLabelTextTpl: '',
		            value:'(观滔用户需填写)',
//		            regex: /^[0-9A-Za-z]*$/,
//		            regexText: '请您输入正确的观滔账号',
		            listeners: {
				        focus: function(obj){
				        	obj.setValue('');
				        }
				    }
                },{
                	anchor:'70%',
                	name: 'note',
			        xtype:'textfield',
			        fieldLabel: '用户备注',
			        maxLength: 25,
		            enforceMaxLength: true,
		            afterLabelTextTpl: ''
                },{
                	xtype: 'button',
    			style: {
            		marginLeft: '160px',
            		marginTop: '40px',
            		marginBottom: '30px'
        		},
        		text: '提交您的申请',
        		icon: '/picture/js/image/save_ask_btn.gif',
//        		formBind: true, //only enabled once the form is valid
//        		disabled: false,
        		handler: function() {
            	var form = this.up('form').getForm();
            	if (form.isValid()) {
            		
//            		Ext.getComponent('username').setValue("qqq");
//            		var phone = form.getValues().phone;
//            		var email = form.getValues().email;
//            		var address = form.getValues().address;
//            		var band = form.getValues().band;
//            		var setup_date = form.getValues().setup_date;
//            		var account = form.getValues().account;
//            		var note = form.getValues().note;
//            		alert(band+" "+email+" "+address+" "+username+" "+phone+" "+account+" "+setup_date);
//-----------------------------------------            		
//            		Ext.Ajax.request({
//					    url: '/picture/js/app/submit_apply.aspx',
//					    params: {
//					        username : form.getValues().username,
//		            		phone : form.getValues().phone,
//		            		email : form.getValues().email,
//		            		address : form.getValues().address,
//		            		band : form.getValues().band,
//		            		setup_date : form.getValues().setup_date,
//		            		account : form.getValues().account,
//		            		note : form.getValues().note
//					    },
//					    success: function(response){
//					        var text = response.responseText;
//					        alert(text);
////					        Ext.example.msg('正阳营业厅' , text);
//					    },
////					    success: function(response, opts) {
////					        var obj = Ext.decode(response.responseText);
////					        console.dir(obj);
////					    },
//					    failure: function(response) {
//					        alert(response.status);
//					        var text = response.responseText;
//					        alert(text);
//					    }
//					});
//-----------------------------------------            		
                	form.submit({
                    	success: function(form, action) {
                    		alert('您的申请已提交成功,工作人员会尽快与您联系!');
//                    		Ext.Msg.show({
//     							title:'保存成功',
//     							msg: action.result.msg,
//     							buttons: Ext.Msg.OK,
//     							icon: Ext.Msg.INFO
//							});
							form.reset();
                    	},
                    	failure: function(form, action) {
                    		alert('服务器忙,请您稍后再试');
//                        	Ext.Msg.show({
//     							title:'保存失败',
//     							msg: action.result.msg,
//     							buttons: Ext.Msg.OK,
//     							icon: Ext.Msg.ERROR
//							});
							//form.reset();
                    	}
                	});
            	}
        	}
    		}]
            }]
        }],
        
        url: '/picture/js/app/submit_apply.asp'
		
    	});       
        
}

Ext.onReady(fn);

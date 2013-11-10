function fn(){	

		Ext.QuickTips.init();		
					 
		var center_ask=Ext.create('Ext.form.Panel', {
		renderTo: 'form',
        id: 'center_ask',
//        collapsible: false,
        frame: true,
        //border: false,
        //style: 'border: 0px solid',
        margin: '5 5 5 5',
//        title: '',
		//bodyPadding: '30 30 0',
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'under',
            labelWidth: 100,
            margin: '20 0 0 0',
            afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
        },

        items: [{
            xtype: 'fieldset',
			title: '(*)号表示必填项',
//			collapsible: true,
            margin: '10 10 0 10',
            anchor: '100%',
            layout: 'hbox',
            items:[{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                margin: '0 0 30 80',
                items: [{
                	xtype:'textfield',
                    fieldLabel: '用户姓名',
                    name: 'username',
                    anchor:'100%',
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
                    anchor:'100%',
					allowBlank: false,
					blankText: '请输入您的联系电话',
					maxLength: 11,
		            enforceMaxLength: true,
		            //regex: /^\d{11}$/,
		            regex: /^(13[0-9]{9})|(15[89][0-9]{8})$/,
		            regexText: '请输入正确的手机号码(11位)'
                },{
                    xtype:'textfield',
                    fieldLabel: '邮箱地址',
                    name: 'email',
                    anchor:'100%',
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
                    anchor:'100%',
					allowBlank: false,
					blankText: '请输入您的详细地址',
					maxLength: 25,
		            enforceMaxLength: true,
		            regex: /\w*[\u4e00-\u9fa5]+\w*/,
		            regexText: '请您输入详细地址(以汉字开头)'
                },{
                	name: 'band',
                	anchor:'100%',
                	xtype: 'radiogroup',
            		fieldLabel: '预约光网带宽',
            		allowBlank: false,
            		blankText: '请选择您使用的带宽',
            		columns: 4,
            		items: [{
                    		boxLabel: '4M', inputValue: 4, name: 'band'
                		}, {
                    		boxLabel: '10M', inputValue: 10, name: 'band'    	
                		}, {
                    		boxLabel: '15M', inputValue: 15, name: 'band'        	
                		}, {
                    		boxLabel: '25M', inputValue: 25, name: 'band'       	
                		}
                	]
            	},{
            		anchor:'100%',
                	name: 'setup_date',
                    xtype: 'datefield',
                    fieldLabel: '预约开通时间',
                    value: Ext.Date.format(new Date(), 'Y-m-d'),
                    minValue: new Date(),
                    format: 'Y-m-d',
                    //minText: '您选择的日期不能早于今天',
                    editable: false
                },{
                	anchor:'100%',
                	name: 'account',
			        xtype:'textfield',
			        fieldLabel: '用户账号',
			        maxLength: 20,
		            enforceMaxLength: true,
		            afterLabelTextTpl: '',
		            value:'(观滔用户需填写)',
		            listeners: {
				        focus: function(obj){
				        	obj.setValue('');
				        }
				    }
                },{
                	anchor:'100%',
                	name: 'note',
			        xtype:'textfield',
			        fieldLabel: '用户备注',
			        maxLength: 25,
		            enforceMaxLength: true,
		            afterLabelTextTpl: ''
                }]
            }]
        }],
        
        url: 'submit_apply.jsp',
        
        buttons: [/*{
	        	style: {
            		marginRight: '10px',
            		marginBottom: '15px'
        		},
        		text: '重置',
        		handler: function() {
            		this.up('form').getForm().reset();
        		}
    		},*/ {
    			style: {
//            		marginRight: '0px',
            		marginTop: '30px'
        		},
        		text: '提交您的申请',
        		icon: 'image/save_ask_btn.gif',
//        		formBind: true, //only enabled once the form is valid
//        		disabled: false,
        		handler: function() {
            	var form = this.up('form').getForm();
            	if (form.isValid()) {
                	form.submit({
                    	success: function(form, action) {
                    		Ext.Msg.show({
     							title:'保存成功',
     							msg: action.result.msg,
     							buttons: Ext.Msg.OK,
     							icon: Ext.Msg.INFO
							});
							form.reset();
                    	},
                    	failure: function(form, action) {
                        	Ext.Msg.show({
     							title:'保存失败',
     							msg: action.result.msg,
     							buttons: Ext.Msg.OK,
     							icon: Ext.Msg.ERROR
							});
							//form.reset();
                    	}
                	});
            	}
        	}
    		}]
		
    	});
		
//        var vp = Ext.create('Ext.Viewport', {
//            id: 'viewport',
//            layout: 'border',
//            items: [
//            	Ext.create('Ext.panel.Panel', {
//            		title: '操作窗口',
//            	    region: 'center',
//            	    frame: true,
//            	    margin: '5 5 5 5',
//            		items:[center_ask]
//            	})
//			]
//			
//			
//        });
        
        
}

Ext.onReady(fn);

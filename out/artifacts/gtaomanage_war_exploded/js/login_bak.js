function fn(){
		
/*		Ext.apply(Ext.form.field.VTypes, {

	        username: function(val, field) {
	            if (field.initialPassField) {
	                var usr = ;
	                return (val == usr.getValue());
	            }
	            return true;
	        },

	        usernameText: '用户名'
	    });*/
	    
	    Ext.tip.QuickTipManager.init();
	    
//	    var logoPanel = new Ext.Panel({
//	    	frame: true,
//            baseCls : 'x-plain',
//            html : '<img width="300px" src="image/logo.gif"'
//        });
	    
		var pwd = Ext.create('Ext.form.Panel', {
			id: 'frm',
	        renderTo: 'login',
	        frame: true,
	        layout: {
	            align: 'middle'
	        },
	        title: '登陆窗口',
	        icon: 'image/login_icon.gif',
	        bodyPadding: '5 5 8',
	        width: 300,
	        fieldDefaults: {	        	
	            labelWidth: 70,
	            msgTarget: 'under', //qtip,side,title
	            autoFitErrors: false
	        },
	        defaults: {
	            width: 270
	        },	        
	        
	        items: [
	        {
	        	xtype: 'label',
	        	frame: true,
	            html: '<img src="image/logo1.gif" width="300" height="45">'
	        },{
	        	labelAlign: 'right',
	        	margin: '2 0 7 0',
	        	xtype: 'textfield',
	            fieldLabel: '管理员账号',
	            name: 'username',
//	            itemId: 'pass',
	            allowBlank: false,
	            blankText: '请输入管理员账号',
	            maxLength: 16,
	            maxLengthText: '您输入的用户名过长',
	            enforceMaxLength: true
	        },{
	        	labelAlign: 'right',
	        	margin: '0 0 0 0',
	        	xtype: 'textfield',
	            fieldLabel: '管理员密码',
	            name: 'pwd',
	            inputType: 'password',
//	            vtype: 'password',
//	            initialPassField: 'pass', // id of the initial password field
	        	allowBlank: false,
	            blankText: '请输入管理员密码',
	            maxLength: 16,
	            maxLengthText: '您输入的密码过长',
	            enforceMaxLength: true
//	        },{
//	        	xtype: 'button',
//	        	text: '登陆管理中心',
//	        	width: '1',
//	        	style: {
//            		left: '60%'
//        		},
//        		handler: submit
//	        }]
	        }],
	        
	        url:'page/validate.jsp',
	        
	        buttons: [{
	        	style: {
            		marginRight: '10px',
            		marginBottom: '10px'
        		},
        		text: '重置',
        		handler: function() {
            		this.up('form').getForm().reset();
        		}
    		}, {
    			style: {
            		marginRight: '16px',
            		marginBottom: '10px'
        		},
        		text: '管理中心',
//        		formBind: true, //only enabled once the form is valid
//        		disabled: false,
        		handler: function() {
            	var form = this.up('form').getForm();
            	if (form.isValid()) {
                	form.submit({
                    	success: function(form, action) {
                       		window.location.href = 'page/main.jsp';
                    	},
                    	failure: function(form, action) {
                        	Ext.Msg.show({
     							title:'登陆失败',
     							msg: action.result.msg,
     							buttons: Ext.Msg.OK,
     							icon: Ext.Msg.ERROR
							});
							form.reset();
                    	}
                	});
            	}
        	}
    		}]
	            
	    });
		
		
		
	}
	
	Ext.onReady(fn);
	
	
 
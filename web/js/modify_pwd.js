Ext.define('My.modify_pwd', {
    extend: 'Ext.Window',
//    requires: [
//    	'Ext.form.TextField'   	
//	],
    constructor: function() {
		
    	//初始化
        Ext.apply(this, {
        	title: '修改密码',
        	id:'modify_pwd',
        	name:'modify_pwd',
        	width: 410,
        	height: 190,
//        	constrain: true,
        	layout: 'border',
        	modal:true,
//        	closeAction:'hide',
        	resizable:false,
        	draggable:false,
        	items:[
        		{
        			region:'west',
        			margin:'15 0',
        			xtype:'label',
        			html:'<img src="../../image/modify_pwd.png" width="100" height="100">'
        		},{
        			region:'center',
        			margin:'5 5 5 0',
        			padding:'10 0 0 20',
        			xtype: 'fieldset',
            		layout: {
            			type:'table',
            			columns:1
            		},
        			items:[
        			{
        				xtype:'textfield',
		        		fieldLabel: '输入旧密码',
	                    name: 'old_pwd',
	                    id: 'old_pwd',
	                    msgTarget: 'qtip',
						allowBlank: false,
						blankText: '请输入旧密码',
						maxLength: 12,
			            enforceMaxLength: true,
			            inputType: 'password',
			            labelWidth: 75
			        },
		        	{
		        		xtype:'textfield',
		        		fieldLabel: '输入新密码',
	                    name: 'new_pwd',
	                    id: 'new_pwd',
						allowBlank: false,
						blankText: '请输入新密码',
						maxLength: 12,
			            enforceMaxLength: true,
			            inputType: 'password',
			            labelWidth: 75
		        	},
		        	{
		        		xtype:'textfield',
		        		fieldLabel: '确认新密码',
	                    name: 'verify_pwd',
	                    id: 'verify_pwd',
						allowBlank: false,
						blankText: '请确认新密码',
						maxLength: 12,
			            enforceMaxLength: true,
			            inputType: 'password',
			            labelWidth: 75
		        	}]
        		}
        	],
        	buttons: [
  				{ 
  					text: '修改',
  					handler: function() {
  						if(Ext.getCmp('old_pwd').isValid() && Ext.getCmp('new_pwd').isValid() && Ext.getCmp('verify_pwd').isValid()){
  							if(Ext.getCmp('new_pwd').value==Ext.getCmp('verify_pwd').value){
	            				Ext.Ajax.request({
						    		url: '../modify_pwd.jsp',
						    		method: 'POST',
								    params: {
								        old_pwd : Ext.getCmp('old_pwd').value,
					            		new_pwd : Ext.getCmp('new_pwd').value
								    },
								    success: function(response){
								        var result = Ext.decode(response.responseText);
										if(result.msg=="ok"){
											alert("密码修改成功");
										}else{
											alert("旧密码输入不正确");
											Ext.getCmp('old_pwd').setValue('');
										}
								    },
								    failure: function(response) {
	//							        response.status;
								        alert("网络故障,请稍后再试");
								    }
								});
	            			}else{
	            				alert("两次输入的新密码不一致");
	            				Ext.getCmp('new_pwd').setValue('');
	            				Ext.getCmp('verify_pwd').setValue('');
	            			}
  						}
        			}  				
  				},
  				{ 
  					text: '取消',
  					handler: function() {
            			Ext.getCmp('modify_pwd').close();
        			}  				
  				}
			]
        });
        
        this.callParent(arguments);
        
    }
});
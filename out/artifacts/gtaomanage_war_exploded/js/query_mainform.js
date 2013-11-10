Ext.define('My.query_mainform', {
    extend: 'Ext.panel.Panel',
	
    constructor: function() {
		
    	//初始化
        Ext.apply(this, {       	
        	title: '查询主表信息',
            region: 'center',
            margin: '0 5 5 0',
            id: 'query_mainform',
            name: 'query_mainform',
//            border: false,
            layout: 'fit',
            frame: true,
            items: [
            	Ext.create('My.center_grid_mf')
            ],
            
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	border: false,
            	height: 40,
            	items: [
            			'-',
		        		{
		                    xtype: 'datefield',
		                    id: 'start_df',
		                    name: 'start_df',
		                    fieldLabel: '起始日期',
		                    labelAlign: 'right',
		                    labelWidth: 60,
//		                    pickerAlign: 'tr-br?',
		                    width: 180,
//		                    height: 25,
//		                    icon: '../image/clock.png',
//		                    value: Ext.Date.format(new Date(), 'Y-m-d'),
//		                    minValue: new Date(),
		                    maxValue: new Date(),
		                    //minText: '请选择今天的日期',
		                    //maxText: '请选择今天的日期',
		                    format: 'Y-m-d',
//		                    allowBlank: false,
//							blankText: '请选择起始日期',
		                    editable: false,
		                    listeners: {
		                    	change: function(obj){
		                    		Ext.getCmp('end_df').setMinValue(obj.getRawValue());
		                    	}
		                    }
        				},
        				'-',
//        				{
//        					text: '导出Excel',
//        					icon: '../../image/excel_btn.gif',
//        					handler: function(){
////        						window.print();
//        						window.location.href = 'get_excel.jsp';
////        						window.open('get_excel.jsp');
//        					}
//        				},
        				{
		                    xtype: 'datefield',
		                    id: 'end_df',
		                    name: 'end_df',
		                    fieldLabel: '结束日期',
		                    labelAlign: 'right',
		                    labelWidth: 60,
//		                    pickerAlign: 'tr-br?',
		                    width: 180,
//		                    height: 25,
//		                    icon: '../image/clock.png',
//		                    value: Ext.Date.format(new Date(), 'Y-m-d'),
//		                    minValue: Ext.getComponent('start_df').getValue(),
		                    maxValue: new Date(),
		                    //minText: '请选择今天的日期',
		                    //maxText: '请选择今天的日期',
		                    format: 'Y-m-d',
//		                    allowBlank: false,
//							blankText: '请选择起始日期',
		                    editable: false,
		                    listeners: {
		                    	change: function(obj){
		                    		Ext.getCmp('start_df').setMaxValue(obj.getRawValue());
		                    	}
		                    }
        				},
        				'-',
        				{
        					xtype:'button',
	        				text: '查询主表信息',
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
											}else{
												Ext.getCmp('save_mainform').getForm().reset();
												alert("您搜索的用户账号不存在");
											}
									    },
									    failure: function(response) {
		//							        response.status;
//									        alert("网络故障,请稍后再试");
									    }
								});
	        				}        		
        				}
        				
        				]
            	
            })
            
        });
        
        this.callParent(arguments);
        
    }
});
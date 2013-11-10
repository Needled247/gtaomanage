Ext.define('My.modify_gi', {
    extend: 'Ext.Window',
//    requires: [
//    	'Ext.form.TextField'   	
//	],
    constructor: function() {
		
    	//初始化
        Ext.apply(this, {
        	title: '修改组别',
        	id:'modify_gi',
        	name:'modify_gi',
        	width: 410,
        	height: 200,
//        	constrain: true,
        	layout: 'border',
        	modal:true,
        	autoShow:true,
//        	closeAction:'hide',
        	resizable:false,
//        	draggable:false,
        	items:[
        		{
        			region:'west',
        			margin:'10 0',
        			xtype:'label',
        			margin:'17 0 0 0',
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
        				xtype:'textarea',    	                
		        		fieldLabel: '社区名称',
	                    name: 'contract_name',
	                    id: 'contract_name',
	                    rows: 3,
    	                width: 260,
	                    readOnly:true,
	                    submitValue:false,
			            labelWidth: 60,			            
			            value:''
        			},
		        	{
		        			xtype:'numberfield',
			                fieldLabel: '社区分组',
			                id: 'group_id',
			                name: 'group_id',
			                labelWidth: 60,
			                width: 260,
			        		maxValue: 99,
			        		minValue: 1,
							allowBlank: false,
							blankText: '请输入分组号码',
							editable: true
		        	},
		        	{
				        xtype: 'hiddenfield',
				        id: 'gi_cid',
				        name: 'gi_cid',
				        value: ''
    				}]
        		}
        	],
        	buttons: [
  				{ 
  					text: '修改',
  					handler: function() {
  						if(Ext.getCmp('group_id').isValid()){
  							if(confirm("确定修改吗?")){
	            				Ext.Ajax.request({
						    		url: 'modify_gi.jsp',
						    		method: 'POST',
								    params: {
								        group_id : Ext.getCmp('group_id').value,
					            		gi_cid : Ext.getCmp('gi_cid').value
					            	}
								});
								Ext.getCmp('modify_gi').close();
  							}
  						}
        			}  				
  				},
  				{ 
  					text: '取消',
  					handler: function() {
            			Ext.getCmp('modify_gi').close();
        			}  				
  				}
			]
        });
        
        this.callParent(arguments);
        
    }
});
function fn(){	

		Ext.QuickTips.init();

        //Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
		
		
		//创建营业厅
		Ext.define('combo_business', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'id', type: 'string'},
		         {name: 'name', type: 'string'}
		     ]
		 });

		 var combo_business = Ext.create('Ext.data.Store', {
			 model: 'combo_business',
		     proxy: {
		         type: 'ajax',
		         url: 'combo_business.jsp',
		         reader: {
		             type: 'json',
		             root: 'combo'
		         }
		     },
		     autoLoad: false
		 });
		
		var flag='<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
		
		var center_ask=Ext.create('Ext.form.Panel', {
		//region: 'center',
        margin: '5 5 0 5',
        id: 'center_ask',
        collapsible: false,
        frame: true,
        border: false,
        //title: '咨询报装登记',
		//bodyPadding: '30 30 0',
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'under',
            labelWidth: 80,
            margin: '20 0 0 0',
            anchor: '85%'
        },

        items: [{
			//xtype: 'container',
            xtype: 'fieldset',
			title: '咨询报装登记',
			//collapsible: true,
            margin: '10 10 0 10',
            anchor: '100%',
            layout: 'hbox',
            items:[{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                margin: '0 0 30 80',
                items: [{
                	name: 'ask_date',
                	xtype: 'textfield',
                    //xtype: 'datefield',
                    fieldLabel: '来电日期',
                    afterLabelTextTpl: flag,
                    //value: Ext.Date.format(new Date(), 'Y-m-d'),
                    //minValue: new Date(),
                    //maxValue: new Date(),
                    //minText: '请选择今天的日期',
                    //maxText: '请选择今天的日期',
                    //format: 'Y-m-d',
                    //allowBlank: false,
					//blankText: '请选择今天的日期',
                    allowBlank: false,
					blankText: '请点击文本框生成当前日期',
                    readOnly: true,
                    listeners: {
				        focus: function(obj){
				        	obj.setValue(Ext.Date.format(new Date(),'Y-m-d'));
				        }
				    }
                },{
                	name: 'ask_time',
                	xtype:'textfield',
                    fieldLabel: '来电时间',
                    afterLabelTextTpl: flag,
					allowBlank: false,
					blankText: '请点击文本框生成当前时间',
					readOnly: true,
					listeners: {
				        focus: function(obj){
				        	obj.setValue(Ext.Date.format(new Date(),'H:i:s'));
				        }
				    }
                
                },{
                	name: 'business_id',
                    xtype:'combobox',
                    fieldLabel: '所属社区',
                    store: combo_business,
                    displayField: 'name',
                    afterLabelTextTpl: flag,
                    valueField: 'id',
					allowBlank: false,
					blankText: '请选择用户所属社区',
					editable: false
                },{
                    xtype:'textfield',
                    fieldLabel: '用户姓名',
                    name: 'username',
                    afterLabelTextTpl: flag,
					allowBlank: false,
					blankText: '请输入用户姓名',
					maxLength: 10,
		            enforceMaxLength: true,
		            regex: /^[\u4e00-\u9fa5]{2,10}$/,
		            regexText: '请输入正确的用户姓名(两个以上汉字)'
                },{
                    xtype:'textfield',
                    fieldLabel: '联系电话',
                    name: 'tel',
                    afterLabelTextTpl: flag,
					allowBlank: false,
					blankText: '请输入联系电话',
					maxLength: 11,
		            enforceMaxLength: true,
		            regex: /^((\d{11})|(\d{7,8}))$/,
		            regexText: '请输入7到8位固话或11位手机号码'
                }
                ]},{
	                xtype: 'container',
	                flex: 1,
	                layout: 'anchor',
	                margin: '0 0 30 0',
                	items: [{
	                    xtype:'textfield',
	                    fieldLabel: '详细地址',
	                    name: 'address',
	                    afterLabelTextTpl: flag,
						allowBlank: false,
						blankText: '请输入详细地址',
						maxLength: 30,
			            enforceMaxLength: true,
			            regex: /\w*[\u4e00-\u9fa5]+\w*/,
			            regexText: '请输入正确的用户住址(以汉字开头)'
                	},{
	                	name: 'source_type',
	                	xtype:'combobox',
	                    fieldLabel: '资源类型',
	                    store: [['1','有资源'],['0','无资源']],
	                    afterLabelTextTpl: flag,
						allowBlank: false,
						blankText: '请选择资源类型',
						editable: false
                	},{
	                    xtype:'textfield',
	                    fieldLabel: '咨询描述',
	                    name: 'ask_describe',
	                    afterLabelTextTpl: flag,
						allowBlank: false,
						blankText: '请输入咨询描述',
						maxLength: 50,
			            enforceMaxLength: true
			            //regex: /\w*[\u4e00-\u9fa5]+\w*/,
			            //regexText: '请输入正确的用户住址(以汉字开头)'
                	},{
	                	name: 'is_oa',
	                	xtype:'combobox',
	                    fieldLabel: '是否转OA',
	                    store: [['1','是'],['0','否']],
	                    afterLabelTextTpl: flag,
						allowBlank: false,
						blankText: '请选择是或否',
						editable: false
                	},{
	                    xtype:'textfield',
	                    fieldLabel: '备注信息',
	                    name: 'note',
	                    //afterLabelTextTpl: flag,
						//allowBlank: false,
						//blankText: '请输入备注信息',
						maxLength: 50,
			            enforceMaxLength: true
                	}]
            }]
        }/*, {
            xtype: 'htmleditor',
            name: 'bio',
            fieldLabel: 'Biography',
            height: 200,
            anchor: '100%'
        }*/],
        
        url: 'save_setup_ask.jsp',
        
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
            		marginRight: '16px',
            		marginTop: '30px'
        		},
        		text: '保存登记信息',
        		icon: '../../image/save_ask_btn.gif',
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
		
    	var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 2
    	});
    	

				//grid_store.load({　params:　{　start:　0, limit: 25 }　});
            	
//				Ext.Ajax.request({    
//		           url: 'get_grid.jsp',    
//		           params : {    
//		           		start : 0,
//		           		limit : 25
//		           },    
//		           method : 'POST',
//		           success : function(response) {
//			           var json = Ext.JSON.decode(response.responseText); //获得后台传递json
//			           //alert(json.data[1].ask_time);
//			           store = Ext.create('Ext.data.Store', {    
//				           totalProperty:'totalCount',
//				           fields : json.fields,   //把json的fieldsNames赋给fields    
//				           data : json.data         //把json的data赋给data    			           		
//			           });  
////			           alert(json.columnModel);
//			           //Ext.getCmp("center_grid").reconfigure(store, json.columnModel);  //定义grid的store和column    
//			           //Ext.getCmp("center_grid").render();
//			           
//		           }
//           		});

		
        var vp = Ext.create('Ext.Viewport', {
            id: 'viewport',
            layout: 'border',
            items: [
            // create instance immediately
            //Ext.create('Ext.Component', {
                //region: 'north',
                //height: 70, // give north and south regions a height
                //autoEl: {
                    //tag: 'div',
                    //html:'<img src="logo1.gif">'
                //}
				//contentEl:'north'
            //}), 
            {
            	xtype: 'toolbar',
            	region: 'north',
            	height: 60,
            	margin: '5 5 5 5',
            	frame: true,
            	items: [{
            		xtype: 'label',
            		contentEl: 'north'
            	},
            	'->',//右对齐
            	{         		
            		xtype: 'button',
            		icon: '../../image/pwd_btn.gif',
            		scale: 'large',
//            		text: '修改用户名',
            		tooltip: '修改用户名密码',
            		tooltipType: 'title',
            		handler: function() {
            			
            	    }
            	},
            	'-',
            	{
            		margin: '0 15 0 0',
            		xtype: 'button',
            		icon: '../../image/info_btn.gif',
            		scale: 'large',
            		tooltip: '软件信息',
            		tooltipType: 'title'
            	}
            	]
            },{
                region: 'west',
                id: 'west-panel', // see Ext.getCmp() below
                title: '部门管理列表',
                layout: 'fit',
                split: true,
                width: 200,
//                minWidth: 200,
//                maxWidth: 200,
                collapsible: false,
//                animCollapse: false,
                margins: '0 0 5 5',
                items: [Ext.create('My.tree_panel')]
            },
            	Ext.create('My.center_panel')
			]
			
			/*destroy:function (){//销毁tabpanel
                                    if(this.fireEvent("destroy",this)!=false){
                                        this.el.remove();
                                        vp = null;
                                        
                                        if(Ext.isIE){
                                            CollectGarbage();
                                        }
                                    }
                                }*/
			
        });
        
        Ext.get("service_ask").on('click', function(){
        	center_ask.hide();
        	if(center_ask.isHidden()){
        		center_ask.hide();
        	}
        });
        
}

Ext.onReady(fn);

		//Ajax写入消息提醒
function msg_wakeup(){
    	Ext.Ajax.request({
		    url: 'msg_wakeup.jsp',
		    params: {
		        param: 3
		    },
		    success: function(response){
		        var text = response.responseText;
		        
		    }
		});
}
		
		//self.setInterval("msg_wakeup()" , 1000);
		msg_wakeup();
    
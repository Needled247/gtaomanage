Ext.define('My.save_mainform', {
    extend: 'Ext.form.Panel',
//    requires: [
//    	'My.center_grid'
//	],
    constructor: function() {
		
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
		 
		 //创建组别
		 	Ext.define('combo_group', {
			     extend: 'Ext.data.Model',
			     fields: [
			         {name: 'id', type: 'string'},
			         {name: 'name', type: 'string'}
			     ]
			 });

			 var combo_group = Ext.create('Ext.data.Store', {
				 model: 'combo_group',
			     proxy: {
			         type: 'ajax',
			         url: 'combo_group.jsp',
			         reader: {
			             type: 'json',
			             root: 'combo'
			         }
			     },
			     autoLoad: false
			 });
			 
			//创建用户来源
			 	Ext.define('combo_source', {
				     extend: 'Ext.data.Model',
				     fields: [
				         {name: 'id', type: 'string'},
				         {name: 'name', type: 'string'}
				     ]
				 });

				 var combo_source = Ext.create('Ext.data.Store', {
					 model: 'combo_source',
				     proxy: {
				         type: 'ajax',
				         url: 'combo_source.jsp',
				         reader: {
				             type: 'json',
				             root: 'combo'
				         }
				     },
				     autoLoad: false
				 });
				 
				//创建房屋性质
				 	Ext.define('combo_house', {
					     extend: 'Ext.data.Model',
					     fields: [
					         {name: 'id', type: 'string'},
					         {name: 'name', type: 'string'}
					     ]
					 });

					 var combo_house = Ext.create('Ext.data.Store', {
						 model: 'combo_house',
					     proxy: {
					         type: 'ajax',
					         url: 'combo_house.jsp',
					         reader: {
					             type: 'json',
					             root: 'combo'
					         }
					     },
					     autoLoad: false
					 });
					 
    	//初始化
        Ext.apply(this, {
        	
        	title: '保存主表信息',
        	region: 'center',
            margin: '0 5 5 0',
            id: 'save_mainform',
            name: 'save_mainform',
//            autoScroll: true,
//            loadMask: true,
//            forceFit: true,
            layout:'border',
//            layout: {
//            	type:'table',
//            	columns:1
//            },
            frame: true,
//            border: false,
            fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'under',
            labelWidth: 80,
            margin: '20 0 0 0'
//            afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required"> *</span>'
        },

        items: [{
			region:'north',
            xtype: 'fieldset',
            autoScroll: true,
			title: '<font color="red">*</font>手工填写信息区域<font color="red">*</font>',
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
                	name: 'business_id',
                    xtype:'combobox',
                    fieldLabel: '所属营业厅',
                    store: combo_business,
                    displayField: 'name',
                    anchor:'70%',
                    valueField: 'id',
					allowBlank: false,
					blankText: '请选择用户所属营业厅',
					editable: false
                },{
                    xtype:'textfield',
                    fieldLabel: '所属楼宇',
                    name: 'building',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入所属楼宇',
					maxLength: 25,
		            enforceMaxLength: true,
		            regex: /\w*[\u4e00-\u9fa5]+\w*/,
		            regexText: '请输入正确的楼宇信息(以汉字开头)'
                },{
                    xtype:'textfield',
                    fieldLabel: '用户住址',
                    name: 'address',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入用户住址',
					maxLength: 25,
		            enforceMaxLength: true,
		            regex: /\w*[\u4e00-\u9fa5]+\w*/,
		            regexText: '请输入正确的用户住址(以汉字开头)'
                },{
                    xtype:'textfield',
                    fieldLabel: '手机号码',
                    name: 'phone',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入手机号码',
					maxLength: 11,
		            enforceMaxLength: true,
		            //regex: /^\d{11}$/,
		            regex: /^(13[0-9]{9})|(15[89][0-9]{8})$/,
		            regexText: '请输入正确的手机号码(11位)'
                },{
                	name: 'house_type_id',
                	xtype:'combobox',
                    fieldLabel: '房屋性质',
                    store: combo_house,
                    displayField: 'name',
                    anchor:'70%',
                    valueField: 'id',
					allowBlank: false,
					blankText: '请选择房屋性质',
					editable: false
                },{
                    xtype:'textareafield',
                    fieldLabel: '备注信息',
                    name: 'note',
                    anchor:'70%',
//					allowBlank: false,
//					blankText: '',
					maxLength: 100,					
		            enforceMaxLength: true
//		            maxLengthText: '',
//		            afterLabelTextTpl: ''
//		            regex: //,
//		            regexText: ''
                }]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                margin: '20 0 30 0',
                items: [{
                	name: 'group_id',
                	margin: '0 0 0 0',
                	xtype:'combobox',
                    fieldLabel: '营业厅组别',
                    store: combo_group,
                    displayField: 'name',
                    anchor:'70%',
                    valueField: 'id',
					allowBlank: false,
					blankText: '请选择组别',
					editable: false
                }, {
                    xtype:'textfield',
                    fieldLabel: '用户姓名',
                    name: 'username',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入用户姓名',
					maxLength: 10,
		            enforceMaxLength: true,
		            regex: /^[\u4e00-\u9fa5]{2,10}$/,
		            regexText: '请输入正确的用户姓名(两个以上汉字)'
                },{
                    xtype:'textfield',
                    fieldLabel: '宅电号码',
                    name: 'tel',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入宅电号码',
					maxLength: 8,
		            enforceMaxLength: true,
		            regex: /^\d{7,8}$/,
		            regexText: '请输入正确的宅电号码(7-8位)'
                },{
                    xtype:'textfield',
                    fieldLabel: '使用者手机',
                    name: 'user_phone',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入使用者手机号码',
					maxLength: 11,
		            enforceMaxLength: true,
		            //regex: /^\d{11}$/,
		            regex: /^(13[0-9]{9})|(15[89][0-9]{8})$/,
		            regexText: '请输入正确的手机号码(11位)'
                },{
                	name: 'user_source_id',
                	xtype:'combobox',
                    fieldLabel: '用户来源',
                    store: combo_source,
                    displayField: 'name',
                    anchor:'70%',
                    valueField: 'id',
					allowBlank: false,
					blankText: '请选择用户来源',
					editable: false
                }]
            }]
        },{
			region:'center',
            xtype: 'fieldset',
            autoScroll: true,
			title: '<font color="red">*</font>自动填写信息区域<font color="red">*</font>',
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
                	name: 'business_id',
                    xtype:'combobox',
                    fieldLabel: '所属营业厅',
                    store: combo_business,
                    displayField: 'name',
                    anchor:'70%',
                    valueField: 'id',
					allowBlank: false,
					blankText: '请选择用户所属营业厅',
					editable: false
                },{
                    xtype:'textfield',
                    fieldLabel: '所属楼宇',
                    name: 'building',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入所属楼宇',
					maxLength: 25,
		            enforceMaxLength: true,
		            regex: /\w*[\u4e00-\u9fa5]+\w*/,
		            regexText: '请输入正确的楼宇信息(以汉字开头)'
                },{
                    xtype:'textfield',
                    fieldLabel: '用户住址',
                    name: 'address',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入用户住址',
					maxLength: 25,
		            enforceMaxLength: true,
		            regex: /\w*[\u4e00-\u9fa5]+\w*/,
		            regexText: '请输入正确的用户住址(以汉字开头)'
                },{
                    xtype:'textfield',
                    fieldLabel: '手机号码',
                    name: 'phone',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入手机号码',
					maxLength: 11,
		            enforceMaxLength: true,
		            //regex: /^\d{11}$/,
		            regex: /^(13[0-9]{9})|(15[89][0-9]{8})$/,
		            regexText: '请输入正确的手机号码(11位)'
                },{
                	name: 'house_type_id',
                	xtype:'combobox',
                    fieldLabel: '房屋性质',
                    store: combo_house,
                    displayField: 'name',
                    anchor:'70%',
                    valueField: 'id',
					allowBlank: false,
					blankText: '请选择房屋性质',
					editable: false
                },{
                    xtype:'textareafield',
                    fieldLabel: '备注信息',
                    name: 'note',
                    anchor:'70%',
//					allowBlank: false,
//					blankText: '',
					maxLength: 100,					
		            enforceMaxLength: true
//		            maxLengthText: '',
//		            afterLabelTextTpl: ''
//		            regex: //,
//		            regexText: ''
                }]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                margin: '20 0 30 0',
                items: [{
                	name: 'group_id',
                	margin: '0 0 0 0',
                	xtype:'combobox',
                    fieldLabel: '营业厅组别',
                    store: combo_group,
                    displayField: 'name',
                    anchor:'70%',
                    valueField: 'id',
					allowBlank: false,
					blankText: '请选择组别',
					editable: false
                }, {
                    xtype:'textfield',
                    fieldLabel: '用户姓名',
                    name: 'username',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入用户姓名',
					maxLength: 10,
		            enforceMaxLength: true,
		            regex: /^[\u4e00-\u9fa5]{2,10}$/,
		            regexText: '请输入正确的用户姓名(两个以上汉字)'
                },{
                    xtype:'textfield',
                    fieldLabel: '宅电号码',
                    name: 'tel',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入宅电号码',
					maxLength: 8,
		            enforceMaxLength: true,
		            regex: /^\d{7,8}$/,
		            regexText: '请输入正确的宅电号码(7-8位)'
                },{
                    xtype:'textfield',
                    fieldLabel: '使用者手机',
                    name: 'user_phone',
                    anchor:'70%',
					allowBlank: false,
					blankText: '请输入使用者手机号码',
					maxLength: 11,
		            enforceMaxLength: true,
		            //regex: /^\d{11}$/,
		            regex: /^(13[0-9]{9})|(15[89][0-9]{8})$/,
		            regexText: '请输入正确的手机号码(11位)'
                },{
                	name: 'user_source_id',
                	xtype:'combobox',
                    fieldLabel: '用户来源',
                    store: combo_source,
                    displayField: 'name',
                    anchor:'70%',
                    valueField: 'id',
					allowBlank: false,
					blankText: '请选择用户来源',
					editable: false
                }]
            }]
        }],
        
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
//    			style: {
//            		marginRight: '16px',
//            		marginTop: '30px'
//        		},
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
        
        this.callParent(arguments);
        
    }
});
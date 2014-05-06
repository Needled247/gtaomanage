﻿Ext.define('My.mf_modify', {
    extend: 'Ext.Window',
    
    constructor: function() {
        Ext.apply(this, {
        	id: 'mf_modify',
            name: 'mf_modify',
            title: '信息窗口',
        	layout:'fit',
        	width: 620,
        	height: 590,
        	modal:true,
        	resizable:false,
        	autoShow:true,
//        	draggable:false,
        items: [{
        	xtype: 'form',
//            margin: '5 0 5 0',
        	id:'mf_form',
        	name:'mf_form',
            layout:'fit',
            bodyStyle:'background-color:transparent',
            tbar: Ext.create('Ext.toolbar.Toolbar',{
//            	border: false,
                height: 40,
                items: [
                    '-',
                    {
                        xtype:'textfield',
                        id: 'mf_modify_user',
                        name: 'mf_modify_user',
                        width: 200,
                        allowBlank: true,
                        blankText: '请输入用户账号',
                        fieldLabel: '用户账号',
                        labelWidth: 60,
                        maxLength: 20,
                        enforceMaxLength: true,
//			            regex: /[a-zA-Z]{2}\d+/,
//		            	regexText: '请输入正确的用户账号(以两位字母开头)',
                        submitValue: false,
                        listeners:{
                            specialkey:function(f,e){
                                if (e.getKey() == e.ENTER) {
                                    document.getElementById('mf_modify_user_btn').click();
                                }
                            }
                        }
                    },'-',{
                        xtype:'button',
                        text: '搜索用户信息',
                        id:'mf_modify_user_btn',
                        icon: '../../image/find_user.png',
                        scale: 'medium',
                        handler: function(){
                            if(!Ext.getCmp('mf_modify_user').isValid()){
                                alert('请输入用户账号');
                                return;
                            }
                            var bsn="";
                            if(Ext.getCmp('bs_name').isHidden()){
                                bsn=Ext.bs_did;
                            }
                            Ext.Ajax.request({
                                url: 'get_modify_user.jsp',
                                method: 'POST',
                                params: {
                                    userid : Ext.getCmp('mf_modify_user').value,
                                    bs_name : bsn
                                },
                                success: function(response){
                                    var result = Ext.decode(response.responseText);
                                    if(result.realname.length>0){
                                        Ext.getCmp('mf_rname').setValue(result.realname);
                                        Ext.getCmp('mf_bs').setRawValue(result.bs_name);
                                        Ext.getCmp('mf_user').setValue(result.username);
                                        Ext.getCmp('mf_id').setValue(result.username);
                                        Ext.getCmp('mf_bandtype').setValue(result.mealtype);
                                        Ext.getCmp('mf_addr').setValue(result.address);
                                        Ext.getCmp('mf_futime').setValue(result.starttime);
                                        Ext.getCmp('mf_opt').setValue(result.opt_time);
                                        Ext.getCmp('mf_leaflet').setValue(result.leaflet_no);
                                        Ext.getCmp('mf_group').setValue(result.group_id);
                                        Ext.getCmp('mf_ht').setRawValue(result.house_type);
                                        Ext.getCmp('mf_lt').setRawValue(result.line_type);
                                        Ext.getCmp('mf_isit').setRawValue(result.isit);
                                        Ext.getCmp('mf_hetong').setRawValue(result.contract_name);
                                        Ext.getCmp('mf_retime').setValue(result.mf_retime);
                                        Ext.getCmp('mf_gm').setRawValue(result.mf_gm);
                                        Ext.getCmp('mf_gg').setRawValue(result.mf_gg);
                                        Ext.getCmp('mf_real_quota').setValue(result.mf_real_quota);
                                        Ext.getCmp('mf_real_bandwidth').setValue(result.mf_real_bandwidth);
                                        Ext.getCmp('mf_hdnote').setValue(result.mf_hdnote);
                                        Ext.getCmp('mf_sbnote').setValue(result.mf_sbnote);
                                        Ext.getCmp('mf_zhnote').setValue(result.mf_zhnote);
                                        Ext.getCmp('mf_tsnote').setValue(result.mf_tsnote);
                                        Ext.getCmp('mf_user_mobile').setValue(result.user_mobile);
                                        Ext.getCmp('mf_user_phone').setValue(result.user_phone);
                                        Ext.getCmp('mf_onet_prop').setRawValue(result.onet_prop_value);
                                        Ext.getCmp('mf_user_prop').setRawValue(result.user_prop_value);
                                        Ext.getCmp('mf_net_prop').setRawValue(result.net_prop_value);
                                        Ext.getCmp('mf_weixin').setRawValue(result.weixin);
                                        Ext.getCmp('mdf_letv_start').setValue(result.letv_start);
                                        Ext.getCmp('mdf_letv_end').setValue(result.letv_end);
                                        Ext.getCmp('mdf_letv_mac').setValue(result.letv_mac);
                                        Ext.getCmp('mdf_it_end').setValue(result.it_end);
                                        Ext.getCmp('mdf_act').setValue(result.action);
                                        Ext.getCmp('mdf_presentation').setValue(result.presentation);
                                    }else{
                                        alert("您搜索的用户账号不存在");
                                        Ext.getCmp('mf_form').getForm().reset();
                                    }
                                }
                            });
                        }
                    }
                ]
            }),
        items: [{
            xtype: 'fieldset',
            title: '<font color="red">*</font>用户主要信息<font color="red">*</font>',
            margin: '10 10 10 10',
//            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 2
		            },
		            items:[
		            {
						xtype:'textfield',
						id: 'mf_user',
						name: 'mf_user',						
						fieldLabel: '用户账号',
						margin: '10 30 10 30',
		                labelWidth: 90,
		                width: 480,
		                colspan:2,
		                readOnly: true,
						submitValue: false
					},
		            {
		               	xtype:'textfield',
		                fieldLabel: '用户姓名',
		                id: 'mf_rname',
		                name: 'mf_rname',
		                colspan:2,
		                margin: '10 30 10 30',
		                labelWidth: 90,
		                width: 480,
						readOnly: true,
						submitValue: false
	            	},{
		            	xtype:'textfield',
		                fieldLabel: '使用餐型',
		                id: 'mf_bandtype',
		                name: 'mf_bandtype',
		                colspan:2,
		                margin: '10 30 10 30',
		                labelWidth: 90,
		                width: 480,
						readOnly: true,
						submitValue: false
	            	},{
	    	                xtype:'textfield',
	    	                fieldLabel: '详细地址',
	    	                id: 'mf_addr',
	    	                name: 'mf_addr',
	    	                colspan:2,
			                margin: '10 30 10 30',
			                labelWidth: 90,
			                width: 480,
	    					readOnly: true,
	    					submitValue: false
	            	},{
	            		id: 'mf_bs',
	                    name: 'mf_bs',
	                    xtype:'combobox',
	                    fieldLabel:'所属营业厅',
	                    store: Ext.data.StoreManager.lookup('bs_name'),
		                margin: '10 30 10 30',
		                labelWidth: 90,
		                width: 480,
	    		      	colspan:2,
	    		      	valueField:'id',
	          			displayField:'name',
	          			value:'',
	          			queryMode:'local',
	          			allowBlank: false,
	    				blankText: '请选择营业厅',
	    				editable: false,
	    				readOnly: true
	            	},{
                            id: 'mf_real_quota',
                            name: 'mf_real_quota',
                            margin: '10 30 10 30',
                            xtype:'combobox',
                            fieldLabel: '实际餐型',
                            labelWidth: 90,
                            store:new Ext.data.SimpleStore(
                                {
                                    fields:['id','name'],
                                    data:[['包年','包年'],['包月','包月'],['计时','计时']]
                                }),
                            queryMode:'local',
                            width: 210,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '实际餐型',
                            editable: false
                        },{
                            id: 'mf_real_bandwidth',
                            name: 'mf_real_bandwidth',
                            margin: '10 30 10 30',
                            xtype:'combobox',
                            fieldLabel: '实际带宽',
                            labelWidth: 90,
                            store:new Ext.data.SimpleStore(
                                {
                                    fields:['id','name'],
                                    data:[['2M','2M'],['4M','4M'],['10M','10M'],['20M','20M'],['50M','50M'],['100M','100M']]
                                }),
                            queryMode:'local',
                            width: 210,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '实际带宽',
                            editable: false
                        },{
                            id: 'mdf_act',
                            name: 'mdf_act',
                            xtype:'combobox',
                            fieldLabel: '活动名称',
                            margin: '10 30 10 30',
                            store: Ext.data.StoreManager.lookup('huodong'),
                            labelWidth: 90,
                            width: 210,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择活动名称',
                            minChars:1,
                            editable: false,
                            value:''
                        },{
                            id: 'mdf_presentation',
                            name: 'mdf_presentation',
                            xtype:'combobox',
                            fieldLabel: '赠送月份',
                            margin: '10 30 10 30',
                            store:new Ext.data.SimpleStore(
                                {
                                    fields:['id','name'],
                                    data:
                                        [
                                            [0,'无'],
                                            [1,'1'],
                                            [2,'2'],
                                            [3,'3'],
                                            [4,'4'],
                                            [5,'5'],
                                            [6,'6'],
                                            [7,'7'],
                                            [8,'8'],
                                            [9,'9'],
                                            [10,'10']
                                        ]
                                }),
                            labelWidth: 90,
                            width: 210,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择赠送月份',
                            minChars:1,
                            editable: false,
                            value:''
                        },{
                            xtype:'textfield',
                            fieldLabel: '使用人电话',
                            id: 'mf_user_mobile',
                            name: 'mf_user_mobile',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 210,
                            value: '',
                            allowBlank: false,
                            blankText: '请填写使用人电话',
                            editable: true
                        },{
                            xtype:'textfield',
                            fieldLabel: '固定电话',
                            id: 'mf_user_phone',
                            name: 'mf_user_phone',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 210,
                            value: '',
                            allowBlank: true,
                            blankText: '请填写固定电话',
                            editable: true
                        },{
                            id: 'mf_onet_prop',
                            name: 'mf_onet_prop',
                            margin: '10 30 10 30',
                            xtype:'combobox',
                            fieldLabel: '原网络性质',
                            labelWidth: 90,
                            store: Ext.StoreManager.lookup('old_net_prop'),
                            queryMode:'local',
                            width: 210,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择用户原网络性质',
                            editable: false
                        },{
                            id: 'mf_user_prop',
                            name: 'mf_user_prop',
                            margin: '10 30 10 30',
                            xtype:'combobox',
                            fieldLabel: '用户性质',
                            labelWidth: 90,
                            store: Ext.StoreManager.lookup('user_prop'),
                            queryMode:'local',
                            width: 210,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择用户性质',
                            editable: false
                        },{
                            id: 'mf_net_prop',
                            name: 'mf_net_prop',
                            margin: '10 30 10 30',
                            xtype:'combobox',
                            fieldLabel: '网络性质',
                            labelWidth: 90,
                            store: Ext.StoreManager.lookup('net_prop'),
                            queryMode:'local',
                            width: 210,
                            valueField:'id',
                            displayField:'name',
                            allowBlank: false,
                            blankText: '请选择网络性质',
                            editable: false
                        },{
                            xtype:'datefield',
                            fieldLabel: '乐视起始时间',
                            id: 'mdf_letv_start',
                            name: 'le_start',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 210,
                            value: '',
                            format: 'Y-m-d',
                            allowBlank: true,
                            editable: true
                        },{
                            xtype:'datefield',
                            fieldLabel: '乐视到期时间',
                            id: 'mdf_letv_end',
                            name: 'le_end',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 210,
                            value: '',
                            format: 'Y-m-d',
                            allowBlank: true,
                            editable: true
                        },{
                            xtype:'textfield',
                            fieldLabel: '乐视MAC地址',
                            id: 'mdf_letv_mac',
                            name: 'le_mac',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 210,
                            value: '',
                            allowBlank: true,
                            editable: true
                        },{
		            	xtype:'datefield',
		                fieldLabel: '启用时间',
		                id: 'mf_futime',
		                name: 'mf_futime',
		                margin: '10 30 10 30',
		                labelWidth: 90,
		                width: 210,
		                value: '',
		              	format: 'Y-m',
						allowBlank: false,
						blankText: '请选择启用时间',
						editable: true
	            	},{
		            	xtype:'datefield',
		                fieldLabel: '光纤开通时间',
		                id: 'mf_opt',
		                name: 'mf_opt',
		                margin: '10 30 10 30',
		                value: '',
		              	format: 'Y-m-d',
		                labelWidth: 90,
		                width: 210,
						editable: true
	            	},{
		            	xtype:'datefield',
		                fieldLabel: '重新启用时间',
		                id: 'mf_retime',
		                name: 'mf_retime',
		                margin: '10 30 10 30',
		                labelWidth: 90,
		                width: 210,
		                value: '',
		              	format: 'Y-m',
//						allowBlank: false,
//						blankText: '请选择重新启用时间',
						editable: true
	            	},{
		                id: 'mf_isit',
		                name: 'mf_isit',
		                margin: '10 30 10 30',
		                xtype:'combobox',
		                fieldLabel: '是否IT卡用户',
		                labelWidth: 90,
		                store:new Ext.data.SimpleStore(
				      	{
				       		fields:['id','name'],
				       		data:[['1','是'],['0','否']]
				      	}),
				      	queryMode:'local',
				      	width: 210,
				      	valueField:'id',
		      			displayField:'name',
						allowBlank: false,
						blankText: '请选择是否IT卡用户',
						editable: false
	            	},{
                            xtype:'datefield',
                            fieldLabel: 'IT卡到期时间',
                            id: 'mdf_it_end',
                            name: 'it_end',
                            margin: '10 30 10 30',
                            labelWidth: 90,
                            width: 210,
                            value: '',
                            format: 'Y-m-d',
                            allowBlank: true,
                            editable: true
                        },{
                            id: 'mf_weixin',
                            name: 'mf_weixin',
                            margin: '10 30 10 30',
                            xtype:'combobox',
                            fieldLabel: '是否关注微信',
                            labelWidth: 90,
                            store:new Ext.data.SimpleStore(
                                {
                                    fields:['id','name'],
                                    data:[['1','是'],['0','否']]
                                }),
                            queryMode:'local',
                            width: 210,
                            valueField:'id',
                            displayField:'name',
                            value:'',
                            allowBlank: false,
                            blankText: '请选择是否关注微信',
                            editable: false
                        },{
		               	xtype:'numberfield',
		                fieldLabel: '宣传单号',
		                id: 'mf_leaflet',
		                name: 'mf_leaflet',
		                margin: '10 30 10 30',
		                labelWidth: 90,
		                width: 210,
		        		maxValue: 99,
		        		minValue: 1,
						allowBlank: false,
						blankText: '请选择宣传单号',
						editable: true
	            	},{
		            	xtype:'numberfield',
		                fieldLabel: '社区分组',
		                id: 'mf_group',
		                name: 'mf_group',
		                margin: '10 30 10 30',
		                labelWidth: 90,
		                width: 210,
		        		maxValue: 99,
		        		minValue: 1,
						allowBlank: false,
						blankText: '请选择营业厅分组',
						editable: true
	            	},{
		                id: 'mf_ht',
		                name: 'mf_ht',
		                xtype:'combobox',
		                fieldLabel: '房屋性质',
		                margin: '10 30 10 30',
		                labelWidth: 90,
		                width: 210,
		                store:new Ext.data.SimpleStore(
				      	{
				       		fields:['id','name'],
				       		data:[['1','租用'],['2','私有']]
				      	}),
				      	queryMode:'local',
				      	valueField:'id',
		      			displayField:'name',
						allowBlank: false,
						blankText: '请选择房屋性质',
						editable: false
	            	},{
	            		id: 'mf_lt',
		                name: 'mf_lt',
		                xtype:'combobox',
		                fieldLabel: '走线方式',
		                margin: '10 30 10 30',
		                labelWidth: 90,
		                width: 210,
		                store:new Ext.data.SimpleStore(
				      	{
				       		fields:['id','name'],
				       		data:[['1','明线'],['2','暗线']]
				      	}),
				      	queryMode:'local',
				      	valueField:'id',
		      			displayField:'name',
						allowBlank: false,
						blankText: '请选择走线方式',
						editable: false
	            	},{
            		id: 'mf_hetong',
					name: 'mf_hetong',
					xtype:'combobox',
					fieldLabel: '合同名称',
					margin: '10 30 10 30',
	                labelWidth: 90,
	                width: 480,
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
            		id: 'mf_gm',
                    name: 'mf_gm',
                    xtype:'combobox',
                    fieldLabel:'光猫类型',
                    store: Ext.data.StoreManager.lookup('gm_type'),
	                margin: '10 30 10 30',
	                labelWidth: 90,
	                width: 480,
    		      	colspan:2,
    		      	valueField:'id',
          			displayField:'name',
          			value:'',
          			queryMode:'local',
          			allowBlank: false,
    				blankText: '请选择光猫类型',
    				editable: false
            	},{
            		id: 'mf_gg',
                    name: 'mf_gg',
                    xtype:'combobox',
                    fieldLabel:'光改情况',
                    store: Ext.data.StoreManager.lookup('gg_state'),
	                margin: '10 30 10 30',
	                labelWidth: 90,
	                width: 480,
    		      	colspan:2,
    		      	valueField:'id',
          			displayField:'name',
          			value:'',
          			queryMode:'local',
          			allowBlank: false,
    				blankText: '请选择光改情况',
    				editable: false
            	},{
	                xtype:'textarea',
	                fieldLabel: '活动备注',
	                id: 'mf_hdnote',
	                name: 'mf_hdnote',
	                colspan:2,
	                rows: 3,
	                margin: '10 30 10 30',
	                labelWidth: 90,
	                width: 480,
	                value:'',
	                maxLength: 150,
		            enforceMaxLength: true
					//,
	                //regex: /(?![^.]*')^[^.]*$/,
		            //regexText: '字符串中不能包含单引号'
            	},{
	                xtype:'textarea',
	                fieldLabel: '设备备注',
	                id: 'mf_sbnote',
	                name: 'mf_sbnote',
	                colspan:2,
	                rows: 3,
	                margin: '10 30 10 30',
	                labelWidth: 90,
	                width: 480,
	                value:'',
	                maxLength: 150,
		            enforceMaxLength: true
					//,
	                //regex: /(?![^.]*')^[^.]*$/,
		            //regexText: '字符串中不能包含单引号'
            	},{
	                xtype:'textarea',
	                fieldLabel: '账号变更备注',
	                id: 'mf_zhnote',
	                name: 'mf_zhnote',
	                colspan:2,
	                rows: 3,
	                margin: '10 30 10 30',
	                labelWidth: 90,
	                width: 480,
	                value:'',
	                maxLength: 100,
		            enforceMaxLength: true
					//,
	                //regex: /(?![^.]*')^[^.]*$/,
		            //regexText: '字符串中不能包含单引号'
            	},{
	                xtype:'textarea',
	                fieldLabel: '特殊备注',
	                id: 'mf_tsnote',
	                name: 'mf_tsnote',
	                colspan:2,
	                rows: 3,
	                margin: '10 30 10 30',
	                labelWidth: 90,
	                width: 480,
	                value:'',
	                maxLength: 150,
		            enforceMaxLength: true
					//,
	                //regex: /(?![^.]*')^[^.]*$/,
		            //regexText: '字符串中不能包含单引号'
            	},{
			        xtype: 'hiddenfield',
			        id: 'mf_id',
			        name: 'mf_id',
			        value: ''
    			},{
			        xtype: 'hiddenfield',
			        id: 'list_name',
			        name: 'list_name',
			        value: '用户主要信息'
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
    					var form = Ext.getCmp('mf_form').getForm();
    						if (form.isValid()) {
    							var did=Ext.data.StoreManager.lookup('bs_name').findRecord('name',Ext.getCmp('mf_bs').getRawValue());        						
        						Ext.getCmp('mf_bs').setValue(did.get('id'));
        						var ht=Ext.getCmp('mf_ht').getStore().findRecord('name',Ext.getCmp('mf_ht').getRawValue());        						
        						Ext.getCmp('mf_ht').setValue(ht.get('id'));
        						var lt=Ext.getCmp('mf_lt').getStore().findRecord('name',Ext.getCmp('mf_lt').getRawValue());        						
        						Ext.getCmp('mf_lt').setValue(lt.get('id'));
        						var isit=Ext.getCmp('mf_isit').getStore().findRecord('name',Ext.getCmp('mf_isit').getRawValue());        						
        						Ext.getCmp('mf_isit').setValue(isit.get('id'));
        						var gm=Ext.getCmp('mf_gm').getStore().findRecord('name',Ext.getCmp('mf_gm').getRawValue());        						
        						Ext.getCmp('mf_gm').setValue(gm.get('id'));        						
        						var gg=Ext.data.StoreManager.lookup('gg_state').findRecord('name',Ext.getCmp('mf_gg').getRawValue());        						
        						Ext.getCmp('mf_gg').setValue(gg.get('id'));
                                var onp=Ext.data.StoreManager.lookup('old_net_prop').findRecord('name',Ext.getCmp('mf_onet_prop').getRawValue());
                                Ext.getCmp('mf_onet_prop').setValue(onp.get('id'));
                                var np=Ext.data.StoreManager.lookup('net_prop').findRecord('name',Ext.getCmp('mf_net_prop').getRawValue());
                                Ext.getCmp('mf_net_prop').setValue(np.get('id'));
                                var up=Ext.data.StoreManager.lookup('user_prop').findRecord('name',Ext.getCmp('mf_user_prop').getRawValue());
                                Ext.getCmp('mf_user_prop').setValue(up.get('id'));
                                var wx=Ext.getCmp('mf_weixin').getStore().findRecord('name',Ext.getCmp('mf_weixin').getRawValue());
                                Ext.getCmp('mf_weixin').setValue(wx.get('id'));
                                var as=Ext.data.StoreManager.lookup('huodong').findRecord('name',Ext.getCmp('mdf_act').getRawValue());
                                Ext.getCmp('mdf_act').setValue(as.get('id'));
                                var mf_hetong=Ext.data.StoreManager.lookup('hetong').findRecord('name',Ext.getCmp('mf_hetong').getRawValue(),0,false,true,true);
        						if(mf_hetong==null){
        							alert('您输入的合同名称不正确');
        						}else{
        							Ext.getCmp('mf_hetong').setValue(mf_hetong.get('id'));
        							var changedStr='\"修改\":\"'+Ext.getCmp('mf_user').getValue()+"\"";
                                    /*
		        						var r=Ext.getCmp('cg_A').getSelectionModel().getLastSelected();
		        						if(Ext.getCmp('mf_futime').getRawValue()!=r.get('starttime')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_futime').fieldLabel+' : </font>'+Ext.getCmp('mf_futime').getRawValue()+'; ';
		        							r.set('starttime',Ext.getCmp('mf_futime').getRawValue());
		        						}
		        						if(Ext.getCmp('mf_opt').getRawValue()!=r.get('opt_time')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_opt').fieldLabel+' : </font>'+Ext.getCmp('mf_opt').getRawValue()+'; ';
		        							r.set('opt_time',Ext.getCmp('mf_opt').getRawValue());
		        						}
		        						if(Ext.getCmp('mf_leaflet').getValue()!=r.get('leaflet_no')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_leaflet').fieldLabel+' : </font>'+Ext.getCmp('mf_leaflet').getValue()+'; ';
		        							r.set('leaflet_no',Ext.getCmp('mf_leaflet').getValue());
		        						}
		        						if(Ext.getCmp('mf_group').getValue()!=r.get('group_id')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_group').fieldLabel+' : </font>'+Ext.getCmp('mf_group').getValue()+'; ';
		        							r.set('group_id',Ext.getCmp('mf_group').getValue());
		        						}
		        						if(Ext.getCmp('mf_ht').getRawValue()!=r.get('house_type')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_ht').fieldLabel+' : </font>'+Ext.getCmp('mf_ht').getRawValue()+'; ';		        							
		        							r.set('house_type',Ext.getCmp('mf_ht').getRawValue());
		        						}
		        						if(Ext.getCmp('mf_lt').getRawValue()!=r.get('line_type')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_lt').fieldLabel+' : </font>'+Ext.getCmp('mf_lt').getRawValue()+'; ';
		        							r.set('line_type',Ext.getCmp('mf_lt').getRawValue());        							
		        						}
		        						if(Ext.getCmp('mf_isit').getRawValue()!=r.get('isit')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_isit').fieldLabel+' : </font>'+Ext.getCmp('mf_isit').getRawValue()+'; ';
		        							r.set('isit',Ext.getCmp('mf_isit').getRawValue());
		        						}
		        						if(Ext.getCmp('mf_hetong').getRawValue()!=r.get('contract_name')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_hetong').fieldLabel+' : </font>'+Ext.getCmp('mf_hetong').getRawValue()+'; ';
		        							r.set('contract_name',Ext.getCmp('mf_hetong').getRawValue());
		        						}		        						
		        						if(Ext.getCmp('mf_retime').getRawValue()!=r.get('mf_retime')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_retime').fieldLabel+' : </font>'+Ext.getCmp('mf_retime').getRawValue()+'; ';
		        							r.set('mf_retime',Ext.getCmp('mf_retime').getRawValue());
		        						}
		        						if(Ext.getCmp('mf_gm').getRawValue()!=r.get('mf_gm')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_gm').fieldLabel+' : </font>'+Ext.getCmp('mf_gm').getRawValue()+'; ';
		        							r.set('mf_gm',Ext.getCmp('mf_gm').getRawValue());
		        						}
		        						if(Ext.getCmp('mf_gg').getRawValue()!=r.get('mf_gg')){
		        							r.set('mf_gg',Ext.getCmp('mf_gg').getRawValue());
		        						}
		        						if(Ext.getCmp('mf_hdnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')!=r.get('mf_hdnote')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_hdnote').fieldLabel+' : </font>'+Ext.getCmp('mf_hdnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+'; ';
		        							r.set('mf_hdnote',Ext.getCmp('mf_hdnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,''));
		        						}
		        						if(Ext.getCmp('mf_sbnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')!=r.get('mf_sbnote')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_sbnote').fieldLabel+' : </font>'+Ext.getCmp('mf_sbnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+'; ';
		        							r.set('mf_sbnote',Ext.getCmp('mf_sbnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,''));
		        						}
		        						if(Ext.getCmp('mf_zhnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')!=r.get('mf_zhnote')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_zhnote').fieldLabel+' : </font>'+Ext.getCmp('mf_zhnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+'; ';
		        							r.set('mf_zhnote',Ext.getCmp('mf_zhnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,''));
		        						}
		        						if(Ext.getCmp('mf_tsnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')!=r.get('mf_tsnote')){
		        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_tsnote').fieldLabel+' : </font>'+Ext.getCmp('mf_tsnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+'; ';
		        							r.set('mf_tsnote',Ext.getCmp('mf_tsnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,''));
		        						}
//		        						if(changedStr==''){
//		        							alert('您没有修改任何数据');
//		        							return;
//		        						}else{
                                     */
		        							Ext.getCmp('changedStr').setValue(Ext.getCmp('mf_modify').title+' [ '+changedStr+']');
	        								Ext.getCmp('cg_A').getView().refresh();	        								
//		        						}
        							form.submit({
					                	url: 'save_mainform.jsp',
                                        method : 'POST',
                                        waitTitle : "提示",
                                        waitMsg : '正在提交数据，请稍后 ……',
                                        success : function(form, action) {
                                            Ext.Msg.alert('操作结果',action.result.msg);
                                            this.close();
                                        },
                                        failure : function(form, action) {
                                            Ext.Msg.alert('操作结果', action.result.msg);
                                            this.close();
                                        }
					                });
	        						Ext.getCmp('mf_modify').close();
        						}
			            	}
        			}        			      				
            	},{
    				text: '关闭窗口',
    				handler: function(){
    					Ext.getCmp('mf_modify').close();
    				}        				
            	}
            ]
        });
        
        this.callParent(arguments);
        
    }
});
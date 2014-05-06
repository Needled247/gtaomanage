Ext.define('My.mf_save', {
    extend: 'Ext.Window',
    
    constructor: function() {
		
        Ext.apply(this, {
        	id: 'mf_save',
            name: 'mf_save',
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
	            		id: 'mf_user',
	            		name: 'mf_user',
	                    width: 200,
						allowBlank: false,
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
		            				document.getElementById('mf_btn').click();
		            			}
		            		}
		            	}
	            	},{
	            		xtype:'textfield',
	            		id: 'mf_gluser',
	            		name: 'mf_gluser',
//	            		hidden: true,
	                    width: 200,
						fieldLabel: '关联账号',
						labelWidth: 60,
						maxLength: 20,
			            enforceMaxLength: true,
//			            regex: /[a-zA-Z]{2}\d+/,
//		            	regexText: '请输入正确的用户账号(以两位字母开头)',
		            	submitValue: false,
//		            	readOnly: true,
		            	value: ''
//		            	allowBlank: false,
//						blankText: '请输入关联账号'
	            	},'-',{
	            		xtype:'button',
        				text: '搜索用户信息',
        				id:'mf_btn',
        				icon: '../../image/find_user.png',
        				scale: 'medium',
        				handler: function(){
        					if(!Ext.getCmp('mf_user').isValid()){
        						alert('请输入用户账号');
        						return;
        					}
        					var bsn="";
        					if(Ext.getCmp('bs_name').isHidden()){
        						bsn=Ext.bs_did;
        					}
        					Ext.Ajax.request({
						    		url: 'getUserInfo.jsp',
						    		method: 'POST',
								    params: {
								        username : Ext.getCmp('mf_user').value,
								        gluser : Ext.getCmp('mf_gluser').value,
								        bs_name : bsn
								    },
								    success: function(response){
								        var result = Ext.decode(response.responseText);
										if(result.isExist=="1"){
											Ext.getCmp('mf_bs').setRawValue(result.bs_name);
											Ext.getCmp('mf_rname').setValue(result.realname);
											Ext.getCmp('mf_bandtype').setValue(result.bandtype);
											Ext.getCmp('mf_addr').setValue(result.addr);
											Ext.getCmp('mf_id').setValue(result.username);
											Ext.getCmp('mf_futime').setRawValue(result.starttime);
											Ext.getCmp('mf_opt').setRawValue(result.opt_time);
											Ext.getCmp('mf_retime').setRawValue(result.mf_retime);
											Ext.getCmp('mf_isit').setRawValue(result.isit);
											Ext.getCmp('mf_leaflet').setValue(result.leaflet_no);
											Ext.getCmp('mf_group').setValue(result.group_id);
											Ext.getCmp('mf_ht').setRawValue(result.house_type);
											Ext.getCmp('mf_lt').setRawValue(result.line_type);
											Ext.getCmp('mf_hetong').setRawValue(result.contract_name);
											Ext.getCmp('mf_gm').setRawValue(result.mf_gm);
			        						Ext.getCmp('mf_gg').setRawValue(Ext.data.StoreManager.lookup('gg_state').findRecord('id',result.mf_gg).get('name'));
											Ext.getCmp('mf_cxnote').setValue(result.mf_cxnote);
											Ext.getCmp('mf_hdnote').setValue(result.mf_hdnote);
											Ext.getCmp('mf_sbnote').setValue(result.mf_sbnote);
											Ext.getCmp('mf_zhnote').setValue(result.mf_zhnote);
											Ext.getCmp('mf_tsnote').setValue(result.mf_tsnote);
										}else if(result.isExist=="2"){
											alert("您搜索的用户账号已存在");
											Ext.getCmp('mf_form').getForm().reset();
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
		            items:[{
		               	xtype:'textfield',
		                fieldLabel: '用户姓名',
		                id: 'mf_rname',
		                name: 'mf_rname',
		                value: '',
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
		                value: '',
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
	    	                value: '',
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
						editable: false,
                        listeners:{
                            select:function(arg){
                                var isit = Ext.getCmp('mf_isit').getValue();
                                if(isit=='1'){
                                    Ext.getCmp('it_end').setDisabled(false);
                                }
                                else{
                                    Ext.getCmp('it_end').setDisabled(true);
                                }
                            }
                        }
	            	},{
                        xtype:'datefield',
                        fieldLabel: 'IT卡截止时间',
                        id: 'it_end',
                        name: 'it_end',
                        margin: '10 30 10 30',
                        labelWidth: 90,
                        width: 210,
                        value: '',
                        format: 'Y-m-d',
                        editable: false,
                        disabled:true
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
                        allowBlank: false,
                        blankText: '请选择是否关注微信',
                        editable: false
                    },{
                        xtype:'datefield',
                        fieldLabel: '乐视启用时间',
                        id: 'le_start',
                        name: 'le_start',
                        margin: '10 30 10 30',
                        labelWidth: 90,
                        width: 210,
                        value: '',
                        format: 'Y-m-d',
                        editable: true,
                        listeners:{
                            change:function(){
                                if(Ext.getCmp('le_start').getValue()!=''){
                                    Ext.getCmp('le_end').setDisabled(false);
                                    Ext.getCmp('le_mac').setDisabled(false);
                                }
                            }
                        }
                    },{
                        xtype:'datefield',
                        fieldLabel: '乐视到期时间',
                        id: 'le_end',
                        name: 'le_end',
                        margin: '10 30 10 30',
                        labelWidth: 90,
                        width: 210,
                        value: '',
                        format: 'Y-m-d',
                        editable: true,
                        disabled:true
                    },{
                        xtype:'textfield',
                        fieldLabel: '乐视MAC地址',
                        id: 'le_mac',
                        name: 'le_mac',
                        margin: '10 30 10 30',
                        labelWidth: 90,
                        width: 210,
                        value: '',
                        editable: true,
                        disabled:true
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
    					if(Ext.getCmp('mf_id').value==''){
    						alert('请先搜索用户信息');
    					}else{
    						if (form.isValid()) {
    							//var did=Ext.data.StoreManager.lookup('bs_name').findRecord('name',Ext.getCmp('mf_bs').getRawValue());        						
        						//Ext.getCmp('mf_bs').setValue(did.get('id'));
								Ext.getCmp('mf_bs').setValue(Ext.bs_did);
        						var isit=Ext.getCmp('mf_isit').getStore().findRecord('name',Ext.getCmp('mf_isit').getRawValue());        						
        						Ext.getCmp('mf_isit').setValue(isit.get('id'));        						
        						var mf_ht=Ext.getCmp('mf_ht').getStore().findRecord('name',Ext.getCmp('mf_ht').getRawValue());        						
        						Ext.getCmp('mf_ht').setValue(mf_ht.get('id'));        						
        						var mf_lt=Ext.getCmp('mf_lt').getStore().findRecord('name',Ext.getCmp('mf_lt').getRawValue());        						
        						Ext.getCmp('mf_lt').setValue(mf_lt.get('id'));        						
        						var gm=Ext.data.StoreManager.lookup('gm_type').findRecord('name',Ext.getCmp('mf_gm').getRawValue());        						
        						Ext.getCmp('mf_gm').setValue(gm.get('id'));        						
        						var gg=Ext.data.StoreManager.lookup('gg_state').findRecord('name',Ext.getCmp('mf_gg').getRawValue());        						
        						Ext.getCmp('mf_gg').setValue(gg.get('id'));						
        						var mf_hetong=Ext.data.StoreManager.lookup('hetong').findRecord('name',Ext.getCmp('mf_hetong').getRawValue(),0,false,true,true);
        						if(mf_hetong==null){
        							alert('您输入的合同名称不正确');
        						}else{
        							Ext.getCmp('mf_hetong').setValue(mf_hetong.get('id'));
        							var changedStr='';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_futime').fieldLabel+' : </font>'+Ext.getCmp('mf_futime').getRawValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_opt').fieldLabel+' : </font>'+Ext.getCmp('mf_opt').getRawValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_leaflet').fieldLabel+' : </font>'+Ext.getCmp('mf_leaflet').getValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_group').fieldLabel+' : </font>'+Ext.getCmp('mf_group').getValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_ht').fieldLabel+' : </font>'+Ext.getCmp('mf_ht').getRawValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_lt').fieldLabel+' : </font>'+Ext.getCmp('mf_lt').getRawValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_isit').fieldLabel+' : </font>'+Ext.getCmp('mf_isit').getRawValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_hetong').fieldLabel+' : </font>'+Ext.getCmp('mf_hetong').getRawValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_retime').fieldLabel+' : </font>'+Ext.getCmp('mf_retime').getRawValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_gm').fieldLabel+' : </font>'+Ext.getCmp('mf_gm').getRawValue()+'; ';
	        							changedStr=changedStr+'<font color="royalblue">餐型备注 : </font>'+Ext.getCmp('mf_real_quota').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+Ext.getCmp('mf_real_bandwidth').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_hdnote').fieldLabel+' : </font>'+Ext.getCmp('mf_hdnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_sbnote').fieldLabel+' : </font>'+Ext.getCmp('mf_sbnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_zhnote').fieldLabel+' : </font>'+Ext.getCmp('mf_zhnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+'; ';
	        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('mf_tsnote').fieldLabel+' : </font>'+Ext.getCmp('mf_tsnote').getValue().replace(/\r|\n/g,' ').replace(/'/g,'')+'; ';
	        							Ext.getCmp('changedStr').setValue(Ext.getCmp('mf_save').title+' [ '+changedStr+']');        								
        							form.submit({
					                	url: 'save_mainform.jsp'	,
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
        							Ext.getCmp('un').setValue(Ext.getCmp('mf_id').value);
	        						Ext.getCmp('mf_save').close();	        						
        						}
			            	}
    					}
        			}        			      				
            	},{
    				text: '关闭窗口',
    				handler: function(){
    					Ext.getCmp('mf_save').close();
    				}        				
            	}
            ]
        });
        
        this.callParent(arguments);
        
    }
});
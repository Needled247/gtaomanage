Ext.define('My.qc_north', {
    extend: 'Ext.panel.Panel',
    
    constructor: function() {
        Ext.apply(this, {
            region:'north',
			id:'qc_north',
			name:'qc_north',
            title: '<font color="red">*</font>用户收费查询条件<font color="red">*</font>',
            margin: '10 10 6 10',
            frame:true,
            height: 150,
            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 3
		            },
		            items:[{
            		xtype:'datefield',
	                fieldLabel: '起始日期',
	                id: 'startDate',
	                name: 'startDate',
	                margin: '5 0 10 30',
	              	value: '',
	              	format: 'Y-m-d',
	              	maxValue: new Date(),
	                labelWidth: 60,
	                width: 190,
//					allowBlank: false,
//					blankText: '请输入起始日期',
					editable: false,
					listeners: {
                    	change: function(obj){
                    		Ext.getCmp('endDate').setMinValue(obj.getRawValue());
                    	}
                    }
            	},{
            		xtype:'datefield',
	                fieldLabel: '截止日期',
	                id: 'endDate',
	                name: 'endDate',
	                margin: '5 0 10 30',
	              	value: Ext.Date.format(new Date(), 'Y-m-d'),
	              	format: 'Y-m-d',
	              	maxValue: new Date(),
	                labelWidth: 60,
	                width: 190,	                
					allowBlank: false,
					blankText: '请输入截止日期',
					editable: false,
					listeners: {
                    	change: function(obj){
                    		Ext.getCmp('startDate').setMaxValue(obj.getRawValue());
                    	}
                    }
            	},{
		            		xtype:'textfield',
		            		id: 'save_admin',
		            		name: 'save_admin',
		                    fieldLabel: '录入人员',
		                    margin: '5 0 10 30',
		                    labelWidth: 60,
					      	width: 190,
					      	value:'',
							maxLength: 10,
				            enforceMaxLength: true,
			            	listeners:{
			            		specialkey:function(f,e){
			            			if (e.getKey() == e.ENTER) {
			            				document.getElementById('qbtn').click();
			            			}
			            		}
			            	}
	            },{
	            	xtype:'textfield',
	                fieldLabel: '用户账号',
	                id: 'username',
	                name: 'username',
	                margin: '5 0 10 30',
	              	value: '',
	                labelWidth: 60,
	                width: 190,
	                enforceMaxLength: true,
	                maxLength: 30,
	                listeners:{
			            	specialkey:function(f,e){
			            	if (e.getKey() == e.ENTER) {
			            		document.getElementById('qbtn').click();
			            	}
			            }
			        }
            	},{
	            	xtype:'textfield',
	                fieldLabel: '用户姓名',
	                id: 'realname',
	                name: 'realname',
	                margin: '5 0 10 30',
	              	value: '',
	                labelWidth: 60,
	                width: 190,
	                enforceMaxLength: true,
	                maxLength: 30,
	                listeners:{
			            	specialkey:function(f,e){
			            	if (e.getKey() == e.ENTER) {
			            		document.getElementById('qbtn').click();
			            	}
			            }
			        }
            	},{
	            	xtype:'textfield',
	                fieldLabel: '用户住址',
	                id: 'addr',
	                name: 'addr',
	                margin: '5 0 10 30',
	              	value: '',
	                labelWidth: 60,
	                width: 190,
	                enforceMaxLength: true,
	                maxLength: 30,
	                listeners:{
			            	specialkey:function(f,e){
			            	if (e.getKey() == e.ENTER) {
			            		document.getElementById('qbtn').click();
			            	}
			            }
			        }
            	},{
		            id: 'pay_type',
			        name: 'pay_type',
			        xtype:'combobox',
			        margin: '5 0 10 30',
			        fieldLabel:'支付方式',
			        store: Ext.data.StoreManager.lookup('pay_type'),
			        labelWidth: 60,
					width: 190,
					valueField:'id',
			      	displayField:'name',
					value:'',
					minChars:1,
					queryMode:'local',
					editable: false					
		        },{
		            id: 'charge_type1',
			        name: 'charge_type1',
			        xtype:'combobox',
			        margin: '5 0 10 30',
			        fieldLabel:'收费类1',
			        store: Ext.data.StoreManager.lookup('charge_type1'),
			        labelWidth: 60,
					width: 190,
					valueField:'id',
			      	displayField:'name',
					value:'',
					minChars:1,
					queryMode:'local',
					editable: false,
                    listeners:{
                        select:function(){
                            var cid = Ext.getCmp('charge_type1').getValue();
                            Ext.getCmp('charge_type2').clearValue();
                            Ext.getCmp('charge_type3').clearValue();
                            Ext.getCmp('charge_type4').clearValue();
                            Ext.getCmp('charge_type2').store.proxy.url = 'get_charge_type_son.jsp?cid='+cid+'&level=2';
                            Ext.getCmp('charge_type2').store.load();
                        }
                    }
		        },{
                        id: 'charge_type2',
                        name: 'charge_type2',
                        xtype:'combobox',
                        margin: '5 0 10 30',
                        fieldLabel:'收费类2',
                        store: Ext.data.StoreManager.lookup('charge_type2'),
                        labelWidth: 60,
                        width: 190,
                        valueField:'id',
                        displayField:'name',
                        value:'',
                        minChars:1,
                        queryMode:'local',
                        editable: false,
                        listeners:{
                            select:function(){
                                var cid = Ext.getCmp('charge_type2').getValue();
                                Ext.getCmp('charge_type3').clearValue();
                                Ext.getCmp('charge_type4').clearValue();
                                Ext.getCmp('charge_type3').store.proxy.url = 'get_charge_type_son.jsp?cid='+cid+'&level=3';
                                Ext.getCmp('charge_type3').store.load();
                            }
                        }
                    },{
                        id: 'charge_type3',
                        name: 'charge_type3',
                        xtype:'combobox',
                        margin: '5 0 10 30',
                        fieldLabel:'收费类3',
                        store: Ext.data.StoreManager.lookup('charge_type3'),
                        labelWidth: 60,
                        width: 190,
                        valueField:'id',
                        displayField:'name',
                        value:'',
                        minChars:1,
                        queryMode:'local',
                        editable: false,
                        listeners:{
                            select:function(){
                                var cid = Ext.getCmp('charge_type3').getValue();
                                Ext.getCmp('charge_type4').clearValue();
                                Ext.getCmp('charge_type4').store.proxy.url = 'get_charge_type_son.jsp?cid='+cid+'&level=4';
                                Ext.getCmp('charge_type4').store.load();
                            }
                        }
                    },{
                        id: 'charge_type4',
                        name: 'charge_type4',
                        xtype:'combobox',
                        margin: '5 0 10 30',
                        fieldLabel:'收费类4',
                        store: Ext.data.StoreManager.lookup('charge_type4'),
                        labelWidth: 60,
                        width: 190,
                        valueField:'id',
                        displayField:'name',
                        value:'',
                        minChars:1,
                        queryMode:'local',
                        editable: false
                    },{
            		xtype:'textfield',
            		id: 'tel',
            		name: 'tel',
                    fieldLabel: '联系电话',
                    margin: '5 0 10 30',
                    labelWidth: 60,
			      	width: 190,
			      	value:'',
					maxLength: 11,
		            enforceMaxLength: true,
//		            regex: /^\d{1,11}$/,
//		            regexText: '请输入数字',
	            	listeners:{
	            		specialkey:function(f,e){
	            			if(this.isValid()){
		            			if (e.getKey() == e.ENTER) {
		            				document.getElementById('qbtn').click();
		            			}
	            			}
	            		}
	            	}
        		},{
		            id: 'act_id',
			        name: 'act_id',
			        xtype:'combobox',
			        margin: '5 0 10 30',
			        fieldLabel:'活动名称',
			        store: Ext.data.StoreManager.lookup('huodong'),
			        labelWidth: 60,
			        colspan: 2,
					width: 410,
					valueField:'id',
			      	displayField:'name',
					value:'',
					minChars:1,
					queryMode:'local',
					editable: false,
					listeners:{
						select : function(c,rec){
							Ext.getCmp('actsub_id').setValue('');
							Ext.data.StoreManager.lookup('huodong_sub').filterBy(function(record,id){
									var text = record.get('huodong_id');
									return (text==rec[0].get('id'));
							});							
						}
	            	}
		        },{
	            	xtype:'textfield',
	                fieldLabel: '收据号码',
	                id: 'receipt_id',
	                name: 'receipt_id',
	                margin: '5 0 10 30',
	              	value: '',
	                labelWidth: 60,
	                width: 190,
	                enforceMaxLength: true,
	                maxLength: 20,
	                listeners:{
			            	specialkey:function(f,e){
			            	if (e.getKey() == e.ENTER) {
			            		document.getElementById('qbtn').click();
			            	}
			            }
			        }
            	},{
		            id: 'actsub_id',
			        name: 'actsub_id',
			        xtype:'combobox',
			        margin: '5 0 10 30',
			        fieldLabel:'套餐名称',
			        store: Ext.data.StoreManager.lookup('huodong_sub'),
			        labelWidth: 60,
			        colspan: 2,
					width: 410,
					valueField:'id',
			      	displayField:'name',
					value:'',
					minChars:1,
					queryMode:'local',
					editable: false
		        },{
	            	xtype:'textfield',
	                fieldLabel: '备注信息',
	                id: 'note',
	                name: 'note',
	                margin: '5 0 10 30',
	                labelWidth: 60,
					enforceMaxLength: true,
	                maxLength: 30,
	                width: 190,
	                value:'',
	                listeners:{
			            	specialkey:function(f,e){
			            	if (e.getKey() == e.ENTER) {
			            		document.getElementById('qbtn').click();
			            	}
			            }
			        }
                 }
            ],

            tbar: Ext.create('Ext.toolbar.Toolbar',{
                id:'qc_tb',
                name:'qc_tb',
                border: false,
                margin: '0 0 10 0',
//            	height: 40,
                items: [
                    '-',
                    {
                        id: 'addmf',
                        text: '添加修改',
                        icon: '../../image/addmf.png',
                        scale: 'medium',
                        hidden:true,
                        menu: [
                            {
                                text: '修改收费信息',
                                icon: '../../image/modify.png',
                                scale: 'small',
                                handler: function(){
                                    var sm=Ext.getCmp('qc_grid').getSelectionModel();
                                    if(sm.hasSelection()){
                                        var r=sm.getLastSelected();
                                        var cur_year=Ext.Date.format(new Date(),'Y');
                                        var cur_month=Ext.Date.format(new Date(),'m');
                                        var charge_date=r.get('charge_date').split('-');
                                        if(cur_year==charge_date[0]){
                                            if(cur_month==charge_date[1]){
                                                Ext.create('My.fc_save');
                                                Ext.getCmp('fc_save').setTitle('修改收费信息');
                                                Ext.getCmp('fc_rname').setRawValue(r.get('realname'));
                                                Ext.getCmp('fc_bs').setRawValue(r.get('bs_name'));
                                                Ext.getCmp('fc_user').setValue(r.get('username'));
                                                Ext.getCmp('fc_id').setValue(r.get('charge_id'));
                                                Ext.getCmp('fc_rid').setValue(r.get('receipt_id'));
                                                Ext.getCmp('fc_amount').setValue(r.get('charge_amount'));
                                                Ext.getCmp('fc_isnew').setRawValue(r.get('is_new'));
                                                Ext.getCmp('fc_act').setRawValue(r.get('fc_act'));
                                                Ext.getCmp('fc_actsub').setRawValue(r.get('fc_actsub'));
                                                Ext.data.StoreManager.lookup('huodong_sub').filterBy(function(record,id){
                                                    var text = record.get('huodong_id');
                                                    return (text==Ext.data.StoreManager.lookup('huodong').findRecord('name',r.get('fc_act')).get('id'));
                                                });
                                                Ext.getCmp('fc_pt').setValue(r.get('pay_type'));
                                                Ext.getCmp('fc_ct').setValue(r.get('charge_type'));
                                                Ext.getCmp('fc_note').setValue(r.get('note'));
                                            }else{
                                                alert('很抱歉，您只能修改当月收费信息');
                                            }
                                        }else{
                                            alert('很抱歉，您只能修改当月收费信息');
                                        }
                                    }else{
                                        alert('请先选择一行记录');
                                    }
                                }
                            }]
                    },{
                        id: 'bs_name',
                        name: 'bs_name',
                        xtype:'combobox',
                        hidden:true,
                        emptyText:'请选择营业厅',
                        store: Ext.data.StoreManager.lookup('bs_name'),
                        width: 110,
                        valueField:'id',
                        displayField:'name',
                        value:'',
                        //allowBlank: false,
                        //blankText: '请选择营业厅',
                        editable: false,
                        queryMode:'local'
                    },
                    {
                        xtype:'button',
                        text: '查询信息',
                        id:'qbtn',
                        icon: '../../image/find_user1.png',
                        scale: 'medium',
                        handler: function(){

                            if(!Ext.getCmp('startDate').isValid()){
                                return;
                            }

                            if(!Ext.getCmp('endDate').isValid()){
                                return;
                            }

                            if(Ext.getCmp('charge_type').getValue()!=''){
                                if(Ext.getCmp('charge_type').getValue()==Ext.getCmp('charge_type').getRawValue()){
                                    return;
                                }
                            }
                            var params = Ext.getCmp('qc_grid').getStore().getProxy().extraParams;
                            params['qc_bs_name']=Ext.getCmp('bs_name').getValue();
                            params['startDate']=Ext.getCmp('startDate').getRawValue();
                            params['endDate']=Ext.getCmp('endDate').getRawValue();
                            params['receipt_id']=Ext.getCmp('receipt_id').getValue();
                            params['username']=Ext.getCmp('username').getValue();
                            params['pay_type']=Ext.getCmp('pay_type').getValue();
                            params['charge_type']=Ext.getCmp('charge_type').getValue();
                            params['act_id']=Ext.getCmp('act_id').getValue();
                            params['actsub_id']=Ext.getCmp('actsub_id').getValue();
                            params['note']=Ext.getCmp('note').getValue();
                            params['realname']=Ext.getCmp('realname').getValue();
                            params['addr']=Ext.getCmp('addr').getValue();
                            params['save_admin']=Ext.getCmp('save_admin').getValue();
                            params['tel']=Ext.getCmp('tel').getValue();

                            Ext.getCmp('qc_grid').getStore().loadPage(1);
                        }
                    },
                    {
                        xtype:'button',
                        id: 'reset_btn',
                        name: 'reset_btn',
                        text: '重置查询',
                        icon: '../../image/reset_btn.png',
                        scale: 'medium',
                        handler: function(){
                            if(!Ext.getCmp('bs_name').isHidden()){
                                Ext.getCmp('bs_name').reset();
                            }
                            Ext.getCmp('startDate').reset();
                            Ext.getCmp('endDate').reset();
                            Ext.getCmp('receipt_id').reset();
                            Ext.getCmp('username').reset();
                            Ext.getCmp('pay_type').reset();
                            Ext.getCmp('charge_type').reset();
                            Ext.getCmp('act_id').reset();
                            Ext.getCmp('actsub_id').reset();
                            Ext.getCmp('note').reset();
                            Ext.getCmp('realname').reset();
                            Ext.getCmp('addr').reset();
                            Ext.getCmp('save_admin').reset();
                            Ext.getCmp('tel').reset();
                            Ext.data.StoreManager.lookup('huodong_sub').filterBy(function(record,id){
                                var text = record.get('id');
                                return text;
                            });
                        }
                    },
                    {
                        xtype:'button',
                        id: 'ex_fn',
                        name: 'ex_fn',
                        text: '导出Excel',
                        icon: '../../image/excel_btn.png',
                        scale: 'medium',
                        hidden: true,
                        handler: function(){
                            if(Ext.getCmp('qc_grid').getStore().getCount()==0){
                                return;
                            }
                            var params = Ext.getCmp('qc_grid').getStore().getProxy().extraParams;
                            var reqStr='';
                            reqStr+='qc_bs_name='+params['qc_bs_name'];
                            reqStr+='&startDate='+params['startDate'];
                            reqStr+='&endDate='+params['endDate'];
                            reqStr+='&receipt_id='+encodeURI(encodeURI(params['receipt_id']));
                            reqStr+='&username='+params['username'];
                            reqStr+='&pay_type='+params['pay_type'];
                            if(params['charge_type']==null){
                                reqStr+='&charge_type=';
                            }else{
                                reqStr+='&charge_type='+params['charge_type'];
                            }
                            reqStr+='&act_id='+params['act_id'];
                            reqStr+='&actsub_id='+params['actsub_id'];
                            reqStr+='&note='+encodeURI(encodeURI(params['note']));
                            reqStr+='&realname='+encodeURI(encodeURI(params['realname']));
                            reqStr+='&addr='+encodeURI(encodeURI(params['addr']));
                            reqStr+='&save_admin='+encodeURI(encodeURI(params['save_admin']));
                            reqStr+='&tel='+encodeURI(encodeURI(params['tel']));
//	        			window.location.href="get_qc_excel.jsp?"+reqStr;
                            window.open("get_qc_excel.jsp?"+reqStr);
                        }
                    },
                    {
                        id: 'admin_fn',
                        text: '管理员功能',
                        icon: '../../image/admin_fn.png',
                        scale: 'medium',
                        hidden:true,
                        menu: [
                            {
                                text: '删除收费信息',
                                icon: '../../image/delete.png',
                                scale: 'small',
                                handler: function(){
                                    var sm=Ext.getCmp('qc_grid').getSelectionModel();
                                    if(sm.hasSelection()){
                                        var r=sm.getLastSelected();
                                        var cur_date=Ext.Date.format(new Date(),'Y-m-d');
                                        var charge_date=r.get('charge_date');
                                        if(cur_date==charge_date){
                                            if(confirm("您确定要删除此条收费信息吗?")){
                                                Ext.Ajax.request({
                                                    url: 'charge_del.jsp',
                                                    method: 'POST',
                                                    params: {
                                                        charge_id : r.get('charge_id'),
                                                        list_name : Ext.getCmp('yh_qc').text
                                                    }
                                                });
                                                Ext.data.StoreManager.lookup('qc_grid_store').remove(r);
                                            }
                                        }else{
                                            alert('很抱歉，您只能删除当日收费信息');
                                        }

//    							var cur_year=Ext.Date.format(new Date(),'Y');
//    							var cur_month=Ext.Date.format(new Date(),'m');
//    							var charge_date=r.get('charge_date').split('-');
//    							if(cur_year==charge_date[0]){
//    								if(cur_month==charge_date[1]){
//    									if(confirm("您确定要删除此条收费信息吗?")){
//		    	        					Ext.Ajax.request({
//		    							    		url: 'charge_del.jsp',
//		    							    		method: 'POST',
//		    									    params: {
//		    									        charge_id : r.get('charge_id'),
//		    									        list_name : Ext.getCmp('yh_qc').text
//		    									    }
//		    								});
//		    	        					Ext.data.StoreManager.lookup('qc_grid_store').remove(r);
//    									}
//    								}else{
//        								alert('很抱歉，您只能删除当月收费信息');
//        							}
//            					}else{
//            						alert('很抱歉，您只能删除当月收费信息');
//            					}
                                    }else{
                                        alert('请先选择一行记录');
                                    }
                                }
                            },{
                                text: '查看操作记录',
                                icon: '../../image/log.png',
                                scale: 'small',
                                handler: function(){
                                    var sm=Ext.getCmp('qc_grid').getSelectionModel();
                                    if(sm.hasSelection()){
                                        Ext.create('My.log_window');
                                        var r=sm.getLastSelected();
                                        var params=Ext.data.StoreManager.lookup('log_grid_store').getProxy().extraParams;
                                        params['username']=r.get('charge_id');
                                        params['list_name']=Ext.getCmp('yh_qc').text;
                                        Ext.data.StoreManager.lookup('log_grid_store').loadPage(1);
                                    }else{
                                        alert('请先选择一行记录');
                                    }
                                }
                            }]
                    }
                ]})
        });

        this.callParent(arguments);
        
    }
});
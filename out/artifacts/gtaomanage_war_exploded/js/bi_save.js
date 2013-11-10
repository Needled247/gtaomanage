Ext.define('My.bi_save', {
    extend: 'Ext.Window',
    
    constructor: function() {
		
        Ext.apply(this, {
        	id: 'bi_save',
            name: 'bi_save',
            title: '信息窗口',
        	layout:'fit',
        	modal:true,
        	resizable:false,
        	autoShow:true,
//        	draggable:false,
        items: [{
        	xtype: 'form',
//            margin: '5 0 5 0',
        	id:'bi_form',
        	name:'bi_form',
            layout:'fit',
            bodyStyle:'background-color:transparent',
        items: [{
            xtype: 'fieldset',
            title: '<font color="red">*</font>楼宇覆盖信息<font color="red">*</font>',
            margin: '10 10 10 10',
//            collapsible: true,
            autoScroll: true,
		            layout: {
		            	type: 'table',
		            	columns: 2
		            },
		            items:[{
		            	xtype:'textfield',
		                fieldLabel: '合同名称',
		                id: 'bi_hetong_txt',
		                name: 'bi_hetong_txt',
		                margin: '10 30 10 30',
		                colspan:2,
		//              	value: 1,
		                labelWidth: 90,
		                width: 660,
						allowBlank: false,
						blankText: '请输入合同名称',
						enforceMaxLength: true,
		                maxLength: 180,
		                regex: /(?!.*')^.*$/,
			            regexText: '字符串中不能包含单引号'
	            	},{
			            id: 'bi_bs_name',
				        name: 'bi_bs_name',
				        xtype:'combobox',
				        margin: '10 30 10 30',
				        fieldLabel:'所属营业厅',
				        store: Ext.data.StoreManager.lookup('bs_name'),
				        labelWidth: 90,
						width: 300,
						valueField:'id',
				      	displayField:'name',
				      	queryMode:'local',
						editable: false,
						allowBlank: false,
						blankText: '请选择营业厅'
			        },{
		               	xtype:'numberfield',
		                fieldLabel: '虚拟编号',
		                id: 'bi_big_id',
		                name: 'bi_big_id',
		                margin: '10 30 10 30',
		//              	value: 1,
		                labelWidth: 90,
		                width: 300,
		        		maxValue: 100000,
		        		minValue: 1,
						allowBlank: false,
						blankText: '请输入虚拟编号'
	            	},{
		                id: 'bi_ht_type',
		                name: 'bi_ht_type',
		                margin: '10 30 10 30',
		                xtype:'combobox',
		                fieldLabel: '合同类型',
		                labelWidth: 90,
		                store:new Ext.data.SimpleStore(
				      	{
				       		fields:['id','name'],
				       		data:[['1','社区合同'],['2','写字楼合同'],['3','无合同']]
				      	}),
				      	queryMode:'local',
				      	width: 300,
				      	valueField:'id',
		      			displayField:'name',
						allowBlank: false,
						blankText: '请选择合同类型',
						editable: false
	            	},{
		            	xtype:'datefield',
		                fieldLabel: '签约日期',
		                id: 'bi_qydate',
		                name: 'bi_qydate',
		                margin: '10 30 10 30',
		//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
		                value: '',
		              	format: 'Y-m-d',
		                labelWidth: 90,
		                width: 300,
//						allowBlank: false,
//						blankText: '请选择签约日期',
						editable: true
	            	},{
		            	xtype:'datefield',
		                fieldLabel: '小区开通时间',
		                id: 'bi_xqtime',
		                name: 'bi_xqtime',
		                margin: '10 30 10 30',
		//              	value: Ext.Date.format(new Date(), 'Y-m-d'),
		                value: '',
		              	format: 'Y-m-d',
		                labelWidth: 90,
		                width: 300,
//						allowBlank: false,
//						blankText: '请选择小区开通时间',
						editable: true
	            	},{
		            	xtype:'datefield',
		                fieldLabel: '光改开通时间',
		                id: 'bi_ggtime',
		                name: 'bi_ggtime',
		                margin: '10 30 10 30',
		                value: '',
		                labelWidth: 90,
		                width: 300,
		                format: 'Y-m-d',
//						allowBlank: false,
//						blankText: '请选择光改开通时间',
						editable: true
	            	},{
		                id: 'bi_isgg',
		                name: 'bi_isgg',
		                margin: '10 30 10 30',
		                xtype:'combobox',
		                fieldLabel: '是否已光改',
		                labelWidth: 90,
		                store:new Ext.data.SimpleStore(
				      	{
				       		fields:['id','name'],
				       		data:[['1','是'],['0','否']]
				      	}),
				      	queryMode:'local',
				      	width: 300,
				      	valueField:'id',
		      			displayField:'name',
						allowBlank: false,
						blankText: '请选择是否已光改',
						editable: false
	            	},{
	            		id: 'bi_isxk',
		                name: 'bi_isxk',
		                margin: '10 30 10 30',
		                xtype:'combobox',
		                fieldLabel: '是否新开小区',
		                labelWidth: 90,
		                store:new Ext.data.SimpleStore(
				      	{
				       		fields:['id','name'],
				       		data:[['1','是'],['0','否']]
				      	}),
				      	queryMode:'local',
				      	width: 300,
				      	valueField:'id',
		      			displayField:'name',
						allowBlank: false,
						blankText: '请选择是否新开小区',
						editable: false
	            	},{
		               	xtype:'numberfield',
		                fieldLabel: '住户数',
		                id: 'bi_live_num',
		                name: 'bi_live_num',
		                margin: '10 30 10 30',
		//              	value: 1,
		                labelWidth: 90,
		                width: 300,
		        		maxValue: 1000000,
		        		minValue: 0,
						allowBlank: false,
						blankText: '请输入住户数'
	            	},{
		               	xtype:'numberfield',
		                fieldLabel: '光改住户数',
		                id: 'bi_gglive_num',
		                name: 'bi_gglive_num',
		                margin: '10 30 10 30',
		//              	value: 1,
		                labelWidth: 90,
		                width: 300,
		        		maxValue: 1000000,
		        		minValue: 0,
						allowBlank: false,
						blankText: '请输入光改住户数'
	            	},{
		                id: 'bi_isjz',
		                name: 'bi_isjz',
		                margin: '10 30 10 30',
		                xtype:'combobox',
		                fieldLabel: '是否有竞争',
		                labelWidth: 90,
		                store:new Ext.data.SimpleStore(
				      	{
				       		fields:['id','name'],
				       		data:[['1','是'],['0','否']]
				      	}),
				      	queryMode:'local',
				      	width: 300,
				      	valueField:'id',
		      			displayField:'name',
						allowBlank: false,
						blankText: '请选择是否有竞争',
						editable: false
	            	},{
		            	xtype:'textfield',
		                fieldLabel: '竞争宽带',
		                id: 'bi_jzbrand',
		                name: 'bi_jzbrand',
		                margin: '10 30 10 30',
		              	value: '',
		                labelWidth: 90,
//						allowBlank: false,
//						blankText: '请输入竞争宽带',
		                width: 300,
		                enforceMaxLength: true,
		                maxLength: 50,
		                regex: /(?!.*')^.*$/,
			            regexText: '字符串中不能包含单引号'
	            	},{
				        xtype: 'hiddenfield',
				        id: 'bi_id',
				        name: 'bi_id',
				        value: ''
				    },{
				        xtype: 'hiddenfield',
				        id: 'list_name',
				        name: 'list_name',
				        value: '楼宇覆盖信息'
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
    					var form = Ext.getCmp('bi_form').getForm();
        				if (form.isValid()) {
        					var did=Ext.data.StoreManager.lookup('bs_name').findRecord('name',Ext.getCmp('bi_bs_name').getRawValue());        						
    						Ext.getCmp('bi_bs_name').setValue(did.get('id'));
    						var ht_type=Ext.getCmp('bi_ht_type').getStore().findRecord('name',Ext.getCmp('bi_ht_type').getRawValue());        						
    						Ext.getCmp('bi_ht_type').setValue(ht_type.get('id'));
    						var isgg=Ext.getCmp('bi_isgg').getStore().findRecord('name',Ext.getCmp('bi_isgg').getRawValue());        						
    						Ext.getCmp('bi_isgg').setValue(isgg.get('id'));
    						var isxk=Ext.getCmp('bi_isxk').getStore().findRecord('name',Ext.getCmp('bi_isxk').getRawValue());        						
    						Ext.getCmp('bi_isxk').setValue(isxk.get('id'));
    						var isjz=Ext.getCmp('bi_isjz').getStore().findRecord('name',Ext.getCmp('bi_isjz').getRawValue());        						
    						Ext.getCmp('bi_isjz').setValue(isjz.get('id'));
    						var changedStr='';
    						if(Ext.getCmp('bi_id').getValue()==''){
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_hetong_txt').fieldLabel+' : </font>'+Ext.getCmp('bi_hetong_txt').getValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_bs_name').fieldLabel+' : </font>'+Ext.getCmp('bi_bs_name').getRawValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_big_id').fieldLabel+' : </font>'+Ext.getCmp('bi_big_id').getValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_ht_type').fieldLabel+' : </font>'+Ext.getCmp('bi_ht_type').getRawValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_qydate').fieldLabel+' : </font>'+Ext.getCmp('bi_qydate').getRawValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_xqtime').fieldLabel+' : </font>'+Ext.getCmp('bi_xqtime').getRawValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_ggtime').fieldLabel+' : </font>'+Ext.getCmp('bi_ggtime').getRawValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_isgg').fieldLabel+' : </font>'+Ext.getCmp('bi_isgg').getRawValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_isxk').fieldLabel+' : </font>'+Ext.getCmp('bi_isxk').getRawValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_live_num').fieldLabel+' : </font>'+Ext.getCmp('bi_live_num').getValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_gglive_num').fieldLabel+' : </font>'+Ext.getCmp('bi_gglive_num').getValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_isjz').fieldLabel+' : </font>'+Ext.getCmp('bi_isjz').getRawValue()+'; ';
    							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_jzbrand').fieldLabel+' : </font>'+Ext.getCmp('bi_jzbrand').getValue()+'; ';
    							Ext.getCmp('changedStr').setValue(Ext.getCmp('bi_save').title+' [ '+changedStr+']');
    						}else{
        						var r=Ext.getCmp('qb_grid').getSelectionModel().getLastSelected();
        						if(Ext.getCmp('bi_hetong_txt').getValue()!=r.get('contract_name')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_hetong_txt').fieldLabel+' : </font>'+Ext.getCmp('bi_hetong_txt').getValue()+'; ';
        							r.set('contract_name',Ext.getCmp('bi_hetong_txt').getValue());
        						}
        						if(Ext.getCmp('bi_bs_name').getRawValue()!=r.get('hall_id')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_bs_name').fieldLabel+' : </font>'+Ext.getCmp('bi_bs_name').getRawValue()+'; ';
        							r.set('hall_id',Ext.getCmp('bi_bs_name').getRawValue());
        						}
        						if(Ext.getCmp('bi_big_id').getValue()!=r.get('big_id')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_big_id').fieldLabel+' : </font>'+Ext.getCmp('bi_big_id').getValue()+'; ';
        							r.set('big_id',Ext.getCmp('bi_big_id').getValue());
        						}
        						if(Ext.getCmp('bi_ht_type').getRawValue()!=r.get('contract_type')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_ht_type').fieldLabel+' : </font>'+Ext.getCmp('bi_ht_type').getRawValue()+'; ';
        							r.set('contract_type',Ext.getCmp('bi_ht_type').getRawValue());
        						}
        						if(Ext.getCmp('bi_qydate').getRawValue()!=r.get('sign_date')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_qydate').fieldLabel+' : </font>'+Ext.getCmp('bi_qydate').getRawValue()+'; ';		        							
        							r.set('sign_date',Ext.getCmp('bi_qydate').getRawValue());
        						}
        						if(Ext.getCmp('bi_xqtime').getRawValue()!=r.get('xq_open_date')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_xqtime').fieldLabel+' : </font>'+Ext.getCmp('bi_xqtime').getRawValue()+'; ';
        							r.set('xq_open_date',Ext.getCmp('bi_xqtime').getRawValue());        							
        						}
        						if(Ext.getCmp('bi_ggtime').getRawValue()!=r.get('gg_open_date')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_ggtime').fieldLabel+' : </font>'+Ext.getCmp('bi_ggtime').getRawValue()+'; ';
        							r.set('gg_open_date',Ext.getCmp('bi_ggtime').getRawValue());
        						}
        						if(Ext.getCmp('bi_isgg').getRawValue()!=r.get('is_gg')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_isgg').fieldLabel+' : </font>'+Ext.getCmp('bi_isgg').getRawValue()+'; ';
        							r.set('is_gg',Ext.getCmp('bi_isgg').getRawValue());
        						}		        						
        						if(Ext.getCmp('bi_isxk').getRawValue()!=r.get('is_xk')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_isxk').fieldLabel+' : </font>'+Ext.getCmp('bi_isxk').getRawValue()+'; ';
        							r.set('is_xk',Ext.getCmp('bi_isxk').getRawValue());
        						}
        						if(Ext.getCmp('bi_live_num').getValue()!=r.get('live_num')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_live_num').fieldLabel+' : </font>'+Ext.getCmp('bi_live_num').getValue()+'; ';
        							r.set('live_num',Ext.getCmp('bi_live_num').getValue());
        						}
        						if(Ext.getCmp('bi_gglive_num').getValue()!=r.get('gg_live_num')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_gglive_num').fieldLabel+' : </font>'+Ext.getCmp('bi_gglive_num').getValue()+'; ';
        							r.set('gg_live_num',Ext.getCmp('bi_gglive_num').getValue());
        						}
        						if(Ext.getCmp('bi_isjz').getRawValue()!=r.get('is_jz')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_isjz').fieldLabel+' : </font>'+Ext.getCmp('bi_isjz').getRawValue()+'; ';
        							r.set('is_jz',Ext.getCmp('bi_isjz').getRawValue());
        						}
        						if(Ext.getCmp('bi_jzbrand').getValue()!=r.get('jz_brand')){
        							changedStr=changedStr+'<font color="royalblue">'+Ext.getCmp('bi_jzbrand').fieldLabel+' : </font>'+Ext.getCmp('bi_jzbrand').getValue()+'; ';
        							r.set('jz_brand',Ext.getCmp('bi_jzbrand').getValue());
        						}
//        						if(changedStr==''){
//        							alert('您没有修改任何数据');
//        							return;
//        						}else{
        							Ext.getCmp('changedStr').setValue(Ext.getCmp('bi_save').title+' [ '+changedStr+']');
    								Ext.getCmp('qb_grid').getView().refresh();	        								
//        						}
	        				}
        						form.submit({
				                	url: 'save_buildinfo.jsp',
				                	success: function(f, action) {
				                		Ext.data.StoreManager.lookup('hetong').reload();
				                	}
				                });
        						Ext.getCmp('bi_save').close();
			            	}
        				}        			      				
            	},{
    				text: '关闭窗口',
    				handler: function(){
    					Ext.getCmp('bi_save').close();
    				}        				
            	}
            ]
        });
        
        this.callParent(arguments);
        
    }
});
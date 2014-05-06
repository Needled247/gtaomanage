Ext.define('My.mfA_north', {
    extend: 'Ext.form.FieldSet',
    
    constructor: function() {
    	
        Ext.apply(this, {
            region:'north',
			id:'mfA_north',
			name:'mfA_north',
            title: '<font color="red">*</font>查询条件<font color="red">*</font>',
            margin: '10 10 5 10',
            collapsible: true,
            autoScroll: true,
		            items:[{
                        xtype:'fieldset',
                        collapsible: true,
                        autoHeight:true,
                        title:'基本条件',
                        layout: {
                            type: 'table',
                            columns: 4
                        },
                        items:[{
                            xtype:'textfield',
                            id: 'un',
                            name: 'un',
                            fieldLabel: '用户账号',
                            margin: '5 0 10 30',
                            labelWidth: 60,
                            width: 200,
                            value:'',
                            maxLength: 20,
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
                            id: 'rname',
                            name: 'rname',
                            fieldLabel: '用户姓名',
                            margin: '5 0 10 30',
                            labelWidth: 60,
                            width: 200,
                            value:'',
                            maxLength: 20,
                            enforceMaxLength: true,
                            listeners:{
                                specialkey:function(f,e){
                                    if (e.getKey() == e.ENTER) {
                                        document.getElementById('qbtn').click();
                                    }
                                }
                            }
                        },{
                            xtype:'datefield',
                            fieldLabel: '截止时间',
                            id: 'end_time',
                            name: 'end_time',
                            margin: '5 0 10 30',
                            //              	value: Ext.Date.format(new Date(), 'Y-m-d'),
                            value: '',
                            format: 'Y-m-d',
                            labelWidth: 60,
                            width: 200,
                            editable: false
                        },{
                            xtype:'textfield',
                            id: 'user_mobile',
                            name: 'user_mobile',
                            fieldLabel: '使用人电话',
                            margin: '5 0 10 30',
                            labelWidth: 70,
                            width: 200,
                            value:'',
                            maxLength: 11,
                            enforceMaxLength: true,
//				            regex: /^\d{1,11}$/,
//				            regexText: '请输入数字',
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
                            id: 'user_ads',
                            name: 'user_ads',
                            margin: '5 0 10 30',
                            xtype:'textfield',
                            fieldLabel: '用户地址',
                            labelWidth: 60,
                            width: 200,
                            value:'',
                            maxLength: 50,
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
                            id: 'zhnote',
                            name: 'zhnote',
                            fieldLabel: '帐号变更',
                            margin: '5 0 10 30',
                            labelWidth: 60,
                            width: 200,
                            value:'',
                            maxLength: 25,
                            enforceMaxLength: true,
                            listeners:{
                                specialkey:function(f,e){
                                    if (e.getKey() == e.ENTER) {
                                        document.getElementById('qbtn').click();
                                    }
                                }
                            }
                        },{
                            xtype:'datefield',
                            fieldLabel: '录入起始日期',
                            id: 'startDate',
                            name: 'startDate',
                            margin: '5 0 10 30',
                            value: '',
                            format: 'Y-m-d',
                            maxValue: new Date(),
                            labelWidth: 85,
                            width: 200,
//							allowBlank: false,
//							blankText: '请输入录入起始日期',
                            editable: false,
                            listeners: {
                                change: function(obj){
                                    Ext.getCmp('endDate').setMinValue(obj.getRawValue());
                                }
                            }
                        },{
                            xtype:'datefield',
                            fieldLabel: '录入截止日期',
                            id: 'endDate',
                            name: 'endDate',
                            margin: '5 0 10 30',
                            value: Ext.Date.format(new Date(), 'Y-m-d'),
                            format: 'Y-m-d',
                            maxValue: new Date(),
                            labelWidth: 85,
                            width: 200,
                            allowBlank: false,
                            blankText: '请输入录入截止日期',
                            editable: false,
                            listeners: {
                                change: function(obj){
                                    Ext.getCmp('startDate').setMaxValue(obj.getRawValue());
                                }
                            }
                        }]},{
                            xtype:'fieldset',
                            collapsible: true,
                            autoHeight:true,
                            title:'高级条件',
                        layout: {
                                type: 'table',
                                columns: 4
                            },
                            items:[{
                                xtype:'textfield',
                                id: 'save_admin',
                                name: 'save_admin',
                                fieldLabel: '录入人员',
                                margin: '5 0 10 30',
                                labelWidth: 60,
                                width: 200,
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
                                xtype:'datefield',
                                fieldLabel: '启用时间',
                                id: 'start_time',
                                name: 'start_time',
                                margin: '5 0 10 30',
                                //              	value: Ext.Date.format(new Date(), 'Y-m-d'),
                                value: '',
                                format: 'Y-m',
                                labelWidth: 60,
                                width: 200,
                                //				allowBlank: false,
                                //				blankText: '请选择光纤开通时间',
                                editable: false
                            },{
                                id: 'real_quota',
                                name: 'real_quota',
                                margin: '10 30 10 30',
                                xtype:'combobox',
                                fieldLabel: '餐型',
                                labelWidth: 60,
                                store:new Ext.data.SimpleStore(
                                    {
                                        fields:['id','name'],
                                        data:[['包年','包年'],['包月','包月'],['计时','计时']]
                                    }),
                                queryMode:'local',
                                width: 200,
                                valueField:'id',
                                displayField:'name',
                                blankText: '餐型',
                                editable: false
                            },{
                                id: 'real_bandwidth',
                                name: 'real_bandwidth',
                                margin: '10 30 10 30',
                                xtype:'combobox',
                                fieldLabel: '带宽',
                                labelWidth: 60,
                                store:new Ext.data.SimpleStore(
                                    {
                                        fields:['id','name'],
                                        data:[['2M','2M'],['4M','4M'],['10M','10M'],['20M','20M'],['50M','50M'],['100M','100M']]
                                    }),
                                queryMode:'local',
                                width: 200,
                                valueField:'id',
                                displayField:'name',
                                blankText: '带宽',
                                editable: false
                            },{
                                id: 'mf_act',
                                name: 'mf_act',
                                xtype:'combobox',
                                fieldLabel: '参加活动',
                                margin: '10 30 10 30',
                                store: Ext.data.StoreManager.lookup('huodong'),
                                labelWidth: 60,
                                width: 200,
                                valueField:'id',
                                displayField:'name',
                                allowBlank: true ,
                                blankText: '请选择活动名称',
                                minChars:1,
                                editable: false,
                                value:''
                            },{
                                id: 'mf_presentation',
                                name: 'mf_presentation',
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
                                labelWidth: 60,
                                width: 210,
                                valueField:'id',
                                displayField:'name',
                                minChars:1,
                                editable: false,
                                value:''
                            },{
                                xtype:'numberfield',
                                fieldLabel: '社区分组',
                                id: 'group_id',
                                name: 'group_id',
                                margin: '5 0 10 30',
//			              	value: 1,
                                labelWidth: 60,
                                width: 200,
                                maxValue: 99,
                                minValue: 1,
//							allowBlank: false,
//							blankText: '请选择营业厅分组',
                                editable: true
                            },{
                                    id: 'user_prop',
                                    name: 'user_prop',
                                    xtype:'combobox',
                                    fieldLabel:'用户性质',
                                    store: Ext.data.StoreManager.lookup('user_prop'),
                                    margin: '5 0 10 30',
                                    labelWidth: 60,
                                    width: 200,
                                    valueField:'id',
                                    displayField:'name',
                                    value:'',
                                    queryMode:'local',
                                    editable: false
                                },{
                                    id: 'net_prop',
                                    name: 'net_prop',
                                    xtype:'combobox',
                                    fieldLabel:'网络性质',
                                    store: Ext.data.StoreManager.lookup('net_prop'),
                                    margin: '5 0 10 30',
                                    labelWidth: 60,
                                    width: 200,
                                    valueField:'id',
                                    displayField:'name',
                                    value:'',
                                    queryMode:'local',
                                    editable: false
                                },{
                                    id: 'old_net_prop',
                                    name: 'old_net_prop',
                                    xtype:'combobox',
                                    fieldLabel:'原网络性质',
                                    store: Ext.data.StoreManager.lookup('old_net_prop'),
                                    margin: '5 0 10 30',
                                    labelWidth: 70,
                                    width: 200,
                                    valueField:'id',
                                    displayField:'name',
                                    value:'',
                                    queryMode:'local',
                                    editable: false
                                },{
                                    xtype:'datefield',
                                    fieldLabel: '重新启用时间',
                                    id: 're_time',
                                    name: 're_time',
                                    margin: '5 0 10 30',
                                    //              	value: Ext.Date.format(new Date(), 'Y-m-d'),
                                    value: '',
                                    format: 'Y-m',
                                    labelWidth: 85,
                                    width: 200,
                                    //				allowBlank: false,
                                    //				blankText: '请选择重新启用时间',
                                    editable: false
                                },{
                                    xtype:'numberfield',
                                    fieldLabel: '宣传单号',
                                    id: 'leaflet_no',
                                    name: 'leaflet_no',
                                    margin: '5 0 10 30',
//			              	value: 1,
                                    labelWidth: 60,
                                    width: 200,
                                    maxValue: 99,
                                    minValue: 1,
//							allowBlank: false,
//							blankText: '请选择宣传单号',
                                    editable: true
                                },{
                                    xtype:'textfield',
                                    id: 'tel',
                                    name: 'tel',
                                    fieldLabel: '报装人电话',
                                    margin: '5 0 10 30',
                                    labelWidth: 70,
                                    width: 200,
                                    value:'',
                                    maxLength: 11,
                                    enforceMaxLength: true,
//				            regex: /^\d{1,11}$/,
//				            regexText: '请输入数字',
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
                                xtype:'textfield',
                                id: 'user_phone',
                                name: 'user_phone',
                                fieldLabel: '固话',
                                margin: '5 0 10 30',
                                labelWidth: 60,
                                width: 200,
                                value:'',
                                maxLength: 11,
                                enforceMaxLength: true,
//				            regex: /^\d{1,11}$/,
//				            regexText: '请输入数字',
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
                                xtype:'textfield',
                                fieldLabel: '身份证',
                                id: 'scertno',
                                name: 'scertno',
                                margin: '5 0 10 30',
                                value: '',
                                labelWidth: 60,
                                width: 200,
                                editable: true
                            },{
                                xtype:'textfield',
                                id: 'user_email',
                                name: 'user_email',
                                fieldLabel: '邮箱',
                                margin: '5 0 10 30',
                                labelWidth: 60,
                                width: 200,
                                value:'',
                                maxLength: 11,
                                enforceMaxLength: true,
//				            regex: /^\d{1,11}$/,
//				            regexText: '请输入数字',
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
                                id: 'weixin',
                                name: 'weixin',
                                margin: '5 0 10 30',
                                xtype:'combobox',
                                fieldLabel: '微信用户',
                                labelWidth: 60,
                                store:new Ext.data.SimpleStore(
                                    {
                                        fields:['id','name'],
                                        data:[['1','是'],['0','否']]
                                    }),
                                queryMode:'local',
                                width: 200,
                                value:'',
                                valueField:'id',
                                displayField:'name',
                                editable: false
                            },{
                                id: 'house_type',
                                name: 'house_type',
                                margin: '5 0 10 30',
                                xtype:'combobox',
                                fieldLabel: '房屋性质',
                                labelWidth: 60,
                                store:new Ext.data.SimpleStore(
                                    {
                                        fields:['value','text'],
                                        data:[['1','租用'],['2','私有']]
                                    }),
                                queryMode:'local',
                                width: 200,
                                value:'',
                                valueField:'value',
                                displayField:'text',
                                editable: false
                            },{
                                id: 'mf_cat',
                                name: 'mf_cat',
                                xtype:'combobox',
                                fieldLabel:'光猫类型',
                                store: Ext.data.StoreManager.lookup('gm_type'),
                                margin: '5 0 10 30',
                                labelWidth: 60,
                                width: 200,
                                valueField:'id',
                                displayField:'name',
                                value:'',
                                queryMode:'local',
                                editable: false
                            },{
                                xtype:'textfield',
                                fieldLabel: '光猫MAC',
                                id: 'gm_mac',
                                name: 'gm_mac',
                                margin: '5 0 10 30',
                                labelWidth: 60,
                                width: 200,
                                maxValue: 99,
                                minValue: 1,
                                blankText: '后4位MAC地址',
                                editable: true
                            },{
                                id: 'isit',
                                name: 'isit',
                                margin: '5 0 10 30',
                                xtype:'combobox',
                                fieldLabel: 'IT卡用户',
                                labelWidth: 60,
                                store:new Ext.data.SimpleStore(
                                    {
                                        fields:['id','name'],
                                        data:[['1','是'],['0','否']]
                                    }),
                                queryMode:'local',
                                width: 200,
                                value:'',
                                valueField:'id',
                                displayField:'name',
                                editable: false
                            },{
                                xtype:'datefield',
                                fieldLabel: 'IT卡截止时间',
                                id: 'mf_it_end',
                                name: 'mf_it_end',
                                margin: '5 0 10 30',
                                //              	value: Ext.Date.format(new Date(), 'Y-m-d'),
                                value: '',
                                format: 'Y-m-d',
                                labelWidth: 90,
                                width: 200,
                                editable: false
                            },{
                                id: 'mf_gg_state',
                                name: 'mf_gg_state',
                                xtype:'combobox',
                                fieldLabel:'光改情况',
                                store: Ext.data.StoreManager.lookup('gg_state'),
                                margin: '5 0 10 30',
                                labelWidth: 60,
                                width: 200,
                                valueField:'id',
                                displayField:'name',
                                value:'',
                                queryMode:'local',
                                editable: false
                            },{
                                xtype:'datefield',
                                fieldLabel: '乐视起始时间',
                                id: 'letv_start',
                                name: 'letv_start',
                                margin: '5 0 10 30',
                                //              	value: Ext.Date.format(new Date(), 'Y-m-d'),
                                value: '',
                                format: 'Y-m-d',
                                labelWidth: 90,
                                width: 200,
                                editable: false
                            },{
                                xtype:'datefield',
                                fieldLabel: '乐视结束时间',
                                id: 'letv_end',
                                name: 'letv_end',
                                margin: '5 0 10 30',
                                //              	value: Ext.Date.format(new Date(), 'Y-m-d'),
                                value: '',
                                format: 'Y-m-d',
                                labelWidth: 90,
                                width: 200,
                                editable: false
                            },{
                                xtype:'textfield',
                                fieldLabel: '乐视MAC地址',
                                id: 'letv_mac',
                                name: 'letv_mac',
                                margin: '5 0 10 30',
                                value: '',
                                labelWidth: 90,
                                width: 200,
                                editable: true
                            },{
                                xtype:'datefield',
                                fieldLabel: '光纤开通时间',
                                id: 'opt_time',
                                name: 'opt_time',
                                margin: '5 0 10 30',
                                //              	value: Ext.Date.format(new Date(), 'Y-m-d'),
                                value: '',
                                format: 'Y-m',
                                labelWidth: 85,
                                width: 200,
                                //				allowBlank: false,
                                //				blankText: '请选择光纤开通时间',
                                editable: false
                            },{
                                xtype:'textfield',
                                id: 'hdnote',
                                name: 'hdnote',
                                fieldLabel: '活动备注',
                                margin: '5 0 10 30',
                                labelWidth: 60,
                                width: 200,
                                value:'',
                                maxLength: 25,
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
                                id: 'sbnote',
                                name: 'sbnote',
                                fieldLabel: '设备备注',
                                margin: '5 0 10 30',
                                labelWidth: 60,
                                width: 200,
                                value:'',
                                maxLength: 25,
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
                                id: 'tsnote',
                                name: 'tsnote',
                                fieldLabel: '特殊备注',
                                margin: '5 0 10 30',
                                labelWidth: 60,
                                width: 200,
                                value:'',
                                maxLength: 25,
                                enforceMaxLength: true,
                                listeners:{
                                    specialkey:function(f,e){
                                        if (e.getKey() == e.ENTER) {
                                            document.getElementById('qbtn').click();
                                        }
                                    }
                                }
                            },{
                                id: 'hetong',
                                name: 'hetong',
                                xtype:'combobox',
                                fieldLabel: '合同名称',
                                margin: '5 0 10 30',
                                labelWidth: 60,
                                store: Ext.data.StoreManager.lookup('hetong'),
                                width: 430,
                                valueField:'id',
                                displayField:'name',
                                colspan:2,
//							triggerAction: 'all',
//							typeAhead:true,
                                minChars:1,
                                queryMode:'local',
//							forceSelection: true,
                                editable: true,
                                value:'',
//							selectOnFocus: true,
//							enableKeyEvents: true,
                                listeners:{
//								f.onTriggerClick();
                                    specialkey:function(f,e){
                                        if (e.getKey() == e.ENTER) {
                                            document.getElementById('qbtn').click();
                                        }
                                    },
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
                                id: 'mfA_ml_type',
                                name: 'mfA_ml_type',
                                xtype:'combobox',
                                fieldLabel: '餐型详细',
                                margin: '5 0 10 30',
                                labelWidth: 60,
                                store: Ext.data.StoreManager.lookup('ml_type'),
                                width: 430,
                                colspan:2,
                                valueField:'id',
                                displayField:'name',
//							triggerAction: 'all',
//							typeAhead:true,
                                minChars:1,
                                queryMode:'local',
//							forceSelection: true,
                                editable: true,
                                value:'',
//							selectOnFocus: true,
//							enableKeyEvents: true,
                                listeners:{
//								f.onTriggerClick();
                                    specialkey:function(f,e){
                                        if (e.getKey() == e.ENTER) {
                                            document.getElementById('qbtn').click();
                                        }
                                    },
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
                            }]
                        }
            ]
        });
        this.callParent(arguments);
        
    }
});
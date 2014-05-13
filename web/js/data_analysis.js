Ext.define('My.data_analysis', {
    extend: 'Ext.panel.Panel',

    /**
     * 数据分析功能暂停，代码列表及功能如下：
     * data_analysis.js  放控件
     * data_panel.js  图表显示主容器
     * data_detail.js  图表显示window（弹出）
     * getMainChartDetail.jsp  主容器初始化Server端
     * getChartInfo.jsp  window数据来源
     * ----------------------------------------------------------------------
     * 初始化时ajax取数据，需要post的参数有：
     * 1、用户权限，根据权限确定输出的图表。
     * 2、营业厅，功能同上
     * 3、本月月份。
     * 查询条件中应包含"查询类型"域，与“分析类别”对应。这个域是隐藏的，
     * 当触发menu的onchange方法时，将menu的值记入这个隐藏域中，提交时，
     * 这个隐藏域的值作为主要参数传到SERVER。
     * ===========================================
     * Store：
     * data_panel.js中，主图表store： id:main_chart
     * data_detail.js中，点击主图表弹出的window中的3个饼图store。
     * ===========================================
     * Server端：
     * 重要参数：1、营业厅。2、查询类型。
     * 先判断查询类型，然后开始接受生成此类型图表所需要的参数，写SQL。
     * 最后返回JSON，ext store进行解析，然后reload。
     * 参看：http://www.17ext.com/archiver/showtopic-43713.aspx
     */
    constructor: function() {
        var infoMenu = new Ext.menu.Menu({
            ignoreParentClicks: true,
            plain: true,
            id:'data_class',
            name:'data_class',
            items: [{
                text: '综合类',
                menu:new Ext.menu.Menu({
                    ignoreParentClicks: true,
                    items: [
                        {
                            text: '本月综合分析',
                            listeners:{
                                'click':function(){
                                    Ext.getCmp('data_start').hide();
                                    Ext.getCmp('data_end').hide();
                                    Ext.getCmp('data_bs').hide();
                                    Ext.getCmp('data_month').hide();
                                }
                            }
                        },
                        {
                            text:'业务走势图',
                            listeners:{
                                'click':function(){
                                    Ext.getCmp('data_start').show();
                                    Ext.getCmp('data_end').show();
                                    Ext.getCmp('data_bs').show();
                                    Ext.getCmp('data_month').hide();
                                }
                            }
                        }
                    ],
                    listeners:{
                        'click':function(menu,item){
                            Ext.getCmp('chart_type').setValue(item.text);
                        }
                    }
                })
            },{
                    text: '新装类',
                    menu:new Ext.menu.Menu({
                        ignoreParentClicks: true,
                        items: [
                            {
                                text: '新装指标分析',
                                listeners:{
                                    'click':function(){
                                        Ext.getCmp('data_start').hide();
                                        Ext.getCmp('data_end').hide();
                                        Ext.getCmp('data_bs').hide();
                                        Ext.getCmp('data_month').show();
                                    }
                                }
                            },{
                                text: '新装餐型分析',
                                listeners:{
                                    'click':function(){
                                        Ext.getCmp('data_start').hide();
                                        Ext.getCmp('data_end').hide();
                                        Ext.getCmp('data_bs').hide();
                                        Ext.getCmp('data_month').show();
                                    }
                                }
                            },{
                                text: '新装带宽分析',
                                listeners:{
                                    'click':function(){
                                        Ext.getCmp('data_start').hide();
                                        Ext.getCmp('data_end').hide();
                                        Ext.getCmp('data_bs').hide();
                                        Ext.getCmp('data_month').show();
                                    }
                                }
                            }
                        ],
                        listeners:{
                            'click':function(menu,item){
                                Ext.getCmp('chart_type').setValue(item.text);
                            }
                        }
                    })
                },{
                    text: '续费类',
                    menu: new Ext.menu.Menu({
                        ignoreParentClicks: true,
                        items: [
                            {
                                text: '续费指标分析',
                                listeners:{
                                    'click':function(){
                                        Ext.getCmp('data_start').hide();
                                        Ext.getCmp('data_end').hide();
                                        Ext.getCmp('data_bs').hide();
                                        Ext.getCmp('data_month').show();
                                    }
                                }
                            },{
                                text: '续费带宽分析'
                            },{
                                text: '预存网费统计',
                                listeners:{
                                    'click':function(){
                                        Ext.getCmp('data_start').hide();
                                        Ext.getCmp('data_end').hide();
                                        Ext.getCmp('data_bs').show();
                                        Ext.getCmp('data_month').show();
                                    }
                                }
                            },{
                                text: '业务变更统计'
                            },{
                                text: '赠送时长统计'
                            }
                        ],
                        listeners:{
                            'click':function(menu,item){
                                Ext.getCmp('chart_type').setValue(item.text);
                            }
                        }
                    })
                },
                {
                    text: '停机注销类',
                    menu: new Ext.menu.Menu({
                        ignoreParentClicks: true,
                        items: [
                            {
                                text: '停机指标分析',
                                listeners:{
                                    'click':function(){
                                        Ext.getCmp('data_start').hide();
                                        Ext.getCmp('data_end').hide();
                                        Ext.getCmp('data_bs').hide();
                                        Ext.getCmp('data_month').show();
                                    }
                                }
                            },{
                                text: '停机注销用户统计'
                            },{
                                text: '停机注销餐型分析'
                            },{
                                text: '停机注销带宽分析'
                            },{
                                text: '在网时间分析'
                            }
                        ],
                        listeners:{
                            'click':function(menu,item){
                                Ext.getCmp('chart_type').setValue(item.text);
                            }
                        }
                    })
                },
                {
                    text: '用户类',
                    menu: new Ext.menu.Menu({
                        ignoreParentClicks: true,
                        items: [
                            {
                                text: '在网用户数量统计',
                                listeners:{
                                    'click':function(){
                                        Ext.getCmp('data_start').hide();
                                        Ext.getCmp('data_end').hide();
                                        Ext.getCmp('data_bs').hide();
                                        Ext.getCmp('data_month').show();
                                    }
                                }
                            },
                            {
                                text: '在网用户数量曲线',
                                listeners:{
                                    'click':function(){
                                        Ext.getCmp('data_start').show();
                                        Ext.getCmp('data_end').show();
                                        Ext.getCmp('data_bs').hide();
                                        Ext.getCmp('data_month').hide();
                                    }
                                }
                            }
                        ],
                        listeners:{
                            'click':function(menu,item){
                                Ext.getCmp('chart_type').setValue(item.text);
                            }
                        }
                    })
                }
            ]
        });
    	//初始化
        Ext.apply(this, {       	
        	title: '数据统计/分析',
        	icon: '../../image/zc.png',
			scale: 'small',
            region: 'center',
            margin: '0 5 5 0',
            id: 'data_analysis',
            name: 'data_analysis',
//            border: false,
            layout: 'border',
            frame: true,
            items: [
            	Ext.create('My.data_panel')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'data_tb',
            	name:'data_tb',
            	border: false,
            	height: 40,
            	items: [
            	'-',
                {
                    text:'分析类别',
                    menu:infoMenu
                },
                {
                    id: 'data_bs',
                    name: 'data_bs',
                    xtype:'combobox',
                    hidden:false,
                    emptyText:'请选择营业厅',
                    store: Ext.data.StoreManager.lookup('bs_name'),
                    width: 110,
                    valueField:'id',
                    displayField:'name',
                    value:'',
                    editable: false,
                    queryMode:'local',
                    hidden:true
                },
                {
                    xtype:'datefield',
                    fieldLabel: '月份',
                    id: 'data_month',
                    name: 'data_month',
                    margin: '0 5 5 0',
                    value: Ext.Date.format(new Date(), 'Ym'),
                    format: 'Ym',
                    submitFormat : String,
                    maxValue: new Date(),
                    labelWidth: 40,
                    width: 150,
                    allowBlank: true,
                    blankText: '请选择月份',
                    editable: false,
                    hidden:true
                },
                {
                    //通用
                    xtype:'datefield',
                    fieldLabel: '起始月份',
                    id: 'data_start',
                    name: 'data_start',
                    margin: '0 5 5 0',
                    value: Ext.Date.format(new Date(), 'Ym'),
                    format: 'Ym',
                    maxValue: new Date(),
                    labelWidth: 60,
                    width: 190,
                    submitFormat : String,
                    allowBlank: true,
                    blankText: '请输入起始月',
                    editable: false,
                    hidden:true,
                    listeners: {
                        change: function(obj){
                            Ext.getCmp('data_end').setMinValue(obj.getRawValue());
                        }
                    }
                },{
                    //通用
                    xtype:'datefield',
                    fieldLabel: '截止月份',
                    id: 'data_end',
                    name: 'data_end',
                    margin: '0 5 5 0',
                    value: Ext.Date.format(new Date(), 'Ym'),
                    format: 'Ym',
                    maxValue: new Date(),
                    submitFormat : String,
                    labelWidth: 60,
                    width: 190,
                    allowBlank: false,
                    blankText: '请输入截止月',
                    editable: false,
                    hidden:true,
                    listeners: {
                        change: function(obj){
                            Ext.getCmp('data_start').setMaxValue(obj.getRawValue());
                        }
                    }
                },
                {
                    xtype:'hiddenfield',
                    id:'chart_type',
                    name:'chart_type',
                    value:''
                },
            	{
            		xtype:'button',
	        		text: '开始统计',
	        		id:'qbtn',
	        		icon: '../../image/statistics.png',
	        		scale: 'medium',
	        		handler: function(){
                        var charge_type = Ext.getCmp('chart_type').getValue();
                        var mainPanel = Ext.getCmp('data_analysis');
                        if(charge_type=='在网用户数量统计'){
                            try{
                                mainPanel.removeAll();
                                mainPanel.doLayout();
                                mainPanel.update();
                            }
                            catch(e){console.log(e);}
                            mainPanel.add(Ext.create('My.user_panel'));
                            mainPanel.doLayout();
                            mainPanel.update();
                        }
                        else if(charge_type=='新装指标分析'){
                            try{
                                mainPanel.removeAll();
                                mainPanel.doLayout();
                                mainPanel.update();
                            }
                            catch (e){console.log(e);}
                            mainPanel.add(Ext.create('My.new_quota_panel'));
                            mainPanel.doLayout();
                            mainPanel.update();
                        }
                        else if(charge_type=='在网用户数量曲线'){
                            try{
                                mainPanel.removeAll();
                                mainPanel.doLayout();
                                mainPanel.update();
                            }
                            catch (e){console.log(e);}
                            mainPanel.add(Ext.create('My.user_total_panel'));
                            mainPanel.doLayout();
                            mainPanel.update();
                        }
                        else if(charge_type=='本月综合分析'){
                            try{
                                mainPanel.removeAll();
                                mainPanel.doLayout();
                                mainPanel.update();
                            }
                            catch (e){console.log(e);}
                            mainPanel.add(Ext.create('My.data_panel'));
                            mainPanel.doLayout();
                            mainPanel.update();
                        }
                        else if(charge_type=='续费指标分析'){
                            try{
                                mainPanel.removeAll();
                                mainPanel.doLayout();
                                mainPanel.update();
                            }
                            catch(e){console.log(e);}
                            mainPanel.add(Ext.create('My.charge_quota_panel'));
                            mainPanel.doLayout();
                            mainPanel.update();
                        }
                        else if(charge_type=='停机指标分析'){
                            try{
                                mainPanel.removeAll();
                                mainPanel.doLayout();
                                mainPanel.update();
                            }
                            catch(e){console.log(e);}
                            mainPanel.add(Ext.create('My.cancel_quota_panel'));
                            mainPanel.doLayout();
                            mainPanel.update();
                        }
                        else if(charge_type=='业务走势图'){
                            try{
                                mainPanel.removeAll();
                                mainPanel.doLayout();
                                mainPanel.update();
                            }
                            catch(e){console.log(e);}
                            mainPanel.add(Ext.create('My.trend_panel'));
                            mainPanel.doLayout();
                            mainPanel.update();
                        }
                        else if(charge_type=='新装餐型分析'){
                            try{
                                mainPanel.removeAll();
                                mainPanel.doLayout();
                                mainPanel.update();
                            }
                            catch(e){console.log(e);}
                            mainPanel.add(Ext.create('My.new_package_panel'));
                            mainPanel.doLayout();
                            mainPanel.update();
                        }
                        else if(charge_type=='新装带宽分析'){
                            try{
                                mainPanel.removeAll();
                                mainPanel.doLayout();
                                mainPanel.update();
                            }
                            catch(e){console.log(e);}
                            mainPanel.add(Ext.create('My.new_bw_panel'));
                            mainPanel.doLayout();
                            mainPanel.update();
                        }
                        else if(charge_type=='预存网费统计'){
                            try{
                                mainPanel.removeAll();
                                mainPanel.doLayout();
                                mainPanel.update();
                            }
                            catch(e){console.log(e);}
                            mainPanel.add(Ext.create('My.pre_charge_panel'));
                            mainPanel.doLayout();
                            mainPanel.update();
                        }
	        		}
        		},
        		{
        			xtype:'button',
        			id: 'reset_btn',
			        name: 'reset_btn',
	        		text: '重置条件',
	        		icon: '../../image/reset_btn.png',
	        		scale: 'medium',
	        		handler: function(){
	        			Ext.getCmp('data_start').reset();
	        			Ext.getCmp('data_end').reset();
	        			Ext.getCmp('data_bs').reset();
                        Ext.getCmp('data_month').reset();
	        		}
        		}
        	]})
        });
        this.callParent(arguments);
    }
});


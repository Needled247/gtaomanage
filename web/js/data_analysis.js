Ext.define('My.data_analysis', {
    extend: 'Ext.panel.Panel',

    /**
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
                    text: '新装类',
                    menu: new Ext.menu.Menu({
                        ignoreParentClicks: true,
                        items: [
                            {
                                text: '新装指标分析'
                            },{
                                text: '餐型分析'
                            },{
                                text: '带宽分析'
                            },{
                                text: '网络性质分析'
                            }
                        ]
                    })
                },{
                    text: '续费类',
                    menu: new Ext.menu.Menu({
                        ignoreParentClicks: true,
                        items: [
                            {
                                text: '续费统计'
                            },{
                                text: '带宽分析'
                            },{
                                text: '预存网费统计'
                            },{
                                text: '业务变更统计'
                            },{
                                text: '赠送时长统计'
                            }
                        ]
                    })
                },{
                    text: '停机注销类',
                    menu: new Ext.menu.Menu({
                        ignoreParentClicks: true,
                        items: [
                            {
                                text: '停机用户统计'
                            },{
                                text: '停机注销用户统计'
                            },{
                                text: '餐型分析'
                            },{
                                text: '带宽分析'
                            },{
                                text: '在网时间分析'
                            }
                        ]
                    })
                },{
                    text: 'IT卡服务类',
                    menu: new Ext.menu.Menu({
                        ignoreParentClicks: true,
                        items: [
                            {
                                text: '时间统计'
                            }
                        ]
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
            	Ext.create('My.data_north'),
            	Ext.create('My.data_panel')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'data_tb',
            	name:'data_tb',
            	border: false,
            	height: 40,
            	items: [
            	'-',{
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
                    queryMode:'local'
                },
                {
                    text:'分析类别',
                    menu:infoMenu
                },
            	{
            		xtype:'button',
	        		text: '开始统计',
	        		id:'qbtn',
	        		icon: '../../image/statistics.png',
	        		scale: 'medium',
	        		handler: function(){
	        			
	        			if(!Ext.getCmp('startDate').isValid()){
	        				return;
	        			}
	        			
	        			if(!Ext.getCmp('endDate').isValid()){
	        				return;
	        			}
	        			
	        			var params = Ext.getCmp('main_chart').getStore().getProxy().extraParams;
	        			params['zc_bs_name']=Ext.getCmp('bs_name').getValue();
	        			params['startDate']=Ext.getCmp('startDate').getRawValue();
	        			params['endDate']=Ext.getCmp('endDate').getRawValue();
	        			params['zc_type']=Ext.getCmp('zct').getValue();
	        			Ext.getCmp('main_chart').getStore().loadPage(1);
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
	        			if(!Ext.getCmp('bs_name').isHidden()){
							Ext.getCmp('bs_name').reset();
						}
	        			Ext.getCmp('startDate').reset();
	        			Ext.getCmp('endDate').reset();
	        			Ext.getCmp('zct').reset();
	        		}
        		}
        	]})
        });
        
        this.callParent(arguments);
        
    }
});


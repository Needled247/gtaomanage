Ext.define('My.version_info', {
    extend: 'Ext.Window',
//    requires: [
//    	'My.center_grid'
//	],
    constructor: function() {
		
    	//初始化
        Ext.apply(this, {
        	title: '软件信息',
        	width: 300,
        	height: 370,
//        	constrain: true,
        	layout: 'fit',
        	modal:true,
//        	closeAction:'hide',
        	resizable:false,
        	draggable:false,
        	html: '<div align="center" style="margin:5px 5px;font:14px 微软雅黑;"><img src="../../image/version.gif" width="270" height="150" style="border:2px solid #ddd;"><p style="margin-top:10px;font-size:16px;">观滔信息管理中心</p><fieldset style="border:solid 1px #b0b9c8;margin-top:5px;padding-bottom:10px;width:265px;"><legend align="center">版权所有</legend><p style="margin-top:5px;">北京观滔高科技有限公司(C) 2012</p><p style="margin-top:5px;">GuanTao High-Tech,LTD(C) 2012</p><p style="margin-top:5px;">Copyright© 2012-'+new Date().getFullYear()+' GuanTao.</p><p style="margin-top:5px;">All Rights Reserved</p></fieldset></div>'            
        });
        
        this.callParent(arguments);
        
    }
});
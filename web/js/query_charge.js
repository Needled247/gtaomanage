Ext.define('My.query_charge', {
    extend: 'Ext.panel.Panel',
	
    constructor: function() {
    	//初始化
        Ext.apply(this, {       	
        	title: '营业厅收费信息',
        	icon: '../../image/rmb.png',
			scale: 'small',
            region: 'center',
            margin: '0 5 5 0',
            id: 'query_charge',
            name: 'query_charge',
//            border: false,
            layout: 'border',
            frame: true,
            items: [
            	//Ext.create('My.qc_north'),
            	//Ext.create('My.qc_grid')
                Ext.create('My.qc_tabPanel')
            ],
            tbar: Ext.create('Ext.toolbar.Toolbar',{
            	id:'qc_tb1',
            	name:'qc_tb1',
            	border: false,
//            	height: 40,
            	items: [
            	'-',
            	{
        			id: 'yh_qc',
					text: '用户收费信息',
					icon: '../../image/yh_qc24.png',
					scale: 'medium',
					allowDepress: false,
					enableToggle: true,
					listeners:{
	            		render:function(b){
	            			b.toggle();
	            		}
	            	},
					handler: function(){
						if(Ext.getCmp('qc_tabPanel')==undefined){
							Ext.getCmp('query_charge').remove('noqc_tabPanel');
							Ext.getCmp('query_charge').add(Ext.create('My.qc_tabPanel'));
							setSubBtns(['addmf','bs_name','admin_fn','ex_fn']);
							if(Ext.getCmp('bs_name').isHidden()){
								Ext.getCmp('bs_name').setValue(Ext.bs_did);
							}
							Ext.getCmp('fyh_qc').toggle();
						}
					}
				},'-',{
					id: 'fyh_qc',
					text: '非用户收费信息',
					icon: '../../image/fyh_qc24.png',
					scale: 'medium',
					allowDepress: false,
					enableToggle: true,
					handler: function(){						
						if(Ext.getCmp('noqc_tabPanel')==undefined){
							Ext.getCmp('query_charge').remove('qc_tabPanel');
							Ext.getCmp('query_charge').add(Ext.create('My.noqc_tabPanel'));
							setSubBtns(['addmf','bs_name','admin_fn','ex_fn']);
							if(Ext.getCmp('bs_name').isHidden()){
								Ext.getCmp('bs_name').setValue(Ext.bs_did);
							}
							Ext.getCmp('yh_qc').toggle();
						}
					}
            	}
        	]})
        });
        
        this.callParent(arguments);
        
    }
});

function setSubBtns(sub_btns){
	for(var i=0;i<sub_btns.length;i++){
		if(Ext.Array.contains(Ext.rs_two,sub_btns[i])){
			Ext.getCmp(sub_btns[i]).show();
		}								
	}
}
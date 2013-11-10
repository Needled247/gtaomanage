<%@page language="java" import="java.util.Date" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String startPage=request.getParameter("start");
	String countPage=request.getParameter("limit");
	String menu_txt=request.getParameter("menu_txt");
	String bs_name=request.getParameter("bs_name");
	String get_data_sql="";
	String get_count_sql="";
	String gridStr="";
	int count=0;
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	//System.out.println(startPage+","+countPage+","+menu_txt);
	if(menu_txt.equals("0")){
		response.setContentType("text/json;charset=UTF-8");
		response.getWriter().print("{totalCount:"+count+",data:["+gridStr+"]}");
		return;
	}
	
		conn=ConnPoolBean.getRadiusConn();
		st=conn.createStatement();
		
		if(menu_txt.equals("1")){
			String leaflet_no=request.getParameter("leaflet_no");
			String start_time=request.getParameter("start_time");
			String end_time=request.getParameter("end_time");
			String group_id=request.getParameter("group_id");
			String house_type=request.getParameter("house_type");
			String user_ads=request.getParameter("user_ads");
			String un=request.getParameter("un").toLowerCase();
			String rname=request.getParameter("rname");
			String tel=request.getParameter("tel");
			String mfA_ml_type=request.getParameter("mfA_ml_type");
			String hetong=request.getParameter("hetong");			
			String isit=request.getParameter("isit");
			String retime=request.getParameter("retime");
			String gm=request.getParameter("gm");
			String gg=request.getParameter("gg");
			String cxnote=request.getParameter("cxnote");
			String hdnote=request.getParameter("hdnote");
			String sbnote=request.getParameter("sbnote");
			String zhnote=request.getParameter("zhnote");
			String tsnote=request.getParameter("tsnote");
			String startDate=request.getParameter("startDate");
			String endDate=request.getParameter("endDate");
			String save_admin=request.getParameter("save_admin");
			String opt_time=request.getParameter("opt_time");
			//System.out.println(leaflet_no+","+start_time+","+group_id+","+house_type+","+user_ads);
			get_data_sql="select gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote,gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,gmf.opt_usetime,bi.name,tu.susername,tui.srealname,ti.sispname,gmf.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no,tui.stele,tui.semail,gmf.house_type_id,gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername and tu.susername=gmf.username and tu.iispid=ti.iispid and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			get_count_sql="select count(*) from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername and tu.susername=gmf.username and tu.iispid=ti.iispid and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			if(!startDate.equals("")){
				get_data_sql+=" and gmf.save_time>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
				get_count_sql+=" and gmf.save_time>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";			
			}
			get_data_sql+=" and gmf.save_time<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
			get_count_sql+=" and gmf.save_time<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
				get_count_sql+=" and gmf.department_id="+bs_name;
			}
			get_data_sql+=" and tu.istatus<>-9";
			get_count_sql+=" and tu.istatus<>-9";
			if(!un.equals("")){
				get_data_sql+=" and tu.susername like '%"+un+"%'";
				get_count_sql+=" and tu.susername like '%"+un+"%'";
			}
			if(!leaflet_no.equals("")){
				get_data_sql+=" and gmf.leaflet_no="+leaflet_no;
				get_count_sql+=" and gmf.leaflet_no="+leaflet_no;
			}
			if(!start_time.equals("")){
				get_data_sql+=" and gmf.dfirstdate='"+start_time+"'";
				get_count_sql+=" and gmf.dfirstdate='"+start_time+"'";
			}
			if(!end_time.equals("")){
				get_data_sql+=" and to_char(TU.DOVERDATE,'yyyy-mm')='"+end_time+"' and tu.susername not in (select susername from tbl_task)";
				get_count_sql+=" and to_char(TU.DOVERDATE,'yyyy-mm')='"+end_time+"' and tu.susername not in (select susername from tbl_task)";
			}
			if(!mfA_ml_type.equals("")){
				get_data_sql+=" and tu.iispid="+mfA_ml_type;
				get_count_sql+=" and tu.iispid="+mfA_ml_type;
			}
			if(!group_id.equals("")){
				get_data_sql+=" and gmf.group_id="+group_id;
				get_count_sql+=" and gmf.group_id="+group_id;
			}
			if(!house_type.equals("")){
				get_data_sql+=" and gmf.house_type_id="+house_type;
				get_count_sql+=" and gmf.house_type_id="+house_type;
			}
			if(!user_ads.equals("")){
				get_data_sql+=" and tu.sfeephone like '%"+new String(user_ads.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and tu.sfeephone like '%"+new String(user_ads.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!rname.equals("")){
				get_data_sql+=" and tui.srealname like '%"+new String(rname.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and tui.srealname like '%"+new String(rname.getBytes("gbk"),"iso-8859-1")+"%'";
			}			
			if(!tel.equals("")){
				get_data_sql+=" and tui.stele like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and tui.stele like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!hetong.equals("")){
				get_data_sql+=" and gmf.contract_id="+hetong;
				get_count_sql+=" and gmf.contract_id="+hetong;
			}
			if(!isit.equals("")){
				get_data_sql+=" and gmf.isit="+isit;
				get_count_sql+=" and gmf.isit="+isit;
			}
			if(!retime.equals("")){
				get_data_sql+=" and gmf.redate='"+retime+"'";
				get_count_sql+=" and gmf.redate='"+retime+"'";
			}
			if(!gm.equals("")){
				get_data_sql+=" and gmf.cat_type_id="+gm;
				get_count_sql+=" and gmf.cat_type_id="+gm;
			}
			if(!gg.equals("")){
				get_data_sql+=" and gmf.gg_id="+gg;
				get_count_sql+=" and gmf.gg_id="+gg;
			}
			if(!cxnote.equals("")){
				get_data_sql+=" and gmf.cxnote like '%"+new String(cxnote.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and gmf.cxnote like '%"+new String(cxnote.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!hdnote.equals("")){
				get_data_sql+=" and gmf.hdnote like '%"+new String(hdnote.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and gmf.hdnote like '%"+new String(hdnote.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!sbnote.equals("")){
				get_data_sql+=" and gmf.sbnote like '%"+new String(sbnote.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and gmf.sbnote like '%"+new String(sbnote.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!zhnote.equals("")){
				get_data_sql+=" and gmf.zhnote like '%"+new String(zhnote.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and gmf.zhnote like '%"+new String(zhnote.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!tsnote.equals("")){
				get_data_sql+=" and gmf.tsnote like '%"+new String(tsnote.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and gmf.tsnote like '%"+new String(tsnote.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!save_admin.equals("")){
				get_data_sql+=" and gmf.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and gmf.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!opt_time.equals("")){
				get_data_sql+=" and to_char(gmf.opt_usetime,'yyyy-mm')='"+opt_time+"'";
				get_count_sql+=" and to_char(gmf.opt_usetime,'yyyy-mm')='"+opt_time+"'";
			}
			//int endPage=Integer.parseInt(startPage)+Integer.parseInt(countPage);
			//get_data_sql+=" and rownum<="+endPage+" minus "+get_data_sql+" and rownum<="+startPage;
			//System.out.println(get_data_sql);
			
		}else if(menu_txt.equals("4")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, 0);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
						
			get_data_sql="select gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote,gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,gmf.opt_usetime,bi.name,gi.susername,tui.srealname,ti.sispname,gmf.dfirstdate,gi.doverdate,gi.sfeephone,gmf.group_id,gmf.leaflet_no,tui.stele,tui.semail,gmf.house_type_id,gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name from gtm_gg_state gg,gtm_cat_type cat,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and gi.susername=tui.susername and gi.susername=gmf.username and gi.iispid=ti.iispid and gi.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			get_count_sql="select count(*) from gtm_gg_state gg,gtm_cat_type cat,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and gi.susername=tui.susername and gi.susername=gmf.username and gi.iispid=ti.iispid and gi.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
				get_count_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and gi.iispid="+ml_type;
				get_count_sql+=" and gi.iispid="+ml_type;
			}
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c.getTime())+"'";
			get_count_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c.getTime())+"'";
		}else if(menu_txt.equals("5")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, -1);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
			
			get_data_sql="select gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote,gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,gmf.opt_usetime,bi.name,tu.susername,tui.srealname,ti.sispname,gmf.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no,tui.stele,tui.semail,gmf.house_type_id,gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername and tu.susername=gmf.username and tu.susername=gi.susername and tu.iispid=ti.iispid and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			get_count_sql="select count(*) from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername and tu.susername=gmf.username and tu.susername=gi.susername and tu.iispid=ti.iispid and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
				get_count_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and tu.iispid="+ml_type;
				get_count_sql+=" and tu.iispid="+ml_type;
			}
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c.getTime())+"'";
			get_count_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c.getTime())+"'";
			get_data_sql+=" and GI.DOVERDATE<TU.DOVERDATE";
			get_count_sql+=" and GI.DOVERDATE<TU.DOVERDATE";
		}else if(menu_txt.equals("6")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, -1);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
			
			get_data_sql="select gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote,gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,gmf.opt_usetime,bi.name,tu.susername,tui.srealname,ti.sispname,gmf.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no,tui.stele,tui.semail,gmf.house_type_id,gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername and tu.susername=gmf.username and tu.susername=gi.susername and tu.iispid=ti.iispid and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			get_count_sql="select count(*) from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername and tu.susername=gmf.username and tu.susername=gi.susername and tu.iispid=ti.iispid and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
				get_count_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and tu.iispid="+ml_type;
				get_count_sql+=" and tu.iispid="+ml_type;
			}
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c.getTime())+"'";
			get_count_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c.getTime())+"'";
			get_data_sql+=" and GI.DOVERDATE=TU.DOVERDATE";
			get_count_sql+=" and GI.DOVERDATE=TU.DOVERDATE";
		}else if(menu_txt.equals("7")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, 0);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
			
			get_data_sql="select gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote,gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,gmf.opt_usetime,bi.name,gi.susername,tui.srealname,ti.sispname,gmf.dfirstdate,gi.doverdate,gi.sfeephone,gmf.group_id,gmf.leaflet_no,tui.stele,tui.semail,gmf.house_type_id,gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name from gtm_gg_state gg,gtm_cat_type cat,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and gi.susername=tui.susername and gi.susername=gmf.username and gi.iispid=ti.iispid and gi.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			get_count_sql="select count(*) from gtm_gg_state gg,gtm_cat_type cat,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and gi.susername=tui.susername and gi.susername=gmf.username and gi.iispid=ti.iispid and gi.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
				get_count_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and gi.iispid="+ml_type;
				get_count_sql+=" and gi.iispid="+ml_type;
			}
			Calendar c1 = Calendar.getInstance();
			c1.add(Calendar.MONTH, -1);
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c1.getTime())+"'";
			get_count_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c1.getTime())+"'";
		}else if(menu_txt.equals("8")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, -1);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
			
			get_data_sql="select gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote,gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,gmf.opt_usetime,bi.name,tu.susername,tui.srealname,ti.sispname,gmf.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no,tui.stele,tui.semail,gmf.house_type_id,gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername and tu.susername=gmf.username and tu.susername=gi.susername and tu.iispid=ti.iispid and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			get_count_sql="select count(*) from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername and tu.susername=gmf.username and tu.susername=gi.susername and tu.iispid=ti.iispid and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
				get_count_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and tu.iispid="+ml_type;
				get_count_sql+=" and tu.iispid="+ml_type;
			}
			Calendar c1 = Calendar.getInstance();
			c1.add(Calendar.MONTH, -2);
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c1.getTime())+"'";
			get_count_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c1.getTime())+"'";
			get_data_sql+=" and GI.DOVERDATE<TU.DOVERDATE";
			get_count_sql+=" and GI.DOVERDATE<TU.DOVERDATE";
		}else if(menu_txt.equals("9")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, -1);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
			
			get_data_sql="select gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote,gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,gmf.opt_usetime,bi.name,tu.susername,tui.srealname,ti.sispname,gmf.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no,tui.stele,tui.semail,gmf.house_type_id,gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername and tu.susername=gmf.username and tu.susername=gi.susername and tu.iispid=ti.iispid and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			get_count_sql="select count(*) from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername and tu.susername=gmf.username and tu.susername=gi.susername and tu.iispid=ti.iispid and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
				get_count_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and tu.iispid="+ml_type;
				get_count_sql+=" and tu.iispid="+ml_type;
			}
			Calendar c1 = Calendar.getInstance();
			c1.add(Calendar.MONTH, -2);
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c1.getTime())+"'";
			get_count_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c1.getTime())+"'";
			get_data_sql+=" and GI.DOVERDATE=TU.DOVERDATE";
			get_count_sql+=" and GI.DOVERDATE=TU.DOVERDATE";
		}
				
		int endPage=Integer.parseInt(startPage)+Integer.parseInt(countPage);
		get_data_sql+=" and rownum<="+endPage+" minus "+get_data_sql+" and rownum<="+startPage;
		
		rs=st.executeQuery(get_count_sql);
			rs.next();
			count=rs.getInt(1);
			if(count!=0){
				rs=st.executeQuery(get_data_sql);
				while(rs.next()){
					gridStr+="{";
					if(rs.getString("opt_usetime")!=null){
						gridStr+="opt_time:'"+rs.getDate("opt_usetime")+"',";
					}else{
						gridStr+="opt_time:'',";
					}
					if(rs.getString("isit")!=null){
						if(rs.getInt("isit")==1){
							gridStr+="isit:'是',";
						}else{
							gridStr+="isit:'否',";
						}
					}else{
						gridStr+="isit:'',";				
					}
					if(rs.getString("name")!=null){
						gridStr+="bs_name:'"+new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="bs_name:'',";
					}
					if(rs.getString("susername")!=null){
						gridStr+="username:'"+new String(rs.getString("susername").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="username:'',";
					}
					if(rs.getString("srealname")!=null){
						gridStr+="realname:'"+new String(rs.getString("srealname").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="realname:'',";
					}
					if(rs.getString("sispname")!=null){
						gridStr+="mealtype:'"+new String(rs.getString("sispname").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="mealtype:'',";
					}
					if(rs.getString("dfirstdate")!=null){
						gridStr+="starttime:'"+rs.getString("dfirstdate")+"',";
					}else{
						gridStr+="starttime:'',";
					}
					if(rs.getString("doverdate")!=null){
						gridStr+="endtime:'"+rs.getDate("doverdate")+"',";
					}else{
						gridStr+="endtime:'',";
					}
					if(rs.getString("sfeephone")!=null){
						gridStr+="address:'"+new String(rs.getString("sfeephone").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="address:'',";
					}
					if(rs.getString("group_id")!=null){
						gridStr+="group_id:'"+rs.getString("group_id")+"',";
					}else{
						gridStr+="group_id:'',";
					}
					if(rs.getString("leaflet_no")!=null){
						gridStr+="leaflet_no:'"+rs.getString("leaflet_no")+"',";
					}else{
						gridStr+="leaflet_no:'',";
					}
					if(rs.getString("stele")!=null){
						gridStr+="tel:'"+new String(rs.getString("stele").getBytes("iso-8859-1"),"gbk").replaceFirst("^;+", "")+"',";
					}else{
						gridStr+="tel:'',";
					}
					if(rs.getString("semail")!=null){
						gridStr+="email:'"+new String(rs.getString("semail").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="email:'',";
					}
					if(rs.getString("house_type_id")!=null){
						if(rs.getInt("house_type_id")==1){
							gridStr+="house_type:'租用',";
						}else if(rs.getInt("house_type_id")==2){
							gridStr+="house_type:'私有',";
						}
					}else{
						gridStr+="house_type:'',";				
					}
					if(rs.getString("line_type_id")!=null){
						if(rs.getInt("line_type_id")==1){
							gridStr+="line_type:'明线',";
						}else if(rs.getInt("line_type_id")==2){
							gridStr+="line_type:'暗线',";
						}
					}else{
						gridStr+="line_type:'',";				
					}
					if(rs.getString("save_admin")!=null){
						gridStr+="save_admin:'"+new String(rs.getString("save_admin").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="save_admin:'',";
					}
					if(rs.getString("save_time")!=null){
						gridStr+="save_time:'"+rs.getString("save_time")+"',";
					}else{
						gridStr+="save_time:'',";
					}
					if(rs.getString("contract_name")!=null){
						gridStr+="contract_name:'"+new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="contract_name:'',";
					}
					if(rs.getString("redate")!=null){
						gridStr+="mf_retime:'"+rs.getString("redate")+"',";
					}else{
						gridStr+="mf_retime:'',";
					}					
					gridStr+="mf_gm:'"+new String(rs.getString("cat_name").getBytes("iso-8859-1"),"gbk")+"',";
					gridStr+="mf_gg:'"+new String(rs.getString("gg_name").getBytes("iso-8859-1"),"gbk")+"',";
					if(rs.getString("cxnote")!=null){
						gridStr+="mf_cxnote:'"+new String(rs.getString("cxnote").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="mf_cxnote:'',";
					}
					if(rs.getString("hdnote")!=null){
						gridStr+="mf_hdnote:'"+new String(rs.getString("hdnote").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="mf_hdnote:'',";
					}
					if(rs.getString("sbnote")!=null){
						gridStr+="mf_sbnote:'"+new String(rs.getString("sbnote").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="mf_sbnote:'',";
					}
					if(rs.getString("zhnote")!=null){
						gridStr+="mf_zhnote:'"+new String(rs.getString("zhnote").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="mf_zhnote:'',";
					}
					if(rs.getString("tsnote")!=null){
						gridStr+="mf_tsnote:'"+new String(rs.getString("tsnote").getBytes("iso-8859-1"),"gbk")+"'";
					}else{
						gridStr+="mf_tsnote:''";
					}
					gridStr+="},";
				}
			}
		
		rs.close();
		st.close();
		conn.close();
		
		gridStr=gridStr.replaceFirst(",$", "");
	
	
	//System.out.println(gridStr);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{totalCount:"+count+",data:["+gridStr+"]}");
	
%>
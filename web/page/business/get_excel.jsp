﻿<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String menu_txt=request.getParameter("menu_txt");
	String bs_name=request.getParameter("bs_name");
	String get_data_sql="";
	String gridStr="";
	
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	ResultSet rs=null;
	
	if(menu_txt.equals("1")){
			String leaflet_no=request.getParameter("leaflet_no");
			String start_time=request.getParameter("start_time");
			String group_id=request.getParameter("group_id");
			String house_type=request.getParameter("house_type");
			String user_ads=request.getParameter("user_ads");
			user_ads=java.net.URLDecoder.decode(user_ads, "UTF-8");
			String un=request.getParameter("un").toLowerCase();
			String rname=request.getParameter("rname");
			rname=java.net.URLDecoder.decode(rname, "UTF-8");
			String tel=request.getParameter("tel");
			tel=java.net.URLDecoder.decode(tel, "UTF-8");
			String end_time=request.getParameter("end_time");
			String mfA_ml_type=request.getParameter("mfA_ml_type");
			String hetong=request.getParameter("hetong");			
			String isit=request.getParameter("isit");
			String retime=request.getParameter("retime");
			String gm=request.getParameter("gm");
			String gg=request.getParameter("gg");
			String cxnote=request.getParameter("cxnote");
			cxnote=java.net.URLDecoder.decode(cxnote, "UTF-8");
			String hdnote=request.getParameter("hdnote");
			hdnote=java.net.URLDecoder.decode(hdnote, "UTF-8");
			String sbnote=request.getParameter("sbnote");
			sbnote=java.net.URLDecoder.decode(sbnote, "UTF-8");
			String zhnote=request.getParameter("zhnote");
			zhnote=java.net.URLDecoder.decode(zhnote, "UTF-8");
			String tsnote=request.getParameter("tsnote");
			tsnote=java.net.URLDecoder.decode(tsnote, "UTF-8");
			String startDate=request.getParameter("startDate");
			String endDate=request.getParameter("endDate");
			String save_admin=request.getParameter("save_admin");
			save_admin=java.net.URLDecoder.decode(save_admin, "UTF-8");
			String opt_time=request.getParameter("opt_time");
            String letv_start = request.getParameter("letv_start");
            String letv_end = request.getParameter("letv_end");
            String letv_mac = request.getParameter("letv_mac");
            letv_mac=java.net.URLDecoder.decode(letv_mac, "UTF-8");
            String it_end = request.getParameter("it_end");
            String user_prop = request.getParameter("user_prop");
            String net_prop = request.getParameter("net_prop");
            String old_net_prop = request.getParameter("old_net_prop");
            String user_mobile = request.getParameter("user_mobile");
            String user_phone = request.getParameter("user_phone");
            String user_email = request.getParameter("user_email");
            user_email=java.net.URLDecoder.decode(user_email, "UTF-8");
            String weixin = request.getParameter("weixin");
            String payee = request.getParameter("payee");
            payee=java.net.URLDecoder.decode(payee, "UTF-8");
            String admit = request.getParameter("admit");
            admit=java.net.URLDecoder.decode(admit, "UTF-8");
            String gm_mac = request.getParameter("gm_mac");
            gm_mac=java.net.URLDecoder.decode(gm_mac, "UTF-8");
			get_data_sql="select gmf.opt_usetime,gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote,gmf.sbnote," +
                    "gmf.zhnote,gmf.tsnote,gmf.isit,bi.name,tu.susername,tui.srealname,ti.sispname,gmf.dfirstdate,tu.doverdate," +
                    "tu.sfeephone,gmf.group_id,gmf.leaflet_no,tui.stele,tui.semail,gmf.house_type_id,gmf.line_type_id,gmf.save_admin," +
                    "gmf.save_time,gc.contract_name,gmf.oldnet_prop_id,gmf.user_prop_id,gmf.net_prop," +
                    "gmf.payee,gmf.admit,gmf.user_mobile,gmf.user_phone,gmf.weixin,gmf.letv_start,gmf.letv_end," +
                    "gmf.letv_mac,gmf.it_end,tui.spostcode "+
                    "from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf," +
                    "GTM_BUSINESS_INFO bi,gtm_contract gc " +
                    "where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id" +
                    " and tu.susername=tui.susername and tu.susername=gmf.username and tu.iispid=ti.iispid " +
                    "and tu.idistid=td.idistid " +
                    "and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			if(!startDate.equals("")){
				get_data_sql+=" and gmf.save_time>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
			}
			get_data_sql+=" and gmf.save_time<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
			}
			get_data_sql+=" and tu.istatus<>-9";
			if(!un.equals("")){
				get_data_sql+=" and tu.susername like '"+un+"%'";
			}	
			if(!leaflet_no.equals("")){
				get_data_sql+=" and gmf.leaflet_no="+leaflet_no;
			}
			if(!start_time.equals("")){
				get_data_sql+=" and gmf.dfirstdate='"+start_time+"'";
			}
			if(!end_time.equals("")){
				get_data_sql+=" and to_char(TU.DOVERDATE,'yyyy-mm')='"+end_time+"' and tu.susername not in (select susername from tbl_task)";
			}
			if(!mfA_ml_type.equals("")){
				get_data_sql+=" and tu.iispid="+mfA_ml_type;
			}
			if(!group_id.equals("")){
				get_data_sql+=" and gmf.group_id="+group_id;
			}
			if(!house_type.equals("")){
				get_data_sql+=" and gmf.house_type_id="+house_type;
			}
			if(!user_ads.equals("")){
				get_data_sql+=" and tu.sfeephone like '%"+new String(user_ads.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!rname.equals("")){
				get_data_sql+=" and tui.srealname like '%"+new String(rname.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!tel.equals("")){
				get_data_sql+=" and tui.stele like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!hetong.equals("")){
				get_data_sql+=" and gmf.contract_id="+hetong;
			}
			if(!isit.equals("")){
				get_data_sql+=" and gmf.isit="+isit;
			}
			if(!retime.equals("")){
				get_data_sql+=" and gmf.redate='"+retime+"'";
			}
			if(!gm.equals("")){
				get_data_sql+=" and gmf.cat_type_id="+gm;
			}
			if(!gg.equals("")){
				get_data_sql+=" and gmf.gg_id="+gg;
			}
			if(!cxnote.equals("")){
				get_data_sql+=" and gmf.cxnote like '%"+new String(cxnote.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!hdnote.equals("")){
				get_data_sql+=" and gmf.hdnote like '%"+new String(hdnote.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!sbnote.equals("")){
				get_data_sql+=" and gmf.sbnote like '%"+new String(sbnote.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!zhnote.equals("")){
				get_data_sql+=" and gmf.zhnote like '%"+new String(zhnote.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!tsnote.equals("")){
				get_data_sql+=" and gmf.tsnote like '%"+new String(tsnote.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!save_admin.equals("")){
				get_data_sql+=" and gmf.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!opt_time.equals("")){
				get_data_sql+=" and to_char(gmf.opt_usetime,'yyyy-mm')='"+opt_time+"'";
			}
            if(!letv_start.equals("")){
                get_data_sql+=" and to_char(gmf.letv_start,'yyyy-mm-dd')='"+letv_start+"'";
            }
            if(!letv_end.equals("")){
                get_data_sql+=" and to_char(gmf.letv_end,'yyyy-mm-dd')='"+letv_end+"'";
            }
            if(!letv_mac.equals("")){
                get_data_sql+=" and gmf.letv_mac like '%"+new String(letv_mac.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!it_end.equals("")){
                get_data_sql+=" and to_char(gmf.it_end,'yyyy-mm-dd')='"+it_end+"'";
            }
            if(!user_prop.equals("")){
                get_data_sql+=" and gmf.user_prop="+user_prop;
            }
            if(!net_prop.equals("")){
                get_data_sql+=" and gmf.net_prop="+net_prop;
            }
            if(!old_net_prop.equals("")){
                get_data_sql+=" and gmf.oldnet_prop_id="+old_net_prop;
            }
            if(!payee.equals("")){
                get_data_sql+=" and gmf.payee like '%"+new String(payee.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!admit.equals("")){
                get_data_sql+=" and gmf.admit like '%"+new String(admit.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!user_mobile.equals("")){
                get_data_sql+=" and gmf.user_mobile like '%"+new String(user_mobile.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!user_phone.equals("")){
                get_data_sql+=" and gmf.user_phone like '%"+new String(user_phone.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!weixin.equals("")){
                get_data_sql+=" and gmf.weixin="+weixin;
            }
            if(!gm_mac.equals("")){
                get_data_sql+=" and tui.spostcode like '%"+new String(gm_mac.getBytes("gbk"),"iso-8859-1")+"%'";
            }
						
		}else if(menu_txt.equals("4")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, 0);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
			
			get_data_sql="select gmf.opt_usetime,gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote," +
                    "gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,bi.name,gi.susername,tui.srealname,ti.sispname," +
                    "gmf.dfirstdate,gi.doverdate,gi.sfeephone,gmf.group_id,gmf.leaflet_no,gmf.house_type_id,tui.stele," +
                    "tui.semail,gmf.house_type_id,gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name," +
                    "gmf.oldnet_prop_id,gmf.user_prop_id,gmf.net_prop," +
                    "gmf.payee,gmf.admit,gmf.user_mobile,gmf.user_phone,gmf.weixin,gmf.letv_start,gmf.letv_end," +
                    "gmf.letv_mac,gmf.it_end,tui.spostcode " +
                    "from gtm_gg_state gg,gtm_cat_type cat,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf," +
                    "GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc " +
                    "where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and gi.susername=tui.susername " +
                    "and gi.susername=gmf.username and gi.iispid=ti.iispid and gi.idistid=td.idistid and gmf.contract_id=gc.contract_id " +
                    "and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and gi.iispid="+ml_type;
			}
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c.getTime())+"'";
		}else if(menu_txt.equals("5")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, -1);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
			
			get_data_sql="select gmf.opt_usetime,gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote," +
                    "gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,bi.name,tu.susername,tui.srealname,ti.sispname,gmf.dfirstdate," +
                    "tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no,gmf.house_type_id,tui.stele,tui.semail," +
                    "gmf.house_type_id,gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name,gmf.oldnet_prop_id," +
                    "gmf.user_prop_id,gmf.net_prop," +
                    "gmf.payee,gmf.admit,gmf.user_mobile,gmf.user_phone,gmf.weixin,gmf.letv_start,gmf.letv_end," +
                    "gmf.letv_mac,gmf.it_end,tui.spostcode " +
                    "from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td," +
                    "GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc " +
                    "where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername " +
                    "and tu.susername=gmf.username and tu.susername=gi.susername and tu.iispid=ti.iispid " +
                    "and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and tu.iispid="+ml_type;
			}
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c.getTime())+"'";
			get_data_sql+=" and GI.DOVERDATE<TU.DOVERDATE";
		}else if(menu_txt.equals("6")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, -1);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
			
			get_data_sql="select gmf.opt_usetime,gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote," +
                    "gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,bi.name,tu.susername,tui.srealname,ti.sispname," +
                    "gmf.dfirstdate,tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no,gmf.house_type_id,tui.stele," +
                    "tui.semail,gmf.house_type_id,gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name," +
                    "gmf.oldnet_prop_id,gmf.user_prop_id,gmf.net_prop," +
                    "gmf.payee,gmf.admit,gmf.user_mobile,gmf.user_phone,gmf.weixin,gmf.letv_start,gmf.letv_end," +
                    "gmf.letv_mac,gmf.it_end,tui.spostcode " +
                    "from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td," +
                    "GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc " +
                    "where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername " +
                    "and tu.susername=gmf.username and tu.susername=gi.susername and tu.iispid=ti.iispid " +
                    "and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and tu.iispid="+ml_type;
			}
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c.getTime())+"'";
			get_data_sql+=" and GI.DOVERDATE=TU.DOVERDATE";
		}else if(menu_txt.equals("7")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, 0);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
			
			get_data_sql="select gmf.opt_usetime,gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote," +
                    "gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,bi.name,gi.susername,tui.srealname,ti.sispname,gmf.dfirstdate," +
                    "gi.doverdate,gi.sfeephone,gmf.group_id,gmf.leaflet_no,gmf.house_type_id,tui.stele,tui.semail," +
                    "gmf.house_type_id,gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name,gmf.oldnet_prop_id," +
                    "gmf.user_prop_id,gmf.net_prop," +
                    "gmf.payee,gmf.admit,gmf.user_mobile,gmf.user_phone,gmf.weixin,gmf.letv_start,gmf.letv_end," +
                    "gmf.letv_mac,gmf.it_end,tui.spostcode " +
                    "from gtm_gg_state gg,gtm_cat_type cat,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf," +
                    "GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc " +
                    "where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and gi.susername=tui.susername " +
                    "and gi.susername=gmf.username and gi.iispid=ti.iispid and gi.idistid=td.idistid and gmf.contract_id=gc.contract_id " +
                    "and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and gi.iispid="+ml_type;
			}
			Calendar c1 = Calendar.getInstance();
			c1.add(Calendar.MONTH, -1);
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c1.getTime())+"'";
		}else if(menu_txt.equals("8")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, -1);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
			
			get_data_sql="select gmf.opt_usetime,gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote," +
                    "gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,bi.name,tu.susername,tui.srealname,ti.sispname,gmf.dfirstdate," +
                    "tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no,gmf.house_type_id,tui.stele,tui.semail,gmf.house_type_id," +
                    "gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name,gmf.oldnet_prop_id,gmf.user_prop_id,gmf.net_prop," +
                    "gmf.payee,gmf.admit,gmf.user_mobile,gmf.user_phone,gmf.weixin,gmf.letv_start,gmf.letv_end," +
                    "gmf.letv_mac,gmf.it_end,tui.spostcode " +
                    "from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf," +
                    "GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc " +
                    "where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername and tu.susername=gmf.username " +
                    "and tu.susername=gi.susername and tu.iispid=ti.iispid and tu.idistid=td.idistid and gmf.contract_id=gc.contract_id " +
                    "and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and tu.iispid="+ml_type;
			}
			Calendar c1 = Calendar.getInstance();
			c1.add(Calendar.MONTH, -2);
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c1.getTime())+"'";
			get_data_sql+=" and GI.DOVERDATE<TU.DOVERDATE";
		}else if(menu_txt.equals("9")){
			
			String ml_type=request.getParameter("ml_type");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, -1);
			String old_table="GTAO_INFO_"+new SimpleDateFormat("yyyyMM").format(c.getTime());
			
			get_data_sql="select gmf.opt_usetime,gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote," +
                    "gmf.sbnote,gmf.zhnote,gmf.tsnote,gmf.isit,bi.name,tu.susername,tui.srealname,ti.sispname,gmf.dfirstdate," +
                    "tu.doverdate,tu.sfeephone,gmf.group_id,gmf.leaflet_no,gmf.house_type_id,tui.stele,tui.semail,gmf.house_type_id," +
                    "gmf.line_type_id,gmf.save_admin,gmf.save_time,gc.contract_name,gmf.oldnet_prop_id,gmf.user_prop_id,gmf.net_prop," +
                    "gmf.payee,gmf.admit,gmf.user_mobile,gmf.user_phone,gmf.weixin,gmf.letv_start,gmf.letv_end," +
                    "gmf.letv_mac,gmf.it_end,tui.spostcode " +
                    "from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td,GTM_MAINFORM_INFO gmf," +
                    "GTM_BUSINESS_INFO bi,"+old_table+" gi,gtm_contract gc " +
                    "where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername " +
                    "and tu.susername=gmf.username and tu.susername=gi.susername and tu.iispid=ti.iispid and tu.idistid=td.idistid " +
                    "and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
			
			if(!bs_name.equals("")){
				get_data_sql+=" and gmf.department_id="+bs_name;
			}
			if(!ml_type.equals("")){
				get_data_sql+=" and tu.iispid="+ml_type;
			}
			Calendar c1 = Calendar.getInstance();
			c1.add(Calendar.MONTH, -2);
			get_data_sql+=" and to_char(GI.DOVERDATE,'yyyy-mm')='"+new SimpleDateFormat("yyyy-MM").format(c1.getTime())+"'";
			get_data_sql+=" and GI.DOVERDATE=TU.DOVERDATE";
		}
		
		get_data_sql+=" order by bi.id";
		
		gridStr+="所属营业厅,营业厅分组,宣传单号,用户账号,更换帐号备注,用户姓名,使用餐型,启用时间,重新启用时间,截止时间,详细地址,是否IT卡用户,光猫类型,光改情况,光纤开通时间,房屋性质,走线方式,报装人电话,邮箱地址,所属合同,餐型备注,活动备注,设备备注,特殊备注,原网络类型,用户性质,网络性质,收款人,接待人,使用人电话,固话,微信用户,IT卡到期时间,乐视起始时间,乐视到期时间,乐视MAC地址,光猫MAC地址,录入人,录入时间, \r\n";
		//System.out.println(get_data_sql);
		rs=st.executeQuery(get_data_sql);
		while(rs.next()){
			if(rs.getString("name")!=null){
				gridStr+=new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("group_id")!=null){
				gridStr+=rs.getString("group_id")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("leaflet_no")!=null){
				gridStr+=rs.getString("leaflet_no")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("susername")!=null){
				gridStr+=new String(rs.getString("susername").getBytes("iso-8859-1"),"gbk")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("zhnote")!=null){
				gridStr+=new String(rs.getString("zhnote").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("srealname")!=null){
				gridStr+=new String(rs.getString("srealname").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("sispname")!=null){
				gridStr+=new String(rs.getString("sispname").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("dfirstdate")!=null){
				gridStr+=rs.getString("dfirstdate")+"-01,";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("redate")!=null){
				gridStr+=rs.getString("redate")+"-01,";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("doverdate")!=null){
				gridStr+=rs.getDate("doverdate")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("sfeephone")!=null){
				gridStr+=new String(rs.getString("sfeephone").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("isit")!=null){
				if(rs.getInt("isit")==1){
					gridStr+="是, ";
				}else{
					gridStr+="否, ";
				}
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("cat_name")!=null){
				gridStr+=new String(rs.getString("cat_name").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("gg_name")!=null){
				gridStr+=new String(rs.getString("gg_name").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("opt_usetime")!=null){
				gridStr+=rs.getDate("opt_usetime")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("house_type_id")!=null){
				if(rs.getInt("house_type_id")==1){
					gridStr+="租用, ";
				}else if(rs.getInt("house_type_id")==2){
					gridStr+="私有, ";
				}
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("line_type_id")!=null){
				if(rs.getInt("line_type_id")==1){
					gridStr+="明线, ";
				}else if(rs.getInt("line_type_id")==2){
					gridStr+="暗线, ";
				}
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("stele")!=null){
				gridStr+=new String(rs.getString("stele").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";").replaceFirst("(^;)+", "").replaceFirst("(,$)+", "")+", ";				
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("semail")!=null){
				gridStr+=new String(rs.getString("semail").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";				
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("contract_name")!=null){
				gridStr+=new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";				
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("cxnote")!=null){
				gridStr+=new String(rs.getString("cxnote").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";				
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("hdnote")!=null){
				gridStr+=new String(rs.getString("hdnote").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("sbnote")!=null){
				gridStr+=new String(rs.getString("sbnote").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+",";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("tsnote")!=null){
				gridStr+=new String(rs.getString("tsnote").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+",";
			}else{
				gridStr+=" ,";
			}
            if(rs.getString("oldnet_prop_id")!=null){
                if(rs.getInt("oldnet_prop_id")==0){
                    gridStr+="无, ";
                }else if(rs.getInt("oldnet_prop_id")==1){
                    gridStr+="铁通, ";
                }else if(rs.getInt("oldnet_prop_id")==2){
                    gridStr+="联通, ";
                }else if(rs.getInt("oldnet_prop_id")==3){
                    gridStr+="中宽, ";
                }else if(rs.getInt("oldnet_prop_id")==4){
                    gridStr+="宽带通, ";
                }else if(rs.getInt("oldnet_prop_id")==5){
                    gridStr+="长城宽带, ";
                }else if(rs.getInt("oldnet_prop_id")==6){
                    gridStr+="方正宽带, ";
                }else if(rs.getInt("oldnet_prop_id")==7){
                    gridStr+="其他, ";
                }
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("user_prop_id")!=null){
                if(rs.getInt("user_prop_id")==0){
                    gridStr+="无, ";
                }else if(rs.getInt("user_prop_id")==1){
                    gridStr+="普通用户, ";
                }else if(rs.getInt("user_prop_id")==2){
                    gridStr+="平房用户, ";
                }else if(rs.getInt("user_prop_id")==3){
                    gridStr+="底商用户, ";
                }else if(rs.getInt("user_prop_id")==4){
                    gridStr+="企业用户, ";
                }else if(rs.getInt("user_prop_id")==5){
                    gridStr+="优惠用户, ";
                }else if(rs.getInt("user_prop_id")==6){
                    gridStr+="免费用户, ";
                }
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("net_prop")!=null){
                if(rs.getInt("net_prop")==0){
                    gridStr+="无, ";
                }else if(rs.getInt("net_prop")==1){
                    gridStr+="光纤用户, ";
                }else if(rs.getInt("net_prop")==1){
                    gridStr+="非光纤用户, ";
                }
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("payee")!=null){
                gridStr+=new String(rs.getString("payee").getBytes("iso-8859-1"),"gbk")+", ";
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("admit")!=null){
                gridStr+=new String(rs.getString("admit").getBytes("iso-8859-1"),"gbk")+", ";
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("user_mobile")!=null){
                gridStr+=rs.getString("user_mobile")+", ";
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("user_phone")!=null){
                gridStr+=rs.getString("user_phone")+", ";
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("weixin")!=null){
                if(rs.getInt("weixin")==0){
                    gridStr+="否, ";
                }else if(rs.getInt("weixin")==1){
                    gridStr+="是, ";
                }
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("it_end")!=null){
                gridStr+=rs.getDate("it_end")+", ";
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("letv_start")!=null){
                gridStr+=rs.getDate("letv_start")+", ";
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("letv_end")!=null){
                gridStr+=rs.getDate("letv_end")+", ";
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("letv_mac")!=null){
                gridStr+=rs.getString("letv_mac")+", ";
            }else{
                gridStr+=" ,";
            }
            if(rs.getString("spostcode")!=null){
                gridStr+=rs.getString("spostcode")+", ";
            }else{
                gridStr+=" ,";
            }
			if(rs.getString("save_admin")!=null){
				gridStr+=new String(rs.getString("save_admin").getBytes("iso-8859-1"),"gbk")+", ";
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("save_time")!=null){
				gridStr+=rs.getString("save_time")+", ";
			}else{
				gridStr+=" , ";
			}		
			gridStr+="\r\n";
		}
		
	rs.close();
	st.close();
	conn.close();
	
	response.setContentType("application/vnd.ms-excel;charset=GBK");
	response.setHeader("Content-Disposition", "attachment;filename=\"excel.csv\"");
	response.getWriter().print(gridStr);
    out.clear();
    out = pageContext.pushBody();
%>
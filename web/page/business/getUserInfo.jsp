<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String username=request.getParameter("username").toLowerCase();
	String gluser=request.getParameter("gluser").toLowerCase();
	String bsn=request.getParameter("bs_name");
	String dwIsExist_sql="select count(*) from TBL_USERS u,TBL_DISTLIST dl,TBL_STATIONLIST sl where u.idistid=dl.idistid and dl.istationid=sl.istationid and u.SUSERNAME='"+username+"' and u.ISTATUS<>-9";
	String mfIsExist_sql="select count(*) from GTM_MAINFORM_INFO where username='"+username+"'";
	String getUserinfo_sql="SELECT u.SUSERNAME,ui.SREALNAME,i.SISPNAME,u.SFEEPHONE,sl.istationid FROM TBL_USERS u,TBL_USERSINFO ui,TBL_ISPLIST i,TBL_DISTLIST dl,TBL_STATIONLIST sl WHERE u.SUSERNAME=ui.SUSERNAME and u.IISPID=i.IISPID and u.idistid=dl.idistid and dl.istationid=sl.istationid and u.SUSERNAME='"+username+"'";
	String getBI_sql="select name from GTM_BUSINESS_INFO where id=";
	String getGluser_sql="select * from GTM_MAINFORM_INFO gmf,gtm_cat_type ct,gtm_contract gc where gmf.contract_id=gc.contract_id and gmf.cat_type_id=ct.cat_id and username='"+gluser+"'";
	if(!bsn.equals("")){		
		if(bsn.equals("1")){
			dwIsExist_sql+=" AND (sl.istationid=1 or sl.istationid=2 or sl.istationid=0)";
		}else{
			dwIsExist_sql+=" AND (sl.istationid="+bsn+" or sl.istationid=0)";
		}
	}
	String status="";
	String userinfo="";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	rs=st.executeQuery(dwIsExist_sql);
	rs.next();
	if(rs.getInt(1)==1){
		rs=st.executeQuery(mfIsExist_sql);
		rs.next();
		if(rs.getInt(1)==0){
			status="1";
			rs=st.executeQuery(getUserinfo_sql);
			if(rs.next()){
				userinfo="username:'"+rs.getString("SUSERNAME")+"',";
				userinfo+="realname:'"+new String(rs.getString("SREALNAME").getBytes("iso-8859-1"),"gbk")+"',";				
				userinfo+="bandtype:'"+new String(rs.getString("SISPNAME").getBytes("iso-8859-1"),"gbk")+"',";		
				if(rs.getString("SFEEPHONE")!=null){
					userinfo+="addr:'"+new String(rs.getString("SFEEPHONE").getBytes("iso-8859-1"),"gbk")+"',";
				}else{
					userinfo+="addr:'',";
				}
				int bi=rs.getInt("istationid");
				if(bi==1 || bi==2){
					bi=1;
				}
				rs=st.executeQuery(getBI_sql+bi);
				rs.next();
				userinfo+="bs_name:'"+new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',";
				if(!gluser.equals("")){
					rs=st.executeQuery(getGluser_sql);
					if(rs.next()){
						if(rs.getString("opt_usetime")!=null){
							userinfo+="opt_time:'"+rs.getDate("opt_usetime")+"',";
						}else{
							userinfo+="opt_time:'',";
						}
						if(rs.getString("isit")!=null){
							if(rs.getInt("isit")==1){
								userinfo+="isit:'是',";
							}else{
								userinfo+="isit:'否',";
							}
						}else{
							userinfo+="isit:'',";				
						}
						if(rs.getString("dfirstdate")!=null){
							userinfo+="starttime:'"+rs.getString("dfirstdate")+"',";
						}else{
							userinfo+="starttime:'',";
						}
						if(rs.getString("group_id")!=null){
							userinfo+="group_id:'"+rs.getString("group_id")+"',";
						}else{
							userinfo+="group_id:'',";
						}
						if(rs.getString("leaflet_no")!=null){
							userinfo+="leaflet_no:'"+rs.getString("leaflet_no")+"',";
						}else{
							userinfo+="leaflet_no:'',";
						}
						if(rs.getString("house_type_id")!=null){
							if(rs.getInt("house_type_id")==1){
								userinfo+="house_type:'租用',";
							}else if(rs.getInt("house_type_id")==2){
								userinfo+="house_type:'私有',";
							}
						}else{
							userinfo+="house_type:'',";				
						}
						if(rs.getString("line_type_id")!=null){
							if(rs.getInt("line_type_id")==1){
								userinfo+="line_type:'明线',";
							}else if(rs.getInt("line_type_id")==2){
								userinfo+="line_type:'暗线',";
							}
						}else{
							userinfo+="line_type:'',";				
						}
						if(rs.getString("contract_name")!=null){
							userinfo+="contract_name:'"+new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+"',";
						}else{
							userinfo+="contract_name:'',";
						}
						if(rs.getString("redate")!=null){
							userinfo+="mf_retime:'"+rs.getString("redate")+"',";
						}else{
							userinfo+="mf_retime:'',";
						}					
						userinfo+="mf_gm:'"+new String(rs.getString("cat_name").getBytes("iso-8859-1"),"gbk")+"',";
						userinfo+="mf_gg:'"+rs.getString("gg_id")+"',";
						if(rs.getString("cxnote")!=null){
							userinfo+="mf_cxnote:'"+new String(rs.getString("cxnote").getBytes("iso-8859-1"),"gbk")+"',";
						}else{
							userinfo+="mf_cxnote:'',";
						}
						if(rs.getString("hdnote")!=null){
							userinfo+="mf_hdnote:'"+new String(rs.getString("hdnote").getBytes("iso-8859-1"),"gbk")+"',";
						}else{
							userinfo+="mf_hdnote:'',";
						}
						if(rs.getString("sbnote")!=null){
							userinfo+="mf_sbnote:'"+new String(rs.getString("sbnote").getBytes("iso-8859-1"),"gbk")+"',";
						}else{
							userinfo+="mf_sbnote:'',";
						}
						if(rs.getString("zhnote")!=null){
							userinfo+="mf_zhnote:'"+new String(rs.getString("zhnote").getBytes("iso-8859-1"),"gbk")+"',";
						}else{
							userinfo+="mf_zhnote:'',";
						}
						if(rs.getString("tsnote")!=null){
							userinfo+="mf_tsnote:'"+new String(rs.getString("tsnote").getBytes("iso-8859-1"),"gbk")+"'";
						}else{
							userinfo+="mf_tsnote:''";
						}
					}
					
				}
			}
		}else{
			status="2";
		}		
	}else{
		status="0";
	}
	
	rs.close();
	st.close();
	conn.close();
	//System.out.println(userinfo);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{isExist:"+status+","+userinfo+"}");
	
%>
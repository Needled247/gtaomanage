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
	String qb_hetong=request.getParameter("qb_hetong");
	String big_id=request.getParameter("big_id");
	String qydate=request.getParameter("qydate");
	String xqtime=request.getParameter("xqtime");
	String ggtime=request.getParameter("ggtime");
	String qb_bs_name=request.getParameter("qb_bs_name");
	String ht_type=request.getParameter("ht_type");
	String isgg=request.getParameter("isgg");
	String isxk=request.getParameter("isxk");
	String isjz=request.getParameter("isjz");
	String jzbrand=request.getParameter("jzbrand");
	//System.out.println(qb_hetong+","+big_id+","+qydate+","+xqtime+","+ggtime+","+qb_bs_name+","+ht_type+","+isgg+","+isxk+","+isjz+","+jzbrand);
	
	String get_data_sql="select * from gtm_contract gc,gtm_business_info bi where gc.hall_id=bi.id";
	String get_count_sql="select count(*) from gtm_contract gc,gtm_business_info bi where gc.hall_id=bi.id";
	String gridStr="";
	int count=0;
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();		
				
			if(!qb_hetong.equals("")){
				get_data_sql+=" and gc.contract_id="+qb_hetong;
				get_count_sql+=" and gc.contract_id="+qb_hetong;
			}
			if(!big_id.equals("")){
				get_data_sql+=" and gc.big_id="+big_id;
				get_count_sql+=" and gc.big_id="+big_id;
			}
			if(!qydate.equals("")){
				get_data_sql+=" and to_char(gc.sign_date,'yyyy-mm')='"+qydate+"'";
				get_count_sql+=" and to_char(gc.sign_date,'yyyy-mm')='"+qydate+"'";
			}
			if(!xqtime.equals("")){
				get_data_sql+=" and to_char(gc.xq_open_date,'yyyy-mm')='"+xqtime+"'";
				get_count_sql+=" and to_char(gc.xq_open_date,'yyyy-mm')='"+xqtime+"'";
			}
			if(!ggtime.equals("")){
				get_data_sql+=" and to_char(gc.gg_open_date,'yyyy-mm')='"+ggtime+"'";
				get_count_sql+=" and to_char(gc.gg_open_date,'yyyy-mm')='"+ggtime+"'";
			}
			if(!qb_bs_name.equals("")){
				get_data_sql+=" and gc.hall_id="+qb_bs_name;
				get_count_sql+=" and gc.hall_id="+qb_bs_name;
			}
			if(!ht_type.equals("")){
				get_data_sql+=" and gc.contract_type="+ht_type;
				get_count_sql+=" and gc.contract_type="+ht_type;
			}
			if(!isgg.equals("")){
				get_data_sql+=" and gc.is_gg="+isgg;
				get_count_sql+=" and gc.is_gg="+isgg;
			}
			if(!isxk.equals("")){
				get_data_sql+=" and gc.is_xk="+isxk;
				get_count_sql+=" and gc.is_xk="+isxk;
			}
			if(!isjz.equals("")){
				get_data_sql+=" and gc.is_jz="+isjz;
				get_count_sql+=" and gc.is_jz="+isjz;
			}
			if(!jzbrand.equals("")){
				get_data_sql+=" and gc.jz_brand like '%"+new String(jzbrand.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and gc.jz_brand like '%"+new String(jzbrand.getBytes("gbk"),"iso-8859-1")+"%'";
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
					gridStr+="bi_id:'"+rs.getInt("contract_id")+"',";
					gridStr+="contract_name:'"+new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+"',";
					gridStr+="big_id:'"+rs.getInt("big_id")+"',";
					gridStr+="hall_id:'"+new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',";
					if(rs.getInt("contract_type")==1){
						gridStr+="contract_type:'社区合同',";
					}else if(rs.getInt("contract_type")==2){
						gridStr+="contract_type:'写字楼合同',";
					}else if(rs.getInt("contract_type")==3){
						gridStr+="contract_type:'无合同',";
					}
					if(rs.getDate("sign_date")!=null){
						gridStr+="sign_date:'"+rs.getDate("sign_date")+"',";
					}else{
						gridStr+="sign_date:'',";
					}
					if(rs.getDate("xq_open_date")!=null){
						gridStr+="xq_open_date:'"+rs.getDate("xq_open_date")+"',";
					}else{
						gridStr+="xq_open_date:'',";
					}
					if(rs.getDate("gg_open_date")!=null){
						gridStr+="gg_open_date:'"+rs.getDate("gg_open_date")+"',";
					}else{
						gridStr+="gg_open_date:'',";
					}
					if(rs.getInt("is_gg")==1){
						gridStr+="is_gg:'是',";
					}else if(rs.getInt("is_gg")==0){
						gridStr+="is_gg:'否',";
					}
					if(rs.getInt("is_xk")==1){
						gridStr+="is_xk:'是',";
					}else if(rs.getInt("is_xk")==0){
						gridStr+="is_xk:'否',";
					}
					if(rs.getInt("is_jz")==1){
						gridStr+="is_jz:'是',";
					}else if(rs.getInt("is_jz")==0){
						gridStr+="is_jz:'否',";
					}
					if(rs.getString("jz_brand")!=null){
						gridStr+="jz_brand:'"+new String(rs.getString("jz_brand").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="jz_brand:'',";
					}
					if(rs.getString("live_num")!=null){
						gridStr+="live_num:'"+rs.getString("live_num")+"',";
					}else{
						gridStr+="live_num:'',";
					}
					if(rs.getString("gg_live_num")!=null){
						gridStr+="gg_live_num:'"+rs.getString("gg_live_num")+"',";
					}else{
						gridStr+="gg_live_num:'',";
					}
					if(rs.getString("save_time")!=null){
						gridStr+="save_time:'"+rs.getString("save_time")+"',";
					}else{
						gridStr+="save_time:'',";
					}
					if(rs.getString("save_admin")!=null){
						gridStr+="save_admin:'"+new String(rs.getString("save_admin").getBytes("iso-8859-1"),"gbk")+"'";
					}else{
						gridStr+="save_admin:''";
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
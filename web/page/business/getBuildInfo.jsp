<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String hetong_id=request.getParameter("hetong_id");
	String sql="select * from gtm_contract gc,gtm_business_info bi where gc.contract_id="+hetong_id+" and gc.hall_id=bi.id";
	String buildinfo="";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	rs=st.executeQuery(sql);
	rs.next();
	
	buildinfo="bs_name:'"+new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',";
	buildinfo+="big_id:"+rs.getInt("big_id")+",";
	buildinfo+="hetong_txt:'"+new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+"',";
	buildinfo+="ht_type:"+rs.getInt("contract_type")+",";	
	if(rs.getDate("sign_date")!=null){
		buildinfo+="qydate:'"+rs.getDate("sign_date")+"',";
	}else{
		buildinfo+="qydate:'',";
	}
	if(rs.getDate("xq_open_date")!=null){
		buildinfo+="xqtime:'"+rs.getDate("xq_open_date")+"',";
	}else{
		buildinfo+="xqtime:'',";
	}	
	if(rs.getDate("gg_open_date")!=null){
		buildinfo+="ggtime:'"+rs.getDate("gg_open_date")+"',";
	}else{
		buildinfo+="ggtime:'',";
	}
	buildinfo+="isgg:"+rs.getInt("is_gg")+",";
	buildinfo+="isxk:"+rs.getInt("is_xk")+",";
	buildinfo+="live_num:"+rs.getInt("live_num")+",";
	buildinfo+="gglive_num:"+rs.getInt("gg_live_num")+",";
	buildinfo+="isjz:"+rs.getInt("is_jz")+",";
	if(rs.getString("jz_brand")!=null){
		buildinfo+="jzbrand:'"+new String(rs.getString("jz_brand").getBytes("iso-8859-1"),"gbk")+"',";
	}else{
		buildinfo+="jzbrand:'',";
	}
	buildinfo+="hetong_id:"+hetong_id;
	
	rs.close();
	st.close();
	conn.close();
	//System.out.println(buildinfo);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{"+buildinfo+"}");
	
%>
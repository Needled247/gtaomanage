<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@ page import="service.GTM_Service" %>
<%@ page import="service.GTM_ServiceImpl" %>
<%@ page import="tools.Tools" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.text.NumberFormat" %>

<%
    GTM_Service service = new GTM_ServiceImpl();
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
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String save_admin=request.getParameter("save_admin");
    String contractDate = request.getParameter("date");
	//System.out.println(qb_hetong+","+big_id+","+qydate+","+xqtime+","+ggtime+","+qb_bs_name+","+ht_type+","+isgg+","+isxk+","+isjz+","+jzbrand);
	
	String temp="";
	
			if(!qb_hetong.equals("")){
				temp+=" and gc.contract_id="+qb_hetong;
			}
			if(!big_id.equals("")){
				temp+=" and gc.big_id="+big_id;
			}
			if(!qydate.equals("")){
				temp+=" and to_char(gc.sign_date,'yyyy-mm')='"+qydate+"'";
			}
			if(!xqtime.equals("")){
				temp+=" and to_char(gc.xq_open_date,'yyyy-mm')='"+xqtime+"'";
			}
			if(!ggtime.equals("")){
				temp+=" and to_char(gc.gg_open_date,'yyyy-mm')='"+ggtime+"'";
			}
			if(!qb_bs_name.equals("")){
				temp+=" and gc.hall_id="+qb_bs_name;
			}
			if(!ht_type.equals("")){
				temp+=" and gc.contract_type="+ht_type;
			}
			if(!isgg.equals("")){
				temp+=" and gc.is_gg="+isgg;
			}
			if(!isxk.equals("")){
				temp+=" and gc.is_xk="+isxk;
			}
			if(!isjz.equals("")){
				temp+=" and gc.is_jz="+isjz;
			}
			if(!jzbrand.equals("")){
				temp+=" and gc.jz_brand like '%"+new String(jzbrand.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!save_admin.equals("")){
				temp+=" and gc.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!startDate.equals("")){
				temp+=" and gc.save_time>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
			}
			if(!endDate.equals("")){
				temp+=" and gc.save_time<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
			}
			if(!temp.equals("")){
				temp=" where"+temp.replaceFirst("^ and", "");
			}		
	
	String get_group_sql="select * from (select gc.contract_id,count(username) from GTM_MAINFORM_INFO gmf join tbl_users tu on tu.susername=gmf.username and tu.istatus<>-9 right join gtm_contract gc on gc.contract_id=gmf.contract_id"+temp+" group by gc.contract_id) where rownum<=";
	String get_data_sql="select * from gtm_contract gc,gtm_business_info bi where gc.hall_id=bi.id and gc.contract_id=";
	String get_count_sql="select count(contract_id) from (select gc.contract_id,count(username) from GTM_MAINFORM_INFO gmf join tbl_users tu on tu.susername=gmf.username and tu.istatus<>-9 right join gtm_contract gc on gc.contract_id=gmf.contract_id"+temp+" group by gc.contract_id)";
	StringBuilder sb = new StringBuilder();
	int count=0;
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	Connection data_conn=null;
	Statement data_st=null;
	ResultSet data_rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	data_conn=ConnPoolBean.getRadiusConn();
	data_st=conn.createStatement();		
				
		int endPage=Integer.parseInt(startPage)+Integer.parseInt(countPage);
		get_group_sql+=endPage+" minus "+get_group_sql+startPage;
		
		rs=st.executeQuery(get_count_sql);
			rs.next();
			count=rs.getInt(1);			
			if(count!=0){
				rs=st.executeQuery(get_group_sql);
				while(rs.next()){							
					sb.append("{");
					sb.append("user_num:'"+rs.getInt(2)+"',");
					data_rs=data_st.executeQuery(get_data_sql+rs.getInt(1));
					data_rs.next();
					if(data_rs.getInt("live_num")==0){
						sb.append("user_percent:'<b><font color=red>0.00</font>%</b>',");
					}else{
						sb.append("user_percent:'<b><font color=red>"+String.format("%.2f",(rs.getFloat(2)/data_rs.getInt("live_num"))*100)+"</font>%</b>',");
					}
                    //获取合同编号
                    int contract_id = data_rs.getInt("contract_id");
                    String thisMonthSuffix = Tools.validateTime2(contractDate);
                    String lastMonth = Tools.datePlus2(contractDate, Calendar.MONTH);
                    String lastMonthSuffix = Tools.validateTime2(lastMonth);
                    //获取查询月和上月在网用户数
                    double thisMonthUserCount = service.getUserCountByContract(contract_id, thisMonthSuffix);
                    double lastMonthUserCount = service.getUserCountByContract(contract_id, lastMonthSuffix);
                    double persent = 0;
                    String fmtPercent;
                    NumberFormat nf = NumberFormat.getPercentInstance();
                    nf.setMinimumFractionDigits(2);
                    if(lastMonthUserCount!=0){
                        persent = ((thisMonthUserCount-lastMonthUserCount)/lastMonthUserCount);
                        fmtPercent = nf.format(persent);
                    }
                    else {
                        fmtPercent = "-.-";
                    }
                    sb.append("bi_id:'" + contract_id + "',");
					sb.append("contract_name:'"+new String(data_rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+"',");
					sb.append("big_id:'"+data_rs.getInt("big_id")+"',");
					sb.append("hall_id:'"+new String(data_rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',");
                    sb.append("userCount:'"+(long)thisMonthUserCount+"',");
                    sb.append("userCount2:'"+(long)lastMonthUserCount+"',");
                    if (fmtPercent.contains("-")){
                        sb.append("percent:'<b><font color=green>"+fmtPercent+"</font></b>',");
                    }
                    else {
                        sb.append("percent:'<b><font color=red>"+fmtPercent+"</font></b>',");
                    }

					if(data_rs.getInt("contract_type")==1){
						sb.append("contract_type:'社区合同',");
					}else if(data_rs.getInt("contract_type")==2){
						sb.append("contract_type:'写字楼合同',");
					}else if(data_rs.getInt("contract_type")==3){
						sb.append("contract_type:'无合同',");
					}
					if(data_rs.getDate("sign_date")!=null){
						sb.append("sign_date:'"+data_rs.getDate("sign_date")+"',");
					}else{
						sb.append("sign_date:'',");
					}
					if(data_rs.getDate("xq_open_date")!=null){
						sb.append("xq_open_date:'"+data_rs.getDate("xq_open_date")+"',");
					}else{
						sb.append("xq_open_date:'',");
					}
					if(data_rs.getDate("gg_open_date")!=null){
						sb.append("gg_open_date:'"+data_rs.getDate("gg_open_date")+"',");
					}else{
						sb.append("gg_open_date:'',");
					}
					if(data_rs.getInt("is_gg")==1){
						sb.append("is_gg:'是',");
					}else if(data_rs.getInt("is_gg")==0){
						sb.append("is_gg:'否',");
					}
					if(data_rs.getInt("is_xk")==1){
						sb.append("is_xk:'是',");
					}else if(data_rs.getInt("is_xk")==0){
						sb.append("is_xk:'否',");
					}
					if(data_rs.getInt("is_jz")==1){
						sb.append("is_jz:'是',");
					}else if(data_rs.getInt("is_jz")==0){
						sb.append("is_jz:'否',");
					}
					if(data_rs.getString("jz_brand")!=null){
						sb.append("jz_brand:'"+new String(data_rs.getString("jz_brand").getBytes("iso-8859-1"),"gbk")+"',");
					}else{
						sb.append("jz_brand:'',");
					}
					if(data_rs.getString("live_num")!=null){
						sb.append("live_num:'"+data_rs.getString("live_num")+"',");
					}else{
						sb.append("live_num:'',");
					}
					if(data_rs.getString("gg_live_num")!=null){
						sb.append("gg_live_num:'"+data_rs.getString("gg_live_num")+"',");
					}else{
						sb.append("gg_live_num:'',");
					}
					if(data_rs.getString("save_time")!=null){
						sb.append("save_time:'"+data_rs.getString("save_time")+"',");
					}else{
						sb.append("save_time:'',");
					}
					if(data_rs.getString("save_admin")!=null){
						sb.append("save_admin:'"+new String(data_rs.getString("save_admin").getBytes("iso-8859-1"),"gbk")+"'");
					}else{
						sb.append("save_admin:''");
					}
					sb.append("},");
				}
			}
		
		if(data_rs!=null){
			data_rs.close();
		}		
		rs.close();
		data_st.close();
		st.close();
		data_conn.close();
		conn.close();

	//System.out.println(gridStr);
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{totalCount:"+count+",data:["+sb+"]}");
	
%>
<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%
	String qc_bs_name=request.getParameter("qc_bs_name");
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String receipt_id=java.net.URLDecoder.decode(request.getParameter("receipt_id"), "UTF-8");
	String username=request.getParameter("username").toLowerCase();
	String pay_type=request.getParameter("pay_type");
	String act_id=request.getParameter("act_id");
	String charge_type=request.getParameter("charge_type");
	String note=java.net.URLDecoder.decode(request.getParameter("note"), "UTF-8");
	String realname=java.net.URLDecoder.decode(request.getParameter("realname"), "UTF-8");
	String addr=java.net.URLDecoder.decode(request.getParameter("addr"), "UTF-8");
	String save_admin=java.net.URLDecoder.decode(request.getParameter("save_admin"), "UTF-8");
	String tel=java.net.URLDecoder.decode(request.getParameter("tel"), "UTF-8");
    //收据，收款人，接待人，餐型，带宽，银行卡号，网银订单号
    String shouju=java.net.URLDecoder.decode(request.getParameter("shouju"), "UTF-8");
    String payee=java.net.URLDecoder.decode(request.getParameter("payee"), "UTF-8");
    String admit=java.net.URLDecoder.decode(request.getParameter("admit"), "UTF-8");
    String quota=java.net.URLDecoder.decode(request.getParameter("quota"), "UTF-8");
    String bandwidth=java.net.URLDecoder.decode(request.getParameter("bandwidth"), "UTF-8");
    String bankcard=java.net.URLDecoder.decode(request.getParameter("bankcard"), "UTF-8");
    String netpay_id=java.net.URLDecoder.decode(request.getParameter("netpay_id"), "UTF-8");
    String pre_month = java.net.URLDecoder.decode(request.getParameter("pre_month"), "UTF-8");
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
	//System.out.println(qc_bs_name+","+charge_date+","+receipt_id+","+username+","+charge_type+","+note+","+realname+","+addr);
	
	String get_data_sql=
    "select ga.act_name,pt.pay_type_name,bi.name,fc.charge_date,fc.username,fc.receipt_id," +
    "fc.is_new,ct.charge_type_name,fc.note,fc.charge_amount,fc.save_admin,fc.save_time,mi.group_id,ui.srealname,ui.stele," +
    "tu.sfeephone,gc.contract_name,gc.is_gg,gc.is_xk,gc.contract_type,fc.shouju,fc.payee,fc.admit,fc.quota,fc.bandwidth," +
    "fc.bankcard,fc.netpay_id,fc.pre_month  " +
    "from gtm_act ga,gtm_pay_type pt,gtm_contract gc,gtm_business_info bi,GTM_MAINFORM_INFO mi," +
    "GTM_CHARGE_TYPE ct,GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO ui,tbl_users tu " +
    "where fc.act_sub_id=ga.act_id and fc.pay_type_id=pt.pay_type_id and fc.username=mi.username " +
    "and fc.username=ui.susername and fc.username=tu.susername and fc.bs_id=bi.id and mi.contract_id=gc.contract_id " +
    "and fc.charge_type_id=ct.charge_type_id";
	String get_total_sql=
    "select sum(fc.charge_amount) from gtm_act ga,gtm_pay_type pt,gtm_contract gc,gtm_business_info bi," +
    "GTM_MAINFORM_INFO mi,GTM_CHARGE_TYPE ct,GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO ui,tbl_users tu " +
    "where fc.act_sub_id=ga.act_id and fc.pay_type_id=pt.pay_type_id and fc.username=mi.username " +
    "and fc.username=ui.susername and fc.username=tu.susername and fc.bs_id=bi.id and mi.contract_id=gc.contract_id " +
    "and fc.charge_type_id=ct.charge_type_id";
	String gridStr="";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();		
			
			if(!startDate.equals("")){
				get_data_sql+=" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
				get_total_sql+=" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";			
			}
			get_data_sql+=" and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
			get_total_sql+=" and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";			
			if(!qc_bs_name.equals("")){
				get_data_sql+=" and fc.bs_id="+qc_bs_name;
				get_total_sql+=" and fc.bs_id="+qc_bs_name;
			}
			if(!receipt_id.equals("")){
				get_data_sql+=" and fc.receipt_id like '%"+new String(receipt_id.getBytes("gbk"),"iso-8859-1")+"%'";
				get_total_sql+=" and fc.receipt_id like '%"+new String(receipt_id.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!username.equals("")){
				get_data_sql+=" and fc.username like '%"+new String(username.getBytes("gbk"),"iso-8859-1")+"%'";
				get_total_sql+=" and fc.username like '%"+new String(username.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!pay_type.equals("")){
				get_data_sql+=" and fc.pay_type_id="+pay_type;
				get_total_sql+=" and fc.pay_type_id="+pay_type;
			}
			if(!charge_type.equals("")){
				get_data_sql+=" and fc.charge_type_id="+charge_type;
				get_total_sql+=" and fc.charge_type_id="+charge_type;
			}
			if(!act_id.equals("")){
				get_data_sql+=" and ga.act_id="+act_id;
				get_total_sql+=" and ga.act_id="+act_id;
			}
			if(!note.equals("")){
				get_data_sql+=" and fc.note like '%"+new String(note.getBytes("gbk"),"iso-8859-1")+"%'";
				get_total_sql+=" and fc.note like '%"+new String(note.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!realname.equals("")){
				get_data_sql+=" and ui.srealname like '%"+new String(realname.getBytes("gbk"),"iso-8859-1")+"%'";
				get_total_sql+=" and ui.srealname like '%"+new String(realname.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!addr.equals("")){
				get_data_sql+=" and tu.sfeephone like '%"+new String(addr.getBytes("gbk"),"iso-8859-1")+"%'";
				get_total_sql+=" and tu.sfeephone like '%"+new String(addr.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!save_admin.equals("")){
				get_data_sql+=" and fc.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
				get_total_sql+=" and fc.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!tel.equals("")){
				get_data_sql+=" and ui.stele like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
				get_total_sql+=" and ui.stele like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
			}
            if(!shouju.equals("")){
                get_data_sql+=" and fc.shouju like '%"+new String(shouju.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.shouju like '%"+new String(shouju.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!payee.equals("")){
                get_data_sql+=" and fc.payee like '%"+new String(payee.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.payee like '%"+new String(payee.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!admit.equals("")){
                get_data_sql+=" and fc.admit like '%"+new String(admit.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.admit like '%"+new String(admit.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!quota.equals("")){
                get_data_sql+=" and fc.quota like '%"+new String(quota.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.quota like '%"+new String(quota.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!bandwidth.equals("")){
                get_data_sql+=" and fc.bandwidth like '%"+new String(bandwidth.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.bandwidth like '%"+new String(bandwidth.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!bankcard.equals("")){
                get_data_sql+=" and fc.bankcard like '%"+new String(bankcard.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.bankcard like '%"+new String(bankcard.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!netpay_id.equals("")){
                get_data_sql+=" and fc.netpay_id like '%"+new String(netpay_id.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.netpay_id like '%"+new String(netpay_id.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!pre_month.equals("")){
                get_data_sql+=" and fc.pre_month=to_date('"+pre_month+"','yyyy-mm')";
                get_total_sql+=" and fc.pre_month=to_date('"+pre_month+"','yyyy-mm')";
            }
		
			get_data_sql+=" order by bi.name";
			
		gridStr+="所属营业厅,收费日期,所属片区,用户姓名,用户账号,联系电话,用户住址,发票号码,收据号码,支付方式,银行卡号,网银订单,收费类别,收费金额,活动名称,餐型类别,带宽,预收月份,备注信息,是否新装用户,是否光改小区,是否写字楼,是否新开小区,所属合同,录入人,收款人,接待人,录入时间, \r\n";
    System.out.println(get_data_sql);
		rs=st.executeQuery(get_data_sql);
		while(rs.next()){
			gridStr+=new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+", ";
			gridStr+=rs.getDate("charge_date")+", ";			
			gridStr+=rs.getInt("group_id")+", ";
			if(rs.getString("srealname")!=null){
				gridStr+=new String(rs.getString("srealname").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			}else{
				gridStr+=" , ";
			}
			gridStr+=new String(rs.getString("username").getBytes("iso-8859-1"),"gbk")+", ";
			if(rs.getString("stele")!=null){
				gridStr+=new String(rs.getString("stele").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";").replaceFirst("(^;)+", "").replaceFirst("(,$)+", "")+", ";				
			}else{
				gridStr+=" ,";
			}
			if(rs.getString("sfeephone")!=null){
				gridStr+=new String(rs.getString("sfeephone").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			}else{
				gridStr+=" , ";
			}
			if(rs.getString("receipt_id")!=null){
				gridStr+=new String(rs.getString("receipt_id").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			}else{
				gridStr+=" , ";
			}
            //收据
            if(rs.getString("shouju")!=null){
                gridStr+=new String(rs.getString("shouju").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
            }else{
                gridStr+=" , ";
            }
			gridStr+=new String(rs.getString("pay_type_name").getBytes("iso-8859-1"),"gbk")+", ";
            //银行卡号、网银订单
            if(rs.getString("bankcard")!=null){
                gridStr+=new String(rs.getString("bankcard").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
            }else{
                gridStr+=" , ";
            }
            if(rs.getString("netpay_id")!=null){
                gridStr+=new String(rs.getString("netpay_id").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
            }else{
                gridStr+=" , ";
            }
			gridStr+=new String(rs.getString("charge_type_name").getBytes("iso-8859-1"),"gbk")+", ";
			gridStr+=rs.getString("charge_amount")+", ";
			gridStr+=new String(rs.getString("act_name").getBytes("iso-8859-1"),"gbk")+", ";
            //餐型类别、带宽
            if(rs.getString("quota")!=null){
                gridStr+=new String(rs.getString("quota").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
            }else{
                gridStr+=" , ";
            }
            if(rs.getString("bandwidth")!=null){
                gridStr+=new String(rs.getString("bandwidth").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
            }else{
                gridStr+=" , ";
            }
            if(rs.getString("pre_month")!=null){
                gridStr+=sdf.format(rs.getDate("pre_month"))+", ";
            }else{
                gridStr+=" , ";
            }
			if(rs.getString("note")!=null){
				gridStr+=new String(rs.getString("note").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			}else{
				gridStr+=" , ";
			}
			if(rs.getInt("is_new")==1){
				gridStr+="是, ";
			}else if(rs.getInt("is_new")==0){
				gridStr+="否, ";
			}
			if(rs.getInt("is_gg")==1){
				gridStr+="是, ";
			}else if(rs.getInt("is_gg")==0){
				gridStr+="否, ";
			}
			if(rs.getInt("contract_type")==2){
				gridStr+="是, ";
			}else{
				gridStr+="否, ";
			}
			if(rs.getInt("is_xk")==1){
				gridStr+="是, ";
			}else if(rs.getInt("is_xk")==0){
				gridStr+="否, ";
			}
			gridStr+=new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
			gridStr+=new String(rs.getString("save_admin").getBytes("iso-8859-1"),"gbk")+", ";
            //收款人、接待人
            if(rs.getString("payee")!=null){
                gridStr+=new String(rs.getString("payee").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
            }else{
                gridStr+=" , ";
            }
            if(rs.getString("admit")!=null){
                gridStr+=new String(rs.getString("admit").getBytes("iso-8859-1"),"gbk").replaceAll(",", ";")+", ";
            }else{
                gridStr+=" , ";
            }
			gridStr+=rs.getString("save_time")+", ";
			gridStr+="\r\n";
		}
	
	rs=st.executeQuery(get_total_sql);
	rs.next();
	gridStr+=",,,,,,,,,,合计 : "+rs.getString(1)+", ";
		
	rs.close();
	st.close();
	conn.close();
	
	response.setContentType("application/vnd.ms-excel;charset=GBK");
	response.setHeader("Content-Disposition", "attachment;filename=\"excel.csv\"");
	response.getWriter().print(gridStr);
    response.getWriter().close();
%>
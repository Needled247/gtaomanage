<%@page language="java" import="java.util.Date" pageEncoding="UTF-8"%>
<%@page import="java.util.TimeZone"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String list_name=request.getParameter("list_name");
	list_name=new String(list_name.getBytes("gbk"),"iso-8859-1");
	String changedStr=request.getParameter("changedStr");
	changedStr=new String(changedStr.getBytes("gbk"),"iso-8859-1");
	String admin_name=String.valueOf(session.getAttribute("name"));
	String did=String.valueOf(session.getAttribute("did"));	
	String charge_id=request.getParameter("fc_id");	
	String bs_name=request.getParameter("fc_bs");
	String username=request.getParameter("fc_user").toLowerCase();
	String is_new=request.getParameter("fc_isnew");
	String receipt_id=request.getParameter("fc_rid").trim();
	receipt_id=new String(receipt_id.getBytes("gbk"),"iso-8859-1");
	String charge_type_id=request.getParameter("fc_ct");
	String pay_type_id=request.getParameter("fc_pt");
	String charge_amount=request.getParameter("fc_amount");
	String note=request.getParameter("fc_note").replaceAll("\r|\n", " ").replaceAll("'", "");
	note=new String(note.getBytes("gbk"),"iso-8859-1");
	String true_name=new String(String.valueOf(session.getAttribute("true_name")).getBytes("gbk"),"iso-8859-1");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	TimeZone timeZoneChina = TimeZone.getTimeZone("Asia/Shanghai");
	sdf.setTimeZone(timeZoneChina);
	String save_time=sdf.format(new Date());
	save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
	String charge_date=request.getParameter("fc_date");
	charge_date="to_date('"+charge_date+"','yyyy-mm-dd')";
    /**
     * 新加字段
     * 收据，收款人，接待人，餐型，带宽，银行卡号，网银订单号
     */
    String shouju = new String(request.getParameter("fc_shouju").getBytes("GBK"),"ISO-8859-1").trim();
    String payee = new String(request.getParameter("fc_payee").getBytes("GBK"),"ISO-8859-1");
    String admit = new String(request.getParameter("fc_admit").getBytes("GBK"),"ISO-8859-1");
    String fc_actsub = new String(request.getParameter("fc_actsub").getBytes("GBK"),"ISO-8859-1");
    String fc_presentation = request.getParameter("fc_presentation");
    String quota = "";
    String bandwidth = "";
    if(request.getParameter("fc_quota")!=null){
        quota = new String(request.getParameter("fc_quota").getBytes("GBK"),"ISO-8859-1");
    }
    if(request.getParameter("fc_bw")!=null){
        bandwidth = new String(request.getParameter("fc_bw").getBytes("GBK"),"ISO-8859-1");
    }
    String bank_card = "";
    String netpay_id = "";
    if(request.getParameter("bank_card")!=null){
        bank_card = new String(request.getParameter("bank_card").getBytes("GBK"),"ISO-8859-1").trim();
    }
    if(request.getParameter("netpay_id")!=null){
        netpay_id = new String(request.getParameter("netpay_id").getBytes("GBK"),"ISO-8859-1");
    }

	String get_max_sql="select charge_id from gtm_front_charge_new where rownum=1 order by charge_id desc";
	int cid=1;
	String sql_first=
    "insert into gtm_front_charge_new " +
    "values("+bs_name+","+charge_date+",'"+username+"',"+is_new+",'"+receipt_id+"',"
    +charge_type_id+","+charge_amount+",'"+note+"','"+true_name+"',"+save_time+",";

	String sql_end=
    ","+pay_type_id+","+fc_actsub+",'"+shouju+"','"+payee+"','"+admit+"','"+quota+"','"
    +bandwidth+"','"+bank_card+"','"+netpay_id+"')";

	String update_sql=
    "update gtm_front_charge_new set " +
    "bs_id="+bs_name+",is_new="+is_new+",receipt_id='"+receipt_id+"',charge_type_id="+charge_type_id+"," +
    "charge_amount="+charge_amount+",note='"+note+"',pay_type_id="+pay_type_id+"," +
    "act_sub_id="+fc_actsub+",shouju='"+shouju+"',payee='"+payee+"',admit='"+admit+"',quota='"+quota+"'," +
    "bandwidth='"+bandwidth+"',bankcard='"+bank_card+"',netpay_id='"+netpay_id +
    "' where charge_id="+charge_id;
	
	String get_logmax_sql="select log_id from gtm_log where rownum=1 order by log_id desc";
	int logId=1;
	String sql_logadd_first="insert into gtm_log values(";
	String sql_logadd_end=",'"+list_name+"','"+admin_name+"','"+true_name+"',"+save_time+",'"+changedStr+"',"+did+",'";

		
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
    int count = 0;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();
	
	rs=st.executeQuery(get_logmax_sql);
	if(rs.next()){
		logId=rs.getInt("log_id")+1;
	}
	
	if(charge_id.equals("")){
		rs=st.executeQuery(get_max_sql);
		if(rs.next()){
			cid=rs.getInt("charge_id")+1;
		}
		count = st.executeUpdate(sql_first+cid+sql_end);
		st.executeUpdate(sql_logadd_first+logId+sql_logadd_end+cid+"')");
        if(!receipt_id.equals("")){
            String invoice_sql = "UPDATE GTM_INVOICE SET USED=1,CHARGE_ID="+cid+" WHERE INVOICE_ID="+receipt_id;
            st.executeUpdate(invoice_sql);
        }
	}else{
		count = st.executeUpdate(update_sql);
		st.executeUpdate(sql_logadd_first+logId+sql_logadd_end+charge_id+"')");
	}

    /*
        光猫款项
     */
    if(request.getParameter("gm_cost")!=null&&request.getParameter("gm_cost").equals("1")){
        rs=st.executeQuery(get_max_sql);
        int chargeId = 1;
        if(rs.next()){
            chargeId=rs.getInt("charge_id")+1;
        }
        String first="insert into gtm_front_charge_new " +
                "values("+bs_name+","+charge_date+",'"+username+"',"+is_new+",'"+receipt_id+"',13,"+request.getParameter("gm_cash")+",'"
                +note+"','"+true_name+"',"+save_time+",";
        String end=","+pay_type_id+","+fc_actsub+",'"+shouju+"','"+payee+"','"+admit+"','','','"+bank_card+"','"+netpay_id+"')";
        st.executeUpdate(first+chargeId+end);
    }

    /*
        安装费用
     */
    if(request.getParameter("setup_cost")!=null&&request.getParameter("setup_cost").equals("1")){
        rs=st.executeQuery(get_max_sql);
        int chargeId = 1;
        if(rs.next()){
            chargeId=rs.getInt("charge_id")+1;
        }
        String first=
        "insert into gtm_front_charge_new " +
        "values("+bs_name+","+charge_date+",'"+username+"',"+is_new+",'"+receipt_id+"',1,"+request.getParameter("setup_cash")+",'"
        +note+"','"+true_name+"',"+save_time+",";
        String end=","+pay_type_id+","+fc_actsub+",'"+shouju+"','"+payee+"','"+admit+"','','','"+bank_card+"','"+netpay_id+"')";
        st.executeUpdate(first+chargeId+end);
    }

    /*
    餐型、带宽修改
     */
    if(Integer.parseInt(charge_type_id)>=2&&Integer.parseInt(charge_type_id)<=9){
        String updSql =
        "UPDATE GTM_MAINFORM_INFO SET CXNOTE='"+quota+","+bandwidth+"' " +
        "WHERE USERNAME='"+username.toLowerCase()+"'";
        st.executeUpdate(updSql);
    }

    /*
    修改用户活动、赠送月份
     */
    if(fc_actsub!=null&&fc_presentation!=null){
        String actionSql =
        "UPDATE GTM_MAINFORM_INFO SET PAYEE="+fc_actsub+",ADMIT="+fc_presentation+" " +
        "WHERE USERNAME='"+username.toLowerCase()+"'";
        st.executeUpdate(actionSql);
        //记录变更
        String ActionRecordSql =
        "INSERT INTO GTM_ACTION_HISTORY(USERID,ACTION_DATE,ACTION_NAME,PRESENTATION)" +
        "VALUES('"+username.toLowerCase()+"',"+charge_date+","+fc_actsub+","+fc_presentation+")";
        st.executeUpdate(ActionRecordSql);
    }

    if(count >0 ){
        out.print("{success:true,msg:'操作成功!'}");
    }
    else{
        out.print("{success:false,msg:'操作失败，请联系系统管理员...'}");
    }

	if(rs!=null){
		rs.close();
	}
    out.flush();
    out.close();
	st.close();
	conn.close();
	
%>
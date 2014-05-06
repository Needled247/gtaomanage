<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.text.NumberFormat"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.Calendar" %>

<%	
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String bs_id=request.getParameter("bs_id");
	String bs_name=java.net.URLDecoder.decode(request.getParameter("bs_name"), "UTF-8");
	String temp="";
	String temp1="";
	String temp2="";
	if(!bs_id.equals("")){
		temp=" and fc.bs_id="+bs_id;
		temp1=" and zc.zc_bs_id="+bs_id;
		temp2=" and nc.bs_id="+bs_id;
	}else{
		bs_name="所有营业厅";
	}
	//String get_chdate_sql="select sr.charge_date from (select fc.charge_date from gtm_front_charge_new fc where fc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and fc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp+" union all select nc.charge_date from gtm_nonuser_charge nc where nc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and nc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp2+") sr group by sr.charge_date order by sr.charge_date";
	String get_chdate_sql=
    "select * from (select fc.charge_date from gtm_front_charge_new fc where fc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') " +
    "and fc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp+" union select nc.charge_date " +
    "from gtm_nonuser_charge nc where nc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') " +
    "and nc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp2+")";
	String get_chstart_sql=
    "select sum(sr.charge_amount) from (select fc.pay_type_id,fc.charge_amount from gtm_front_charge_new fc " +
    "where fc.charge_date=TO_DATE('";
	String get_chcenter_sql=
    "', 'yyyy-mm-dd')"+temp+" union all select nc.pay_type_id,nc.charge_amount from gtm_nonuser_charge nc " +
    "where nc.charge_date=TO_DATE('";
	String get_chend_sql=
    "', 'yyyy-mm-dd')"+temp2+") sr right join gtm_pay_type pt on sr.pay_type_id=pt.pay_type_id " +
    "group by pt.pay_type_id order by pt.pay_type_id";
	String get_chtotal_sql=
    "select sum(sr.charge_amount) from (select fc.pay_type_id,fc.charge_amount from gtm_front_charge_new fc " +
    "where fc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') and fc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"
    +temp+" union all select nc.pay_type_id,nc.charge_amount from gtm_nonuser_charge nc " +
    "where nc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') " +
    "and nc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp2+") sr right join gtm_pay_type pt " +
    "on sr.pay_type_id=pt.pay_type_id group by pt.pay_type_id order by pt.pay_type_id";
	String get_zcdate_sql=
    "select zc.zc_date from gtm_zc_charge zc where zc.zc_date>=to_date('"+startDate+"','yyyy-mm-dd') " +
    "and zc.zc_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp1+" group by zc.zc_date order by zc.zc_date";
	String get_zcstart_sql=
    "select sum(zc.zc_amount) from gtm_zc_charge zc right join gtm_zc_type zt on zc.zc_type_id=zt.zc_type_id and zc.zc_date=TO_DATE('";
	String get_zcend_sql="', 'yyyy-mm-dd')"+temp1+" group by zt.zc_type_id order by zt.zc_type_id";
	String get_zctotal_sql="select sum(zc.zc_amount) from gtm_zc_charge zc right join gtm_zc_type zt " +
    "on zc.zc_type_id=zt.zc_type_id and zc.zc_date>=to_date('"+startDate+"','yyyy-mm-dd') " +
    "and zc.zc_date<=to_date('"+endDate+"','yyyy-mm-dd')"+temp1+" group by zt.zc_type_id order by zt.zc_type_id";
    /*
    获取总退款SQL
     */
    String backCashSql =
    "SELECT SUM(fc.CHARGE_AMOUNT) FROM gtm_front_charge_new fc WHERE fc.charge_date>=to_date('"+startDate+"','yyyy-mm-dd') " +
    "and fc.charge_date<=to_date('"+endDate+"','yyyy-mm-dd') AND fc.CHARGE_AMOUNT<0"+temp;
	
	String gridStr="";
	
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
	String noht="";
	int count=1;
	String sr_cash="";
	double sr_total_cash=0;
	double zc_total_cash=0;
    double back_total_cash = 0;
	
	gridStr+=",,"+bs_name+startDate+"至"+endDate+"收入汇总\r\n\r\n";
	gridStr+="日期,现金收入,固定POS机收入,移动POS机收入,银联网上支付,快钱网上支付,农行支付,支票支付,代扣费 \r\n";
	rs=st.executeQuery(get_chdate_sql);
    //得到日期列表:其实日期到结束日期
				while(rs.next()){
                    //第一列日期
					gridStr+=rs.getDate(1)+",";
					data_rs=data_st.executeQuery(get_chstart_sql+rs.getDate(1)+get_chcenter_sql+rs.getDate(1)+get_chend_sql);
                    //循环日期列表，得到各个当前日期支付方式明细
					while(data_rs.next()){
						noht=data_rs.getString(1);
						if(noht==null){
							noht="0";	
						}
						gridStr+=noht+",";						
					}
					gridStr+="\r\n";
				}
                gridStr+=",";
                rs=st.executeQuery(get_chtotal_sql);
                //各个收入方式小计
				while(rs.next()){
					noht=rs.getString(1);
					if(noht==null){
						noht="0";	
					}
					gridStr+="小计："+noht+",";
					sr_total_cash+=Double.parseDouble(noht);
					if(count==1){
						sr_cash=noht;
					}
					count++;
				}
				gridStr+="\r\n";
				gridStr+=",,,,,,,总计："+NumberFormat.getInstance().format(sr_total_cash).replaceAll(",", "")+", ";
				gridStr+="\r\n";
                //退款
                rs = st.executeQuery(backCashSql);
                while (rs.next()){
                    String tempCash = "";
                    tempCash = rs.getString(1);
                    if(tempCash == null){
                        tempCash = "0";
                    }
                    back_total_cash = Double.parseDouble(tempCash);
                }
                gridStr += ",,,,,,,退款总计："+NumberFormat.getInstance().format(back_total_cash).replaceAll(",","")+", ";
                gridStr += "\r\n\r\n\r\n";
				count=1;
		
                gridStr+=bs_name+startDate+"至"+endDate+"支出汇总\r\n\r\n";
                gridStr+="日期,存入银行,日常支出, \r\n";
                rs=st.executeQuery(get_zcdate_sql);
                 //得到支出日期列表
                int flag = 0;
				while(rs.next()){
					gridStr+=rs.getDate(1)+",";    //日期
					data_rs=data_st.executeQuery(get_zcstart_sql+rs.getDate(1)+get_zcend_sql);
                    //循环列表
					while(data_rs.next()){
						noht=data_rs.getString(1);
						if(noht==null){
							noht="0";	
						}
						gridStr+=noht+",";						
					}
					gridStr+="\r\n";
                    flag ++;
				}
                gridStr+=",";
                rs=st.executeQuery(get_zctotal_sql);
                //存入银行、日常支出小计
				while(rs.next()){
					noht=rs.getString(1);
					if(noht==null){
						noht="0";	
					}
					gridStr+="小计："+noht+",";
					zc_total_cash+=Double.parseDouble(noht);
				}
				gridStr+="\r\n";
				gridStr+=",,总计："+NumberFormat.getInstance().format(zc_total_cash).replaceAll(",", "")+", ";
				gridStr+="\r\n";
				//下期备用金=倒数第二天现金总收入-总支出
                /*
                如果 起始日期=结束日期
                gridStr+=",余款(下期备用金)："+NumberFormat.getInstance().format(Double.parseDouble(sr_cash)-zc_total_cash).replaceAll(",", "");
                如果  不等于
                余款=倒数第二天现金总收入-总支出
                 */
                if(startDate.equals(endDate)){
                    gridStr+=",余款(下期备用金)："+NumberFormat.getInstance().format(Double.parseDouble(sr_cash)-zc_total_cash).replaceAll(",", "");
                }
                else{
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    Date d = sdf.parse(endDate);
                    Calendar c = Calendar.getInstance();
                    c.setTime(d);
                    int day = c.get(Calendar.DATE);
                    c.set(Calendar.DATE,day-1);
                    String dayBefore = sdf.format(c.getTime());
                    //获取倒数第二天存入银行和日常支出
                    String beforeDayZcSql =
                    "select sum(zc.zc_amount) from gtm_zc_charge zc right join gtm_zc_type zt on zc.zc_type_id=zt.zc_type_id " +
                    "and zc.zc_date=TO_DATE('"+dayBefore+"', 'yyyy-mm-dd') group by zt.zc_type_id order by zt.zc_type_id";
                    data_rs = data_st.executeQuery(beforeDayZcSql);
                    double zcTotal = 0;
                    while (data_rs.next()){
                        String tempZc = data_rs.getString(1);
                        if(tempZc==null||tempZc.equals("")){
                            tempZc = "0";
                        }
                        zcTotal += Double.parseDouble(tempZc);    //倒数第二天总支出
                    }
                    //获取倒数第二天现金收入
                    String beforeDayCashSql =
                    "select sum(sr.charge_amount) from (select fc.pay_type_id,fc.charge_amount from gtm_front_charge_new fc " +
                    "where fc.charge_date=TO_DATE('"+dayBefore+"', 'yyyy-mm-dd') union all select nc.pay_type_id,nc.charge_amount " +
                    "from gtm_nonuser_charge nc where nc.charge_date=TO_DATE('"+dayBefore+"', 'yyyy-mm-dd')) sr right join gtm_pay_type pt " +
                    "on sr.pay_type_id=pt.pay_type_id group by pt.pay_type_id order by pt.pay_type_id";
                    data_rs = data_st.executeQuery(beforeDayCashSql);
                    double cashTotal = 0;
                    if(data_rs.next()){
                        String tempCash = "";
                        if(data_rs.getString(1)==null||data_rs.getString(1).equals("")){
                            tempCash = "0";
                        }else{
                            tempCash = data_rs.getString(1);
                        }
                        cashTotal = Double.parseDouble(tempCash);
                    }
                    gridStr+=",余款(下期备用金)："+NumberFormat.getInstance().format(cashTotal-zcTotal).replaceAll(",", "");
                }

                gridStr+="\r\n\r\n\r\n";

        /**
         * 固网、铁通、联通、商城收入（金额）
         */
          //TODO

        /**
         * 固定POS、移动POS、网上付费部分
         * 查询起始到截止时间内的POS支付、网上支付的：日期、姓名、账号、卡号、金额
         */
        //固定POS支付
        String posSql =
        "SELECT fc.CHARGE_DATE,tui.SREALNAME,fc.USERNAME,fc.BANKCARD,fc.CHARGE_AMOUNT " +
        "FROM GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO tui " +
        "WHERE fc.USERNAME=tui.SUSERNAME AND fc.PAY_TYPE_ID=2 " +
        "AND fc.CHARGE_DATE>=TO_DATE('"+startDate+"','yyyy-mm-dd') AND fc.CHARGE_DATE<=TO_DATE('"+endDate+"','yyyy-mm-dd')" +
        "AND CHARGE_AMOUNT>0"+temp+" ORDER BY CHARGE_DATE";
        rs = st.executeQuery(posSql);
        gridStr += bs_name+startDate+"至"+endDate+"用户固定POS机收入明细\r\n\r\n";
        gridStr+="日期,姓名,账号,银行卡号,金额, \r\n";
        while (rs.next()){
            gridStr += rs.getDate(1)+",";   //日期
            gridStr += new String(rs.getString(2).getBytes("ISO-8859-1"),"GBK")+","; //姓名
            gridStr += rs.getString(3)+",";  //账号
            if(rs.getString(4)==null){
                gridStr += "空,";
            }
            else{
                gridStr += rs.getString(4)+",";
            }
            gridStr += NumberFormat.getInstance().format(Double.parseDouble(rs.getString(5))).replaceAll(",","") +",\r\n";
        }

        gridStr+="\r\n\r\n\r\n";

        //移动POS支付
        String mPosSql =
                "SELECT fc.CHARGE_DATE,tui.SREALNAME,fc.USERNAME,fc.BANKCARD,fc.CHARGE_AMOUNT " +
                        "FROM GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO tui " +
                        "WHERE fc.USERNAME=tui.SUSERNAME AND fc.PAY_TYPE_ID=3 " +
                        "AND fc.CHARGE_DATE>=TO_DATE('"+startDate+"','yyyy-mm-dd') AND fc.CHARGE_DATE<=TO_DATE('"+endDate+"','yyyy-mm-dd')" +
                        "AND CHARGE_AMOUNT>0"+temp+" ORDER BY CHARGE_DATE";
        rs = st.executeQuery(mPosSql);
        gridStr += bs_name+startDate+"至"+endDate+"用户移动POS机收入明细\r\n\r\n";
        gridStr+="日期,姓名,账号,银行卡号,金额, \r\n";
        while (rs.next()){
            gridStr += rs.getDate(1)+",";   //日期
            gridStr += new String(rs.getString(2).getBytes("ISO-8859-1"),"GBK")+","; //姓名
            gridStr += rs.getString(3)+",";  //账号
            if(rs.getString(4)==null){
                gridStr += "空,";
            }
            else{
                gridStr += rs.getString(4)+",";
            }
            gridStr += NumberFormat.getInstance().format(Double.parseDouble(rs.getString(5))).replaceAll(",","") +",\r\n";
        }

        gridStr+="\r\n\r\n\r\n";

        //银联支付明细
        gridStr += bs_name+startDate+"至"+endDate+"银联支付收入明细\r\n\r\n";
        gridStr+="日期,姓名,账号,网银订单号,金额 \r\n";
        String netPaySql =
        "SELECT fc.CHARGE_DATE,tui.SREALNAME,fc.USERNAME,fc.NETPAY_ID,fc.CHARGE_AMOUNT " +
        "FROM GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO tui " +
        "WHERE fc.USERNAME=tui.SUSERNAME AND fc.PAY_TYPE_ID=4  " +
        "AND fc.CHARGE_DATE>=TO_DATE('"+startDate+"','yyyy-mm-dd') AND fc.CHARGE_DATE<=TO_DATE('"+endDate+"','yyyy-mm-dd')" +
        "AND CHARGE_AMOUNT>0"+temp+" ORDER BY CHARGE_DATE";
        rs = st.executeQuery(netPaySql);
        while (rs.next()){
            gridStr += rs.getDate(1)+",";   //日期
            gridStr += new String(rs.getString(2).getBytes("ISO-8859-1"),"GBK")+","; //姓名
            gridStr += rs.getString(3)+",";  //账号
            if(rs.getString(4)==null){
                gridStr += "空,";
            }
            else{
                gridStr += rs.getString(4)+",";
            }
            gridStr += NumberFormat.getInstance().format(Double.parseDouble(rs.getString(5))).replaceAll(",","") +",\r\n";
        }
        gridStr+="\r\n\r\n\r\n";

        //快钱支付明细
        gridStr += bs_name+startDate+"至"+endDate+"快钱支付收入明细\r\n\r\n";
        gridStr+="日期,姓名,账号,网银订单号,金额 \r\n";
        String kqSql =
                "SELECT fc.CHARGE_DATE,tui.SREALNAME,fc.USERNAME,fc.NETPAY_ID,fc.CHARGE_AMOUNT " +
                "FROM GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO tui " +
                "WHERE fc.USERNAME=tui.SUSERNAME AND fc.PAY_TYPE_ID=5  " +
                "AND fc.CHARGE_DATE>=TO_DATE('"+startDate+"','yyyy-mm-dd') AND fc.CHARGE_DATE<=TO_DATE('"+endDate+"','yyyy-mm-dd')" +
                "AND CHARGE_AMOUNT>0"+temp+" ORDER BY CHARGE_DATE";
        rs = st.executeQuery(kqSql);
        while (rs.next()){
            gridStr += rs.getDate(1)+",";   //日期
            gridStr += new String(rs.getString(2).getBytes("ISO-8859-1"),"GBK")+","; //姓名
            gridStr += rs.getString(3)+",";  //账号
            if(rs.getString(4)==null){
                gridStr += "空,";
            }
            else{
                gridStr += rs.getString(4)+",";
            }
            gridStr += NumberFormat.getInstance().format(Double.parseDouble(rs.getString(5))).replaceAll(",","") +",\r\n";
        }
        gridStr+="\r\n\r\n\r\n";

        //农行支付明细
        gridStr += bs_name+startDate+"至"+endDate+"农行支付收入明细\r\n\r\n";
        gridStr+="日期,姓名,账号,网银订单号,金额 \r\n";
        String nhSql =
        "SELECT fc.CHARGE_DATE,tui.SREALNAME,fc.USERNAME,fc.NETPAY_ID,fc.CHARGE_AMOUNT " +
        "FROM GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO tui " +
        "WHERE fc.USERNAME=tui.SUSERNAME AND fc.PAY_TYPE_ID=6  " +
        "AND fc.CHARGE_DATE>=TO_DATE('"+startDate+"','yyyy-mm-dd') AND fc.CHARGE_DATE<=TO_DATE('"+endDate+"','yyyy-mm-dd')" +
        "AND CHARGE_AMOUNT>0"+temp+" ORDER BY CHARGE_DATE";
        rs = st.executeQuery(nhSql);
        while (rs.next()){
            gridStr += rs.getDate(1)+",";   //日期
            gridStr += new String(rs.getString(2).getBytes("ISO-8859-1"),"GBK")+","; //姓名
            gridStr += rs.getString(3)+",";  //账号
            if(rs.getString(4)==null){
                gridStr += "空,";
            }
            else{
                gridStr += rs.getString(4)+",";
            }
            gridStr += NumberFormat.getInstance().format(Double.parseDouble(rs.getString(5))).replaceAll(",","") +",\r\n";
        }
        gridStr+="\r\n\r\n\r\n";

        //非用户固定POS支付明细
        gridStr += bs_name+startDate+"至"+endDate+"非用户固定POS收入明细\r\n\r\n";
        gridStr+="日期,姓名,电话,银行卡号,金额 \r\n";
        String ncPosSql =
        "SELECT nc.CHARGE_DATE,nc.REALNAME,nc.TEL,nc.BANKCARD,nc.CHARGE_AMOUNT " +
        "FROM GTM_NONUSER_CHARGE nc " +
        "WHERE nc.PAY_TYPE_ID=2  " +
        "AND nc.CHARGE_DATE>=TO_DATE('"+startDate+"','yyyy-mm-dd') AND nc.CHARGE_DATE<=TO_DATE('"+endDate+"','yyyy-mm-dd')" +
        "AND CHARGE_AMOUNT>0"+temp2+" ORDER BY nc.CHARGE_DATE";
        rs = st.executeQuery(ncPosSql);
        while (rs.next()){
            gridStr += rs.getDate(1)+",";   //日期
            gridStr += new String(rs.getString(2).getBytes("ISO-8859-1"),"GBK")+","; //姓名
            gridStr += rs.getString(3)+",";  //电话
            if(rs.getString(4)==null){
                gridStr += "空,";
            }
            else{
                gridStr += rs.getString(4)+",";
            }
            gridStr += NumberFormat.getInstance().format(Double.parseDouble(rs.getString(5))).replaceAll(",","") +",\r\n";
        }
        gridStr+="\r\n\r\n\r\n";

        //非用户移动POS支付明细
        gridStr += bs_name+startDate+"至"+endDate+"非用户移动POS收入明细\r\n\r\n";
        gridStr+="日期,姓名,电话,银行卡号,金额 \r\n";
        String ncMPosSql =
        "SELECT nc.CHARGE_DATE,nc.REALNAME,nc.TEL,nc.BANKCARD,nc.CHARGE_AMOUNT " +
        "FROM GTM_NONUSER_CHARGE nc " +
        "WHERE nc.PAY_TYPE_ID=3  " +
        "AND nc.CHARGE_DATE>=TO_DATE('"+startDate+"','yyyy-mm-dd') AND nc.CHARGE_DATE<=TO_DATE('"+endDate+"','yyyy-mm-dd')" +
        "AND CHARGE_AMOUNT>0"+temp2+" ORDER BY nc.CHARGE_DATE";
        rs = st.executeQuery(ncMPosSql);
        while (rs.next()){
            gridStr += rs.getDate(1)+",";   //日期
            gridStr += new String(rs.getString(2).getBytes("ISO-8859-1"),"GBK")+","; //姓名
            gridStr += rs.getString(3)+",";  //电话
            if(rs.getString(4)==null){
                gridStr += "空,";
            }
            else{
                gridStr += rs.getString(4)+",";
            }
            gridStr += NumberFormat.getInstance().format(Double.parseDouble(rs.getString(5))).replaceAll(",","") +",\r\n";
        }
        gridStr+="\r\n\r\n\r\n";




		if(data_rs!=null){
			data_rs.close();
		}		
		rs.close();
		data_st.close();
		st.close();
		data_conn.close();
		conn.close();			
	
	response.setContentType("application/vnd.ms-excel;charset=GBK");
	response.setHeader("Content-Disposition", "attachment;filename=\"excel.csv\"");
	response.getWriter().print(gridStr);
    out.close();
%>
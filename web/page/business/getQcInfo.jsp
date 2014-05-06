<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String startPage=request.getParameter("start");
	String countPage=request.getParameter("limit");
	String qc_bs_name=request.getParameter("qc_bs_name");
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String receipt_id=request.getParameter("receipt_id");
	String username=request.getParameter("username").toLowerCase();
	String pay_type=request.getParameter("pay_type");
	String charge_type=request.getParameter("charge_type");
	String actsub_id=request.getParameter("actsub_id");
	String note=request.getParameter("note");
	String realname=request.getParameter("realname");
	String addr=request.getParameter("addr");
	String save_admin=request.getParameter("save_admin");
	String tel=request.getParameter("tel");
    String shouju = request.getParameter("shouju");
    String payee = request.getParameter("payee");
    String admit = request.getParameter("admit");
    String quota = request.getParameter("quota");
    String bandwidth = request.getParameter("bandwidth");
    String bankcard = request.getParameter("bankcard");
    String netpay_id = request.getParameter("netpay_id");
    //收据，收款人，接待人，餐型，带宽，银行卡号，网银订单号
	String get_data_sql=
    "select ga.act_name,pt.pay_type_name,fc.charge_id,bi.name,fc.charge_date," +
    "fc.username,fc.receipt_id,fc.is_new,ct.charge_type_name,fc.note,fc.charge_amount,fc.save_admin," +
    "fc.save_time,mi.group_id,ui.srealname,ui.stele,tu.sfeephone,gc.contract_name,gc.is_gg,gc.is_xk," +
    "gc.contract_type,fc.shouju,fc.payee,fc.admit,fc.quota,fc.bandwidth,fc.bankcard,fc.netpay_id " +
    "from gtm_act ga,gtm_pay_type pt,gtm_contract gc,gtm_business_info bi," +
    "GTM_MAINFORM_INFO mi,GTM_CHARGE_TYPE ct,GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO ui," +
    "tbl_users tu " +
    "where fc.act_sub_id=ga.act_id and fc.pay_type_id=pt.pay_type_id " +
    "and fc.username=mi.username and fc.username=ui.susername and fc.username=tu.susername " +
    "and fc.bs_id=bi.id and mi.contract_id=gc.contract_id and fc.charge_type_id=ct.charge_type_id";
	String get_count_sql=
    "select count(*) from gtm_act ga,gtm_pay_type pt,gtm_contract gc,gtm_business_info bi," +
    "GTM_MAINFORM_INFO mi,GTM_CHARGE_TYPE ct,GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO ui,tbl_users tu " +
    "where fc.act_sub_id=ga.act_id and fc.pay_type_id=pt.pay_type_id " +
    "and fc.username=mi.username and fc.username=ui.susername and fc.username=tu.susername " +
    "and fc.bs_id=bi.id and mi.contract_id=gc.contract_id and fc.charge_type_id=ct.charge_type_id";
    String get_total_sql=
    "select sum(fc.charge_amount) from gtm_act ga,gtm_pay_type pt,gtm_contract gc,gtm_business_info bi," +
    "GTM_MAINFORM_INFO mi,GTM_CHARGE_TYPE ct,GTM_FRONT_CHARGE_NEW fc,TBL_USERSINFO ui,tbl_users tu " +
    "where fc.act_sub_id=ga.act_id and fc.pay_type_id=pt.pay_type_id and fc.username=mi.username " +
    "and fc.username=ui.susername and fc.username=tu.susername and fc.bs_id=bi.id and mi.contract_id=gc.contract_id " +
    "and fc.charge_type_id=ct.charge_type_id";
	String gridStr="";
	int count=0;
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getRadiusConn();
	st=conn.createStatement();		
			
			if(!startDate.equals("")){
				get_data_sql+=" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
				get_count_sql+=" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
                get_total_sql +=" and fc.charge_date>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
			}
			get_data_sql+=" and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
			get_count_sql+=" and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
            get_total_sql +=" and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
			if(!qc_bs_name.equals("")){
				get_data_sql+=" and fc.bs_id="+qc_bs_name;
				get_count_sql+=" and fc.bs_id="+qc_bs_name;
                get_total_sql+=" and fc.bs_id="+qc_bs_name;
			}
			if(!receipt_id.equals("")){
				get_data_sql+=" and fc.receipt_id like '%"+new String(receipt_id.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and fc.receipt_id like '%"+new String(receipt_id.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.receipt_id like '%"+new String(receipt_id.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!username.equals("")){
				get_data_sql+=" and fc.username like '%"+new String(username.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and fc.username like '%"+new String(username.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.username like '%"+new String(username.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!pay_type.equals("")){
				get_data_sql+=" and fc.pay_type_id="+pay_type;
				get_count_sql+=" and fc.pay_type_id="+pay_type;
                get_total_sql+=" and fc.pay_type_id="+pay_type;
			}
			if(!charge_type.equals("")){
				get_data_sql+=" and fc.charge_type_id="+charge_type;
				get_count_sql+=" and fc.charge_type_id="+charge_type;
                get_total_sql+=" and fc.charge_type_id="+charge_type;
			}
			if(!actsub_id.equals("")){
				get_data_sql+=" and fc.act_sub_id="+actsub_id;
				get_count_sql+=" and fc.act_sub_id="+actsub_id;
                get_total_sql+=" and fc.act_sub_id="+actsub_id;
			}
			if(!note.equals("")){
				get_data_sql+=" and fc.note like '%"+new String(note.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and fc.note like '%"+new String(note.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.note like '%"+new String(note.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!realname.equals("")){
				get_data_sql+=" and ui.srealname like '%"+new String(realname.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and ui.srealname like '%"+new String(realname.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and ui.srealname like '%"+new String(realname.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!addr.equals("")){
				get_data_sql+=" and tu.sfeephone like '%"+new String(addr.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and tu.sfeephone like '%"+new String(addr.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and tu.sfeephone like '%"+new String(addr.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!save_admin.equals("")){
				get_data_sql+=" and fc.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and fc.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!tel.equals("")){
				get_data_sql+=" and ui.stele like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and ui.stele like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and ui.stele like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
			}
    //收据，收款人，接待人，餐型，带宽，银行卡号，网银订单号
            if(!shouju.equals("")){
                get_data_sql+=" and fc.shouju like '%"+new String(shouju.getBytes("gbk"),"iso-8859-1")+"%'";
                get_count_sql+=" and fc.shouju like '%"+new String(shouju.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.shouju like '%"+new String(shouju.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!payee.equals("")){
                get_data_sql+=" and fc.payee like '%"+new String(payee.getBytes("gbk"),"iso-8859-1")+"%'";
                get_count_sql+=" and fc.payee like '%"+new String(payee.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.payee like '%"+new String(payee.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!admit.equals("")){
                get_data_sql+=" and fc.admit like '%"+new String(admit.getBytes("gbk"),"iso-8859-1")+"%'";
                get_count_sql+=" and fc.admit like '%"+new String(admit.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.admit like '%"+new String(admit.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!quota.equals("")){
                get_data_sql+=" and fc.quota like '%"+new String(quota.getBytes("gbk"),"iso-8859-1")+"%'";
                get_count_sql+=" and fc.quota like '%"+new String(quota.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.quota like '%"+new String(quota.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!bandwidth.equals("")){
                get_data_sql+=" and fc.bandwidth like '%"+new String(bandwidth.getBytes("gbk"),"iso-8859-1")+"%'";
                get_count_sql+=" and fc.bandwidth like '%"+new String(bandwidth.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.bandwidth like '%"+new String(bandwidth.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!bankcard.equals("")){
                get_data_sql+=" and fc.bankcard like '%"+new String(bankcard.getBytes("gbk"),"iso-8859-1")+"%'";
                get_count_sql+=" and fc.bankcard like '%"+new String(bankcard.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.bankcard like '%"+new String(bankcard.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!netpay_id.equals("")){
                get_data_sql+=" and fc.netpay_id like '%"+new String(netpay_id.getBytes("gbk"),"iso-8859-1")+"%'";
                get_count_sql+=" and fc.netpay_id like '%"+new String(netpay_id.getBytes("gbk"),"iso-8859-1")+"%'";
                get_total_sql+=" and fc.netpay_id like '%"+new String(netpay_id.getBytes("gbk"),"iso-8859-1")+"%'";
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
					gridStr+="charge_id:'"+rs.getInt("charge_id")+"',";
					gridStr+="bs_name:'"+new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',";
					if(rs.getDate("charge_date")!=null){
						gridStr+="charge_date:'"+rs.getDate("charge_date")+"',";
					}else{
						gridStr+="charge_date:'',";
					}
					gridStr+="username:'"+new String(rs.getString("username").getBytes("iso-8859-1"),"gbk")+"',";
                    if(rs.getString("receipt_id")!=null){
                        gridStr+="receipt_id:'"+new String(rs.getString("receipt_id").getBytes("iso-8859-1"),"gbk")+"',";
                    }
                    else{
                        gridStr+="receipt_id:'',";
                    }
					if(rs.getInt("is_new")==1){
						gridStr+="is_new:'是',";
					}else if(rs.getInt("is_new")==0){
						gridStr+="is_new:'否',";
					}
					gridStr+="pay_type:'"+new String(rs.getString("pay_type_name").getBytes("iso-8859-1"),"gbk")+"',";
					gridStr+="charge_type:'"+new String(rs.getString("charge_type_name").getBytes("iso-8859-1"),"gbk")+"',";
					gridStr+="act_name:'"+new String(rs.getString("act_name").getBytes("iso-8859-1"),"gbk")+"',";
					if(rs.getString("note")!=null){
						gridStr+="note:'"+new String(rs.getString("note").getBytes("iso-8859-1"),"gbk").replaceAll("\r|\n", "")+"',";
					}else{
						gridStr+="note:'',";
					}
					gridStr+="charge_amount:'"+rs.getFloat("charge_amount")+"',";
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
					if(rs.getString("group_id")!=null){
						gridStr+="group_id:'"+rs.getInt("group_id")+"',";
					}else{
						gridStr+="group_id:'',";
					}
					if(rs.getString("srealname")!=null){
						gridStr+="realname:'"+new String(rs.getString("srealname").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="realname:'',";
					}
					if(rs.getString("stele")!=null){
						gridStr+="tel:'"+new String(rs.getString("stele").getBytes("iso-8859-1"),"gbk").replaceFirst("^;+", "")+"',";
					}else{
						gridStr+="tel:'',";
					}
					if(rs.getString("sfeephone")!=null){
						gridStr+="addr:'"+new String(rs.getString("sfeephone").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="addr:'',";
					}
                    if(rs.getString("shouju")!=null){
                        gridStr+="shouju:'"+new String(rs.getString("shouju").getBytes("iso-8859-1"),"gbk")+"',";
                    }else{
                        gridStr+="shouju:'',";
                    }
                    if(rs.getString("payee")!=null){
                        gridStr+="payee:'"+new String(rs.getString("payee").getBytes("iso-8859-1"),"gbk")+"',";
                    }else{
                        gridStr+="payee:'',";
                    }
                    if(rs.getString("admit")!=null){
                        gridStr+="admit:'"+new String(rs.getString("admit").getBytes("iso-8859-1"),"gbk")+"',";
                    }else{
                        gridStr+="admit:'',";
                    }
                    if(rs.getString("quota")!=null){
                        gridStr+="quota:'"+new String(rs.getString("quota").getBytes("iso-8859-1"),"gbk")+"',";
                    }else{
                        gridStr+="quota:'',";
                    }
                    if(rs.getString("bandwidth")!=null){
                        gridStr+="bandwidth:'"+new String(rs.getString("bandwidth").getBytes("iso-8859-1"),"gbk")+"',";
                    }else{
                        gridStr+="bandwidth:'',";
                    }
                    if(rs.getString("bankcard")!=null){
                        gridStr+="bankcard:'"+new String(rs.getString("bankcard").getBytes("iso-8859-1"),"gbk")+"',";
                    }else{
                        gridStr+="bankcard:'',";
                    }
                    if(rs.getString("netpay_id")!=null){
                        gridStr+="netpay_id:'"+new String(rs.getString("netpay_id").getBytes("iso-8859-1"),"gbk")+"',";
                    }else{
                        gridStr+="netpay_id:'',";
                    }

					gridStr+="contract_name:'"+new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+"',";			
					
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
					if(rs.getInt("contract_type")==2){
						gridStr+="is_xzl:'是'";
					}else{
						gridStr+="is_xzl:'否'";
					}
					gridStr+="},";
				}
			}

        rs = st.executeQuery(get_total_sql);
        rs.next();
        String totalCash = rs.getString(1);
		rs.close();
		st.close();
		conn.close();
		gridStr=gridStr.replaceFirst(",$", "");

	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{totalCount:"+count+",totalCash:'总计：￥"+totalCash+"',data:["+gridStr+"]}");
%>
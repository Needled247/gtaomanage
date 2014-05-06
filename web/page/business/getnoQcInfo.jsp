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
	String qc_bs_name=request.getParameter("qc_bs_name");
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String receipt_id=request.getParameter("receipt_id");
	String pay_type=request.getParameter("pay_type");
	String charge_type=request.getParameter("charge_type");
	String note=request.getParameter("note");
	String realname=request.getParameter("realname");
	String addr=request.getParameter("addr");
	String save_admin=request.getParameter("save_admin");
	String tel=request.getParameter("tel");
    String fapiao = request.getParameter("fapiao");
    String payee = request.getParameter("payee");
    String admit = request.getParameter("admit");
    String bankcard = request.getParameter("bankcard");
	//System.out.println(qc_bs_name+","+charge_date+","+receipt_id+","+username+","+charge_type+","+note+","+realname+","+addr);
	
	String get_data_sql=
    "select pt.pay_type_name,fc.charge_id,bi.name,fc.charge_date,fc.realname,fc.tel,fc.addr,fc.receipt_id,ct.charge_type_name," +
    "fc.note,fc.charge_amount,fc.save_admin,fc.save_time,gc.contract_name,fc.fapiao,fc.payee,fc.admit,fc.bankcard " +
    "from gtm_pay_type pt,gtm_contract gc,gtm_business_info bi,GTM_CHARGE_TYPE ct,GTM_nonuser_CHARGE fc " +
    "where fc.pay_type_id=pt.pay_type_id and fc.bs_id=bi.id and fc.contract_id=gc.contract_id and fc.charge_type_id=ct.charge_type_id";
	String get_count_sql=
    "select count(*) from gtm_pay_type pt,gtm_contract gc,gtm_business_info bi,GTM_CHARGE_TYPE ct,GTM_nonuser_CHARGE fc " +
    "where fc.pay_type_id=pt.pay_type_id and fc.bs_id=bi.id and fc.contract_id=gc.contract_id and fc.charge_type_id=ct.charge_type_id";
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
			}
			get_data_sql+=" and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
			get_count_sql+=" and fc.charge_date<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";				
			if(!qc_bs_name.equals("")){
				get_data_sql+=" and fc.bs_id="+qc_bs_name;
				get_count_sql+=" and fc.bs_id="+qc_bs_name;
			}
			if(!receipt_id.equals("")){
				get_data_sql+=" and fc.receipt_id like '%"+new String(receipt_id.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and fc.receipt_id like '%"+new String(receipt_id.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!pay_type.equals("")){
				get_data_sql+=" and fc.pay_type_id="+pay_type;
				get_count_sql+=" and fc.pay_type_id="+pay_type;
			}
			if(!charge_type.equals("")){
				get_data_sql+=" and fc.charge_type_id="+charge_type;
				get_count_sql+=" and fc.charge_type_id="+charge_type;
			}
			if(!note.equals("")){
				get_data_sql+=" and fc.note like '%"+new String(note.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and fc.note like '%"+new String(note.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!realname.equals("")){
				get_data_sql+=" and fc.realname like '%"+new String(realname.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and fc.realname like '%"+new String(realname.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!addr.equals("")){
				get_data_sql+=" and fc.addr like '%"+new String(addr.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and fc.addr like '%"+new String(addr.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!save_admin.equals("")){
				get_data_sql+=" and fc.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and fc.save_admin like '%"+new String(save_admin.getBytes("gbk"),"iso-8859-1")+"%'";
			}
			if(!tel.equals("")){
				get_data_sql+=" and fc.tel like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
				get_count_sql+=" and fc.tel like '%"+new String(tel.getBytes("gbk"),"iso-8859-1")+"%'";
			}
            if(!fapiao.equals("")){
                get_data_sql+=" and fc.fapiao like '%"+new String(fapiao.getBytes("gbk"),"iso-8859-1")+"%'";
                get_count_sql+=" and fc.fapiao like '%"+new String(fapiao.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!payee.equals("")){
                get_data_sql+=" and fc.payee like '%"+new String(payee.getBytes("gbk"),"iso-8859-1")+"%'";
                get_count_sql+=" and fc.payee like '%"+new String(payee.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!admit.equals("")){
                get_data_sql+=" and fc.admit like '%"+new String(admit.getBytes("gbk"),"iso-8859-1")+"%'";
                get_count_sql+=" and fc.admit like '%"+new String(admit.getBytes("gbk"),"iso-8859-1")+"%'";
            }
            if(!bankcard.equals("")){
                get_data_sql+=" and fc.bankcard like '%"+new String(bankcard.getBytes("gbk"),"iso-8859-1")+"%'";
                get_count_sql+=" and fc.bankcard like '%"+new String(bankcard.getBytes("gbk"),"iso-8859-1")+"%'";
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
					gridStr+="receipt_id:'"+new String(rs.getString("receipt_id").getBytes("iso-8859-1"),"gbk")+"',";					
					gridStr+="pay_type:'"+new String(rs.getString("pay_type_name").getBytes("iso-8859-1"),"gbk")+"',";
					gridStr+="charge_type:'"+new String(rs.getString("charge_type_name").getBytes("iso-8859-1"),"gbk")+"',";
					if(rs.getString("note")!=null){
						gridStr+="note:'"+new String(rs.getString("note").getBytes("iso-8859-1"),"gbk")+"',";
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
					if(rs.getString("realname")!=null){
						gridStr+="realname:'"+new String(rs.getString("realname").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="realname:'',";
					}
					if(rs.getString("tel")!=null){
						gridStr+="tel:'"+new String(rs.getString("tel").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="tel:'',";
					}
					if(rs.getString("addr")!=null){
						gridStr+="addr:'"+new String(rs.getString("addr").getBytes("iso-8859-1"),"gbk")+"',";
					}else{
						gridStr+="addr:'',";
					}
                    if(rs.getString("fapiao")!=null){
                        gridStr+="fapiao:'"+new String(rs.getString("fapiao").getBytes("iso-8859-1"),"gbk")+"',";
                    }else{
                        gridStr+="fapiao:'',";
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
                    if(rs.getString("bankcard")!=null){
                        gridStr+="bankcard:'"+new String(rs.getString("bankcard").getBytes("iso-8859-1"),"gbk")+"',";
                    }else{
                        gridStr+="bankcard:'',";
                    }
					gridStr+="contract_name:'"+new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+"'";								
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
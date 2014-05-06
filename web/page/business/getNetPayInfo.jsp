<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.PreparedStatement"%>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>

<%	
	String np_start=request.getParameter("np_start").replaceAll("-", "").substring(0,8);
	String np_end=request.getParameter("np_end").replaceAll("-","").substring(0,8);
	String np_type=request.getParameter("np_type");
	String get_data_sql=
    "SELECT orderid,account,productname,productnum,amount,tel,beizhu,dealtime,chargeStyle FROM chargeback " +
    "WHERE (dealtime BETWEEN '"+np_start+"' AND '"+np_end+"') AND SUCCEED='Y' ";

	String gridStr="";
	Connection conn=null;
	PreparedStatement pstmt=null;
	ResultSet rs=null;
	try{
        conn=ConnPoolBean.getNetPayConn();
        if(!np_type.equals("")){
            get_data_sql+=" and chargeStyle='"+np_type+"'";
        }
            pstmt = conn.prepareStatement(get_data_sql);
            rs=pstmt.executeQuery();
            while(rs.next()){
                gridStr+="{";
                gridStr+="orderid:'"+rs.getString("orderid")+"',";
                gridStr+="userid:'"+rs.getString("account")+"',";
                gridStr+="productname:'"+rs.getString("productname")+"',";
                gridStr+="productnum:'"+rs.getString("productnum")+"',";
                gridStr+="amount:'"+rs.getString("amount")+"',";
                gridStr+="tel:'"+rs.getString("tel")+"',";
                gridStr+="beizhu:'"+rs.getString("beizhu")+"',";
                gridStr+="dealtime:'"+rs.getString("dealtime")+"',";
                gridStr+="type:'"+rs.getString("chargeStyle")+"',";
                gridStr+="},";
            }
        }
    catch (SQLException e){
        e.printStackTrace();
    }
    finally {
        rs.close();
        pstmt.close();
        conn.close();
    }
    gridStr=gridStr.replaceFirst(",$", "");
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{totalCount:0,data:["+gridStr+"]}");
	
%>
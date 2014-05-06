<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="tools.Tools" %>

<%	
	String startPage=request.getParameter("start");
	String countPage=request.getParameter("limit");
	String invoice_bs=request.getParameter("invoice_bs");
	String startDate=request.getParameter("startDate");
	String endDate=request.getParameter("endDate");
	String used=request.getParameter("used");
	//用左连
    /*
    TODO:在GTM_INVOICE表中添加amount表，保存收费信息时，如果有光猫款和安装费，把三笔交易相加，保存在GTM_INVOICE表中。
    查询直接在这个表中查询。
     */
	String get_data_sql=
            "SELECT " +
            "gi.INVOICE_ID," +
            "GI.USED," +
            "GI.CHARGE_ID," +
            "FC.CHARGE_AMOUNT," +
            "GI.BS_ID" +
            " FROM GTM_INVOICE gi " +
            "LEFT OUTER JOIN GTM_FRONT_CHARGE fc ON gi.CHARGE_ID=fc.CHARGE_ID " +
            "WHERE 1=1";
	String get_count_sql="SELECT " +
            "COUNT(*) " +
            "FROM " +
            "GTM_INVOICE gi " +
            "LEFT OUTER JOIN GTM_FRONT_CHARGE fc ON gi.CHARGE_ID = fc.CHARGE_ID " +
            "WHERE 1=1";
	String gridStr="";
	int count=0;
	Connection conn=null;
	PreparedStatement pstmt=null;
	ResultSet rs=null;
	try{
        conn=ConnPoolBean.getRadiusConn();
        if(!invoice_bs.equals("")){
            get_data_sql+=" and gi.BS_ID="+invoice_bs;
            get_count_sql+=" and gi.BS_ID="+invoice_bs;
        }

        if(!startDate.equals("")){
            get_data_sql+=" and fc.CHARGE_DATE>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
            get_count_sql+=" and fc.CHARGE_DATE>=to_date('"+startDate+" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
        }
        if(!endDate.equals("")){
            get_data_sql+=" and fc.CHARGE_DATE<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
            get_count_sql+=" and fc.CHARGE_DATE<=to_date('"+endDate+" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
        }
        if(!used.equals("")){
            get_data_sql+=" and gi.USED="+used;
            get_count_sql+=" and gi.USED="+used;
        }
        pstmt=conn.prepareStatement(get_count_sql);
        int endPage=Integer.parseInt(startPage)+Integer.parseInt(countPage);
        get_data_sql+=" and rownum<="+endPage+" minus "+get_data_sql+" and rownum<="+startPage;
        rs=pstmt.executeQuery(get_count_sql);
        rs.next();
        count=rs.getInt(1);
        if(count!=0){
            pstmt.clearParameters();
            pstmt = conn.prepareStatement(get_data_sql);
            rs=pstmt.executeQuery(get_data_sql);
            while(rs.next()){
                gridStr+="{";
                gridStr+="invoice_id:'"+rs.getInt("INVOICE_ID")+"',";
                gridStr+="used:'"+Tools.invoiceCode2Status(rs.getInt("USED"))+"',";
                gridStr+="charge_id:'"+rs.getInt("CHARGE_ID")+"',";
                gridStr+="charge_amount:'"+rs.getFloat(4)+"',";
                gridStr+="bs_name:'"+Tools.areaCode2BusinessHall(rs.getInt("BS_ID"))+"',";
                gridStr+="},";
            }
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
	response.getWriter().print("{totalCount:"+count+",data:["+gridStr+"]}");
%>
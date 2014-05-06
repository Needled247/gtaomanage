<%@ page import="java.sql.Connection" %>
<%@ page import="ds.ConnPoolBean" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@page language="java" pageEncoding="UTF-8"%>
<%
    String bs_name = request.getParameter("invoice_bs");
    String invoice_start = request.getParameter("invoice_start");
    String invoice_end = request.getParameter("invoice_end");
    int istart = 0;
    int iend = 0;
    if(invoice_start!=null){
        istart = Integer.parseInt(invoice_start);
    }
    if(invoice_end!=null){
        iend = Integer.parseInt(invoice_end);
    }
    Connection connection = null;
    PreparedStatement pstmt = null;
    try{
        connection = ConnPoolBean.getRadiusConn();
        while(istart<=iend){
            String sql = "INSERT INTO GTM_INVOICE(INVOICE_ID,USED,BS_ID)VALUES(?,?,?)";
            pstmt = connection.prepareStatement(sql);
            pstmt.setInt(1,istart);
            pstmt.setInt(2,0);
            pstmt.setInt(3,Integer.parseInt(bs_name));
            pstmt.executeUpdate();
            pstmt.clearParameters();
            istart++;
        }
    }
    catch (SQLException e){
        e.printStackTrace();
    }
    finally {
        if(connection!=null){
            try{
                connection.close();
            }
            catch (SQLException e){
                e.printStackTrace();
            }
        }
        if(pstmt!=null){
            try{
                pstmt.close();
            }
            catch (SQLException e){
                e.printStackTrace();
            }
        }
    }
%>
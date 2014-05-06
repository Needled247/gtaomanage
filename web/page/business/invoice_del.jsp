<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	String invoice_id=request.getParameter("invoice_id");
    String[] invoiceArr = invoice_id.split(",");
    Connection conn=null;
    Statement st=null;
    conn=ConnPoolBean.getRadiusConn();
    for (String anInvoiceArr : invoiceArr) {
        String sql = "DELETE FROM GTM_INVOICE WHERE INVOICE_ID=" + anInvoiceArr;
        st = conn.createStatement();
        st.executeUpdate(sql);
    }
	st.close();
	conn.close();
%>
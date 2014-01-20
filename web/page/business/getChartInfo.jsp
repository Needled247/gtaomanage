<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String name = request.getParameter("name");
    String date = request.getParameter("date");
    System.out.println(name+","+date);
%>
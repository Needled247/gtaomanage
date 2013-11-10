<%@ page contentType="image/jpeg;charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:useBean id="image" scope="page" class="tools.MakeCertPic" />
<%
	String str=image.getCertPic(0,0,response.getOutputStream());
	// 将认证码存入SESSION
	session.setAttribute("certCode", str);
	
	out.clear();
	out = pageContext.pushBody();
%>
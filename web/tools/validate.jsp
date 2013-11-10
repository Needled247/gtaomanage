<%@page language="java" import="java.util.Date" pageEncoding="UTF-8"%>
<%@page import="java.util.TimeZone"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%	
	if(request.getParameter("user")==null){
		return;
	}
	String user=request.getParameter("user");
	String pwd=request.getParameter("pwd");
	String code=request.getParameter("code");
	String certCode=String.valueOf(session.getAttribute("certCode"));
	String errorMsg="";
	String user_sql="select department_id from gtm_admin where name='"+user+"'";
	String sql="select name,true_name,department_id,root_id from gtm_admin where name='"+user+"' and password='"+pwd+"'";
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	if(!code.equals(certCode)){
		errorMsg="c";
	}else{
		conn=ConnPoolBean.getRadiusConn();
		st=conn.createStatement();
		rs=st.executeQuery(user_sql);
		if(rs.next()){
			rs=st.executeQuery(sql);
			if(rs.next()){
				session.setAttribute("name", rs.getString("name"));
				session.setAttribute("true_name", new String(rs.getString("true_name").getBytes("iso-8859-1"),"gbk"));
				session.setAttribute("did", rs.getInt("department_id"));
				session.setAttribute("rid", rs.getInt("root_id"));
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				TimeZone timeZoneChina = TimeZone.getTimeZone("Asia/Shanghai");
				sdf.setTimeZone(timeZoneChina);
				String save_time=sdf.format(new Date());
				save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
				String get_slogmax_sql="select slog_id from gtm_system_log where rownum=1 order by slog_id desc";
				int slogId=1;
				String sql_slogadd_first="insert into gtm_system_log values(";
				String sql_slogadd_end=",'"+rs.getString("name")+"','"+rs.getString("true_name")+"',"+save_time+",'login system',"+rs.getInt("department_id")+")";				
				rs=st.executeQuery(get_slogmax_sql);
				if(rs.next()){
					slogId=rs.getInt("slog_id")+1;
				}
				st.executeUpdate(sql_slogadd_first+slogId+sql_slogadd_end);				
			}else{
				errorMsg="p";
			}
		}else{
			errorMsg="u";
		}
		rs.close();
		st.close();
		conn.close();
	}
	
	response.setContentType("text/json;charset=UTF-8");
	response.getWriter().print("{\"error\":\""+errorMsg+"\"}");
	
%>
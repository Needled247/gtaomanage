<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.io.FileInputStream"%>

<%	
	String excel=request.getParameter("excel");
	String sql="select ask_time from have_source";
	String filename=new String("客服表单.xls".getBytes("GBK"), "UTF-8");
	Connection conn=null;
	Statement st=null;
	ResultSet rs=null;
	
	conn=ConnPoolBean.getConn();
	st=conn.createStatement();
	rs=st.executeQuery(sql);
	String gridStr="";
	//while(rs.next()){
		//gridStr+="{ask_date:'"+rs.getString(1)+"',ask_time:'"+rs.getString(2)+"',business:'"+rs.getString(3)+"',username:'"+rs.getString(4)+"',tel:'"+rs.getString(5)+"',address:'"+rs.getString(6)+"',source_type:'"+rs.getString(7)+"',ask_describe:'"+rs.getString(8)+"',admin:'"+rs.getString(9)+"',is_oa:'"+rs.getString(10)+"',is_setup:'"+rs.getString(11)+"',no_setup_reason:'"+rs.getString(12)+"',linkman:'"+rs.getString(13)+"'}";
		//if(!rs.isLast()){
			//gridStr+=",";
		//}
	//}
	while(rs.next()){
			
	}
	
	rs.close();
	st.close();
	conn.close();
	//System.out.println(gridStr);
	//String fields="'ask_date','ask_time','business','username','tel','address','source_type','ask_describe','admin','is_oa','is_setup','no_setup_reason','linkman'";
	//String columnModel="{header: '来电日期', dataIndex: 'ask_date',editor: {readOnly: true}},{header: '来电时间',dataIndex: 'ask_time'},{header: '所属社区',dataIndex: 'business'},{header: '用户姓名',dataIndex: 'username'},{header: '联系电话',dataIndex: 'tel'},{header: '详细地址',dataIndex: 'address'},{header: '资源类型',dataIndex: 'source_type'},{header: '咨询描述',dataIndex: 'ask_describe'},{header: '记录人',dataIndex: 'admin'},{header: '是否转OA',dataIndex: 'is_oa'},{header: '是否安装',dataIndex: 'is_setup'},{header: '未安装原因',dataIndex: 'no_setup_reason'},{header: '联系人',dataIndex: 'linkman'}";
	response.setContentType("application/vnd.ms-excel;charset=UTF-8");
	response.setHeader("Content-Disposition", "attachment;filename=" + "111.xls");
	ServletOutputStream os=response.getOutputStream();
	//System.out.println(this.getClass().getClassLoader().getResource("客服表单.xls").getPath());
	InputStream is=new FileInputStream(getClass().getClassLoader().getResource("111.xls").getPath());
	//InputStreamReader isr=new InputStreamReader(fis, "GBK");
	byte[] buffer = new byte[1024];
    int byteread = 0;
	while ((byteread = is.read(buffer)) >0) {
    	os.write(buffer, 0, byteread);
    }
    
    os.flush();
    is.close();
    os.close();
    out.clear();
    out = pageContext.pushBody();
%>
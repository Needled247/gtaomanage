<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="ds.ConnPoolBean"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<%@page import="java.text.SimpleDateFormat"%>

<%	
	//GTM_ADMIN
/*	//String del_bs_sql="delete from GTM_ADMIN";
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	//st.executeUpdate(del_bs_sql);	
	ArrayList<String> al=new ArrayList<String>();
	String initPwd="e10adc3949ba59abbe56e057f20f883e";
	
	//长辛店
	//al.add("'liubiao','"+initPwd+"',1,'"+new String("刘彪".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'limeiyan','"+initPwd+"',1,'"+new String("李美艳".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'hanji','"+initPwd+"',1,'"+new String("韩极".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'wangyan','"+initPwd+"',1,'"+new String("王燕".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'songwei','"+initPwd+"',1,'"+new String("宋微".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'hudongyan','"+initPwd+"',1,'"+new String("胡东艳".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'hulinjie','"+initPwd+"',1,'"+new String("胡琳洁".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'lihongyan','"+initPwd+"',1,'"+new String("李鸿彦".getBytes("gbk"),"iso-8859-1")+"'");
	
	//晓月苑
	//al.add("'liqiang','"+initPwd+"',1,'"+new String("李蔷".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'jiamin','"+initPwd+"',1,'"+new String("贾敏".getBytes("gbk"),"iso-8859-1")+"'");
	
	//正阳
	//al.add("'guanyunxia','"+initPwd+"',3,'"+new String("关云霞".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'wanglixia','"+initPwd+"',3,'"+new String("王丽霞".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'xiqian','"+initPwd+"',3,'"+new String("奚茜".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'qixiaofang','"+initPwd+"',3,'"+new String("齐晓芳".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'shixiaomei','"+initPwd+"',3,'"+new String("师晓梅".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'wanghaiying','"+initPwd+"',3,'"+new String("汪海英".getBytes("gbk"),"iso-8859-1")+"'");
	
	//开阳
	//al.add("'shixiaoqing','"+initPwd+"',4,'"+new String("史晓青".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'zhangwenwen','"+initPwd+"',4,'"+new String("张雯雯".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'zhoumiao','"+initPwd+"',4,'"+new String("周淼".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'jiangning','"+initPwd+"',4,'"+new String("蒋宁".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'hanman','"+initPwd+"',4,'"+new String("韩曼".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'yangxiaodan','"+initPwd+"',4,'"+new String("杨晓丹".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'lihanhua','"+initPwd+"',4,'"+new String("李汉华".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'limeng','"+initPwd+"',4,'"+new String("李蒙".getBytes("gbk"),"iso-8859-1")+"'");
	
	//青塔
	//al.add("'zhangmeiling','"+initPwd+"',5,'"+new String("张美玲".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'lihe','"+initPwd+"',5,'"+new String("李贺".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'wangmeng','"+initPwd+"',5,'"+new String("王蒙".getBytes("gbk"),"iso-8859-1")+"'");
	
	//三环
	//al.add("'zhukeli','"+initPwd+"',6,'"+new String("朱可莉".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'wangshasha','"+initPwd+"',6,'"+new String("王莎莎".getBytes("gbk"),"iso-8859-1")+"'");
	
	//良乡
	//al.add("'liyan','"+initPwd+"',7,'"+new String("李岩".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'gaoxiaojuan','"+initPwd+"',7,'"+new String("高晓娟".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'zhangliying','"+initPwd+"',7,'"+new String("张丽英".getBytes("gbk"),"iso-8859-1")+"'");
	
	//运管中心
	//al.add("'zhaojun','"+initPwd+"',601,'"+new String("赵俊".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'zhaoyanan','"+initPwd+"',601,'"+new String("赵亚楠".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'wangyifei','"+initPwd+"',601,'"+new String("王一飞".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'caoweiping','"+initPwd+"',601,'"+new String("曹伟平".getBytes("gbk"),"iso-8859-1")+"'");
	
	//商管中心
	//al.add("'xugang','"+initPwd+"',602,'"+new String("许刚".getBytes("gbk"),"iso-8859-1")+"'");
	
	//财务
	//al.add("'yangwei','"+initPwd+"',603,'"+new String("杨巍".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'jinzhiqiang','"+initPwd+"',603,'"+new String("金志强".getBytes("gbk"),"iso-8859-1")+"'");
	
	//客服中心
	//al.add("'zhangqingzhu','"+initPwd+"',604,'"+new String("张庆祝".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'wangjianjun','"+initPwd+"',604,'"+new String("王建军".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'zhaoweihong','"+initPwd+"',604,'"+new String("赵卫红".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'zhangshuo','"+initPwd+"',604,'"+new String("张硕".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'zhenghuan','"+initPwd+"',604,'"+new String("郑欢".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'yanghongxia','"+initPwd+"',604,'"+new String("杨红霞".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'handongdong','"+initPwd+"',604,'"+new String("韩冬冬".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'wangyibo','"+initPwd+"',604,'"+new String("王奕博".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'zhengxiangnan','"+initPwd+"',604,'"+new String("郑香楠".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'gaohongmei','"+initPwd+"',604,'"+new String("高红梅".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'qijing','"+initPwd+"',604,'"+new String("齐晶".getBytes("gbk"),"iso-8859-1")+"'");
	//al.add("'liuzheng','"+initPwd+"',604,'"+new String("刘征".getBytes("gbk"),"iso-8859-1")+"'");
	
	//管理员
	al.add("'admin','"+initPwd+"',666,'"+new String("admin".getBytes("gbk"),"iso-8859-1")+"'");
	
	Iterator<String> it=al.iterator();
	while(it.hasNext()){
		st.executeUpdate("insert into GTM_ADMIN(name,password,department_id,true_name) values ("+it.next()+")");
	}
	st.close();
	conn.close();
*/


	//GTM_BUSINESS_INFO
/*	String[] bs_strs=new String[7];
	bs_strs[0]="1,'"+new String("长辛店营业厅".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[1]="3,'"+new String("正阳营业厅".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[2]="4,'"+new String("开阳营业厅".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[3]="5,'"+new String("青塔营业厅".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[4]="6,'"+new String("三环营业厅".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[5]="7,'"+new String("良乡营业厅".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[6]="41,'"+new String("晓月苑营业厅".getBytes("gbk"),"iso-8859-1")+"'";
	String del_bs_sql="delete from GTM_BUSINESS_INFO";
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	st.executeUpdate(del_bs_sql);
	for(int i=0;i<bs_strs.length;i++){
		st.executeUpdate("insert into GTM_BUSINESS_INFO(id,name) values ("+bs_strs[i]+")");
	}
	st.close();
	conn.close();
*/	
	
	//GTM_LINE_TYPE
/*	String[] bs_strs=new String[2];
	bs_strs[0]="1,'"+new String("明线".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[1]="2,'"+new String("暗线".getBytes("gbk"),"iso-8859-1")+"'";	
	String del_bs_sql="delete from GTM_LINE_TYPE";
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	st.executeUpdate(del_bs_sql);
	for(int i=0;i<bs_strs.length;i++){
		st.executeUpdate("insert into GTM_LINE_TYPE(line_type_id,line_type_name) values ("+bs_strs[i]+")");
	}	
	st.close();
	conn.close();
*/
	
	//GTM_HOUSE_TYPE
/*	String[] bs_strs=new String[2];
	bs_strs[0]="1,'"+new String("租用".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[1]="2,'"+new String("私有".getBytes("gbk"),"iso-8859-1")+"'";
	String del_bs_sql="delete from GTM_HOUSE_TYPE";
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	st.executeUpdate(del_bs_sql);
	for(int i=0;i<bs_strs.length;i++){
		st.executeUpdate("insert into GTM_HOUSE_TYPE(house_type_id,house_type_name) values ("+bs_strs[i]+")");
	}	
	st.close();
	conn.close();
*/	
	
	//GTM_DEPARTMENT_INFO
/*	String del_bs_sql="delete from GTM_DEPARTMENT_INFO";
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	st.executeUpdate(del_bs_sql);
	ArrayList<String> al=new ArrayList<String>();
	al.add("1,'"+new String("长辛店营业厅".getBytes("gbk"),"iso-8859-1")+"','A1,A2,A3,A4,A5,A6,B1,C1,C2,D1|','My.save_mainform'");
	al.add("3,'"+new String("正阳营业厅".getBytes("gbk"),"iso-8859-1")+"','A1,A2,A3,A4,A5,A6,B1,C1,C2,D1|','My.save_mainform'");
	al.add("4,'"+new String("开阳营业厅".getBytes("gbk"),"iso-8859-1")+"','A1,A2,A3,A4,A5,A6,B1,C1,C2,D1|','My.save_mainform'");
	al.add("5,'"+new String("青塔营业厅".getBytes("gbk"),"iso-8859-1")+"','A1,A2,A3,A4,A5,A6,B1,C1,C2,D1|','My.save_mainform'");
	al.add("6,'"+new String("三环营业厅".getBytes("gbk"),"iso-8859-1")+"','A1,A2,A3,A4,A5,A6,B1,C1,C2,D1|','My.save_mainform'");
	al.add("7,'"+new String("良乡营业厅".getBytes("gbk"),"iso-8859-1")+"','A1,A2,A3,A4,A5,A6,B1,C1,C2,D1|','My.save_mainform'");
	al.add("41,'"+new String("晓月苑营业厅".getBytes("gbk"),"iso-8859-1")+"','A1,A2,A3,A4,A5,A6,B1,C1,C2,D1|','My.save_mainform'");
	al.add("601,'"+new String("运管中心".getBytes("gbk"),"iso-8859-1")+"','A1,A2,A3,A4,A5,A6,B1,C1,C2|','My.base_query_mfA'");
	al.add("602,'"+new String("商管中心".getBytes("gbk"),"iso-8859-1")+"','A3,A5,C1,C2|','My.save_buildinfo'");
	al.add("603,'"+new String("财务".getBytes("gbk"),"iso-8859-1")+"','A3,A4,A6,B1,C2|','My.income_count'");
	al.add("604,'"+new String("客服中心".getBytes("gbk"),"iso-8859-1")+"','A3,B1,C2,D1|','My.base_query_mfA'");
	al.add("666,'"+new String("管理员".getBytes("gbk"),"iso-8859-1")+"','A1,A2,A3,A4,A5,A6,B1,C1,C2,D1|','My.save_mainform'");	
	Iterator<String> it=al.iterator();
	while(it.hasNext()){
		st.executeUpdate("insert into GTM_DEPARTMENT_INFO(id,name,root,interface) values ("+it.next()+")");
	}	
	st.close();
	conn.close();
*/
	
	//GTM_CHARGE_TYPE
/*	String[] bs_strs=new String[12];
	bs_strs[0]="1,'"+new String("宽带收入".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[1]="2,'"+new String("IT收入".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[2]="3,'"+new String("IT卡收入".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[3]="4,'"+new String("料收入".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[4]="5,'"+new String("商城收入".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[5]="6,'"+new String("移机收入".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[6]="7,'"+new String("光猫押金".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[7]="8,'"+new String("路由器押金".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[8]="9,'"+new String("退宽带收入".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[9]="10,'"+new String("退光猫押金".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[10]="11,'"+new String("退路由器押金".getBytes("gbk"),"iso-8859-1")+"'";
	bs_strs[11]="12,'"+new String("退其他押金".getBytes("gbk"),"iso-8859-1")+"'";
	String del_bs_sql="delete from GTM_CHARGE_TYPE";
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	st.executeUpdate(del_bs_sql);
	for(int i=0;i<bs_strs.length;i++){
		st.executeUpdate("insert into GTM_CHARGE_TYPE(CHARGE_TYPE_ID,CHARGE_TYPE_NAME) values ("+bs_strs[i]+")");
	}	
	st.close();
	conn.close();
*/	
	
	//GTM_MAINFORM_INFO(备用)
/*	String del_bs_sql="delete from GTM_MAINFORM_INFO";
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	st.executeUpdate(del_bs_sql);
	String csv="C:/Users/Administrator/Desktop/gtaomanage_oracle建库脚本/csv/zhengyang.csv";
	int did=3;
	FileInputStream fis = new FileInputStream(csv);
	InputStreamReader isr = new InputStreamReader(fis);
	BufferedReader br = new BufferedReader(isr);
	String row = null;
	String[] data=null;
	br.readLine();
	StringBuilder sb=new StringBuilder();
	try{
		while((row = br.readLine())!= null)
		{
			data = row.split(",");
			String ftime="";
			String ht="";
			//System.out.println(data.length);
			if(data.length==5){
				ftime=data[4].trim();
				if(ftime.split("-")[1].length()==1){
					ftime=ftime.split("-")[0]+"-0"+ftime.split("-")[1];
				}else if(ftime.split("-")[1].length()==2){
					ftime=ftime.split("-")[0]+"-"+ftime.split("-")[1];
				}
				ht=data[3].trim();
				if(ht.equals("")){
					ht="0";
				}
				String verify_sql="insert into GTM_MAINFORM_INFO(username,leaflet_no,group_id,house_type_id,DEPARTMENT_ID,dfirstdate) values ('"+data[0].trim().toLowerCase()+"',"+data[1]+","+data[2]+","+ht+","+did+",'"+ftime+"')";
				//System.out.println(verify_sql);
				st.executeUpdate(verify_sql);
			}else{
				System.out.println(data[0]+"------"+data.length);
			}
		}
		st.close();
		conn.close();
		br.close();
		isr.close();
		fis.close();
	}catch(Exception e){
		System.out.println(data[0].trim().toLowerCase());
		e.printStackTrace();
	}
*/


//GTM_MAINFORM_INFO
/*	String del_bs_sql="delete from GTM_MAINFORM_INFO";
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	st.executeUpdate(del_bs_sql);
	String csv="xls/mainform/total.csv";
	int did=3;
	FileInputStream fis = new FileInputStream(csv);
	InputStreamReader isr = new InputStreamReader(fis);
	BufferedReader br = new BufferedReader(isr);
	String row = null;
	String[] data=null;
	br.readLine();
	//String temp="";
	//StringBuilder sb=new StringBuilder();
	try{
		while((row = br.readLine())!= null)
		{
			data = row.split(",");
			String save_time=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
			save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
			//String[] ftime=data[6].trim().split("-");
			//if(ftime[1].length()==1){
				//temp=ftime[0]+"-0"+ftime[1];
			//}else{
				//temp=data[6].trim();
			//}
			String verify_sql="insert into GTM_MAINFORM_INFO values ('"+data[0].trim().toLowerCase()+"',"+data[1]+","+data[2]+",to_date('"+data[3].trim()+"','yyyy-mm-dd'),"+data[4]+","+data[5]+","+data[8]+","+save_time+",'admin','"+data[6].trim()+"',"+data[7]+",'')";
			System.out.println(verify_sql);
			st.executeUpdate(verify_sql);
		}
		st.close();
		conn.close();
		br.close();
		isr.close();
		fis.close();
	}catch(Exception e){
		System.out.println(data[0].trim().toLowerCase());
		e.printStackTrace();
	}
*/


	//GTM_CONTRACT
/*	String del_bs_sql="delete from GTM_CONTRACT";
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	st.executeUpdate(del_bs_sql);
	String csv="xls/contract.csv";
	FileInputStream fis = new FileInputStream(csv);
	InputStreamReader isr = new InputStreamReader(fis);
	BufferedReader br = new BufferedReader(isr);
	String row = null;
	String[] data=null;
	br.readLine();
	//StringBuilder sb=new StringBuilder();
	try{
		while((row = br.readLine())!= null)
		{
			data = row.split(",");
			String save_time=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
			save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";
			String verify_sql="insert into GTM_CONTRACT values ("+data[0]+","+data[1]+",to_date('"+data[2].trim()+"','yyyy-mm-dd'),'"+new String(data[3].trim().getBytes("gbk"),"iso-8859-1")+"',"+data[4]+",to_date('"+data[5].trim()+"','yyyy-mm-dd'),to_date('"+data[6].trim()+"','yyyy-mm-dd'),"+data[7]+","+data[8]+","+data[9]+",'"+new String(data[10].getBytes("gbk"),"iso-8859-1")+"',"+data[11]+","+data[12]+","+save_time+",'admin',"+data[13]+")";
			st.executeUpdate(verify_sql);
		}
		st.close();
		conn.close();
		br.close();
		isr.close();
		fis.close();
	}catch(Exception e){
		System.out.println(data[0]);
		e.printStackTrace();
	}
*/

	//GTM_FRONT_CHARGE
/*	String del_bs_sql="delete from GTM_FRONT_CHARGE";
	String get_max_sql="select charge_id from gtm_front_charge where rownum=1 order by charge_id desc";
	int cid=1;
	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	ResultSet rs=null;
	st.executeUpdate(del_bs_sql);
	String csv="xls/front_charge/total.csv";
	FileInputStream fis = new FileInputStream(csv);
	InputStreamReader isr = new InputStreamReader(fis);
	BufferedReader br = new BufferedReader(isr);
	String row = null;
	String[] data=null;
	br.readLine();
	//StringBuilder sb=new StringBuilder();
	try{
		while((row = br.readLine())!= null)
		{
			rs=st.executeQuery(get_max_sql);
			if(rs.next()){
				cid=rs.getInt(1)+1;
			}
			data = row.split(",");
			String save_time=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
			save_time="to_date('"+save_time+"','yyyy-mm-dd hh24:mi:ss')";			
			String verify_sql="insert into GTM_FRONT_CHARGE values ("+data[0]+",to_date('"+data[1].trim()+"','yyyy-mm-dd'),'"+data[2].trim().toLowerCase()+"',"+data[3]+",'"+new String(data[4].trim().getBytes("gbk"),"iso-8859-1")+"',"+data[5]+","+data[6].trim()+",'"+new String(data[7].trim().getBytes("gbk"),"iso-8859-1")+"','admin',"+save_time+","+cid+")";
			System.out.println(verify_sql);
			st.executeUpdate(verify_sql);
		}
		rs.close();
		st.close();
		conn.close();
		br.close();
		isr.close();
		fis.close();
	}catch(Exception e){
		System.out.println(cid);
		e.printStackTrace();
	}
*/

	//随意写
/*	Connection conn=ConnPoolBean.getRadiusConn();
	Statement st=conn.createStatement();
	ResultSet rs=null;
	Connection conn1=ConnPoolBean.getRadiusConn();
	Statement st1=conn1.createStatement();
	String select_sql="select fc.username from gtm_front_charge fc,GTM_MAINFORM_INFO gmf,GTM_CONTRACT gc where fc.username=gmf.username and gmf.contract_id=287";
	rs=st.executeQuery(select_sql);
	while(rs.next()){
		String modify_sql="update gtm_front_charge set bs_id=41 where username='"+rs.getString("username")+"'";
		st1.executeUpdate(modify_sql);
		modify_sql="update GTM_MAINFORM_INFO set department_id=41 where username='"+rs.getString("username")+"'";
		st1.executeUpdate(modify_sql);
	}	
	rs.close();
	st.close();
	conn.close();
	st1.close();
	conn1.close();
*/	



//获取当前路径
//System.out.println(System.getProperty("user.dir"));



%>
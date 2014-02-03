<%@ page import="ds.ConnPoolBean" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    Connection conn = ConnPoolBean.getRadiusConn();
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    String userid = request.getParameter("userid");
    String bs_name = request.getParameter("bs_name");
    String gridStr = "";
    response.setContentType("text/json;charset=UTF-8");
    String sql = "select gg.gg_name,gmf.redate,cat.cat_name,gmf.cxnote,gmf.hdnote,gmf.sbnote,gmf.zhnote,gmf.tsnote," +
            "gmf.isit,gmf.opt_usetime,bi.name,tu.susername,tui.srealname,ti.sispname,gmf.dfirstdate,tu.doverdate," +
            "tu.sfeephone,gmf.group_id,gmf.leaflet_no,tui.stele,tui.semail,gmf.house_type_id,gmf.line_type_id," +
            "gmf.save_admin,gmf.save_time,gc.contract_name,gmf.oldnet_prop_id,gmf.user_prop_id,gmf.net_prop," +
            "gmf.payee,gmf.admit,gmf.user_mobile,gmf.user_phone,gmf.weixin,gmf.letv_start,gmf.letv_end," +
            "gmf.letv_mac,gmf.it_end,tui.spostcode " +
            "from gtm_gg_state gg,gtm_cat_type cat,tbl_users tu,tbl_usersinfo tui,tbl_isplist ti,tbl_distlist td," +
            "GTM_MAINFORM_INFO gmf,GTM_BUSINESS_INFO bi,gtm_contract gc " +
            "where gmf.gg_id=gg.gg_id and gmf.cat_type_id=cat.cat_id and tu.susername=tui.susername " +
            "and tu.susername=gmf.username and tu.iispid=ti.iispid and tu.idistid=td.idistid " +
            "and gmf.contract_id=gc.contract_id and gmf.department_id=bi.id";
    if(!bs_name.equals("")){
        sql+=" and gmf.department_id="+bs_name;
    }
    if(!userid.equals("")){
        sql+=" and tu.susername='"+userid+"'";
    }
    try{
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery(sql);
        //执行查询，结果集转JSON
        while (rs.next()){
            gridStr+="{";
            if(rs.getString("opt_usetime")!=null){
                gridStr+="opt_time:'"+rs.getDate("opt_usetime")+"',";
            }else{
                gridStr+="opt_time:'',";
            }
            if(rs.getString("isit")!=null){
                if(rs.getInt("isit")==1){
                    gridStr+="isit:'是',";
                }else{
                    gridStr+="isit:'否',";
                }
            }else{
                gridStr+="isit:'',";
            }
            if(rs.getString("name")!=null){
                gridStr+="bs_name:'"+new String(rs.getString("name").getBytes("iso-8859-1"),"gbk")+"',";
            }else{
                gridStr+="bs_name:'',";
            }
            if(rs.getString("susername")!=null){
                gridStr+="username:'"+new String(rs.getString("susername").getBytes("iso-8859-1"),"gbk")+"',";
            }else{
                gridStr+="username:'',";
            }
            if(rs.getString("srealname")!=null){
                gridStr+="realname:'"+new String(rs.getString("srealname").getBytes("iso-8859-1"),"gbk")+"',";
            }else{
                gridStr+="realname:'',";
            }
            if(rs.getString("sispname")!=null){
                gridStr+="mealtype:'"+new String(rs.getString("sispname").getBytes("iso-8859-1"),"gbk")+"',";
            }else{
                gridStr+="mealtype:'',";
            }
            if(rs.getString("dfirstdate")!=null){
                gridStr+="starttime:'"+rs.getString("dfirstdate")+"',";
            }else{
                gridStr+="starttime:'',";
            }
            if(rs.getString("doverdate")!=null){
                gridStr+="endtime:'"+rs.getDate("doverdate")+"',";
            }else{
                gridStr+="endtime:'',";
            }
            if(rs.getString("sfeephone")!=null){
                gridStr+="address:'"+new String(rs.getString("sfeephone").getBytes("iso-8859-1"),"gbk")+"',";
            }else{
                gridStr+="address:'',";
            }
            if(rs.getString("group_id")!=null){
                gridStr+="group_id:'"+rs.getString("group_id")+"',";
            }else{
                gridStr+="group_id:'',";
            }
            if(rs.getString("leaflet_no")!=null){
                gridStr+="leaflet_no:'"+rs.getString("leaflet_no")+"',";
            }else{
                gridStr+="leaflet_no:'',";
            }
            if(rs.getString("stele")!=null){
                gridStr+="tel:'"+new String(rs.getString("stele").getBytes("iso-8859-1"),"gbk").replaceFirst("^;+", "")+"',";
            }else{
                gridStr+="tel:'',";
            }
            if(rs.getString("semail")!=null){
                gridStr+="email:'"+new String(rs.getString("semail").getBytes("iso-8859-1"),"gbk")+"',";
            }else{
                gridStr+="email:'',";
            }
            if(rs.getString("house_type_id")!=null){
                if(rs.getInt("house_type_id")==1){
                    gridStr+="house_type:'租用',";
                }else if(rs.getInt("house_type_id")==2){
                    gridStr+="house_type:'私有',";
                }
            }else{
                gridStr+="house_type:'',";
            }
            if(rs.getString("line_type_id")!=null){
                if(rs.getInt("line_type_id")==1){
                    gridStr+="line_type:'明线',";
                }else if(rs.getInt("line_type_id")==2){
                    gridStr+="line_type:'暗线',";
                }
            }else{
                gridStr+="line_type:'',";
            }
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
            if(rs.getString("contract_name")!=null){
                gridStr+="contract_name:'"+new String(rs.getString("contract_name").getBytes("iso-8859-1"),"gbk")+"',";
            }else{
                gridStr+="contract_name:'',";
            }
            if(rs.getString("redate")!=null){
                gridStr+="mf_retime:'"+rs.getString("redate")+"',";
            }else{
                gridStr+="mf_retime:'',";
            }
            gridStr+="mf_gm:'"+new String(rs.getString("cat_name").getBytes("iso-8859-1"),"gbk")+"',";
            gridStr+="mf_gg:'"+new String(rs.getString("gg_name").getBytes("iso-8859-1"),"gbk")+"',";
            if(rs.getString("cxnote")!=null){
                gridStr+="mf_cxnote:'"+new String(rs.getString("cxnote").getBytes("iso-8859-1"),"gbk")+"',";
            }else{
                gridStr+="mf_cxnote:'',";
            }
            if(rs.getString("hdnote")!=null){
                gridStr+="mf_hdnote:'"+new String(rs.getString("hdnote").getBytes("iso-8859-1"),"gbk")+"',";
            }else{
                gridStr+="mf_hdnote:'',";
            }
            if(rs.getString("sbnote")!=null){
                gridStr+="mf_sbnote:'"+new String(rs.getString("sbnote").getBytes("iso-8859-1"),"gbk")+"',";
            }else{
                gridStr+="mf_sbnote:'',";
            }
            if(rs.getString("zhnote")!=null){
                gridStr+="mf_zhnote:'"+new String(rs.getString("zhnote").getBytes("iso-8859-1"),"gbk")+"',";
            }else{
                gridStr+="mf_zhnote:'',";
            }
            if(rs.getString("oldnet_prop_id")!=null){
                if(rs.getInt("oldnet_prop_id")==0){
                    gridStr+="onet_prop_value:'无',";
                }else if(rs.getInt("oldnet_prop_id")==1){
                    gridStr+="onet_prop_value:'铁通',";
                }else if(rs.getInt("oldnet_prop_id")==2){
                    gridStr+="onet_prop_value:'联通',";
                }else if(rs.getInt("oldnet_prop_id")==3){
                    gridStr+="onet_prop_value:'中宽',";
                }else if(rs.getInt("oldnet_prop_id")==4){
                    gridStr+="onet_prop_value:'宽带通',";
                }else if(rs.getInt("oldnet_prop_id")==5){
                    gridStr+="onet_prop_value:'长城宽带',";
                }else if(rs.getInt("oldnet_prop_id")==6){
                    gridStr+="onet_prop_value:'方正宽带',";
                }else if(rs.getInt("oldnet_prop_id")==7){
                    gridStr+="onet_prop_value:'其他',";
                }
            }else{
                gridStr+="onet_prop_value:'',";
            }
            if(rs.getString("user_prop_id")!=null){
                if(rs.getInt("user_prop_id")==0){
                    gridStr+="user_prop_value:'无',";
                }else if(rs.getInt("user_prop_id")==1){
                    gridStr+="user_prop_value:'普通用户',";
                }else if(rs.getInt("user_prop_id")==2){
                    gridStr+="user_prop_value:'平房用户',";
                }else if(rs.getInt("user_prop_id")==3){
                    gridStr+="user_prop_value:'底商用户',";
                }else if(rs.getInt("user_prop_id")==4){
                    gridStr+="user_prop_value:'企业用户',";
                }else if(rs.getInt("user_prop_id")==5){
                    gridStr+="user_prop_value:'优惠用户',";
                }else if(rs.getInt("user_prop_id")==6){
                    gridStr+="user_prop_value:'免费用户',";
                }
            }else{
                gridStr+="user_prop_value:'',";
            }
            if(rs.getString("net_prop")!=null){
                if(rs.getInt("net_prop")==0){
                    gridStr+="net_prop_value:'无',";
                }else if(rs.getInt("net_prop")==1){
                    gridStr+="net_prop_value:'光纤用户',";
                }else if(rs.getInt("net_prop")==1){
                    gridStr+="net_prop_value:'非光纤用户',";
                }
            }else{
                gridStr+="net_prop_value:'',";
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
            if(rs.getString("user_mobile")!=null){
                gridStr+="user_mobile:'"+rs.getString("user_mobile")+"',";
            }else{
                gridStr+="user_mobile:'',";
            }
            if(rs.getString("user_phone")!=null){
                gridStr+="user_phone:'"+rs.getString("user_phone")+"',";
            }else{
                gridStr+="user_phone:'',";
            }
            if(rs.getString("weixin")!=null){
                if(rs.getInt("weixin")==0){
                    gridStr+="weixin:'否',";
                }else if(rs.getInt("weixin")==1){
                    gridStr+="weixin:'是',";
                }
            }else{
                gridStr+="weixin:'',";
            }
            if(rs.getString("it_end")!=null){
                gridStr+="it_end:'"+rs.getDate("it_end")+"',";
            }else{
                gridStr+="it_end:'',";
            }
            if(rs.getString("letv_start")!=null){
                gridStr+="letv_start:'"+rs.getDate("letv_start")+"',";
            }else{
                gridStr+="letv_start:'',";
            }
            if(rs.getString("letv_end")!=null){
                gridStr+="letv_end:'"+rs.getDate("letv_end")+"',";
            }else{
                gridStr+="letv_end:'',";
            }
            if(rs.getString("letv_mac")!=null){
                gridStr+="letv_mac:'"+rs.getString("letv_mac")+"',";
            }else{
                gridStr+="letv_mac:'',";
            }
            if(rs.getString("spostcode")!=null){
                gridStr+="gm_mac:'"+rs.getString("spostcode")+"',";
            }else{
                gridStr+="gm_mac:'',";
            }
            if(rs.getString("tsnote")!=null){
                gridStr+="mf_tsnote:'"+new String(rs.getString("tsnote").getBytes("iso-8859-1"),"gbk")+"'";
            }else{
                gridStr+="mf_tsnote:''";
            }
            gridStr+="}";
        }
        out.print(gridStr);
        out.flush();
        out.close();
    }
    catch (SQLException e){
        e.printStackTrace();
    }
    /**
     * 关闭连接
     */
    finally {
        if(conn!=null){
            try{
                conn.close();
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
        if(rs!=null){
            try{
                rs.close();
            }catch (SQLException e){
                e.printStackTrace();
            }
        }
    }
%>
package servlet;

import bean.GTM_QUOTA_AREA;
import com.alibaba.druid.support.logging.Log;
import com.alibaba.druid.support.logging.LogFactory;
import service.GTM_Service;
import service.GTM_ServiceImpl;
import tools.Tools;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * Created by HP on 14-4-28.
 */
public class AreaQuotaServlet extends HttpServlet {
    GTM_Service service = new GTM_ServiceImpl();
    Log log = LogFactory.getLog(AreaQuotaServlet.class);
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取操作类型
        String operation = req.getParameter("operation");
        /*
        查询
         */
        if(operation.equals("get")){
            resp.setContentType("text/json;charset=GBK");
            PrintWriter out = resp.getWriter();
            StringBuilder sb = new StringBuilder();
            int departmentid = Integer.parseInt(req.getParameter("department_id"));
            List<GTM_QUOTA_AREA> quota = service.getAreaQuota(departmentid);
            sb.append("[");
            for(int i=0;i<quota.size();i++){
                GTM_QUOTA_AREA bean = quota.get(i);
                sb.append("{\"id\":\""+bean.getID()+"\",")
                        .append("\"department_id\":\""+ Tools.areaCode2BusinessHall(bean.getDEPARTMENT_ID())+"\",")
                        .append("\"area_name\":\""+new String(bean.getAREA_NAME().getBytes("ISO-8859-1"),"GBK")+"\",")
                        .append("\"area_id\":\""+new String(bean.getAREA_ID().getBytes("ISO-8859-1"),"GBK")+"\",")
                        .append("\"new_quota\":\"" + bean.getNEW_QUOTA() + "\",")
                        .append("\"charge_quota\":\""+bean.getCHARGE_QUOTA()+"\",")
                        .append("\"charge_year_quota\":\""+bean.getCHARGE_YEAR_QUOTA()+"\",")
                        .append("\"cancel_quota\":\""+bean.getCANCEL_QUOTA()+"\",")
                        .append("\"money_quota\":\""+bean.getMONEY_QUOTA()+"\",")
                        .append("\"other_quota\":\""+bean.getOTHER_QUOTA()+"\",")
                        .append("\"charge_person\":\""+new String(bean.getCHARGE_PERSON().getBytes("ISO-8859-1"),"GBK")+"\"},");
            }
            if (sb.length()>2){
                sb.deleteCharAt(sb.lastIndexOf(","));
            }
            sb.append("]");
            //输出并回收资源
            out.print(sb);
            out.flush();
            out.close();
        }
        /*
        添加修改
         */
        else if(operation.equals("edit")){
            /**
             *  ID为空，添加记录
             */
            if(req.getParameter("id").equals("")){
                //先获取ID最大值
                long maxId = service.getMaxIdFromQuotaArea(req.getParameter("department_id"));
                int newId = (int)maxId+1;
                GTM_QUOTA_AREA insBean = new GTM_QUOTA_AREA();
                insBean.setID(newId);
                insBean.setAREA_ID(Tools.array2String(req.getParameterValues("area_id"),true));
                insBean.setAREA_NAME(new String(req.getParameter("area_name").getBytes("GBK"),"ISO-8859-1"));
                insBean.setCANCEL_QUOTA(Integer.parseInt(req.getParameter("cancel_quota")));
                insBean.setCHARGE_QUOTA(Integer.parseInt(req.getParameter("charge_quota")));
                insBean.setCHARGE_YEAR_QUOTA(Integer.parseInt(req.getParameter("charge_year_quota")));
                insBean.setNEW_QUOTA(Integer.parseInt(req.getParameter("new_quota")));
                insBean.setMONEY_QUOTA(req.getParameter("money_quota"));
                insBean.setOTHER_QUOTA(Integer.parseInt(req.getParameter("other_quota")));
                insBean.setDEPARTMENT_ID(Integer.parseInt(req.getParameter("department_id")));
                insBean.setCHARGE_PERSON(new String(req.getParameter("charge_person").getBytes("GBK"),"ISO-8859-1"));
                if (!service.insertAreaQuota(insBean)){
                    log.error("插入片区信息失败...");
                }
            }
            /**
             * ID不为空，修改记录
              */
            else{
                String id = req.getParameter("id");
                String department_id = req.getParameter("department_id");
                String area_name = new String(req.getParameter("area_name").getBytes("GBK"),"ISO-8859-1");
                String[] area_id = req.getParameterValues("area_id");
                String new_quota = req.getParameter("new_quota");
                String charge_quota = req.getParameter("charge_quota");
                String charge_year_quota = req.getParameter("charge_year_quota");
                String cancel_quota = req.getParameter("cancel_quota");
                String money_quota = req.getParameter("money_quota");
                String other_quota = req.getParameter("other_quota");
                String charge_person = new String(req.getParameter("charge_person").getBytes("GBK"),"ISO-8859-1");
                Object[] params = new Object[]{Tools.array2String(area_id,true),new_quota,charge_quota,charge_year_quota,
                        cancel_quota,money_quota,other_quota,area_name,charge_person,id,department_id};
                if(!service.updateAreaQuota(params)){
                    System.out.println("更新片区定额失败...");
                }
            }
        }
        /*
        删除片区数据
         */
        else if(operation.equals("delete")){
            String id = req.getParameter("id");
            String department_id = req.getParameter("department_id");
            if(!service.removeAreaQuota(id, department_id)){
                log.error("删除片区数据失败...");
            }
        }
    }
}

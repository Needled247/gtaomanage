package servlet;

import bean.GTM_BUSINESS_QUOTA;
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
public class BusinessStationQuotaServlet extends HttpServlet {
    GTM_Service service = new GTM_ServiceImpl();
    Log log = LogFactory.getLog(BusinessStationQuotaServlet.class);
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
            List<GTM_BUSINESS_QUOTA> quota = service.getBusinessQuota();
            sb.append("[");
            for(int i=0;i<quota.size();i++){
                GTM_BUSINESS_QUOTA bean = quota.get(i);
                sb.append("{\"id\":\""+bean.getID()+"\",")
                        .append("\"department_id\":\""+ Tools.areaCode2BusinessHall(bean.getDEPARTMENT_ID())+"\",")
                        .append("\"new_quota\":\"" + bean.getNEW_QUOTA() + "\",")
                        .append("\"charge_quota\":\""+bean.getCHARGE_QUOTA()+"\",")
                        .append("\"charge_year_quota\":\""+bean.getCHARGE_YEAR_QUOTA()+"\",")
                        .append("\"cancel_quota\":\""+bean.getCANCEL_QUOTA()+"\",")
                        .append("\"money_quota\":\""+bean.getMONEY_QUOTA()+"\",")
                        .append("\"other_quota\":\""+bean.getOTHER_QUOTA()+"\"},");
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
         更新
         */
        else if(operation.endsWith("update")){
            String key = req.getParameter("key");
            String value = req.getParameter("value");
            String id = req.getParameter("id");
            Object[] params = new Object[]{value,id};
            if(!service.updateBusinessQuota(key,params)){
                log.error("更新营业厅定额失败...");
            }
        }
    }
}

package servlet;

import bean.ChargeTypeBean;
import bean.GTM_BUSINESS_QUOTA;
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
 * Created by HP on 14-5-8.
 */
public class CancelQuotaChartServlet extends HttpServlet {
    GTM_Service service = new GTM_ServiceImpl();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    /**
     * 生成停机指标分析图表Servlet
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/json;charset=GBK");
        PrintWriter out = resp.getWriter();
        StringBuilder sb = new StringBuilder();
        String month = req.getParameter("month");
        String suffix = Tools.validateTime(month);
        month = Tools.formatExtTime(month);
        List<GTM_BUSINESS_QUOTA> cancelQuotaList = service.getBusinessQuotaByMonth(suffix);
        ChargeTypeBean charge = new ChargeTypeBean();
        sb.append("[");
        for(int i =0;i<cancelQuotaList.size();i++){
            GTM_BUSINESS_QUOTA bean = cancelQuotaList.get(i);
            int bs_id = bean.getDEPARTMENT_ID();
            int cancelQuota = bean.getCANCEL_QUOTA();
            long cancelCount = service.getChargeCountByBsid(bs_id,month,charge.getTjArray());
            sb.append("{")
                    .append("\"name\":\""+Tools.areaCode2BusinessHall(bs_id)+"\",")
                    .append("\"data1\":"+cancelCount+",")
                    .append("\"data2\":"+cancelQuota)
                    .append("},");
        }
        if(sb.length()>2){
            sb.deleteCharAt(sb.lastIndexOf(","));
        }
        sb.append("]");
        //输出
        out.print(sb);
        out.flush();
        out.close();
    }
}

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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by HP on 14-5-7.
 */
public class NewQuotaChartServlet extends HttpServlet{
    GTM_Service service = new GTM_ServiceImpl();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/json;charset=GBK");
        PrintWriter out = resp.getWriter();
        StringBuilder sb = new StringBuilder();
        String month = req.getParameter("month");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        List<GTM_BUSINESS_QUOTA> quotaList = null;
        //比对时间，非本月加月份后缀，取得当月定额
        try {
            month = sdf.format(sdf.parse(month));
            if(!month.equals(sdf.format(new Date()))){
                quotaList = service.getBusinessQuotaByMonth(month);
            }
            else {
                quotaList = service.getBusinessQuota();
            }
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        //拿交易类型code
        ChargeTypeBean chargeType = new ChargeTypeBean();
        //开始拼接JSON
        sb.append("[");
        for(int i=0;i<quotaList.size();i++){
            GTM_BUSINESS_QUOTA bean = quotaList.get(i);
            int newQuota = bean.getNEW_QUOTA();
            int bs_id = bean.getDEPARTMENT_ID();
            long newSetupCount = service.getNewSetupCountByBsid(bs_id,
                    month, chargeType.getXzArray());
            sb.append("{")
                    .append("\"name\":\""+ Tools.areaCode2BusinessHall(bs_id)+"\",")
                    .append("\"data1\":"+newSetupCount+",")
                    .append("\"data2\":"+newQuota)
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

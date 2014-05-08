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
public class ChargeQuotaChartServlet extends HttpServlet {
    GTM_Service service = new GTM_ServiceImpl();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    /**
     * ��������ָ�����ͼ��Servlet
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
        //��ȡ����
        List<GTM_BUSINESS_QUOTA> chargeQuotaList = service.getBusinessQuotaByMonth(suffix);
        //��ȡ����code
        ChargeTypeBean charge = new ChargeTypeBean();
        //ƴ��JSON�ַ���
        sb.append("[");
        for(int i=0;i<chargeQuotaList.size();i++){
            GTM_BUSINESS_QUOTA bean = chargeQuotaList.get(i);
            int chargeQuota = bean.getCHARGE_QUOTA();
            int chargeYearQuota = bean.getCHARGE_YEAR_QUOTA();
            int bs_id = bean.getDEPARTMENT_ID();
            //��ȡ������������
            long chargeCount = service.getChargeCountByBsid(bs_id, month, charge.getQtArray());
            long chargeYearCount = service.getChargeCountByBsid(bs_id, month, charge.getBnArray());
            sb.append("{")
                    .append("\"name\":\""+Tools.areaCode2BusinessHall(bs_id)+"\",")
                    .append("\"data1\":"+chargeCount+",")
                    .append("\"data2\":"+chargeQuota+",")
                    .append("\"data3\":"+chargeYearCount+",")
                    .append("\"data4\":"+chargeYearQuota)
                    .append("},");
        }
        if(sb.length()>2){
            sb.deleteCharAt(sb.lastIndexOf(","));
        }
        sb.append("]");
        //���
        out.print(sb);
        out.flush();
        out.close();
    }
}

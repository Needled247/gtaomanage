package servlet;

import bean.ChargeTypeBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by HP on 14-5-21.
 */
public class StopUserChartServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.setContentTypeJson(resp);
        out = resp.getWriter();
        StringBuilder sb = new StringBuilder();
        String month = req.getParameter("month");
        long stopCount = service.getStopUserByMonth(month);
        ChargeTypeBean charge = new ChargeTypeBean();
        long yearPre = service.getPreChargeCount(month, charge.getYearPreCharge());
        long otherPre = service.getPreChargeCount(month, charge.getOtherPreCharge());
        long chargeCount = service.getChargeCountByBsid(0,month,
                new Object[]{charge.getYearPreCharge(),charge.getOtherPreCharge()});
        //ƴ��json
        sb.append("[")
                .append("{")
                .append("\"name\":\"ͣ���û�����\",")
                .append("\"num\":"+stopCount+",\"num2\":\"\",\"num3\":\"\"")
                .append("},")
                .append("{")
                .append("\"name\":\"�����û�����������Ԥ���ѣ�\",")
                //.append("\"num\":"+chargeCount+",\"num2\":"+yearPre+",\"num3\":"+otherPre)
                .append("\"num\":"+chargeCount+",\"num2\":125,\"num3\":330")
                .append("}")
                .append("]");
        //���
        out.print(sb);
        out.flush();
        out.close();
    }
}

package servlet;

import bean.ChargeTypeBean;
import tools.Tools;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

/**
 * ��������ͳ�Ƴ�ʼ��ͼ��Json��Servlet
 * Created by JiangHao on 14-4-16.
 */
public class getChartInfo extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String bs_name = req.getParameter("bs_name");
        String date = req.getParameter("month");
        super.setContentTypeJson(resp);
        PrintWriter out = resp.getWriter();
        StringBuilder sb = new StringBuilder();
        //�����������
        ChargeTypeBean chargeType = new ChargeTypeBean();
        Object[] xzArray = chargeType.getXzArray();
        Object[] bnArray = chargeType.getBnArray();
        Object[] qtArray = chargeType.getQtArray();
        Object[] tjArray = chargeType.getTjArray();
        Object[] tempBs = {bs_name,date};
        Object[] tempAll = {date};
        Object[] quotaParam = {bs_name};
        //����������
        long xzCount = 0, bnCount = 0, qtCount = 0, tjCount = 0;
        //����
        int new_quota = 0, charge_quota = 0, charge_year_quota = 0, cancel_quota = 0;
        /*
        ����ID����600��ȡ����Ӫҵ������
         */
        System.out.println(bs_name);
        if(Integer.parseInt(bs_name)>600){
            xzArray = Tools.concat(xzArray,tempAll);
            bnArray = Tools.concat(bnArray,tempAll);
            qtArray = Tools.concat(qtArray,tempAll);
            tjArray = Tools.concat(tjArray,tempAll);
            //����service��ȡ�ø��ཻ���������ݣ���ֵ���������
            xzCount = service.getAllChargeCount(xzArray);
            bnCount = service.getAllChargeCount(bnArray);
            qtCount = service.getAllChargeCount(qtArray);
            tjCount = service.getAllChargeCount(tjArray);
            //��ȡ����
            List<Map<String, Object>> result = service.getAllQuota();
            new_quota = Integer.parseInt(result.get(0).get("SUM(NEW_QUOTA)").toString());
            charge_quota = Integer.parseInt(result.get(0).get("SUM(CHARGE_QUOTA)").toString());
            charge_year_quota = Integer.parseInt(result.get(0).get("SUM(CHARGE_YEAR_QUOTA)").toString());
            cancel_quota = Integer.parseInt(result.get(0).get("SUM(CANCEL_QUOTA)").toString());
        }
        /*
        ��Ӫҵ��IDȡ����
         */
        else{
            xzArray = Tools.concat(xzArray,tempBs);
            bnArray = Tools.concat(bnArray,tempBs);
            qtArray = Tools.concat(qtArray,tempBs);
            tjArray = Tools.concat(tjArray,tempBs);
            //����service��ȡ�ø��ཻ���������ݣ���ֵ���������
            xzCount = service.getChargeCountByBs(xzArray);
            bnCount = service.getChargeCountByBs(bnArray);
            qtCount = service.getChargeCountByBs(qtArray);
            tjCount = service.getChargeCountByBs(tjArray);
            //��ȡ����
            List<Map<String, Object>> result = service.getBsQuota(quotaParam);
            new_quota = Integer.parseInt(result.get(0).get("NEW_QUOTA").toString());
            charge_quota = Integer.parseInt(result.get(0).get("CHARGE_QUOTA").toString());
            charge_year_quota = Integer.parseInt(result.get(0).get("CHARGE_YEAR_QUOTA").toString());
            cancel_quota = Integer.parseInt(result.get(0).get("CANCEL_QUOTA").toString());
        }
        //ƴ��JSON
        sb.append("[")
                .append("{\"num\":"+xzCount+",\"num2\":"+(new_quota-xzCount<0?"\"\"":new_quota-xzCount)+",\"name\":\"��װ\"},")
                .append("{\"num\":"+bnCount+",\"num2\":"+(charge_year_quota-bnCount<0?"\"\"":charge_year_quota-bnCount)+",\"name\":\"��������\"},")
                .append("{\"num\":"+qtCount+",\"num2\":"+(charge_quota-qtCount<0?"\"\"":charge_quota-qtCount)+",\"name\":\"��������\"},")
                .append("{\"num\":"+tjCount+",\"num2\":"+(cancel_quota-tjCount<0?"\"\"":cancel_quota-tjCount)+",\"name\":\"ͣ��ע��\"}")
                .append("]");
        out.print(sb);
        out.flush();
        out.close();
    }
}

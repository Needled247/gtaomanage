package servlet;

import bean.ChargeTypeBean;
import service.GTM_Service;
import service.GTM_ServiceImpl;
import tools.Tools;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 生成数据统计初始化图表Json的Servlet
 * Created by JiangHao on 14-4-16.
 */
public class getChartInfo extends HttpServlet {
    GTM_Service service = new GTM_ServiceImpl();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String bs_name = req.getParameter("bs_name");
        String date = Tools.Date2Str(new Date(),"yyyy-MM");
        //定义参数数组
        ChargeTypeBean chargeType = new ChargeTypeBean();
        Object[] xzArray = chargeType.getXzArray();
        Object[] bnArray = chargeType.getBnArray();
        Object[] qtArray = chargeType.getQtArray();
        Object[] tjArray = chargeType.getTjArray();
        Object[] tempBs = {bs_name,date};
        Object[] tempAll = {date};
        Object[] quotaParam = {bs_name};
        //定义结果变量
        long xzCount = 0, bnCount = 0, qtCount = 0, tjCount = 0;
        //定额
        int new_quota = 0, charge_quota = 0, charge_year_quota = 0, cancel_quota = 0;
        /*
        部门ID大于600，取所有营业厅数据
         */
        if(Integer.parseInt(bs_name)>600){
            xzArray = Tools.concat(xzArray,tempAll);
            bnArray = Tools.concat(bnArray,tempAll);
            qtArray = Tools.concat(qtArray,tempAll);
            tjArray = Tools.concat(tjArray,tempAll);
            //调用service层取得各类交易数量数据，赋值给结果变量
            xzCount = service.getAllChargeCount(xzArray);
            bnCount = service.getAllChargeCount(bnArray);
            qtCount = service.getAllChargeCount(qtArray);
            tjCount = service.getAllChargeCount(tjArray);
            //获取定额
            List<Map<String, Object>> result = service.getAllQuota();
            new_quota = Integer.parseInt(result.get(0).get("SUM(NEW_QUOTA)").toString());
            charge_quota = Integer.parseInt(result.get(0).get("SUM(CHARGE_QUOTA)").toString());
            charge_year_quota = Integer.parseInt(result.get(0).get("SUM(CHARGE_YEAR_QUOTA)").toString());
            cancel_quota = Integer.parseInt(result.get(0).get("SUM(CANCEL_QUOTA)").toString());
        }
        /*
        按营业厅ID取数据
         */
        else{
            xzArray = Tools.concat(xzArray,tempBs);
            bnArray = Tools.concat(bnArray,tempBs);
            qtArray = Tools.concat(qtArray,tempBs);
            tjArray = Tools.concat(tjArray,tempBs);
            //调用service层取得各类交易数量数据，赋值给结果变量
            xzCount = service.getAllChargeCount(xzArray);
            bnCount = service.getAllChargeCount(bnArray);
            qtCount = service.getAllChargeCount(qtArray);
            tjCount = service.getAllChargeCount(tjArray);
            //获取定额
            List<Map<String, Object>> result = service.getBsQuota(quotaParam);
            new_quota = Integer.parseInt(result.get(0).get("SUM(NEW_QUOTA)").toString());
            charge_quota = Integer.parseInt(result.get(0).get("SUM(CHARGE_QUOTA)").toString());
            charge_year_quota = Integer.parseInt(result.get(0).get("SUM(CHARGE_YEAR_QUOTA)").toString());
            cancel_quota = Integer.parseInt(result.get(0).get("SUM(CANCEL_QUOTA)").toString());
        }
        StringBuilder sb = new StringBuilder();
        sb.append("[")
                .append("{\"num\":"+xzCount+",\"num2\":"+(new_quota-xzCount<0?"\"\"":new_quota-xzCount)+",\"name\":\"新装\"},")
                .append("{\"num\":"+bnCount+",\"num2\":"+(charge_year_quota-bnCount<0?"\"\"":charge_year_quota-bnCount)+",\"name\":\"包年续费\"},")
                .append("{\"num\":"+qtCount+",\"num2\":"+(charge_quota-qtCount<0?"\"\"":charge_quota-qtCount)+",\"name\":\"其他续费\"},")
                .append("{\"num\":"+tjCount+",\"num2\":"+(cancel_quota-tjCount<0?"\"\"":cancel_quota-tjCount)+",\"name\":\"停机注销\"}")
                .append("]");
        resp.setContentType("text/json;charset=GBK");
        PrintWriter out = resp.getWriter();
        out.print(sb);
        out.flush();
        out.close();
    }
}

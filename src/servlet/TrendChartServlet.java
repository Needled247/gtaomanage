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

/**
 * Created by HP on 14-5-9.
 */
public class TrendChartServlet extends HttpServlet {
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
        String startTime = req.getParameter("start");
        String endTime = req.getParameter("end");
        String department_id = req.getParameter("department_id");
        int did = 0;
        if(!department_id.equals("")){
            did = Integer.parseInt(department_id);
        }
        ChargeTypeBean charge = new ChargeTypeBean();
        //获取两个时间间隔数组
        String[] dateInterval = Tools.getDateInterval(startTime, endTime);
        //拼接JSON
        sb.append("[");
        for(int i =0;i<dateInterval.length;i++){
            String tempDate = dateInterval[i];
            long xzCount = service.getChargeCountByBsid(did, tempDate, charge.getXzArray());
            long bnCount = service.getChargeCountByBsid(did, tempDate, charge.getBnArray());
            long qtCount = service.getChargeCountByBsid(did, tempDate, charge.getQtArray());
            long tjCount = service.getChargeCountByBsid(did, tempDate, charge.getTjArray());
            sb.append("{")
                    .append("\"name\":\""+tempDate+"\",")
                    .append("\"data1\":"+xzCount+",")
                    .append("\"data2\":"+bnCount+",")
                    .append("\"data3\":"+qtCount+",")
                    .append("\"data4\":"+tjCount)
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

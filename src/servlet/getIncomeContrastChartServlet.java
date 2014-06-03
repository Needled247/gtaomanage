package servlet;

import tools.Tools;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;

/**
 * Created by HP on 14-5-31.
 */
public class getIncomeContrastChartServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.setContentTypeJson(resp);
        PrintWriter out = resp.getWriter();
        StringBuilder sb = new StringBuilder();
        String startDate = req.getParameter("startDate");
        String endDate = req.getParameter("endDate");
        String department_id = req.getParameter("department_id");
        if (department_id.equals("")){
            department_id = "0";
        }
        //Æ´½ÓJSON
        sb.append("[");
        for (int i=-12;i<=0;i++){
            String startTemp = Tools.datePlus2(startDate, Calendar.MONTH, i);
            String endTemp = Tools.datePlus2(endDate, Calendar.MONTH, i);
            long monthIncome = service.getIntervalIncome(Integer.parseInt(department_id), startTemp, endTemp);
            sb.append("{")
                    .append("\"month\":\""+Tools.formatTime(startTemp)+"\",")
                    .append("\"income\":"+(monthIncome<0?0:monthIncome))
                    .append("},");
        }
        if (sb.length()>2){
            sb.deleteCharAt(sb.lastIndexOf(","));
        }
        sb.append("]");
        //Êä³ö
        out.print(sb);
        out.flush();
        out.close();
    }
}

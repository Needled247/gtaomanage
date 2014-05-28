package servlet;

import tools.Tools;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by HP on 14-5-27.
 */
public class getIncomeChartServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.setContentTypeJson(resp);
        PrintWriter out = resp.getWriter();
        StringBuilder sb = new StringBuilder();
        String startDate = req.getParameter("startDate");
        String endDate = req.getParameter("endDate");
        String department_id = req.getParameter("department_id");
        if(department_id.equals("")){
            department_id = "0";
        }
        //获取时间间隔
        String[] dateInterval = Tools.getDateInterval(startDate, endDate);
        //拼接JSON
        sb.append("[");
        for(int i=0;i<dateInterval.length;i++){
            long income = service.getTotalIncome(Integer.parseInt(department_id), dateInterval[i]);
            sb.append("{")
                    .append("\"name\":\""+dateInterval[i]+"\",")
                    .append("\"num\":"+income+"")
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

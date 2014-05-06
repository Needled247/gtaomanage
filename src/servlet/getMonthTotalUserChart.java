package servlet;

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

/**
 * Created by HP on 14-4-24.
 */
public class getMonthTotalUserChart extends HttpServlet {
    GTM_Service service = new GTM_ServiceImpl();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String startDate = req.getParameter("startDate");
        String endDate = req.getParameter("endDate");
        resp.setContentType("text/json;charset=GBK");
        PrintWriter out = resp.getWriter();
        StringBuilder sb = new StringBuilder();
        //获取日期间隔
        String[] dateInterval = Tools.getDateInterval(startDate,endDate);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        String standardDate = sdf.format(new Date());
        sb.append("[");
        //循环获取在网用户总数
        for(int i =0;i<dateInterval.length;i++){
            String temp = dateInterval[i];
            String dateJson = "";
            try{
                dateJson = sdf.format(sdf.parse(dateInterval[i]));
            }
            catch (ParseException e){
                e.printStackTrace();
            }
            if(temp.equals(standardDate)){
                temp = "";
            }
            else {
                temp = "_"+temp;
            }
            long count = service.getMonthTotalCount(temp);
            long normalCount = service.getMonthTotalNormalCount(temp);
            if(count!=0){
                sb.append("{\"date\":\""+dateJson+"\",\"num\":\""+count+"\",\"normalNum\":\""+normalCount+"\"},");
            }
        }
        if(sb.length()>2){
            sb.deleteCharAt(sb.lastIndexOf(","));
        }
        sb.append("]");
        out.print(sb);
        out.flush();
        out.close();
    }
}

package servlet;

import service.GTM_Service;
import service.GTM_ServiceImpl;

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
import java.util.Map;

/**
 * Created by HP on 14-4-23.
 */
public class getUserMonthChart extends HttpServlet {
    GTM_Service service = new GTM_ServiceImpl();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        /*
        比对参数时间和现在时间，生成表名后缀
         */
        String month = req.getParameter("month");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        try{
            month = sdf.format(sdf.parse(month));
        }
        catch (ParseException e){
            e.printStackTrace();
        }
        String standardDate = sdf.format(new Date());
        String tableSuffix = "";
        if(!month.equals(standardDate)){
            tableSuffix = "_"+month;
        }
        List<Map<String,Object>> result = service.getAllStation();
        StringBuilder sb = new StringBuilder();
        resp.setContentType("text/json;charset=GBK");
        PrintWriter out = resp.getWriter();
        //开始拼接JSON字符串
        sb.append("[");
        //1\2营业厅合并临时变量
        long tempCount = 0;
        //遍历营业厅信息集合，获得各营业厅用户数。
        for(int i = 0;i<result.size();i++){
            String temp = result.get(i).get("ID").toString();
            //忽略ID为0的营业厅（无效）
            if(temp.equals("0")){
                continue;
            }
            if(!temp.equals("1")){
                sb.append("{\"name\":\""+new String(result.get(i).get("NAME").toString().getBytes("ISO-8859-1"),"GBK")+"\",")
                        .append("\"num\":\""+service.getMonthUserCount(tableSuffix,new Object[]{result.get(i).get("ID")})+"\"},");
            }
            else {
                tempCount = service.getMonthUserCount(tableSuffix,new Object[]{result.get(i).get("ID")});
            }
        }
        //1、2营业厅数据合并
        sb.append("{\"name\":\"长辛店营业厅\",")
                .append("\"num\":\""+(service.getMonthUserCount(tableSuffix,new Object[]{2})+tempCount)+"\"},");
        if(sb.length()>2){
            sb.deleteCharAt(sb.lastIndexOf(","));
        }
        sb.append("]");
        out.print(sb);
        out.flush();
        out.close();
    }
}

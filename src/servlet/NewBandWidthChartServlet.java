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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

/**
 * Created by HP on 14-5-12.
 */
public class NewBandWidthChartServlet extends HttpServlet {
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
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        try {
            month = sdf.format(sdf.parse(month));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        //取得交易CODE
        ChargeTypeBean charge = new ChargeTypeBean();
        Object[] params = Tools.concat(charge.getXzArray(), new Object[]{month});
        //取得餐型
        List<Map<String,Object>> pack = service.getBandWidth(params);
        //拼接JSON
        sb.append("[");
        for(int i=0;i<pack.size();i++){
            String bwName = pack.get(i).get("BANDWIDTH").toString();
            long bwCount = service.getBandWidthCount(Tools.concat(params,new Object[]{bwName}));
            sb.append("{")
                    .append("\"name\":\""+new String(bwName.getBytes("ISO-8859-1"),"GBK")+"\",")
                    .append("\"data1\":"+bwCount+",")
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

package servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by HP on 14-5-14.
 */
public class HandselChartServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.setContentTypeJson(resp);
        out = resp.getWriter();
        StringBuilder sb = new StringBuilder();
        String department_id = req.getParameter("department_id");
        if(department_id.equals("")){
            department_id = "0";
        }
        List<Map<String,Object>> li = service.getHandselCount(Integer.parseInt(department_id));
        //拼接json
        sb.append("[");
        for(int i=0;i<li.size();i++){
            String key = li.get(i).get("ADMIT").toString();
            String value = li.get(i).get("COUNT(*)").toString();
            sb.append("{")
                    .append("\"name\":\""+key+"个月 \",")
                    .append("\"num\":"+value)
                    .append("},");
        }
        if (sb.length()>2){
            sb.deleteCharAt(sb.lastIndexOf(","));
        }
        sb.append("]");
        //输出
        out.print(sb);
        out.flush();
        out.close();
    }
}

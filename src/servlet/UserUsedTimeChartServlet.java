package servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by HP on 14-5-15.
 */
public class UserUsedTimeChartServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.setContentTypeJson(resp);
        PrintWriter out = resp.getWriter();
        StringBuilder sb = new StringBuilder();
        //构建月份数组
        int[] monthArray = new int[]{12,24,36,48,60};
        //拼接JSON
        sb.append("[");
        //遍历数组获取各年份用户数量
        for(int i=0;i<monthArray.length;i++){
            long userCount = service.getUserCountByTime(monthArray[i]);
            sb.append("{")
                    .append("\"name\":\""+(monthArray[i]/12)+"年\",")
                    .append("\"num\":"+userCount)
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

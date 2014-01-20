package tools;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

/**
 * 任务调度模块初始化Servlet
 * User: HP
 * Date: 14-1-9
 * Time: 下午12:05
 */
public class QuartzInit extends HttpServlet {
    @Override
    public void init(ServletConfig config) throws ServletException {
        System.out.println("任务调度模块加载成功！");
        new QuartzManager().TaskBegin();
    }
}

package tools;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

/**
 * �������ģ���ʼ��Servlet
 * User: HP
 * Date: 14-1-9
 * Time: ����12:05
 */
public class QuartzInit extends HttpServlet {
    @Override
    public void init(ServletConfig config) throws ServletException {
        System.out.println("�������ģ����سɹ���");
        new QuartzManager().TaskBegin();
    }
}

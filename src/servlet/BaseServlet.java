package servlet;

import service.GTM_Service;
import service.GTM_ServiceImpl;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by HP on 14-5-13.
 */
public class BaseServlet extends HttpServlet {
    public PrintWriter out = null;
    public StringBuilder stringBuilder = new StringBuilder();
    protected  GTM_Service service = new GTM_ServiceImpl();

    public void setContentTypeJson(HttpServletResponse response) throws IOException {
        response.setContentType("text/json;charset=GBK");
        out = response.getWriter();
    }

    public void setContentTypeHtml(HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=GBK");
        out = response.getWriter();
    }

    public void closePrintWriter(){
        out.close();
    }
}

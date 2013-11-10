package tools;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class SessionFilter
        implements Filter
{
    private List<String> list = new ArrayList<String>();

    public void destroy()
    {
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException
    {
        HttpServletRequest httpRequest = (HttpServletRequest)request;
        HttpServletResponse httpResponse = (HttpServletResponse)response;

        httpResponse.setHeader("Cache-Control", "no-cache");
        httpResponse.setHeader("Cache-Control", "no-store");
        httpResponse.setDateHeader("Expires", 0L);
        httpResponse.setHeader("Pragma", "no-cache");

        String path = httpRequest.getServletPath();

        for (String aList : this.list) {
            if (path.contains((String) aList)) {
                if (httpRequest.getSession().getAttribute("did") == null) {
                    String contextPath = httpRequest.getContextPath();
                    httpResponse.sendRedirect(contextPath + "/login.jsp");
                    return;
                }
                chain.doFilter(request, response);

                return;
            }
            request.setCharacterEncoding("utf-8");
            response.setCharacterEncoding("utf-8");
            chain.doFilter(request, response);
        }
    }

    public void init(FilterConfig filterConfig)
            throws ServletException
    {
        String include = filterConfig.getInitParameter("include");
        if (include != null) {
            StringTokenizer st = new StringTokenizer(include, ",");
            this.list.clear();
            while (st.hasMoreTokens())
                this.list.add(st.nextToken());
        }
    }
}
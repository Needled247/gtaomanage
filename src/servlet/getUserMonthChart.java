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
        �ȶԲ���ʱ�������ʱ�䣬���ɱ�����׺
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
        //��ʼƴ��JSON�ַ���
        sb.append("[");
        //1\2Ӫҵ���ϲ���ʱ����
        long tempCount = 0;
        //����Ӫҵ����Ϣ���ϣ���ø�Ӫҵ���û�����
        for(int i = 0;i<result.size();i++){
            String temp = result.get(i).get("ID").toString();
            //����IDΪ0��Ӫҵ������Ч��
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
        //1��2Ӫҵ�����ݺϲ�
        sb.append("{\"name\":\"������Ӫҵ��\",")
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

package servlet;

import bean.ChargeTypeBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by HP on 14-5-14.
 */
public class PreChargeDetailServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.setContentTypeJson(resp);
        int chart_type = 0;         //ͼ�����
        String chart_info = req.getParameter("chart_info");     //ͼ����Ϣ���û�ת������CODE
        String month = req.getParameter("month");       //�·�
        String department_id = req.getParameter("department_id");       //Ӫҵ��
        if(department_id.equals("")){
            department_id = "0";
        }
        int bs_id = Integer.parseInt(department_id);
        out = resp.getWriter();
        StringBuilder sb = new StringBuilder();
        //��ȡ����code
        ChargeTypeBean charge = new ChargeTypeBean();
        Object[] chargeCode = charge.str2CodeArray(chart_info);
        chart_type = charge.switchCodeGenerator(req.getParameter("chart_info"));
        //�ж�ͼ����룬��ʼ����JSON
        switch (chart_type){
            //Ԥ�����
            case 1 :
                String column = "BANDWIDTH";
                List<Map<String,Object>> li =
                        service.getChargeCountByGroup(bs_id,month,chargeCode,column);
                //ƴ��JSON
                sb.append("[");
                for(int i=0;i<li.size();i++){
                    String key = li.get(i).get(column).toString();
                    String value = li.get(i).get("COUNT(*)").toString();
                    sb.append("{")
                            .append("\"name\":\""+key+"\",")
                            .append("\"data\":"+value)
                            .append("},");
                }
                if (sb.length()>2){
                    sb.deleteCharAt(sb.lastIndexOf(","));
                }
                sb.append("]");
                out.print(sb);
                out.flush();
                out.close();
                break;
            //Ԥ������
            case 2 :
                String column2 = "BANDWIDTH,QUOTA";
                List<Map<String,Object>> result =
                        service.getChargeCountByGroup(bs_id,month,chargeCode,column2);
                sb.append("[");
                for(int i=0;i<result.size();i++){
                    String key1 = result.get(i).get("BANDWIDTH").toString();
                    String key2 = new String(result.get(i).get("QUOTA").toString().getBytes("ISO-8859-1"),"GBK");
                    String value = result.get(i).get("COUNT(*)").toString();
                    sb.append("{")
                            .append("\"name\":\""+key1+key2+"\",")
                            .append("\"data\":"+value)
                            .append("},");
                }
                if(sb.length()>2){
                    sb.deleteCharAt(sb.lastIndexOf(","));
                }
                sb.append("]");
                out.print(sb);
                out.flush();
                out.close();
                break;
            default :
                break;
        }
    }
}

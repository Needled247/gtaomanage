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
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by HP on 14-4-18.
 */
public class getDetailTableInfo extends HttpServlet {
    GTM_Service service = new GTM_ServiceImpl();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String chart_info = req.getParameter("chart_info");
        Object[] paramArray = new ChargeTypeBean().str2CodeArray(chart_info);
        //��ȡ�ϸ�������
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        String thisMonth = sdf.format(new Date());
        String lastMonth = Tools.datePlus(thisMonth, Calendar.MONTH);
        Object[] paramArray2 = Tools.concat(paramArray,new Object[]{thisMonth});
        /*
        ��ȡ���·ֽ�����  ����
         */
        List<Map<String,Object>> bwList = service.getBandWidth(paramArray2);
        Map<String,Integer> thisMonthBw = new HashMap<String, Integer>();

        for(int i=0; i<bwList.size(); i ++){
            Object[] tempParams = Tools.concat(paramArray2, new Object[]{bwList.get(i).get("BANDWIDTH")});
            long temp = service.getBandWidthCount(tempParams);
            thisMonthBw.put(bwList.get(i).get("BANDWIDTH").toString(),(int)temp);
        }
        /*
        ��ȡ���·ֽ�����  ����
         */
        List<Map<String,Object>> result = service.getPackageType(paramArray2);
        Map<String,Integer> thisMonthPack = new HashMap<String, Integer>();
        for(int i=0;i<result.size();i++){
            Object[] tempParams = Tools.concat(paramArray2, new Object[]{result.get(i).get("QUOTA")});
            long temp = service.getPackageCount(tempParams);
            thisMonthPack.put(new String(result.get(i).get("QUOTA").toString().getBytes("ISO-8859-1"),"GBK"),(int)temp);
        }
        /*
        ����+���Ͳ�ѯ
         */
        List<Map<String,Object>> bw = service.getBandWidth(paramArray2);
        //ȡ�ò�������
        List<Map<String,Object>> pack = service.getPackageType(paramArray2);
        //�����������
        List<Object[]> transList = new ArrayList<Object[]>();
        //ƴ�Ӳ����������ͺʹ�������һ��
        for(int x=0;x<bw.size();x++){
            String tempBw = bw.get(x).get("BANDWIDTH").toString();
            for(int y =0;y<pack.size();y++){
                //���͡�������ϲ�ѯ�Ĳ�������
                Object[] tempArr = Tools.concat(paramArray2,new Object[]{tempBw,pack.get(y).get("QUOTA")});
                //�浽������
                transList.add(tempArr);
            }
        }
        /*
         *  ǰһ�������ݼ��ϣ��ֽ⣩
         */
        List<Map<String,Object>> lastMonthPack = service.getPackageType(Tools.concat(paramArray,new Object[]{lastMonth}));
        List<Map<String,Object>> lastMonthBw = service.getBandWidth(Tools.concat(paramArray,new Object[]{lastMonth}));
        //������ս��Map
        Map<String,Integer> thisAllResult = new HashMap<String, Integer>();
        Map<String,Integer> lastAllResult = new HashMap<String, Integer>();
        for(int i = 0;i<transList.size();i++){
            //0��1���ױ��룬2���ڣ�3������4����
            Object[] tempAll = transList.get(i);
            //�ŵ�MAP�key������+���� ��value������
            thisAllResult.put(new String(tempAll[3].toString().getBytes("ISO-8859-1"),"GBK")+new String(tempAll[4].toString().getBytes("ISO-8859-1"),"GBK")
                    ,(int)service.getAllCount(tempAll));
            //����������������ڸĳ���������
            tempAll[2] = lastMonth;
            lastAllResult.put(new String(tempAll[3].toString().getBytes("ISO-8859-1"),"GBK")+new String(tempAll[4].toString().getBytes("ISO-8859-1"),"GBK")
                    ,(int)service.getAllCount(tempAll));
        }
        /*
        ��ѯ�ϸ��·ֽ��������������
         */
        Map<String,Integer> lastPackResult = new HashMap<String, Integer>();
        for(int i = 0;i<lastMonthPack.size();i++){
            Object[] tempPack = Tools.concat(Tools.concat(paramArray,new Object[]{lastMonth})
                    ,new Object[]{lastMonthPack.get(i).get("QUOTA").toString()});
            lastPackResult.put(new String(lastMonthPack.get(i).get("QUOTA").toString().getBytes("ISO-8859-1"),"GBK")
                    ,(int)service.getPackageCount(tempPack));
        }
        Map<String,Integer> lastBwResult = new HashMap<String, Integer>();
        for(int i = 0;i<lastMonthBw.size();i++){
            Object[] tempBw = Tools.concat(Tools.concat(paramArray,new Object[]{lastMonth})
                    ,new Object[]{lastMonthBw.get(i).get("BANDWIDTH").toString()});
            lastBwResult.put(new String(lastMonthBw.get(i).get("BANDWIDTH").toString().getBytes("ISO-8859-1"),"GBK")
                    ,(int)service.getBandWidthCount(tempBw));
        }
        /*
        MAP���ͣ�
        thisAllResult�����²���+����
        lastAllResult�����²���+����
        thisMonthPack�����²���
        thisMonthBw�����´���
        lastPackResult�����²���
        lastBwResult�����´���
        ��ʽ��Ϊ key ��String �ֶ�����+value��Integer ������
         */
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for(Map.Entry<String,Integer> entry : thisAllResult.entrySet()){
            sb.append("{")
                    .append("\"class\":\""+entry.getKey()+"\",")
                    .append("\"thisMonth\":\""+entry.getValue()+"\",")
                    .append("\"lastMonth\":\""+lastAllResult.get(entry.getKey())+"\",")
                    .append("\"plus\":\""+(entry.getValue()-lastAllResult.get(entry.getKey()))+"\"")
                    .append("},");
        }
        for(Map.Entry<String,Integer> entry : thisMonthBw.entrySet()){
            sb.append("{")
                    .append("\"class\":\""+entry.getKey()+"\",")
                    .append("\"thisMonth\":\""+entry.getValue()+"\",")
                    .append("\"lastMonth\":\""+lastBwResult.get(entry.getKey())+"\",")
                    .append("\"plus\":\""+(entry.getValue()-lastBwResult.get(entry.getKey()))+"\"")
                    .append("},");
        }
        for(Map.Entry<String,Integer> entry : thisMonthPack.entrySet()){
            sb.append("{")
                    .append("\"class\":\""+entry.getKey()+"\",")
                    .append("\"thisMonth\":\""+entry.getValue()+"\",")
                    .append("\"lastMonth\":\""+lastPackResult.get(entry.getKey())+"\",")
                    .append("\"plus\":\""+(entry.getValue()-lastPackResult.get(entry.getKey()))+"\"")
                    .append("},");
        }
        if (sb.length()>2){
            sb.deleteCharAt(sb.lastIndexOf(","));
        }
        sb.append("]");
        resp.setContentType("text/json;charset=GBK");
        PrintWriter out = resp.getWriter();
        out.print(sb);
        out.flush();
        out.close();
    }
}
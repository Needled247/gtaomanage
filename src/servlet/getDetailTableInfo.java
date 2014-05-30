package servlet;

import bean.ChargeTypeBean;
import tools.Tools;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

/**
 * Created by HP on 14-4-18.
 */
public class getDetailTableInfo extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String chart_info = req.getParameter("chart_info");
        String department_id = req.getParameter("department_id");
        if(department_id.equals("")){
            department_id = "666";
        }
        String thisMonth = req.getParameter("month");
        Object[] paramArray = new ChargeTypeBean().str2CodeArray(chart_info);
        //获取上个月日期
        String lastMonth = Tools.datePlus(thisMonth, Calendar.MONTH);
        Object[] paramArray2 = Tools.concat(paramArray,new Object[]{thisMonth});
        /*
        获取本月分解数据  带宽
         */
        List<Map<String,Object>> bwList;
        //判断是否需要营业厅条件
        if(Integer.parseInt(department_id)>600){
            bwList = service.getBandWidth(paramArray2);
        }
        else {
            bwList = service.getBsBandWidth(Tools.concat(paramArray2,new Object[]{department_id}));
        }
        Map<String,Integer> thisMonthBw = new HashMap<String, Integer>();
        //循环带宽结果，查询各结果实际数量，存到容器中
        for(int i=0; i<bwList.size(); i ++){
            Object[] tempParams = Tools.concat(paramArray2, new Object[]{bwList.get(i).get("BANDWIDTH")});
            long temp;
            if(Integer.parseInt(department_id)>600){
                temp = service.getBandWidthCount(tempParams);
            }
            else {
                temp = service.getBsBandWidthCount(Tools.concat(tempParams,new Object[]{department_id}));
            }
            //装载到MAP中
            thisMonthBw.put(bwList.get(i).get("BANDWIDTH").toString(),(int)temp);
        }
        /*
        获取本月分解数据  餐型
         */
        List<Map<String,Object>> result;
        if(Integer.parseInt(department_id)>600){
            result = service.getPackageType(paramArray2);
        }
        else {
            result = service.getBsPackageType(Tools.concat(paramArray2, new Object[]{department_id}));
        }
        Map<String,Integer> thisMonthPack = new HashMap<String, Integer>();
        for(int i=0;i<result.size();i++){
            Object[] tempParams = Tools.concat(paramArray2, new Object[]{result.get(i).get("QUOTA")});
            long temp;
            if(Integer.parseInt(department_id)>600){
                temp = service.getPackageCount(tempParams);
            }
            else {
                temp = service.getBsPackageCount(Tools.concat(tempParams, new Object[]{department_id}));
            }
            thisMonthPack.put(new String(result.get(i).get("QUOTA").toString().getBytes("ISO-8859-1"),"GBK"),(int)temp);
        }
        /*
        带宽+餐型查询
         */
        //定义参数集合
        List<Object[]> transList = new ArrayList<Object[]>();
        //拼接参数，将餐型和带宽和在一起
        for(int x=0;x<bwList.size();x++){
            String tempBw = bwList.get(x).get("BANDWIDTH").toString();
            for(int y =0;y<result.size();y++){
                //餐型、带宽组合查询的参数数组
                Object[] tempArr = Tools.concat(paramArray2,new Object[]{tempBw,result.get(y).get("QUOTA")});
                //存到集合中
                transList.add(tempArr);
            }
        }
        /*
         *  前一个月数据集合（分解）
         */
        List<Map<String,Object>> lastMonthPack;
        List<Map<String,Object>> lastMonthBw;
        if(Integer.parseInt(department_id)>600){
            lastMonthBw = service.getBandWidth(Tools.concat(paramArray,new Object[]{lastMonth}));
            lastMonthPack = service.getPackageType(Tools.concat(paramArray,new Object[]{lastMonth}));
        }
        else {
            lastMonthBw = service.getBsBandWidth(Tools.concat(paramArray,new Object[]{lastMonth,department_id}));
            lastMonthPack = service.getBsPackageType(Tools.concat(paramArray,new Object[]{lastMonth,department_id}));
        }
        //定义接收结果Map
        Map<String,Integer> thisAllResult = new HashMap<String, Integer>();
        Map<String,Integer> lastAllResult = new HashMap<String, Integer>();
        for(int i = 0;i<transList.size();i++){
            //0、1交易编码，2日期，3带宽，4餐型
            Object[] tempAll = transList.get(i);
            //放到MAP里，key：带宽+餐型 ，value：数量
            long temp;
            if(Integer.parseInt(department_id)>600){
                temp = service.getAllCount(tempAll);
            }
            else {
                temp = service.getBsAllCount(Tools.concat(tempAll, new Object[]{department_id}));
            }
            thisAllResult.put(new String(tempAll[3].toString().getBytes("ISO-8859-1"),"GBK")+new String(tempAll[4].toString().getBytes("ISO-8859-1"),"GBK")
                    ,(int)temp);
            //将参数数组里的日期改成上月日期
            tempAll[2] = lastMonth;
            if(Integer.parseInt(department_id)>600){
                temp = service.getAllCount(tempAll);
            }
            else {
                temp = service.getBsAllCount(Tools.concat(tempAll, new Object[]{department_id}));
            }
            lastAllResult.put(new String(tempAll[3].toString().getBytes("ISO-8859-1"),"GBK")+new String(tempAll[4].toString().getBytes("ISO-8859-1"),"GBK")
                    ,(int)temp);
        }
        /*
        查询上个月分解带宽、餐型数量
         */
        Map<String,Integer> lastPackResult = new HashMap<String, Integer>();
        for(int i = 0;i<lastMonthPack.size();i++){
            Object[] tempPack = Tools.concat(Tools.concat(paramArray,new Object[]{lastMonth})
                    ,new Object[]{lastMonthPack.get(i).get("QUOTA").toString()});
            long temp;
            if(Integer.parseInt(department_id)>600){
                temp = service.getPackageCount(tempPack);
            }
            else {
                temp = service.getBsPackageCount(Tools.concat(tempPack, new Object[]{department_id}));
            }
            lastPackResult.put(new String(lastMonthPack.get(i).get("QUOTA").toString().getBytes("ISO-8859-1"),"GBK")
                    ,(int)temp);
        }
        Map<String,Integer> lastBwResult = new HashMap<String, Integer>();
        for(int i = 0;i<lastMonthBw.size();i++){
            Object[] tempBw = Tools.concat(Tools.concat(paramArray,new Object[]{lastMonth})
                    ,new Object[]{lastMonthBw.get(i).get("BANDWIDTH").toString()});
            long temp;
            if(Integer.parseInt(department_id)>600){
                temp = service.getBandWidthCount(tempBw);
            }
            else {
                temp = service.getBsBandWidthCount(Tools.concat(tempBw, new Object[]{department_id}));
            }
            lastBwResult.put(new String(lastMonthBw.get(i).get("BANDWIDTH").toString().getBytes("ISO-8859-1"),"GBK")
                    ,(int)temp);
        }
        /*
        MAP解释：
        thisAllResult：本月餐型+带宽
        lastAllResult：上月餐型+带宽
        thisMonthPack：本月餐型
        thisMonthBw：本月带宽
        lastPackResult：上月餐型
        lastBwResult：上月带宽
        格式均为 key （String 字段名）+value（Integer 数量）
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
        super.setContentTypeJson(resp);
        PrintWriter out = resp.getWriter();
        out.print(sb);
        out.flush();
        out.close();
    }
}

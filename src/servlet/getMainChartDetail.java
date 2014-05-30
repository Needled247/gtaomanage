package servlet;

import bean.ChargeTypeBean;
import tools.Tools;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by HP on 14-4-17.
 */
public class getMainChartDetail extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int type = Integer.parseInt(req.getParameter("type"));
        super.setContentTypeJson(resp);
        PrintWriter out = resp.getWriter();
        String chart_info = req.getParameter("chart_info");
        String department_id = req.getParameter("department_id");
        if(department_id.equals("")){
            department_id = "666";
        }
        String date = req.getParameter("month");
        StringBuilder sb = new StringBuilder();
        //取得交易类型编码
        ChargeTypeBean chargeType = new ChargeTypeBean();
        Object[] params = chargeType.str2CodeArray(chart_info);
        switch (type){
            /*
            生成餐型+带宽饼图JSON
             */
            case 0 :
                //拼接参数
                params = Tools.concat(params,new Object[]{date});
                //取得带宽数据
                List<Map<String,Object>> bw;
                if(Integer.parseInt(department_id)>600){
                    bw = service.getBandWidth(params);
                }
                else {
                    bw = service.getBsBandWidth(Tools.concat(params, new Object[]{department_id}));
                }
                //取得餐型数据
                List<Map<String,Object>> pack;
                if(Integer.parseInt(department_id)>600){
                    pack = service.getPackageType(params);
                }
                else {
                    pack = service.getBsPackageType(Tools.concat(params, new Object[]{department_id}));
                }
                //定义参数集合
                List<Object[]> transList = new ArrayList<Object[]>();
                sb.append("[");
                //拼接参数，将餐型和带宽和在一起
                for(int x=0;x<bw.size();x++){
                    String tempBw = bw.get(x).get("BANDWIDTH").toString();
                    for(int y =0;y<pack.size();y++){
                        //餐型、带宽组合查询的参数数组
                        Object[] tempArr = Tools.concat(params,new Object[]{tempBw,pack.get(y).get("QUOTA")});
                        //存到集合中
                        transList.add(tempArr);
                        long tempCount;
                        if(Integer.parseInt(department_id)>600){
                            tempCount = service.getAllCount(tempArr);
                        }
                        else {
                            tempCount = service.getBsAllCount(Tools.concat(tempArr, new Object[]{department_id}));
                        }
                        if(tempCount!=0){
                            //图表JSON
                            sb.append("{\"name\":\"" + tempBw+new String(pack.get(y).get("QUOTA").toString().getBytes("ISO-8859-1"),"GBK")
                                    + "\",\"data\":" + tempCount + "},");
                        }
                    }
                }
                req.setAttribute("transList",transList);
                if (sb.length()>2){
                    sb.deleteCharAt(sb.lastIndexOf(","));
                }
                sb.append("]");
                out.print(sb);
                out.flush();
                out.close();
                break;
            /*
            生成带宽饼图JSON
             */
            case 1 :
                //拼接参数
                params = Tools.concat(params,new Object[]{date});
                //取得带宽数据
                List<Map<String,Object>> bwList;
                if(Integer.parseInt(department_id)>600){
                    bwList = service.getBandWidth(params);
                }
                else {
                    bwList = service.getBsBandWidth(Tools.concat(params, new Object[]{department_id}));
                }
                Map<String,Integer> bwMap = new HashMap<String, Integer>();
                sb.append("[");
                for(int i=0; i<bwList.size(); i ++){
                    Object[] tempParams = Tools.concat(params, new Object[]{bwList.get(i).get("BANDWIDTH")});
                    long temp;
                    if(Integer.parseInt(department_id)>600){
                        temp = service.getBandWidthCount(tempParams);
                    }
                    else {
                        temp = service.getBsBandWidthCount(Tools.concat(tempParams, new Object[]{department_id}));
                    }
                    sb.append("{\"name\":\"" + bwList.get(i).get("BANDWIDTH") + "\",\"data\":" + temp + "},");
                    bwMap.put(bwList.get(i).get("BANDWIDTH").toString(),(int)temp);
                }
                req.setAttribute("bwMap",bwMap);
                if(sb.length()>2){
                    sb.deleteCharAt(sb.lastIndexOf(","));
                }
                sb.append("]");
                out.print(sb);
                out.flush();
                out.close();
                break;
            /*
            生成餐型饼图JSON
             */
            case 2 :
                params = Tools.concat(params, new Object[]{date});
                List<Map<String,Object>> result;
                if(Integer.parseInt(department_id)>600){
                    result = service.getPackageType(params);
                }
                else {
                    result = service.getBsPackageType(Tools.concat(params, new Object[]{department_id}));
                }
                Map<String,Integer> packMap = new HashMap<String, Integer>();
                sb.append("[");
                for(int i=0;i<result.size();i++){
                    Object[] tempParams = Tools.concat(params, new Object[]{result.get(i).get("QUOTA")});
                    long temp;
                    if(Integer.parseInt(department_id)>600){
                        temp = service.getPackageCount(tempParams);
                    }
                    else {
                        temp = service.getBsPackageCount(Tools.concat(tempParams, new Object[]{department_id}));
                    }
                    sb.append("{\"name\":\"" + new String(result.get(i).get("QUOTA").toString().getBytes("ISO-8859-1"), "GBK") + "\",\"data\":" + temp + "},");
                    packMap.put(new String(result.get(i).get("QUOTA").toString().getBytes("ISO-8859-1"),"GBK"),(int)temp);
                }
                req.setAttribute("packMap",packMap);
                if(sb.length()>2){
                    sb.deleteCharAt(sb.lastIndexOf(","));
                }
                sb.append("]");
                out.print(sb);
                out.flush();
                out.close();
                break;
            default:
                out.close();
                break;
        }
    }
}

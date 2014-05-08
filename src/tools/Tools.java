package tools;

import bean.IcInfoBean;
import ds.ConnPoolBean;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class Tools
{
    public static String getPropertiesValue(String key)
    {
        Properties prop = null;

        String value = "";
        try
        {
            prop = new Properties();
            InputStream is = Tools.class.getResourceAsStream("info.properties");
            InputStreamReader in = new InputStreamReader(is, "UTF-8");
            prop.load(in);
            value = prop.getProperty(key);
            in.close();
            is.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return value;
    }

    public String replaceBsName(String bs_name){
        String rtnName = "";
        if(bs_name.equals("")){
            rtnName = "所有营业厅";
        }
        else {
            rtnName = bs_name;
        }
        return rtnName;
    }

    /**
     * Author：蒋浩
     * @param list
     * @return String
     * 遍历List，格式化输出incoming_detail详细json。
     */
    public String IcDetailIterate(List list){
        String formatStr = "";
        Double param1 = 0.0,param2 = 0.0,param3 = 0.0,param4 = 0.0,param5 = 0.0,param6 = 0.0,param7 = 0.0,
                param8 = 0.0,param9 = 0.0,param10 = 0.0,param11 = 0.0,param12 = 0.0,param13 = 0.0,param14 = 0.0;
        for (Object aList : list) {
            IcInfoBean bean = (IcInfoBean) aList;
            if (bean.getKey().equals("宽带收入")) {
                param1 += bean.getValue();
            }
            if (bean.getKey().equals("IT收入")) {
                param2 += bean.getValue();
            }
            if (bean.getKey().equals("IT卡收入")) {
                param3 += bean.getValue();
            }
            if (bean.getKey().equals("料收入")) {
                param4 += bean.getValue();
            }
            if (bean.getKey().equals("商城收入")) {
                param5 += bean.getValue();
            }
            if (bean.getKey().equals("移机收入")) {
                param6 += bean.getValue();
            }
            if (bean.getKey().equals("光猫押金")) {
                param7 += bean.getValue();
            }
            if (bean.getKey().equals("路由器押金")) {
                param8 += bean.getValue();
            }
            if (bean.getKey().equals("退宽带收入")) {
                param9 += bean.getValue();
            }
            if (bean.getKey().equals("退光猫押金")) {
                param10 += bean.getValue();
            }
            if (bean.getKey().equals("退路由器押金")) {
                param11 += bean.getValue();
            }
            if (bean.getKey().equals("退其他押金")) {
                param12 += bean.getValue();
            }
            if (bean.getKey().equals("联通非ESS收入")) {
                param13 += bean.getValue();
            }
            if (bean.getKey().equals("光猫款")) {
                param14 += bean.getValue();
            }
        }
        formatStr += "income_detail:'<p>" +
                "<b>宽带收入&nbsp;:&nbsp;￥<font color=red>" + param1 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>IT收入&nbsp;:&nbsp;￥<font color=red>" + param2 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>IT卡收入&nbsp;:&nbsp;￥<font color=red>" + param3 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>料收入&nbsp;:&nbsp;￥<font color=red>" + param4 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>商城收入&nbsp;:&nbsp;￥<font color=red>" + param5 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>移机收入&nbsp;:&nbsp;￥<font color=red>" + param6 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>光猫押金&nbsp;:&nbsp;￥<font color=red>" + param7 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>路由器押金&nbsp;:&nbsp;￥<font color=red>" + param8 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>退宽带收入&nbsp;:&nbsp;￥<font color=red>" + param9 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>退光猫押金&nbsp;:&nbsp;￥<font color=red>" + param10 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>退路由器押金&nbsp;:&nbsp;￥<font color=red>" + param11 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>退其他押金&nbsp;:&nbsp;￥<font color=red>" + param12 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>联通非ESS收入&nbsp;:&nbsp;￥<font color=red>" + param13 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>光猫款&nbsp;:&nbsp;￥<font color=red>" + param14 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p>'},";
        return formatStr;
    }

    public static String policy2BandWidth(int policy){
        String bandWidth = "";
        Connection conn = ConnPoolBean.getRadiusConn();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        String sql = "SELECT SPOLICYNAME FROM GTM_POLICY WHERE IPOLICYID="+policy;
        try{
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery(sql);
            while (rs.next()){
                bandWidth = rs.getString("SPOLICYNAME");
            }
        }
        catch (SQLException e){
            e.printStackTrace();
        }
        finally {
            if(conn!=null){
                try{
                    conn.close();
                }
                catch (SQLException e){
                    e.printStackTrace();
                }
            }
            if(pstmt!=null){
                try{
                    pstmt.close();
                }
                catch (SQLException e){
                    e.printStackTrace();
                }
            }
            if(rs!=null){
                try{
                    rs.close();
                }
                catch (SQLException e){
                    e.printStackTrace();
                }
            }
        }
        return bandWidth;
    }

    public static String areaCode2BusinessHall(int areaCode){
        switch (areaCode){
            case 1:
                return "长辛店营业厅";
            case 3:
                return "正阳营业厅";
            case 4:
                return "开阳营业厅";
            case 5:
                return "青塔营业厅";
            case 6:
                return "三环营业厅";
            case 7:
                return "良乡营业厅";
            case 41:
                return "晓月苑营业厅";
            default:
                return "未知";
        }
    }

    public static String invoiceCode2Status(int invoiceCode){
        switch (invoiceCode){
            case 0:
                return "未使用";
            case 1:
                return "已使用";
            case -1:
                return "废票";
            default:
                return "未知";
        }
    }

    public static String Date2Str(Date date,String pattern){
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    /**
     * 数组相加
     * @param first
     * @param second
     * @param <T>
     * @return  new Array
     */
    public static <T> T[] concat(T[] first, T[] second) {
        T[] result = Arrays.copyOf(first, first.length + second.length);
        System.arraycopy(second, 0, result, first.length, second.length);
        return result;
    }

    /**
     * 日期-1操作，年为1、月为2
     * @param date
     * @param yearOrMonth
     * @return
     */
    public static String datePlus(String date, int yearOrMonth){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        Date d = null;
        try{
            d = sdf.parse(date);
        }
        catch (ParseException e){
            e.printStackTrace();
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(d);
        Date result = null;
        switch (yearOrMonth){
            case 1 :
                calendar.add(Calendar.YEAR,-1);
                result = calendar.getTime();
                break;
            case 2 :
                calendar.add(Calendar.MONTH,-1);
                result = calendar.getTime();
                break;
            default:
                result = null;
                break;
        }
        return sdf.format(result);
    }

    /**
     * 计算两个日期间隔--》数组（yyyyMM）
     * @param startDate
     * @param endDate
     * @return  Array
     */
    public static String[] getDateInterval(String startDate,String endDate){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        String dateTemp = "";
        try{
            Date start = sdf.parse(startDate);
            Date end = sdf.parse(endDate);
            Calendar c1 = Calendar.getInstance();
            c1.setTime(start);
            Calendar c2 = Calendar.getInstance();
            c2.setTime(end);
            dateTemp += sdf.format(c1.getTime())+",";
            while (c1.before(c2)){
                c1.add(Calendar.MONTH,1);
                dateTemp += sdf.format(c1.getTime())+",";
            }
        }
        catch (ParseException e){
            e.printStackTrace();
        }
        return dateTemp.split(",");
    }

    /**
     * 字符型数组转字符串
     * @param array
     * @return  String
     */
    public static String array2String(String[] array, boolean isEncode) throws UnsupportedEncodingException {
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<array.length;i++){
            sb.append(array[i]+",");
        }
        if(sb.length()>0){
            sb.deleteCharAt(sb.lastIndexOf(","));
        }
        if(!isEncode){
            return sb.toString();
        }
        else {
            return new String(sb.toString().getBytes("GBK"),"ISO-8859-1");
        }
    }

    /**
     * 比对时间，返回表名后缀
     * @param month
     * @return  suffix
     */
    public static String validateTime(String month){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        String suffix = "";
        try {
            if(!sdf.format(sdf.parse(month)).equals(sdf.format(new Date()))){
                suffix = month;
            }
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        return suffix;
    }

    /**
     * 格式化EXTJS时间参数
     * @param month
     * @return format yyyyMM
     */
    public static String formatExtTime(String month){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        String fmtTime = "";
        try {
            fmtTime = sdf.format(sdf.parse(month));
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        return fmtTime;
    }
}
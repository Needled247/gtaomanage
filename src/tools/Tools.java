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
            rtnName = "����Ӫҵ��";
        }
        else {
            rtnName = bs_name;
        }
        return rtnName;
    }

    /**
     * Author������
     * @param list
     * @return String
     * ����List����ʽ�����incoming_detail��ϸjson��
     */
    public String IcDetailIterate(List list){
        String formatStr = "";
        Double param1 = 0.0,param2 = 0.0,param3 = 0.0,param4 = 0.0,param5 = 0.0,param6 = 0.0,param7 = 0.0,
                param8 = 0.0,param9 = 0.0,param10 = 0.0,param11 = 0.0,param12 = 0.0,param13 = 0.0,param14 = 0.0;
        for (Object aList : list) {
            IcInfoBean bean = (IcInfoBean) aList;
            if (bean.getKey().equals("�������")) {
                param1 += bean.getValue();
            }
            if (bean.getKey().equals("IT����")) {
                param2 += bean.getValue();
            }
            if (bean.getKey().equals("IT������")) {
                param3 += bean.getValue();
            }
            if (bean.getKey().equals("������")) {
                param4 += bean.getValue();
            }
            if (bean.getKey().equals("�̳�����")) {
                param5 += bean.getValue();
            }
            if (bean.getKey().equals("�ƻ�����")) {
                param6 += bean.getValue();
            }
            if (bean.getKey().equals("��èѺ��")) {
                param7 += bean.getValue();
            }
            if (bean.getKey().equals("·����Ѻ��")) {
                param8 += bean.getValue();
            }
            if (bean.getKey().equals("�˿������")) {
                param9 += bean.getValue();
            }
            if (bean.getKey().equals("�˹�èѺ��")) {
                param10 += bean.getValue();
            }
            if (bean.getKey().equals("��·����Ѻ��")) {
                param11 += bean.getValue();
            }
            if (bean.getKey().equals("������Ѻ��")) {
                param12 += bean.getValue();
            }
            if (bean.getKey().equals("��ͨ��ESS����")) {
                param13 += bean.getValue();
            }
            if (bean.getKey().equals("��è��")) {
                param14 += bean.getValue();
            }
        }
        formatStr += "income_detail:'<p>" +
                "<b>�������&nbsp;:&nbsp;��<font color=red>" + param1 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>IT����&nbsp;:&nbsp;��<font color=red>" + param2 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>IT������&nbsp;:&nbsp;��<font color=red>" + param3 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>������&nbsp;:&nbsp;��<font color=red>" + param4 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>�̳�����&nbsp;:&nbsp;��<font color=red>" + param5 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>�ƻ�����&nbsp;:&nbsp;��<font color=red>" + param6 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>��èѺ��&nbsp;:&nbsp;��<font color=red>" + param7 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>·����Ѻ��&nbsp;:&nbsp;��<font color=red>" + param8 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>�˿������&nbsp;:&nbsp;��<font color=red>" + param9 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>�˹�èѺ��&nbsp;:&nbsp;��<font color=red>" + param10 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>��·����Ѻ��&nbsp;:&nbsp;��<font color=red>" + param11 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>������Ѻ��&nbsp;:&nbsp;��<font color=red>" + param12 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>��ͨ��ESS����&nbsp;:&nbsp;��<font color=red>" + param13 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>��è��&nbsp;:&nbsp;��<font color=red>" + param14 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
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
                return "������Ӫҵ��";
            case 3:
                return "����Ӫҵ��";
            case 4:
                return "����Ӫҵ��";
            case 5:
                return "����Ӫҵ��";
            case 6:
                return "����Ӫҵ��";
            case 7:
                return "����Ӫҵ��";
            case 41:
                return "����ԷӪҵ��";
            default:
                return "δ֪";
        }
    }

    public static String invoiceCode2Status(int invoiceCode){
        switch (invoiceCode){
            case 0:
                return "δʹ��";
            case 1:
                return "��ʹ��";
            case -1:
                return "��Ʊ";
            default:
                return "δ֪";
        }
    }

    public static String Date2Str(Date date,String pattern){
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    /**
     * �������
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
     * ����-1��������Ϊ1����Ϊ2
     * @param date
     * @param yearOrMonth
     * @return  yyyy-MM
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
     * ����-1��������Ϊ1����Ϊ2
     * @param date
     * @param yearOrMonth
     * @return yyyyMM
     */
    public static String datePlus2(String date, int yearOrMonth){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
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


    public static String datePlus2(String date, int yearOrMonth, int month){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
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
                calendar.add(Calendar.YEAR, month);
                result = calendar.getTime();
                break;
            case 2 :
                calendar.add(Calendar.MONTH, month);
                result = calendar.getTime();
                break;
            default:
                result = null;
                break;
        }
        return sdf.format(result);
    }

    /**
     * �����������ڼ��--�����飨yyyyMM��
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
     * �ַ�������ת�ַ���
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
     * �ȶ�ʱ�䣬���ر�����׺
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
     * �ȶ�ʱ�䣬���ر�����׺
     * @param month
     * @return  suffix
     */
    public static String validateTime2(String month){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        String suffix = "";
        try {
            if(!sdf.format(sdf.parse(month)).equals(sdf.format(new Date()))){
                suffix = "_"+month;
            }
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        return suffix;
    }

    /**
     * ��ʽ��EXTJSʱ�����
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

    public static String formatTime(String time){
        SimpleDateFormat fm = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        String returnTime = "";
        try {
            returnTime = sdf.format(fm.parse(time));
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        return returnTime;
    }
}
package tools;

import bean.IcInfoBean;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Properties;

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
            if (bean.getKey().equals("��������")) {
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
            if (bean.getKey().equals("�˿�������")) {
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
                "<b>��������&nbsp;:&nbsp;��<font color=red>" + param1 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>IT����&nbsp;:&nbsp;��<font color=red>" + param2 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>IT������&nbsp;:&nbsp;��<font color=red>" + param3 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>������&nbsp;:&nbsp;��<font color=red>" + param4 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>�̳�����&nbsp;:&nbsp;��<font color=red>" + param5 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>�ƻ�����&nbsp;:&nbsp;��<font color=red>" + param6 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>��èѺ��&nbsp;:&nbsp;��<font color=red>" + param7 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>·����Ѻ��&nbsp;:&nbsp;��<font color=red>" + param8 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>�˿�������&nbsp;:&nbsp;��<font color=red>" + param9 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>�˹�èѺ��&nbsp;:&nbsp;��<font color=red>" + param10 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>��·����Ѻ��&nbsp;:&nbsp;��<font color=red>" + param11 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>������Ѻ��&nbsp;:&nbsp;��<font color=red>" + param12 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p><p>" +
                "<b>��ͨ��ESS����&nbsp;:&nbsp;��<font color=red>" + param13 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<b>��è��&nbsp;:&nbsp;��<font color=red>" + param14 + "</font></b>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</p>'},";
        return formatStr;
    }
}
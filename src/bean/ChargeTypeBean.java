package bean;

/**
 * ���ױ����Constructor & Getter
 * Created by Author on 14-4-17.
 */
public class ChargeTypeBean {
    private Object[] xzArray;
    private Object[] bnArray;
    private Object[] qtArray;
    private Object[] tjArray;
    private Object[] ycArray;
    private final int yearPreCharge = 4;
    private final int otherPreCharge = 5;

    public ChargeTypeBean() {
        xzArray = new Object[]{2, 3}; //��װID
        bnArray = new Object[]{6, 6};   //����ID
        qtArray = new Object[]{7, 7};  //����ID
        tjArray = new Object[]{8, 9};    //ͣ��ID
    }

    public Object[] getYcArray() {
        return ycArray;
    }

    public int getYearPreCharge() {
        return yearPreCharge;
    }

    public int getOtherPreCharge() {
        return otherPreCharge;
    }

    public Object[] getXzArray() {
        return xzArray;
    }

    public Object[] getBnArray() {
        return bnArray;
    }

    public Object[] getQtArray() {
        return qtArray;
    }

    public Object[] getTjArray() {
        return tjArray;
    }

    /**
     * ��ǰ�˴�������ͼ���������תΪ��������
     * @param chartTypeStr
     * @return
     */
    public Object[] str2CodeArray(String chartTypeStr){
        if(chartTypeStr.equals("��װ")){
            return xzArray;
        }
        else if(chartTypeStr.equals("��������")){
            return bnArray;
        }
        else if (chartTypeStr.equals("��������")){
            return qtArray;
        }
        else if(chartTypeStr.equals("ͣ��ע��")){
            return tjArray;
        }
        else if(chartTypeStr.equals("Ԥ�����")){
            return new Object[]{yearPreCharge};
        }
        else if(chartTypeStr.equals("Ԥ������")){
            return new Object[]{otherPreCharge};
        }
        else {
            return new Object[]{};
        }
    }

    public int switchCodeGenerator(String chart){
        if(chart.equals("Ԥ�����")){
            return 1;
        }
        else
        {
            return 2;
        }
    }
}

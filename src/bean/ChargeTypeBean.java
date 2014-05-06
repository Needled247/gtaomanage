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

    public ChargeTypeBean() {
        xzArray = new Object[]{2, 3}; //��װID
        bnArray = new Object[]{4, 6};   //����ID
        qtArray = new Object[]{5, 7};  //����ID
        tjArray = new Object[]{8, 9};    //ͣ��ID
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
        else {
            return new Object[]{};
        }
    }
}

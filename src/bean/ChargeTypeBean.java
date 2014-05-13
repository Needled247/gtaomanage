package bean;

/**
 * 交易编码的Constructor & Getter
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
        xzArray = new Object[]{2, 3}; //新装ID
        bnArray = new Object[]{4, 6};   //包年ID
        qtArray = new Object[]{5, 7};  //其他ID
        tjArray = new Object[]{8, 9};    //停机ID
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
     * 将前端传回来的图表类别文字转为参数数组
     * @param chartTypeStr
     * @return
     */
    public Object[] str2CodeArray(String chartTypeStr){
        if(chartTypeStr.equals("新装")){
            return xzArray;
        }
        else if(chartTypeStr.equals("包年续费")){
            return bnArray;
        }
        else if (chartTypeStr.equals("其他续费")){
            return qtArray;
        }
        else if(chartTypeStr.equals("停机注销")){
            return tjArray;
        }
        else {
            return new Object[]{};
        }
    }
}

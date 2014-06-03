package Test;

import org.junit.Test;
import service.GTM_Service;
import service.GTM_ServiceImpl;
import tools.Tools;

import java.util.Calendar;

/**
 * Created by HP on 14-4-16.
 */
public class daoTest {
    /*private GTM_Service service;
    @Before
    public void testDao(){
        service = new GTM_ServiceImpl();
    }

    @Test
    public void testGetQuota(){
        List<Map<String, Object>> result = service.getBandWidth(new Object[]{2,3,"2014-04"});
        System.out.println(result.get(0));
    }
    */

    @Test
    public void testGetIncome(){
        GTM_Service service = new GTM_ServiceImpl();
        String startDate = "20140501";
        String endDate = "20140510";
        String department_id = "0";
        for (int i=-13;i<=0;i++){
            String startTemp = Tools.datePlus2(startDate, Calendar.MONTH, i);
            String endTemp = Tools.datePlus2(endDate, Calendar.MONTH, i);
            long monthIncome = service.getIntervalIncome(Integer.parseInt(department_id), startTemp, endTemp);
            System.out.println(monthIncome);
        }
    }
}

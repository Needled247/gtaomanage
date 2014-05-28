package Test;

import org.junit.Test;
import service.GTM_Service;
import service.GTM_ServiceImpl;

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
    public void testGetStopCancel(){
        GTM_Service service = new GTM_ServiceImpl();
        String month = "201404";
        System.out.println(service.getTotalIncome(0,month));
    }
}

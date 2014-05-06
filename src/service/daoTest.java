package service;

import org.junit.Assert;
import org.junit.Test;
import tools.Tools;

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
    public void testTool(){
        String[] dateArr = Tools.getDateInterval("201404","201404");
        for(int i=0;i<dateArr.length;i++){
            System.out.println(dateArr[i]);
        }
        Assert.assertEquals(dateArr[dateArr.length-1],"201404");
    }
}

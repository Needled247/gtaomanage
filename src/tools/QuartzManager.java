package tools;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;

import static org.quartz.CronScheduleBuilder.cronSchedule;

/**
 * ������ȹ�����
 * User: HP
 * Date: 14-1-9
 * Time: ����12:03
 */
public class QuartzManager {
    private static String JOB_NAME = "TIMING_OPEN";
    private static String JOB_GROUP = "BILL_JOB";
    private static String TRIGGER_NAME = "TIMING_OPEN_TRIGGER";
    private static String TRIGGER_GROUP = "BILL_TRIGGER";

    public void TaskBegin(){
        try{
            SchedulerFactory schedulerFactory = new StdSchedulerFactory();
            Scheduler scheduler = schedulerFactory.getScheduler();
            /*
            Trigger trigger = TriggerBuilder.newTrigger().withIdentity(TRIGGER_NAME,TRIGGER_GROUP)
                    .startAt(DateBuilder.nextGivenSecondDate(null,2)).withSchedule(simpleScheduleBuilder).build();
                    */
            //ÿ��0��ִ�м�飬����ƥ����ִ�мƻ�����
            CronTrigger trigger = TriggerBuilder.newTrigger().withIdentity(TRIGGER_NAME,TRIGGER_GROUP)
                    .withSchedule(cronSchedule("00 00 00 * * ?")).build();
            JobDetail jobDetail = JobBuilder.newJob(BmuSyncer.class).withIdentity(JOB_NAME,JOB_GROUP).build();
            scheduler.scheduleJob(jobDetail,trigger);
            scheduler.start();
        }
        catch (SchedulerException e){
            e.printStackTrace();
        }
    }
}

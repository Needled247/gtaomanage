package tools;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;

import static org.quartz.CronScheduleBuilder.cronSchedule;

/**
 * 任务调度管理类
 * User: HP
 * Date: 14-1-9
 * Time: 下午12:03
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
            //每天0点执行检查，日期匹配则执行计划任务。
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

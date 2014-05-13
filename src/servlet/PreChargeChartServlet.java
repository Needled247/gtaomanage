package servlet;

import bean.ChargeTypeBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by HP on 14-5-13.
 */
public class PreChargeChartServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String bs_id = req.getParameter("department_id");
        if(bs_id.equals("")){
            bs_id = "0";
        }
        String month = req.getParameter("month");
        //设置响应格式
        super.setContentTypeJson(resp);
        ChargeTypeBean type = new ChargeTypeBean();
        //获取交易code
        int yearCode = type.getYearPreCharge();
        int otherCode = type.getOtherPreCharge();
        //获取交易数量
        long yearCount = service.getChargeCountByCode(Integer.parseInt(bs_id), month, yearCode);
        long otherCount = service.getChargeCountByCode(Integer.parseInt(bs_id), month, otherCode);
        //TODO:拼接json
    }
}

package insert;

import ds.ConnPoolBean;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

public class InsDataTool {
    public static void main(String[] args){
        Excel2Sql();
    }

    public static void Excel2Sql(){
        try{
            FileInputStream fis = new FileInputStream(new File("D:\\xyy.xls"));
            HSSFWorkbook workbook = new HSSFWorkbook(fis);
            Connection conn = ConnPoolBean.getRadiusConn();
            Statement st = conn.createStatement();
            HSSFSheet sheet = workbook.getSheetAt(0);
            String sql = "";
            int rows = sheet.getPhysicalNumberOfRows();
            Row row = sheet.getRow(1);
            for(int i=1;i<rows;i++){
                row = sheet.getRow(i);
                int j = 0;
                String username = (getStringCellValue(row.getCell((short)0)).trim().toLowerCase());
                String leaflet = (getStringCellValue(row.getCell((short)1)).trim());
                String group_id = (getStringCellValue(row.getCell((short)2)).trim());
                String opt_usetime = (getStringCellValue(row.getCell((short)3)).trim());
                String house_type_id = (getStringCellValue(row.getCell((short)4)).trim());
                String line_type_id = (getStringCellValue(row.getCell((short)5)).trim());
                String department_id = (getStringCellValue(row.getCell((short)6)).trim());
                String save_time = (getStringCellValue(row.getCell((short)7)).trim());
                String save_admin = (getStringCellValue(row.getCell((short)8)).trim());
                String dfirstdate = (getStringCellValue(row.getCell((short)9 )).trim());
                String contract_id = (getStringCellValue(row.getCell((short)10 )).trim());
                String isit = (getStringCellValue(row.getCell((short)11 )).trim());
                String re_date = (getStringCellValue(row.getCell((short)12 )).trim());
                String cat_type_id = (getStringCellValue(row.getCell((short)13 )).trim());
                String cxnote1 = (getStringCellValue(row.getCell((short)14 )).trim());
                String cxnote2 = (getStringCellValue(row.getCell((short)15 )).trim());
                String cxnote = cxnote1+","+cxnote2;
                String hdnote = (getStringCellValue(row.getCell((short)16 )).trim());
                String sbnote = (getStringCellValue(row.getCell((short)17 )).trim());
                String zhnote = (getStringCellValue(row.getCell((short)18 )).trim());
                String tsnote = (getStringCellValue(row.getCell((short)19 )).trim());
                String gg_id = (getStringCellValue(row.getCell((short)20 )).trim());
                String oldprop_id = (getStringCellValue(row.getCell((short)21 )).trim());
                String user_prop_id = (getStringCellValue(row.getCell((short)22 )).trim());
                String net_prop = (getStringCellValue(row.getCell((short)23 )).trim());
                String payee = (getStringCellValue(row.getCell((short)24 )).trim());
                String admit = (getStringCellValue(row.getCell((short)25 )).trim());
                String usermobile = (getStringCellValue(row.getCell((short)26 )).trim());
                String userphone = (getStringCellValue(row.getCell((short)27 )).trim());
                String weixin = (getStringCellValue(row.getCell((short)28 )).trim());
                String letv_start = (getStringCellValue(row.getCell((short)29 )).trim());
                String letv_end = (getStringCellValue(row.getCell((short)30 )).trim());
                String letv_mac = (getStringCellValue(row.getCell((short)31 )).trim());
                String it_end = (getStringCellValue(row.getCell((short)32 )).trim());
                sql="INSERT INTO GTM_MAINFORM_INFO_NEW " +
                "(USERNAME,LEAFLET_NO,GROUP_ID,OPT_USETIME,HOUSE_TYPE_ID,LINE_TYPE_ID,DEPARTMENT_ID," +
                "SAVE_TIME,SAVE_ADMIN,DFIRSTDATE,CONTRACT_ID,ISIT,REDATE,CAT_TYPE_ID,CXNOTE,HDNOTE," +
                "SBNOTE,ZHNOTE,TSNOTE,GG_ID,OLDNET_PROP_ID,USER_PROP_ID,NET_PROP,USER_MOBILE,USER_PHONE," +
                "WEIXIN,LETV_START,LETV_END,LETV_MAC,IT_END,PAYEE,ADMIT)" +
                "values('"+username+"',";
                if(leaflet!=null&&!leaflet.equals("")){
                    sql += leaflet+",";
                }
                else {
                    sql += "null,";
                }
                if(group_id!=null&&!group_id.equals("")){
                    sql += group_id+",";
                }
                else {
                    sql +="null,";
                }
                if(opt_usetime!=null&&!opt_usetime.equals("")){
                    sql += "to_date('"+opt_usetime+"', 'yyyy-mm-dd hh24:mi:ss'),";
                }
                else{
                    sql += "null,";
                }
                if(house_type_id!=null&&!house_type_id.equals("")){
                    sql += house_type_id+",";
                }
                else {
                    sql += "null,";
                }
                if(line_type_id!=null&&!line_type_id.equals("")){
                    sql += line_type_id+",";
                }
                else {
                    sql += "null,";
                }
                if(department_id!=null&&!department_id.equals("")){
                    sql += department_id+",to_date('2014-02-18 14:06:09', 'yyyy-mm-dd hh24:mi:ss'),'admin',";
                }
                else{
                    sql += "null,to_date('2014-02-18 14:06:09', 'yyyy-mm-dd hh24:mi:ss'),'admin',";
                }
                if(dfirstdate!=null&&!dfirstdate.equals("")){
                    sql += "'"+dfirstdate+"',";
                }
                else{
                    sql += "null,";
                }
                if(contract_id!=null&&!contract_id.equals("")){
                    sql += contract_id+",";
                }
                else {
                    sql += "null,";
                }
                if(isit!=null&&!isit.equals("")){
                    sql += isit+",";
                }
                else{
                    sql += "null,";
                }
                if(re_date!=null&&!re_date.equals("")){
                    sql += "'"+re_date+"',";
                }
                else{
                    sql += "null,";
                }
                if(cat_type_id!=null&&!cat_type_id.equals("")){
                    sql += cat_type_id+",";
                }
                else{
                    sql += "null,";
                }
                if(cxnote!=null&&!cxnote.equals("")){
                    sql += "'"+new String(cxnote.getBytes("GBK"),"ISO-8859-1")+"',";
                }
                else {
                    sql += "null,";
                }
                if(hdnote!=null&&!hdnote.equals("")){
                    sql += "'"+new String(hdnote.getBytes("GBK"),"ISO-8859-1")+"',";
                }
                else{
                    sql += "null,";
                }
                if(sbnote!=null&&!sbnote.equals("")){
                    sql += "'"+new String(sbnote.getBytes("GBK"),"ISO-8859-1")+"',";
                }
                else{
                    sql += "null,";
                }
                if(zhnote!=null&&!zhnote.equals("")){
                    sql += "'"+new String(zhnote.getBytes("GBK"),"ISO-8859-1")+"',";
                }
                else{
                    sql += "null,";
                }
                if(tsnote!=null&&!tsnote.equals("")){
                    sql += "'"+new String(tsnote.getBytes("GBK"),"ISO-8859-1")+"',";
                }
                else{
                    sql += "null,";
                }
                if(gg_id!=null&&!gg_id.equals("")){
                    sql += gg_id+",";
                }
                else{
                    sql += "null,";
                }
                if(oldprop_id!=null&&!oldprop_id.equals("")){
                    sql += oldprop_id+",";
                }
                else{
                    sql += "null,";
                }
                if(user_prop_id!=null&&!user_prop_id.equals("")){
                    sql += user_prop_id+",";
                }
                else{
                    sql += "null,";
                }
                if(net_prop!=null&&!net_prop.equals("")){
                    sql += net_prop+",";
                }
                else{
                    sql += "null,";
                }
                if(usermobile!=null&&!usermobile.equals("")){
                    sql += "'"+new String(usermobile.getBytes("GBK"),"ISO-8859-1")+"',";
                }
                else{
                    sql += "null,";
                }
                if(userphone!=null&&!userphone.equals("")){
                    sql += "'"+new String(userphone.getBytes("GBK"),"ISO-8859-1")+"',";
                }
                else{
                    sql += "null,";
                }
                if(weixin!=null&&!weixin.equals("")){
                    sql += weixin+",";
                }
                else{
                    sql += "null,";
                }
                if(letv_start!=null&&!letv_start.equals("")){
                    sql += "to_date('"+letv_start+"','yyyy-mm-dd hh24:mi:ss'),";
                }
                else{
                    sql += "null,";
                }
                if(letv_end!=null&&!letv_end.equals("")){
                    sql += "to_date('"+letv_end+"','yyyy-mm-dd hh24:mi:ss'),";
                }
                else{
                    sql += "null,";
                }
                if(letv_mac!=null&&!letv_mac.equals("")){
                    sql += "'"+letv_mac+"',";
                }
                else{
                    sql += "null,";
                }
                if(it_end!=null&&!it_end.equals("")){
                    sql += "to_date('"+it_end+"','yyyy-mm-dd hh24:mi:ss'),";
                }
                else{
                    sql += "null,";
                }
                if(payee!=null&&!payee.equals("")){
                    sql += "'"+new String(payee.getBytes("GBK"),"ISO-8859-1")+"',";
                }
                else{
                    sql += "null,";
                }
                if(admit!=null&&!admit.equals("")){
                    sql += "'"+new String(admit.getBytes("GBK"),"ISO-8859-1")+"'";
                }
                else{
                    sql += "null";
                }
                sql += ")";
                st.executeUpdate(sql);
                System.out.println(sql);
                sql = "";
            }
            fis.close();
            st.close();
            conn.close();
            System.out.println("ALL DONE!");
        }
        catch (IOException e){
            e.printStackTrace();
        }catch (SQLException e){
            e.printStackTrace();
        }
    }

    public static String getStringCellValue(Cell cell) {
        String strCell = "";
        DecimalFormat df = new DecimalFormat("0");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if(cell!=null){
            switch (cell.getCellType()) {
                case HSSFCell.CELL_TYPE_STRING:
                    if(!cell.getStringCellValue().equals("")){
                        strCell = cell.getStringCellValue();
                    }
                    else{
                        strCell = "";
                    }
                    break;
                case HSSFCell.CELL_TYPE_NUMERIC:
                    if (HSSFDateUtil.isCellDateFormatted(cell)) {
                        //  如果是date类型则 ，获取该cell的date值
                        strCell = sdf.format(HSSFDateUtil.getJavaDate(cell.getNumericCellValue()));
                    } else { // 纯数字
                        strCell = df.format(cell.getNumericCellValue());
                    }
                    break;
                case HSSFCell.CELL_TYPE_BOOLEAN:
                    strCell = String.valueOf(cell.getBooleanCellValue());
                    break;
                case HSSFCell.CELL_TYPE_BLANK:
                    strCell = "";
                    break;
                default:
                    strCell = "";
                    break;
            }
        }
        else{
            strCell = "";
        }

        if (strCell.equals("") || strCell == null) {
            return "";
        }
        if (cell == null) {
            return "";
        }
        return strCell;
    }
}

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

public class InsContractTool {
    public static void main(String[] args){
        ContractExcel2Sql();
    }

    public static void ContractExcel2Sql(){
        try{
            FileInputStream fis = new FileInputStream(new File("D:\\contract.xls"));
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
                String contract_id = (getStringCellValue(row.getCell((short)0)).trim().toLowerCase());
                String big_id = (getStringCellValue(row.getCell((short)1)).trim());
                String sign_date = (getStringCellValue(row.getCell((short)2)).trim());
                String contract_name = (getStringCellValue(row.getCell((short)3)).trim());
                String hall_id = (getStringCellValue(row.getCell((short)4)).trim());
                String xq_open = (getStringCellValue(row.getCell((short)5)).trim());
                String gg_open = (getStringCellValue(row.getCell((short)6)).trim());
                String isgg = (getStringCellValue(row.getCell((short)7)).trim());
                String isxk = (getStringCellValue(row.getCell((short)8)).trim());
                String isjz = (getStringCellValue(row.getCell((short)9 )).trim());
                String jz_brand = (getStringCellValue(row.getCell((short)10 )).trim());
                String live_num = (getStringCellValue(row.getCell((short)11 )).trim());
                String gg_live_num = (getStringCellValue(row.getCell((short)12 )).trim());
                String save_time = (getStringCellValue(row.getCell((short)13 )).trim());
                String save_admin = (getStringCellValue(row.getCell((short)14 )).trim());
                String contract_type = (getStringCellValue(row.getCell((short)15 )).trim());
                sql = "INSERT INTO GTM_CONTRACT_NEW(CONTRACT_ID,BIG_ID,SIGN_DATE,CONTRACT_NAME," +
                "HALL_ID,XQ_OPEN_DATE,GG_OPEN_DATE,IS_GG,IS_XK,IS_JZ,JZ_BRAND,LIVE_NUM,GG_LIVE_NUM," +
                "SAVE_TIME,SAVE_ADMIN,CONTRACT_TYPE)VALUES(";
                if(contract_id!=null&&!contract_id.equals("")){
                    sql += contract_id+",";
                }
                else {
                    sql += "null,";
                }
                if(big_id!=null&&!big_id.equals("")){
                    sql += big_id+",";
                }
                else {
                    sql +="null,";
                }
                if(sign_date!=null&&!sign_date.equals("")){
                    sql += "to_date('"+sign_date+"', 'yyyy-mm-dd'),";
                }
                else{
                    sql += "null,";
                }
                if(contract_name!=null&&!contract_name.equals("")){
                    sql += "'"+new String(contract_name.getBytes("GBK"),"ISO-8859-1")+"',";
                }
                else {
                    sql += "null,";
                }
                if(hall_id!=null&&!hall_id.equals("")){
                    sql += hall_id+",";
                }
                else {
                    sql += "null,";
                }
                if(xq_open!=null&&!xq_open.equals("")){
                    sql += "to_date('"+xq_open+"', 'yyyy-mm-dd'),";
                }
                else{
                    sql += "null,";
                }
                if(gg_open!=null&&!gg_open.equals("")){
                    sql += "to_date('"+gg_open+"', 'yyyy-mm-dd'),";
                }
                else{
                    sql += "null,";
                }
                if(isgg!=null&&!isgg.equals("")){
                    sql += isgg+",";
                }
                else{
                    sql += "null,";
                }
                if(isxk!=null&&!isxk.equals("")){
                    sql += isxk+",";
                }
                else{
                    sql += "null,";
                }
                if(isjz!=null&&!isjz.equals("")){
                    sql += isjz+",";
                }
                else{
                    sql += "null,";
                }
                if(jz_brand!=null&&!jz_brand.equals("")){
                    sql += "'"+new String(jz_brand.getBytes("GBK"),"ISO-8859-1")+"',";
                }
                else {
                    sql += "null,";
                }
                if(live_num!=null&&!live_num.equals("")){
                    sql += live_num+",";
                }
                else{
                    sql += "null,";
                }
                if(gg_live_num!=null&&!gg_live_num.equals("")){
                    sql += gg_live_num+",to_date('2014-2-20','yyyy-mm-dd'),'admin',";
                }
                else{
                    sql += "null,to_date('2014-2-20','yyyy-mm-dd'),'admin',";
                }
                if(contract_type!=null&&!contract_type.equals("")){
                    sql += contract_type;
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

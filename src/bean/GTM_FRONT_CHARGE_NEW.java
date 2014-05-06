package bean;

import java.sql.Date;

/**
 * Created by HP on 14-4-16.
 */
public class GTM_FRONT_CHARGE_NEW {
    private int BS_ID;
    private Date CHARGE_DATE;
    private String USERNAME;
    private int IS_NEW;
    private String RECEIPT_ID;
    private int CHARGE_TYPE_ID;
    private double CHARGE_AMOUNT;
    private String NOTE;
    private String SAVE_ADMIN;
    private Date SAVE_TIME;
    private int CHARGE_ID;
    private int PAY_TYPE_ID;
    private int ACT_SUB_ID;

    public GTM_FRONT_CHARGE_NEW() {
    }

    public GTM_FRONT_CHARGE_NEW(int BS_ID, Date CHARGE_DATE, String USERNAME, int IS_NEW, String RECEIPT_ID, int CHARGE_TYPE_ID, double CHARGE_AMOUNT, String NOTE, String SAVE_ADMIN, Date SAVE_TIME, int CHARGE_ID, int PAY_TYPE_ID, int ACT_SUB_ID) {
        this.BS_ID = BS_ID;
        this.CHARGE_DATE = CHARGE_DATE;
        this.USERNAME = USERNAME;
        this.IS_NEW = IS_NEW;
        this.RECEIPT_ID = RECEIPT_ID;
        this.CHARGE_TYPE_ID = CHARGE_TYPE_ID;
        this.CHARGE_AMOUNT = CHARGE_AMOUNT;
        this.NOTE = NOTE;
        this.SAVE_ADMIN = SAVE_ADMIN;
        this.SAVE_TIME = SAVE_TIME;
        this.CHARGE_ID = CHARGE_ID;
        this.PAY_TYPE_ID = PAY_TYPE_ID;
        this.ACT_SUB_ID = ACT_SUB_ID;
    }

    public int getBS_ID() {
        return BS_ID;
    }

    public void setBS_ID(int BS_ID) {
        this.BS_ID = BS_ID;
    }

    public Date getCHARGE_DATE() {
        return CHARGE_DATE;
    }

    public void setCHARGE_DATE(Date CHARGE_DATE) {
        this.CHARGE_DATE = CHARGE_DATE;
    }

    public String getUSERNAME() {
        return USERNAME;
    }

    public void setUSERNAME(String USERNAME) {
        this.USERNAME = USERNAME;
    }

    public int getIS_NEW() {
        return IS_NEW;
    }

    public void setIS_NEW(int IS_NEW) {
        this.IS_NEW = IS_NEW;
    }

    public String getRECEIPT_ID() {
        return RECEIPT_ID;
    }

    public void setRECEIPT_ID(String RECEIPT_ID) {
        this.RECEIPT_ID = RECEIPT_ID;
    }

    public int getCHARGE_TYPE_ID() {
        return CHARGE_TYPE_ID;
    }

    public void setCHARGE_TYPE_ID(int CHARGE_TYPE_ID) {
        this.CHARGE_TYPE_ID = CHARGE_TYPE_ID;
    }

    public double getCHARGE_AMOUNT() {
        return CHARGE_AMOUNT;
    }

    public void setCHARGE_AMOUNT(double CHARGE_AMOUNT) {
        this.CHARGE_AMOUNT = CHARGE_AMOUNT;
    }

    public String getNOTE() {
        return NOTE;
    }

    public void setNOTE(String NOTE) {
        this.NOTE = NOTE;
    }

    public String getSAVE_ADMIN() {
        return SAVE_ADMIN;
    }

    public void setSAVE_ADMIN(String SAVE_ADMIN) {
        this.SAVE_ADMIN = SAVE_ADMIN;
    }

    public Date getSAVE_TIME() {
        return SAVE_TIME;
    }

    public void setSAVE_TIME(Date SAVE_TIME) {
        this.SAVE_TIME = SAVE_TIME;
    }

    public int getCHARGE_ID() {
        return CHARGE_ID;
    }

    public void setCHARGE_ID(int CHARGE_ID) {
        this.CHARGE_ID = CHARGE_ID;
    }

    public int getPAY_TYPE_ID() {
        return PAY_TYPE_ID;
    }

    public void setPAY_TYPE_ID(int PAY_TYPE_ID) {
        this.PAY_TYPE_ID = PAY_TYPE_ID;
    }

    public int getACT_SUB_ID() {
        return ACT_SUB_ID;
    }

    public void setACT_SUB_ID(int ACT_SUB_ID) {
        this.ACT_SUB_ID = ACT_SUB_ID;
    }
}

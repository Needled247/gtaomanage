package bean;

/**
 * Created by HP on 14-4-28.
 */
public class GTM_QUOTA_AREA {
    private int ID;
    private int DEPARTMENT_ID;
    private String AREA_ID;
    private int NEW_QUOTA;
    private int CHARGE_QUOTA;
    private int CHARGE_YEAR_QUOTA;
    private int CANCEL_QUOTA;
    private String MONEY_QUOTA;
    private int OTHER_QUOTA;
    private String AREA_NAME;
    private String CHARGE_PERSON;
    private String AREA_CODE;

    public String getAREA_CODE() {
        return AREA_CODE;
    }

    public void setAREA_CODE(String AREA_CODE) {
        this.AREA_CODE = AREA_CODE;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public int getDEPARTMENT_ID() {
        return DEPARTMENT_ID;
    }

    public void setDEPARTMENT_ID(int DEPARTMENT_ID) {
        this.DEPARTMENT_ID = DEPARTMENT_ID;
    }

    public String getAREA_ID() {
        return AREA_ID;
    }

    public void setAREA_ID(String AREA_ID) {
        this.AREA_ID = AREA_ID;
    }

    public int getNEW_QUOTA() {
        return NEW_QUOTA;
    }

    public void setNEW_QUOTA(int NEW_QUOTA) {
        this.NEW_QUOTA = NEW_QUOTA;
    }

    public int getCHARGE_QUOTA() {
        return CHARGE_QUOTA;
    }

    public void setCHARGE_QUOTA(int CHARGE_QUOTA) {
        this.CHARGE_QUOTA = CHARGE_QUOTA;
    }

    public int getCHARGE_YEAR_QUOTA() {
        return CHARGE_YEAR_QUOTA;
    }

    public void setCHARGE_YEAR_QUOTA(int CHARGE_YEAR_QUOTA) {
        this.CHARGE_YEAR_QUOTA = CHARGE_YEAR_QUOTA;
    }

    public int getCANCEL_QUOTA() {
        return CANCEL_QUOTA;
    }

    public void setCANCEL_QUOTA(int CANCEL_QUOTA) {
        this.CANCEL_QUOTA = CANCEL_QUOTA;
    }

    public String getMONEY_QUOTA() {
        return MONEY_QUOTA;
    }

    public void setMONEY_QUOTA(String MONEY_QUOTA) {
        this.MONEY_QUOTA = MONEY_QUOTA;
    }

    public int getOTHER_QUOTA() {
        return OTHER_QUOTA;
    }

    public void setOTHER_QUOTA(int OTHER_QUOTA) {
        this.OTHER_QUOTA = OTHER_QUOTA;
    }

    public String getAREA_NAME() {
        return AREA_NAME;
    }

    public void setAREA_NAME(String AREA_NAME) {
        this.AREA_NAME = AREA_NAME;
    }

    public String getCHARGE_PERSON() {
        return CHARGE_PERSON;
    }

    public void setCHARGE_PERSON(String CHARGE_PERSON) {
        this.CHARGE_PERSON = CHARGE_PERSON;
    }
}

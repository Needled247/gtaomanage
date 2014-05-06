package bean;

/**
 * Created by HP on 14-4-28.
 */
public class GTM_BUSINESS_QUOTA {
    private int ID;
    private int DEPARTMENT_ID;
    private int NEW_QUOTA;
    private int CHARGE_QUOTA;
    private int CHARGE_YEAR_QUOTA;
    private int CANCEL_QUOTA;
    private String MONEY_QUOTA;
    private int OTHER_QUOTA;

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
}

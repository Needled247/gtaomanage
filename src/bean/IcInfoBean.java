package bean;


public class IcInfoBean {
    private String key;
    private Double value;

    public IcInfoBean(String key, Double value) {
        this.key = key;
        this.value = value;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public String getKey() {

        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}

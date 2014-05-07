package dao;

import java.util.List;
import java.util.Map;

/**
 * Created by HP on 14-4-15.
 */
public interface GTM_Dao {
    //Connection作为参数。
    public  <T> List<T> findAll(Class<T> c);
    public <T> List<T> findAllBySuffix(Class<T> c, String suffix);
    public  <T> List<T> findByKey(Class<T> clazz,String primary_key, int id);
    public <T> T findById(Class<T> c,String primary_key, int id);
    public long insert(String sql, Object... args);
    public long update(String sql, Object... args);
    public List<Map<String, Object>> executeQuery(String sql, Object... args);
    public long getCount(String sql, Object... args);
    public long executeUpdate(String sql, Object... args);
    public void delete(String sql, Object... args);
    public int[] batchUpdate(String sql, Object[][] objs);
}

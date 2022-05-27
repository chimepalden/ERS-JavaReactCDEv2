package com.revature.dao;

import com.revature.models.User;
import java.util.List;

public interface IUserDao {
    public void createUser(User user);
    public User getUserById(int id);
    public User getUserByUsername(String username);
    public List<User> getAllUsers();
    public User updateUser(User user);
    public void deleteUser(int id);

}

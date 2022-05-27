package com.revature.dao;

import com.revature.models.User;
import com.revature.utils.DaoUtilities;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserDaoJDBC implements IUserDao{

    Connection conn = null;
    PreparedStatement ps = null;

    @Override
    public void createUser(User user) {
        String sql = "insert into users(username, password, first_name, last_name, email, role) values (?,?,?,?,?,?)";
        try{
            conn = DaoUtilities.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1,user.getUserName());
            ps.setString(2,user.getPassword());
            ps.setString(3,user.getFirstName());
            ps.setString(4,user.getLastName());
            ps.setString(5,user.getEmail());
            ps.setInt(6,user.getUserRole());
            ps.execute();
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    @Override
    public User getUserById(int id) {
        String sql = "Select * from users Where user_id = ?";
        try {
            conn = DaoUtilities.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            User u = null;
            while(rs.next()){
                 u = new User(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getInt(7));
            }
            return u;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    @Override
    public User getUserByUsername(String username) {
        String sql = "Select * from users where username = ?";
        try {
            conn = DaoUtilities.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            User loggedIn = null;
            while(rs.next()){
                loggedIn = new User(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5), rs.getString(6),rs.getInt(7));
            }
            return loggedIn;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    @Override
    public List<User> getAllUsers() {
        String sql = "Select * from users";
        try {
            conn = DaoUtilities.getConnection();
            ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            List<User> list = new ArrayList<>();
            User loggedIn = null;
            while(rs.next()){
                loggedIn = new User(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5), rs.getString(6),rs.getInt(7));
                list.add(loggedIn);
            }
            return list;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    @Override
    public User updateUser(User user) {
        String sql = "Update users SET username = ?, password = ?, first_name = ?, last_name = ?, email = ?, role = ? Where user_id = ?";
        try {
            conn = DaoUtilities.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1,user.getUserName());
            ps.setString(2,user.getPassword());
            ps.setString(3,user.getFirstName());
            ps.setString(4,user.getLastName());
            ps.setString(5,user.getEmail());
            ps.setInt(6,user.getUserRole());
            ps.setInt(7, user.getUserID());
            ResultSet rs = ps.executeQuery();
            User u = null;
            while(rs.next()){
                u = new User(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getInt(7));
            }
            return u;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }
    @Override
    public void deleteUser(int id) {
        String sql = "delete from users where user_id = ?";
        try {
            conn = DaoUtilities.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setInt(1, id);
            ps.execute();
        }catch(SQLException e){
            e.printStackTrace();
        }
    }

}
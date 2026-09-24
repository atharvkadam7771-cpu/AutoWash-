package com.autowash.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    // MySQL Database credentials
    private static final String URL = "jdbc:mysql://localhost:3306/autowash_db";
    private static final String USER = "root";
    
    // IMPORTANT: Change "password" to the actual root password you set in MySQL!
    private static final String PASSWORD = "1234"; 

    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        // Load the MySQL JDBC Driver dynamically
        Class.forName("com.mysql.cj.jdbc.Driver");
        
        // Establish and return the database connection
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
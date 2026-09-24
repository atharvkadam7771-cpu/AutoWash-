package com.autowash.dao;

import com.autowash.models.WashPackage;
import com.autowash.utils.DBConnection;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class PackageDAO {
    
    public List<WashPackage> getAllPackages() {
        List<WashPackage> packages = new ArrayList<>();
        String query = "SELECT * FROM packages";

        // Using try-with-resources to automatically close the database connection
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                WashPackage pkg = new WashPackage();
                pkg.setId(rs.getInt("package_id"));
                pkg.setName(rs.getString("name"));
                pkg.setVehicleType(rs.getString("vehicle_type"));
                pkg.setPrice(rs.getDouble("price"));
                pkg.setDescription(rs.getString("description"));
                
                packages.add(pkg);
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        
        return packages;
    }
}
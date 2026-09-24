package com.autowash.dao;

import com.autowash.models.Booking;
import com.autowash.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

public class BookingDAO {

    public boolean createBooking(Booking booking) throws SQLIntegrityConstraintViolationException {
        String query = "INSERT INTO bookings (customer_name, customer_phone, package_id, booking_date, time_slot, status) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {

            pstmt.setString(1, booking.getCustomerName());
            pstmt.setString(2, booking.getCustomerPhone());
            pstmt.setInt(3, booking.getPackageId());
            pstmt.setString(4, booking.getBookingDate());
            pstmt.setString(5, booking.getTimeSlot());
            pstmt.setString(6, booking.getStatus());

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;

        } catch (SQLIntegrityConstraintViolationException e) {
            // This catches the double-booking UNIQUE constraint we set in MySQL
            throw e; 
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            return false;
        }
    }
}
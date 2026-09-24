package com.autowash.controllers;

import com.autowash.dao.BookingDAO;
import com.autowash.models.Booking;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLIntegrityConstraintViolationException;

@WebServlet("/api/bookings")
public class BookingServlet extends HttpServlet {

    private BookingDAO bookingDAO;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        bookingDAO = new BookingDAO();
        gson = new Gson();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 1. Configure CORS and Response Type
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();
        JsonObject jsonResponse = new JsonObject();

        try {
            // 2. Read JSON payload from React and convert to Booking object
            BufferedReader reader = request.getReader();
            Booking newBooking = gson.fromJson(reader, Booking.class);

            // 3. Attempt to save to database
            boolean isSuccess = bookingDAO.createBooking(newBooking);

            if (isSuccess) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                jsonResponse.addProperty("status", "success");
                jsonResponse.addProperty("message", "Booking confirmed successfully!");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                jsonResponse.addProperty("status", "error");
                jsonResponse.addProperty("message", "Database error. Failed to create booking.");
            }

        } catch (SQLIntegrityConstraintViolationException e) {
            // 4. Catch the MySQL UNIQUE constraint violation (Double Booking)
            response.setStatus(HttpServletResponse.SC_CONFLICT);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "You already have a booking for this package on this date.");
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            jsonResponse.addProperty("status", "error");
            jsonResponse.addProperty("message", "Invalid request format.");
        }

        // 5. Send response back to React
        out.print(jsonResponse.toString());
        out.flush();
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
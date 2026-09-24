package com.autowash.controllers;

import com.autowash.dao.UserDAO;
import com.autowash.models.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/api/login")
public class LoginServlet extends HttpServlet {
    private UserDAO userDAO = new UserDAO();
    private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response);
        
        BufferedReader reader = request.getReader();
        User credentials = gson.fromJson(reader, User.class);

        User authenticatedUser = userDAO.authenticateUser(credentials.getEmail(), credentials.getPassword());

        response.setContentType("application/json");
        if (authenticatedUser != null) {
            response.setStatus(HttpServletResponse.SC_OK);
            JsonObject jsonResponse = new JsonObject();
            jsonResponse.addProperty("message", "Login successful");
            jsonResponse.addProperty("fullName", authenticatedUser.getFullName());
            response.getWriter().write(gson.toJson(jsonResponse));
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"message\": \"Invalid email or password\"}");
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    private void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
}
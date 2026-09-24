package com.autowash.controllers;

import com.autowash.dao.PackageDAO;
import com.autowash.models.WashPackage;
import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/packages")
public class PackageServlet extends HttpServlet {
    
    private PackageDAO packageDAO;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        packageDAO = new PackageDAO();
        gson = new Gson();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 1. Handle CORS so React (Port 5173) can talk to Tomcat (Port 8080)
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        
        // 2. Set response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 3. Fetch data from database and convert to JSON
        List<WashPackage> packages = packageDAO.getAllPackages();
        String jsonResponse = gson.toJson(packages);

        // 4. Send the JSON to the frontend
        PrintWriter out = response.getWriter();
        out.print(jsonResponse);
        out.flush();
    }
    
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Pre-flight request handler for CORS
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
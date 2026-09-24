package com.autowash.models;

public class WashPackage {
    private int id;
    private String name;
    private String vehicleType;
    private double price;
    private String description;

    // Constructors
    public WashPackage() {}

    public WashPackage(int id, String name, String vehicleType, double price, String description) {
        this.id = id;
        this.name = name;
        this.vehicleType = vehicleType;
        this.price = price;
        this.description = description;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
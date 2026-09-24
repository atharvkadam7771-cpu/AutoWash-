package com.autowash.models;

public class Booking {
    private int id;
    private String customerName;
    private String customerPhone;
    private int packageId;
    private String bookingDate;
    private String timeSlot;
    private String status;

    public Booking() {}

    public Booking(String customerName, String customerPhone, int packageId, String bookingDate, String timeSlot) {
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.packageId = packageId;
        this.bookingDate = bookingDate;
        this.timeSlot = timeSlot;
        this.status = "PENDING";
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public int getPackageId() { return packageId; }
    public void setPackageId(int packageId) { this.packageId = packageId; }

    public String getBookingDate() { return bookingDate; }
    public void setBookingDate(String bookingDate) { this.bookingDate = bookingDate; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
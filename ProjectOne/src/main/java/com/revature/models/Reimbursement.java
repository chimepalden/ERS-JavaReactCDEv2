package com.revature.models;

import java.util.Date;

public class Reimbursement {
    private int reimbursementId;
    private double amount;
    private Date dateSubmitted;
    private Date dateResolved;
    private String description;
    private int reimbursementAuthor;
    private int reimbursementResolver;
    private int reimbursementType;
    private int reimbursementStatus;
    public Reimbursement(){}
    public Reimbursement(int reimbursementId, double amount, Date dateSubmitted, Date dateResolved,
                         String description, int reimbursementAuthor, int reimbursementResolver,
                         int reimbursementType, int reimbursementStatus) {
        this.reimbursementId = reimbursementId;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.description = description;
        this.reimbursementAuthor = reimbursementAuthor;
        this.reimbursementResolver = reimbursementResolver;
        this.reimbursementType = reimbursementType;
        this.reimbursementStatus = reimbursementStatus;
    }
    public int getReimbursementId() {
        return reimbursementId;
    }
    public void setReimbursementId(int reimbursementId) {
        this.reimbursementId = reimbursementId;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public Date getDateSubmitted() {
        return dateSubmitted;
    }
    public void setDateSubmitted(Date dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }
    public Date getDateResolved() {
        return dateResolved;
    }
    public void setDateResolved(Date dateResolved) {
        this.dateResolved = dateResolved;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public int getReimbursementAuthor() {
        return reimbursementAuthor;
    }
    public void setReimbursementAuthor(int reimbursementAuthor) {
        this.reimbursementAuthor = reimbursementAuthor;
    }
    public int getReimbursementResolver() {
        return reimbursementResolver;
    }
    public void setReimbursementResolver(int reimbursementResolver) { this.reimbursementResolver = reimbursementResolver; }
    public int getReimbursementType() {
        return reimbursementType;
    }
    public void setReimbursementType(int reimbursementType) {
        this.reimbursementType = reimbursementType;
    }
    public int getReimbursementStatus() {
        return reimbursementStatus;
    }

    public void setReimbursementStatus(int reimbursementStatus) {
        this.reimbursementStatus = reimbursementStatus;
    }
    @Override
    public String toString() {
        return "Reimbursement{" +
                "reimbursementId=" + reimbursementId +
                ", amount=" + amount +
                ", dateSubmitted=" + dateSubmitted +
                ", dateResolved=" + dateResolved +
                ", description='" + description + '\'' +
                ", reimbursementAuthor=" + reimbursementAuthor +
                ", reimbursementResolver=" + reimbursementResolver +
                ", reimbursementType=" + reimbursementType +
                ", reimbursementStatus=" + reimbursementStatus +
                '}';
    }
}

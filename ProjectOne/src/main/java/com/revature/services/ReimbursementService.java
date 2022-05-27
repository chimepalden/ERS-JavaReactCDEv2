package com.revature.services;

import com.revature.dao.IReimbursementDao;
import com.revature.models.Reimbursement;
import java.util.Date;
import java.util.List;

public class ReimbursementService {
	private IReimbursementDao ird;
	public ReimbursementService(IReimbursementDao ird){
		this.ird = ird;
	}
	public List<Reimbursement> getAllReimbursements() {
		return ird.getAllReimbursements();
	}
	public List<Reimbursement> getAllPendingReimbursement() {
		return ird.getAllPendingReimbursements();
	}
	public List<Reimbursement> getAllResolvedReimbursements() {
		return ird.getAllResolvedReimbursements();
	}
	public List<Reimbursement> getAllReimbursementsById(int id){
		return ird.getAllReimbursementsById(id);
	}
	public void approvePending(int id, int userId){
		ird.approvePendingReimbursement(id, userId);
	}
	public void denyPending(int id, int userId){
		ird.denyPendingReimbursement(id, userId);
	}
	public void registerReimbursement(double amount, Date dateSubmitted, Date dateResolved, String description, int author, int type){
		int status = 1;
		int resolver = 1;
		Reimbursement reimbursement = new Reimbursement(0,amount, dateSubmitted, dateResolved,description,author,resolver,type,status);
		ird.createReimbursement(reimbursement);
	}
	public List<Reimbursement> getAllPendingRequests(int statusId){
		return ird.readAllPendingRequests(statusId);
	}
	public List<Reimbursement> getAllRequestsByStatus(int userid, int statusId){
		return ird.readAllRequestsByStatus(userid, statusId);
	}
	public List<Reimbursement> getAllRequestsByUserId(int id){
		return ird.readAllRequestsById(id);
	}
}

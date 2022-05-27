package com.revature.dao;

import com.revature.models.Reimbursement;

import java.util.List;

public interface IReimbursementDao {
	public void createReimbursement(Reimbursement reimbursement);
	public List<Reimbursement> readAllPendingRequests(int statusId);
	public List<Reimbursement> getAllReimbursements();
	public List<Reimbursement> getAllPendingReimbursements();
	public List<Reimbursement> getAllResolvedReimbursements();
	public List<Reimbursement> getAllReimbursementsById(int id);
	public void approvePendingReimbursement(int id, int userId);
	public void denyPendingReimbursement(int id, int userId);
	public List<Reimbursement> readAllRequestsByStatus(int userId, int statusId);

	public List<Reimbursement> readAllRequestsById(int userId);
}

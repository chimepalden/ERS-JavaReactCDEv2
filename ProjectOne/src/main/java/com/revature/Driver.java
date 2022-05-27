package com.revature;

import com.revature.controller.ReimbursementController;
import com.revature.controller.UserController;
import com.revature.dao.IReimbursementDao;
import com.revature.dao.IUserDao;
import com.revature.dao.ReimbursementDaoJDBC;
import com.revature.dao.UserDaoJDBC;
import com.revature.services.ReimbursementService;
import com.revature.services.UserService;
import io.javalin.Javalin;

import static io.javalin.apibuilder.ApiBuilder.*;

public class Driver {

    public static void main(String[] args){



        IUserDao iud = new UserDaoJDBC();
        IReimbursementDao ird = new ReimbursementDaoJDBC();
        UserService us = new UserService(iud);
        ReimbursementService rs = new ReimbursementService(ird);
        UserController uc = new UserController(us);
        ReimbursementController rc = new ReimbursementController(rs);
        Javalin server = Javalin.create(config -> {
            config.enableCorsForAllOrigins();
        });
        server.routes(()-> {
            path("users", () -> {
                post("/register", uc.handleRegister);
                post("/login", uc.handleLogin);
                get("/all", uc.handleAllUsers);
                get("/{username}", uc.handleGetUserByUsername);
                put("/logout", uc.handleLogout);
                get("/", uc.handleGetAllUsers);
                put("/", uc.handleUpdateUser);
                get("/{id}",uc.handleGetUserById);
            });
        });
        server.routes(()-> {
            path("reimbursements", () -> {
                post("/register", rc.handleRegisterReimbursement);
                get("/", rc.handleAllReimbursements);
                get("/resolved", rc.handleAllResolvedReimbursements);
                get("/pendingmanager", rc.handleAllPendingReimbursements);
                get("/pendinguser/{id}", rc.handleGetAllPendingRequests);
                get("/all", rc.handleGetAllRequestsByUserId);
                get("/status/{id}", rc.handleGetAllRequestsByStatus);
                get("/{id}", rc.handleGetReimbursementsById);
                put("/{id}", rc.handleApproveReimbursementsById);
                put("/deny/{id}", rc.handleDenyReimbursementsById);
            });
        });
        server.start(8000);
    }
}

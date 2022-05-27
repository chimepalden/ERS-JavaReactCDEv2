package com.revature.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.models.LoginObject;
import com.revature.models.RegisterObject;
import com.revature.models.User;
import com.revature.services.UserService;
import io.javalin.http.Handler;
import java.util.Objects;

public class UserController {
	private UserService us;
	private ObjectMapper om;
	public UserController(UserService us) {
		this.us = us;
		this.om = new ObjectMapper();
	}
	public Handler handleRegister = (ctx) -> {
		RegisterObject ro = om.readValue(ctx.body(), RegisterObject.class);
		//System.out.println(ro);
				us.registerUser(ro.username, ro.password, ro.firstName, ro.lastName, ro.email, ro.userRole);
				ctx.status(201);
				ctx.result("Create user");
				ctx.result(om.writeValueAsString(us.getUserByUsername(ro.username)));
	};
	public Handler handleLogin = (ctx) -> {
		LoginObject lo = om.readValue(ctx.body(), LoginObject.class);
		User u = us.loginUser(lo.username, lo.password);
		if(u == null){
			ctx.status(403);
			ctx.result("Username or password was incorrect");
		} else {
			//We could also, if the user is logged in successfully, set up a session for them
			ctx.req.getSession().setAttribute("loggedIn", u.getUserName());
			ctx.req.getSession().setAttribute("roleId", ""+u.getUserRole());
			ctx.req.getSession().setAttribute("userId", ""+u.getUserID());
			ctx.result(om.writeValueAsString(u));
		}
	};
	public Handler handleGetAllUsers = (ctx) -> {
		ctx.result(om.writeValueAsString(us.readUserList()));
		ctx.status(200);
	};

	public Handler handleUpdateUser = (ctx) -> {
		if (ctx.req.getSession().getAttribute("loggedIn") == null) {
			ctx.status(401);
			ctx.result("You must login to update your data");
		} else {
			int userid = Integer.parseInt((String) ctx.req.getSession().getAttribute("userId"));
			User user = new User();
			user = om.readValue(ctx.body(), User.class);
			user.setUserID(userid);
			us.updateUser(user);
			ctx.status(201);
			ctx.result("User updated");
		}
	};
	public Handler handleAllUsers = (ctx) -> {
		if (!Objects.equals(String.valueOf(ctx.req.getSession().getAttribute("roleId")), "2")) {
			ctx.status(401);
			ctx.result("You must login as manager to view User data");
		} else {
			us.getAllUser();
			ctx.result(om.writeValueAsString(us.getAllUser()));
		}
	};
	public Handler handleGetUserByUsername = (ctx) -> {
		if (!Objects.equals(String.valueOf(ctx.req.getSession().getAttribute("roleId")), "2")) {
			ctx.status(401);
			ctx.result("You must login as manager to view User data");
		} else {
			String username = ctx.pathParam("username");
			us.getUserByUsername(username);
			ctx.result(om.writeValueAsString(us.getUserByUsername(username)));
		}
	};
	public Handler handleGetUserById = (ctx) -> {
		if (!Objects.equals(String.valueOf(ctx.req.getSession().getAttribute("roleId")), "2")) {
			ctx.status(401);
			ctx.result("You must login as manager to view User data");
		} else {
			int id = Integer.parseInt(ctx.pathParam("id"));
			ctx.result(om.writeValueAsString(us.getUserById(id)));
			ctx.status(200);
		}
	};
	public Handler handleLogout = (ctx) -> {
		ctx.req.getSession().invalidate();
		ctx.result("You logged out");
	};
}
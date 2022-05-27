package com.revature.test;

import com.revature.dao.IUserDao;
import com.revature.models.User;
import com.revature.services.UserService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import java.util.List;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {
	@Mock
	static IUserDao iud;
	@InjectMocks
	static UserService us;

	@Before
	public void initUserTests() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void registerUser() {

		doNothing().when(iud).createUser(any());
		// setup user passed to method
		us.registerUser("tron","password","tron","mike","tron@tron.com",2);
		verify(iud).createUser(any());
	}


	@Test
	public void loginUser() {


		User u = new User(50, "test", "password", "testName", "testLast", "test@email", 1);
		doReturn(u).when(iud).getUserByUsername(any());


		us.loginUser(u.getUserName(), u.getPassword());

		verify(iud).getUserByUsername(any());

	}

	@Test
	public void getAllUser() {

		List<User> list = new ArrayList<>();
		doReturn(list).when(iud).getAllUsers();

		us.getAllUser();

		verify(iud).getAllUsers();

		//when(iud.getAllUser(any())).
	}

	@Test
	public void getUserByUsername() {


		User u = new User(50, "test", "password", "testName", "testLast", "test@email", 1);

		doReturn(u).when(iud).getUserByUsername(u.getUserName());

		us.getUserByUsername(u.getUserName());

		verify(iud).getUserByUsername(any());



	}
}
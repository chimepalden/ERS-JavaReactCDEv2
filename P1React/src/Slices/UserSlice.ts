import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {IUser} from "../Interfaces/IUser";

interface UserSliceState {
    loading: boolean,
    error: boolean,
    currentProfile?: IUser,
    users?: IUser[]
   // user: IUser


}
const initialUserState: UserSliceState = {
    loading: false,
    error: false
}

type Login = {
    userName: string,
    password: string
}

export const loginUser = createAsyncThunk(
    'user/login',
    async(credentials:Login, thunkAPI) =>{
        try {
            const res = await axios.post('http://localhost:8000/users/login', credentials);
            console.log(res.data);
            return {
                userId: res.data.userId,
                userName: res.data.userName,
                password: res.data.password,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                userRole: res.data.userRole
            }
        } catch (e) {
            console.log(e);
           
        }
    }
)

export const getUserDetailsbyUsername = createAsyncThunk(
    'user/get', 
    async (username: string, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:8000/users/${username}`);

            return {
                userId: res.data.userId,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                reimbursements: res.data.reimbursements
            }
        } catch(e) {
            console.log(e);
            return thunkAPI.rejectWithValue('something went wrong');       
         }
    }
)
export const logout = createAsyncThunk(
    "user/logout",
    async (thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.put("http://localhost:8000/users/logout");
        } catch(e){
            console.log(e);
        }
    }
)
export const registerUser = createAsyncThunk(
    "users/register",
    async (newUser:IUser, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.post("http://localhost:8000/users/register", newUser);

            return newUser;
        } catch (e){
            console.log(e);
        }
    }
)
export const getAllUsers = createAsyncThunk(
    'user/getAll', 
    async (thunkAPI) => {
        try {
            const res = await axios.get('http://localhost:8000/users/all');

            return res.data;
            
        } catch(e) {
            console.log(e);       
         }
    }
)
export const getUserDetails = createAsyncThunk(
    'user/getDetails', 
    async (thunkAPI) => {
        try {
            const res = await axios.get('http://localhost:8000/users/');

            return {
                userId: res.data.userId,
                userName: res.data.userName,
                password: res.data.password,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                userRole: res.data.userRole
            }
        } catch(e) {
            console.log(e);       
         }
    }
)
export const updateUser = createAsyncThunk(
    "users/update",
    async (updateUser:IUser, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.put("http://localhost:8000/users/", updateUser);
            console.log(res.data);
            return updateUser;
        } catch (e){
            console.log(e);
        }
    }
)

export const UserSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        toggleError : (state) => {
            state.error = !state.error;
        },
        clearUsers : (state) => {
            state.users = undefined;
            state.currentProfile = undefined;
        }
    },
    extraReducers: (builder) => {
        //This is where we would create our reducer logic
        builder.addCase(loginUser.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            //The payload in this case, is the return from our asyncThunk from above
            state.currentProfile = action.payload;
            state.error = false;
            state.loading = false;
        });
        builder.addCase(loginUser.rejected, (state, action)=> {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(getUserDetails.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading =false;
            state.currentProfile = action.payload;
        });
        builder.addCase(getUserDetails.rejected, (state, action)=> {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(logout.fulfilled, (state, action)=> {
            state.currentProfile = undefined;
        });
        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading =false;
            state.currentProfile = action.payload;
        });
        builder.addCase(updateUser.rejected, (state, action)=> {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading =false;
            state.users = action.payload;
        });
        builder.addCase(getAllUsers.rejected, (state, action)=> {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading =false;
        });
        builder.addCase(registerUser.rejected, (state, action)=> {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(getUserDetailsbyUsername.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserDetailsbyUsername.fulfilled, (state, action) => {
            state.loading =false;
           
        });
        builder.addCase(getUserDetailsbyUsername.rejected, (state, action)=> {
            state.error = true;
            state.loading = false;
        });
    }
})



export const {toggleError} = UserSlice.actions;
export const {clearUsers} = UserSlice.actions;
export default UserSlice.reducer;
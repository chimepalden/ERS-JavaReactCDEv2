import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import thunk from "redux-thunk";
import { IReimbursement } from "../Interfaces/IReimbursement";

interface ReimbursementSliceState {
    loading: boolean,
    error: boolean,
    reimbursement?: IReimbursement,
    reimbursements?: IReimbursement[]
}

const initialReimbursementState: ReimbursementSliceState = {
    loading: false,
    error: false
}

type userRequestStatus = {
    reimbursementAuthor: number | string,
    reimbursementStatus: number | string
}

export const getReimbursments = createAsyncThunk(
    "reimbursements/getEmployee",
    async (id: number | string, thunkAPI) => {
        try{
            axios.defaults.withCredentials =true;
            const res = await axios.get(`http://localhost:8000/reimbursements/all/${id}`);

            return res.data;

        } catch(e) {
            console.log(e)
        }
    }
)

export const getReimbursmentsForManager = createAsyncThunk(
    "reimbursements/getManager",
    async (thunkAPI) => {
        try{
            axios.defaults.withCredentials =true;
            const res = await axios.get("http://localhost:8000/reimbursements/");

            return res.data;

        } catch(e) {
            console.log(e)
        }
    }
)

export const registerReimbursement = createAsyncThunk(
    "reimbursements/register",
    async (newReimbursement:IReimbursement, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            console.log(newReimbursement);
            const res = await axios.post("http://localhost:8000/reimbursements/register", newReimbursement);
            console.log(res.data);
            return res.data;
        } catch (e){
            console.log(e);
        }
    }
)

export const getResolvedReimbursements = createAsyncThunk(
    "reimbursements/resolved",
    async(thunkAPI)=> {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get("http://localhost:8000/reimbursements/resolved");
            return res.data;
        } catch (e){
            console.log(e);
        }
    }
)

export const getPendingReimbursements = createAsyncThunk(
    "reimbursements/pending",
    async(thunkAPI)=> {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get("http://localhost:8000/reimbursements/pending");
            return res.data;
        } catch (e){
            console.log(e);
        }
    }
)

export const getRequestsByStatus = createAsyncThunk(
    "reimbursements/status",
    async({reimbursementAuthor, reimbursementStatus}:{reimbursementAuthor:number|string, reimbursementStatus: number | string}, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.get(`http://localhost:8000/reimbursements/status/${reimbursementAuthor}&${reimbursementStatus}`);
            return res.data;
        }
        catch (e) {
            console.log(e);
        }
    }
)

export const getReimbursmentsById = createAsyncThunk(
    "reimbursements/reimbursementsManager",
    async(userId: number | string, thunkAPI) => {
        try{
            const res = await axios.get(`http://localhost:8000/reimbursements/${userId}`);
            return res.data;
        } catch(e) {
            console.log(e);
        }
    }
)

export const approveReimbursementById =createAsyncThunk (
    "reimbursements/approve",
    async (reimbursementId: number | string, thunkAPI) => {
        try{
            const res = await axios.put(`http://localhost:8000/reimbursements/approve/${reimbursementId}`);
            return res.data;
        } catch(e) {
            console.log(e);
        }
    }
)

export const denyReimbursementById = createAsyncThunk(
    "reimbursements/deny",
    async (reimbursementId: number | string, thunkAPI) => {
        try{
            const res = await axios.put(`http://localhost:8000/reimbursements/deny/${reimbursementId}`);
            return res.data;
        } catch(e) {
            console.log(e);
        }
    }
)

export const reimbursementSlice = createSlice({
    name: 'posts',
    initialState: initialReimbursementState,
    reducers: {
        clearReimbursements: (state) => {
            state.reimbursements = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getReimbursments.pending, (state, action)=> {
            state.loading = true;
        });

        builder.addCase(getReimbursments.fulfilled, (state, action) => {
            state.reimbursements = action.payload;
            state.loading = false;
            state.error = false;
        });

        builder.addCase(getReimbursments.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(registerReimbursement.fulfilled, (state, action) => {
            if(state.reimbursements && action.payload){
                state.reimbursements = [action.payload, ...state.reimbursements];
            }
        });
        builder.addCase(registerReimbursement.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(registerReimbursement.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(denyReimbursementById.fulfilled, (state, action) => {
            state.reimbursements = action.payload;
            state.loading = false;
            state.error = false;
        });
        builder.addCase(denyReimbursementById.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(denyReimbursementById.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(approveReimbursementById.fulfilled, (state, action) => {
            state.reimbursements = action.payload;
            state.loading = false;
            state.error = false;
        });
        builder.addCase(approveReimbursementById.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(approveReimbursementById.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(getReimbursmentsById.fulfilled, (state, action) => {
            state.reimbursements = action.payload;
            state.loading = false;
            state.error = false;
        });
        builder.addCase(getReimbursmentsById.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(getReimbursmentsById.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(getRequestsByStatus.fulfilled, (state, action) => {
            state.reimbursements = action.payload;
            state.loading = false;
            state.error = false;
        });
        builder.addCase(getRequestsByStatus.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(getRequestsByStatus.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(getPendingReimbursements.fulfilled, (state, action) => {
            state.reimbursements = action.payload;
            state.loading = false;
            state.error = false;
        });
        builder.addCase(getPendingReimbursements.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(getPendingReimbursements.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(getResolvedReimbursements.fulfilled, (state, action) => {
            state.reimbursements = action.payload;
            state.loading = false;
            state.error = false;
        });
        builder.addCase(getResolvedReimbursements.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(getResolvedReimbursements.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(getReimbursmentsForManager.fulfilled, (state, action) => {
            state.reimbursements = action.payload;
            state.loading = false;
            state.error = false;
        });
        builder.addCase(getReimbursmentsForManager.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(getReimbursmentsForManager.pending, (state, action)=> {
            state.loading = true;
        });
    }
});

export const {clearReimbursements} = reimbursementSlice.actions;

export default reimbursementSlice.reducer;
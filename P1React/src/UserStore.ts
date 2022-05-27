import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slices/UserSlice"
import reimbursementsReducer from "./Slices/ReimbursementSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        reimbursements: reimbursementsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
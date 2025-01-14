import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import incomesReducer from "./features/incomeSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        incomes: incomesReducer,
    }
});

export default store;
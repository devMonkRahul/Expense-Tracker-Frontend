import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import incomesReducer from "./features/incomeSlice";
import expensesReducer from "./features/expenseSlice";
import errorReducer from "./features/errorSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        income: incomesReducer,
        expense: expensesReducer,
        error: errorReducer,
    }
});

export default store;
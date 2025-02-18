import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import incomesReducer from "./features/incomeSlice";
import expensesReducer from "./features/expenseSlice";
import errorReducer from "./features/errorSlice"
import budgetReducers from "./features/budgetSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        income: incomesReducer,
        expense: expensesReducer,
        error: errorReducer,
        budget: budgetReducers,
    }
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import incomesReducer from "./features/incomeSlice";
import expensesReducer from "./features/expenseSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        incomes: incomesReducer,
        expenses: expensesReducer,
    }
});

export default store;
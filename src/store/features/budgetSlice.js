import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    budgets: [],
    totalBudget: 0,
    isLoading: false,
};

const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
        setBudgets: (state, action) => {
            state.budgets = action.payload.budgets;
            state.totalBudget = state.budgets.reduce((acc, budget) => acc + budget.amount, 0);
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload.isLoading;
        },
        addBudget: (state, action) => {
            state.budgets.push(action.payload.budget);
            state.totalBudget += action.payload.budget.amount;
        },
        deleteBudget: (state, action) => {
            state.budgets = state.budgets.filter((budget) => budget._id !== action.payload);
            state.totalBudget = state.budgets.reduce((acc, budget) => acc + budget.amount, 0);
        },
        updateBudget: (state, action) => {
            const { id, updatedBudget } = action.payload;
            const index = state.budgets.findIndex((budget) => budget._id === id);
            if (index !== -1) {
                state.budgets[index] = { ...state.budgets[index], ...updatedBudget };
            }
            state.totalBudget = state.budgets.reduce((acc, budget) => acc + budget.amount, 0);
        },
    }
});

export const { setBudgets, setLoading, addBudget, deleteBudget, updateBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
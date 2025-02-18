import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    budgets: [],
    isLoading: false,
};

const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
        setBudgets: (state, action) => {
            state.budgets = action.payload.budgets;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload.isLoading;
        },
        addBudget: (state, action) => {
            state.budgets.push(action.payload.budget);
        },
        deleteBudget: (state, action) => {
            state.budgets = state.budgets.filter((budget) => budget._id !== action.payload);
        },
        updateBudget: (state, action) => {
            const { id, updatedBudget } = action.payload;
            const index = state.budgets.findIndex((budget) => budget._id === id);
            if (index !== -1) {
                state.budgets[index] = { ...state.budgets[index], ...updatedBudget };
            }
        },
    }
});

export const { setBudgets, setLoading, addBudget, deleteBudget, updateBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
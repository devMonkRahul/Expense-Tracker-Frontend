import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [],
    isLoading: true,
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setExpenses: (state, action) => {
            state.expenses = action.payload.expenses;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload.isLoading;
        },
        addExpense: (state, action) => {
            state.expenses.push(action.payload.expenses);
        },
        deleteExpense: (state, action) => {
            state.expenses = state.expenses.filter((expense) => expense._id !== action.payload);
        },
        updateExpense: (state, action) => {
            const { id, updatedExpense } = action.payload;
            const index = state.expenses.findIndex((expense) => expense._id === id);
            if (index !== -1) {
                state.expenses[index] = { ...state.expenses[index], ...updatedExpense };
            }
        },
    },
});

export const { setExpenses, setLoading, addExpense, deleteExpense, updateExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
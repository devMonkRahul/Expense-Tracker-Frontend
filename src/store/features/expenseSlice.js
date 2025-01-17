import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [],
    loading: true,
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setExpenses: (state, action) => {
            state.expenses = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
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
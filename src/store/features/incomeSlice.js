import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lastMonthIncomes: [],
    incomes: [],
    totalMonthlyIncome: 0,
    totalLastMonthIncome: 0,
    isLoading: false,
}

const incomesSlice = createSlice({
    name: "income",
    initialState,
    reducers: {
        setIncomes: (state, action) => {
            state.incomes = action.payload.incomes || state.incomes;
            state.lastMonthIncomes = action.payload.lastMonthIncomes || state.lastMonthIncomes; 
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload.isLoading;
        },
        addIncome: (state, action) => {
            state.incomes.push(action.payload.incomes);
            state.incomes = state.incomes.sort((a, b) => new Date(b.date) - new Date(a.date));
        },
        deleteIncome: (state, action) => {
            state.incomes = state.incomes.filter((income) => income._id !== action.payload);
        },
        updateIncome: (state, action) => {
            const { id, updatedIncome } = action.payload;
            const index = state.incomes.findIndex((income) => income._id === id);
            if (index !== -1) {
                state.incomes[index] = { ...state.incomes[index], ...updatedIncome};
            }
        },
        setTotalMonthlyIncome: (state, action) => {
            state.totalMonthlyIncome = action.payload.totalMonthlyIncome;
        },
        setTotalLastMonthIncome: (state, action) => {
            state.totalLastMonthIncome = action.payload.totalLastMonthIncome;
        }
    }
})

export const { setIncomes, addIncome, deleteIncome, updateIncome, setLoading, setTotalMonthlyIncome, setTotalLastMonthIncome } = incomesSlice.actions;

export default incomesSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    incomes: [],
    loading: true,
}

const incomesSlice = createSlice({
    name: "income",
    initialState,
    reducers: {
        setIncomes: (state, action) => {
            state.incomes = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addIncome: (state, action) => {
            state.incomes.push(action.payload);
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
    }
})

export const { setIncomes, setLoading, addIncome, deleteIncome, updateIncome } = incomesSlice.actions;

export default incomesSlice.reducer;
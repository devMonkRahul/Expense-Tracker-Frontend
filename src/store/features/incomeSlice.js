import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    incomes: [],
    isLoading: false,
}

const incomesSlice = createSlice({
    name: "income",
    initialState,
    reducers: {
        setIncomes: (state, action) => {
            state.incomes = action.payload.incomes; 
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload.isLoading;
        },
        addIncome: (state, action) => {
            state.incomes.push(action.payload.incomes);
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

export const { setIncomes, addIncome, deleteIncome, updateIncome, setLoading } = incomesSlice.actions;

export default incomesSlice.reducer;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setExpenses, setLoading } from "../../store/features/expenseSlice";
import { setError } from "../../store/features/errorSlice";
import { logout } from "../../store/features/authSlice";
import ExpenseHeader from "./ExpenseHeader";
import { Chart, CategoryBreakdown, TransactionTable } from "../index";
import { useGet } from "../../hooks/useHttp";
import Lottie from "lottie-react";
import animationData from "../../assets/Lottie/loader.json";

const categoryColors = {
  "Food & Dining": "blue",
  Transportation: "green",
  Shopping: "purple",
  Utilities: "yellow",
  Entertainment: "red",
};

const pieChartColors = {
  "Food & Dining": "#4287f5",
  Transportation: "#42f5a7",
  Shopping: "#a742f5",
  Utilities: "#f5d742",
  Entertainment: "#f54242",
};

export default function Expenses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.expense.isLoading);
  const expenses = useSelector((state) => state.expense.expenses);

  const token = sessionStorage.getItem("accessToken");
  const { getRequest } = useGet();

  useEffect(() => {
    if (token) {
      dispatch(setLoading({ isLoading: true }));
      const getExpenses = async () => {
        try {
          const response = await getRequest(
            "/api/v1/transaction/getExpenses",
            token
          );
          if (response.success) {
            if (Object.keys(response.data).length !== 0)
              dispatch(setExpenses({ expenses: response.data }));
          }
        } catch (error) {
          dispatch(setError(error.message || "An error occurred"));
          dispatch(logout());
          console.error(error);
          navigate("/");
        } finally {
          dispatch(setLoading({ isLoading: false }));
        }
      };
      getExpenses();
    } else {
      dispatch(logout());
      navigate("/");
    }
  }, [navigate, dispatch, token]);

  const data = expenses.reduce((acc, curr) => {
    const existing = acc.find((item) => item.category === curr.category);
    if (existing) {
      existing.amount += curr.amount;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);

  return (
    <div className="bg-gray-50/50 p-8 w-full">
      <ExpenseHeader />
      {!isLoading && expenses.length !== 0 && (
        <>
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="w-full lg:w-2/3">
              <Chart
                data={data}
                categoryColors={pieChartColors}
                type="expense"
              />
            </div>
            <div className="w-full lg:w-1/3">
              <CategoryBreakdown
                categories={data}
                categoryColors={categoryColors}
              />
            </div>
          </div>
          <TransactionTable
            transactions={expenses}
            type="expense"
            categoryColors={categoryColors}
          />
        </>
      )}
      {isLoading && (
        <>
          <Lottie 
            animationData={animationData}
            loop={true}
            height={500} 
            width={500} 
          />
        </>
      )}
      {!isLoading && expenses.length === 0 && (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-2xl text-gray-500">No expenses found</h1>
        </div>
      )}
    </div>
  );
}

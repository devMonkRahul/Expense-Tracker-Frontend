import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIncomes } from "../../store/features/incomeSlice";
import { setError } from "../../store/features/errorSlice";
import { logout } from "../../store/features/authSlice";
import IncomeHeader from "./IncomeHeader";
import { Chart, CategoryBreakdown, TransactionTable } from "../index";
import { useGet } from "../../hooks/useHttp";
import Lottie from "lottie-react";
import animationData from "../../assets/Lottie/loader.json";

const categoryColors = {
  Salary: "blue",
  Freelance: "green",
  "Business Income": "purple",
  "Investment Income": "yellow",
  "Rental Income": "red",
};

const pieChartColors = {
  Salary : "#4287f5",
  Freelance : "#42f5a7",
  "Business Income" : "#a742f5",
  "Investment Income" : "#f5d742",
  "Rental Income" : "#f54242",
}

export default function Incomes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [incomes, setIncome] = useState([]);

  const token = sessionStorage.getItem("accessToken");
  const { getRequest } = useGet();

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      const getIncomes = async () => {
        try {
          const response = await getRequest(
            "/api/v1/transaction/getIncomes",
            token
          );
          if (response.success) {
            dispatch(setIncomes(response.data));
            setIncome(response.data);
          }
        } catch (error) {
          dispatch(setError(error.message || "An error occurred"));
          dispatch(logout());
          console.error(error);
          navigate("/");
        } finally {
          setIsLoading(false);
        }
      };
      getIncomes();
    } else {
      dispatch(setIncomes([]));
      navigate("/");
    }
  }, []);

  const data = incomes.reduce((acc, curr) => {
    const existing = acc.find((item) => item.category === curr.category);
    if (existing) {
      existing.amount += curr.amount;
    } else {
      acc.push({...curr});
    }
    return acc;
  }, [])
 

  return (
    <div className="bg-gray-50/50 p-8 w-full">
      <IncomeHeader />
      {!isLoading && incomes.length !== 0 && (
        <>
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="w-full lg:w-2/3">
              <Chart data={data} categoryColors={pieChartColors}/>
            </div>
            <div className="w-full lg:w-1/3">
              <CategoryBreakdown categories={data} categoryColors={categoryColors} />
            </div>
          </div>
          <TransactionTable
            transactions={incomes}
            type="income"
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
    </div>
  );
}

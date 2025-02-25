import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIncomes, setLoading } from "../../store/features/incomeSlice";
import { setError } from "../../store/features/errorSlice";
import { logout } from "../../store/features/authSlice";
import IncomeHeader from "./IncomeHeader";
import { Chart, CategoryBreakdown, TransactionTable } from "../index";
import { useGet } from "../../hooks/useHttp";
import Lottie from "lottie-react";
import animationData from "../../assets/Lottie/loader.json";
import { pieChartColors, incomeCategoryColors as categoryColors } from "../../utils/helper";

export default function Incomes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.income.isLoading);
  const incomes = useSelector((state) => state.income.incomes);

  const token = sessionStorage.getItem("accessToken");
  const { getRequest } = useGet();

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedText, setSelectedText] = useState("");

  const filteredIncomes =
    selectedCategory === "All Categories"
      ? incomes
      : incomes.filter((income) => income.category === selectedCategory);

  const filteredIncomesByTitleDescriptionAndCategory =
    selectedText === ""
      ? filteredIncomes
      : filteredIncomes.filter(
          (income) =>
            income.title.toLowerCase().includes(selectedText.toLowerCase()) ||
            income.description
              .toLowerCase()
              .includes(selectedText.toLowerCase())
        );

  useEffect(() => {
    if (token) {
      dispatch(setLoading({ isLoading: true }));
      const getIncomes = async () => {
        try {
          const response = await getRequest(
            "/api/v1/transaction/getIncomes",
            token
          );
          if (response.success) {
            if (Object.keys(response.data).length !== 0)
              dispatch(setIncomes({ incomes: response.data.incomes }));
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
      getIncomes();
    } else {
      dispatch(logout());
      navigate("/");
    }
  }, [navigate, dispatch, token]);

  const data = incomes.reduce((acc, curr) => {
    const existing = acc.find((item) => item.category === curr.category);
    if (existing) {
      existing.amount += curr.amount;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);

  return (
    <>
      <div className="bg-[#e5e7eb] p-4 w-full">
        {!isLoading && incomes.length !== 0 && (
          <>
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="w-full lg:w-2/3">
                <Chart
                  data={data}
                  categoryColors={pieChartColors}
                  type="income"
                />
              </div>
              <div className="w-full lg:w-1/3">
                <CategoryBreakdown
                  categories={data}
                  categoryColors={categoryColors}
                  type="income"
                />
              </div>
            </div>
          </>
        )}
        <IncomeHeader
          setSelectedCategory={setSelectedCategory}
          setSelectedText={setSelectedText}
        />
        {!isLoading &&
          incomes.length !== 0 &&
          filteredIncomesByTitleDescriptionAndCategory.length !== 0 && (
            <>
              <TransactionTable
                transactions={filteredIncomesByTitleDescriptionAndCategory}
                type="income"
                categoryColors={categoryColors}
              />
            </>
          )}
        {!isLoading &&
          incomes.length !== 0 &&
          filteredIncomesByTitleDescriptionAndCategory.length === 0 && (
            <div className="flex items-center justify-center h-96">
              <h1 className="text-2xl text-gray-500">
                No incomes found for this Category or Title
              </h1>
            </div>
          )}
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#e5e7eb]">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: 200, height: 200 }}
          />
        </div>
      )}
      {!isLoading && incomes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#e5e7eb] -z-50">
          <h1 className="text-2xl text-gray-600">No incomes found</h1>
        </div>
      )}
    </>
  );
}

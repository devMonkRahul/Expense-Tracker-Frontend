import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  ChartPie,
  HandCoins,
  Landmark,
  SquarePercent,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useHttp";
import { logout, setUserData } from "../../store/features/authSlice";
import { setIncomes, setTotalMonthlyIncome, setTotalLastMonthIncome } from "../../store/features/incomeSlice";
import { setError } from "../../store/features/errorSlice";
import { setExpenses, setTotalMonthlyExpense, setTotalLastMonthExpense } from "../../store/features/expenseSlice";
import Lottie from "lottie-react";
import animationData from "../../assets/Lottie/loader2.json";
import { OverViewChart, OverviewTransactionTable } from "../index";
import { getTotalAmount, lastMonth, lastYear, calculatePercentageChange, currencySymbols } from "../../utils/helper";

const MetricCard = ({ title, value, change, icon, changeColor, show=true, arrowIcon="up" }) => (
  <Card>
    <CardBody className="p-4 h-full">
      <div className="flex flex-col justify-evenly h-full">
        <div className="flex items-center justify-between mb-2">
          <Typography variant="h6" color="blue-gray" className="font-normal">
            {title}
          </Typography>
          {icon}
        </div>
        <Typography variant="h3" color="blue-gray">
          {value}
        </Typography>
        {show && (<Typography
          className={`flex items-center gap-1 text-sm ${
            changeColor === "green" ? "text-green-500" : "text-red-500"
          }`}
        >
          {arrowIcon === "up" ? (
            <TrendingUp size={18} />
          ) : (
            <TrendingDown size={18} />
          )}
          <span>{change}</span>
          from last month
        </Typography>)}
      </div>
    </CardBody>
  </Card>
);

export default function Overview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const { getRequest } = useGet();
  const [isLoading, setIsLoading] = useState(false);
  const [budgetStatus, setBudgetStatus] = useState(0);
  const incomes = useSelector((state) => state.income.incomes);
  const expenses = useSelector((state) => state.expense.expenses);
  const userData = useSelector((state) => state.auth.userData);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();  

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      const getTransactions = async () => {
        try {
          const response = await getRequest("/api/v1/user/profile", token);
          if (response.success) {
            dispatch(
              setUserData({
                userData: response.data,
                accessToken: token,
              })
            );
          }
          const incomeResponse = await getRequest(
            `/api/v1/transaction/getIncomes?year=${currentYear}&month=${currentMonth}`,
            token
          );
    
          if (incomeResponse.success) {
            if (Object.keys(incomeResponse.data).length !== 0) {
              dispatch(setIncomes({ incomes: incomeResponse.data.incomes }));
              dispatch(setTotalMonthlyIncome({ totalMonthlyIncome: getTotalAmount(incomeResponse.data.incomes) }));
            } else {
              dispatch(setIncomes({ incomes: [] }));
              dispatch(setTotalMonthlyIncome({ totalMonthlyIncome: 0 }));
            }
          }

          const lastMonthIncomeResponse = await getRequest(
            `/api/v1/transaction/getIncomes?year=${lastYear}&month=${lastMonth}`,
            token
          )

          if (lastMonthIncomeResponse.success) {
            if (Object.keys(lastMonthIncomeResponse.data).length !== 0) {
              dispatch(setIncomes({ lastMonthIncomes: lastMonthIncomeResponse.data.incomes }));
              dispatch(setTotalLastMonthIncome({ totalLastMonthIncome: getTotalAmount(lastMonthIncomeResponse.data.incomes) }));
            } else {
              dispatch(setIncomes({ lastMonthIncomes: [] }));
              dispatch(setTotalLastMonthIncome({ totalLastMonthIncome: 0 }));
            }            
          }
    
          const expenseResponse = await getRequest(
            `/api/v1/transaction/getExpenses?year=${currentYear}&month=${currentMonth}`,
            token
          );
    
          if (expenseResponse.success) {
            if (Object.keys(expenseResponse.data).length !== 0) {
              dispatch(setExpenses({ expenses: expenseResponse.data.expenses }));
              dispatch(setTotalMonthlyExpense({ totalMonthlyExpense: getTotalAmount(expenseResponse.data.expenses) }));
            } else {
              dispatch(setExpenses({ expenses: [] }));
              dispatch(setTotalMonthlyExpense({ totalMonthlyExpense: 0 }));
            }
          }

          const lastMonthExpenseResponse = await getRequest(
            `/api/v1/transaction/getExpenses?year=${lastYear}&month=${lastMonth}`,
            token
          )

          if (lastMonthExpenseResponse.success) {
            if (Object.keys(lastMonthExpenseResponse.data).length !== 0) {
              dispatch(setExpenses({ lastMonthExpenses: lastMonthExpenseResponse.data.expenses }));
              dispatch(setTotalLastMonthExpense({ totalLastMonthExpense: getTotalAmount(lastMonthExpenseResponse.data.expenses) }));
            } else {
              dispatch(setExpenses({ lastMonthExpenses: [] }));
              dispatch(setTotalLastMonthExpense({ totalLastMonthExpense: 0 }));
            }
          }
        } catch (error) {
          dispatch(setError(error.message || "An error occurred while fetching data"));
          dispatch(logout());
          console.error(error);
          navigate("/");
        } finally {
          setIsLoading(false);
        }
      };
      getTransactions();
    } else {
      dispatch(logout());
      dispatch(setExpenses({ expenses: [] }));
      dispatch(setIncomes({ incomes: [] }));
      navigate("/");
    }
  }, [token, navigate, dispatch]);

  const totalIncome = useSelector((state) => state.income.totalMonthlyIncome);
  const totalExpense = useSelector((state) => state.expense.totalMonthlyExpense);
  const lastMonthIncome = useSelector((state) => state.income.totalLastMonthIncome);
  const lastMonthExpense = useSelector((state) => state.expense.totalLastMonthExpense);
  const incomeChange = calculatePercentageChange(totalIncome, lastMonthIncome);
  const expenseChange = calculatePercentageChange(totalExpense, lastMonthExpense);
  const totalMonthlyBalanceChange = calculatePercentageChange(totalIncome - totalExpense, lastMonthIncome - lastMonthExpense);

  useEffect(() => {
    if (totalExpense === 0) {
      setBudgetStatus(0);
    } else {
      setBudgetStatus(
        Math.round((totalExpense / userData?.totalBudget) * 100)
      );
    }
  }, [expenses]);

  const currency = currencySymbols[userData?.currency];

  return (
    <div className={`bg-[#e5e7eb] p-8 w-full ${incomes.length !== 0 && expenses.length !== 0 ? "" : "h-full"}`}>
      {!isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <MetricCard
              title="Total Balance"
              value={`${currency} ${userData?.totalBalance}`}
              show={false}
              icon={<Landmark className="text-green-400" />}
              changeColor="green"
              className="text-[42px] text-center"
            />
            <MetricCard
              title="Monthly Total Balance"
              value={`${currency} ${totalIncome - totalExpense}`}
              change={`${totalMonthlyBalanceChange.toFixed(2)}%`}
              icon={<HandCoins className="text-green-400" />}
              changeColor={totalMonthlyBalanceChange >= 0 ? "green" : "red"}
              arrowIcon={totalMonthlyBalanceChange >= 0 ? "up" : "down"}
            />
            <MetricCard
              title="Monthly Expense"
              value={`${currency} ${totalExpense}`}
              change={`${expenseChange.toFixed(2)}%`}
              icon={<SquarePercent className="text-red-400" />}
              changeColor={expenseChange >= 0 ? "red" : "green"}
              arrowIcon={expenseChange >= 0 ? "up" : "down"}
            />
            <MetricCard
              title="Monthly Income"
              value={`${currency} ${totalIncome}`}
              change={`${incomeChange.toFixed(2)}%`}
              icon={<Wallet className="text-green-400" />}
              changeColor={incomeChange >= 0 ? "green" : "red"}
              arrowIcon={incomeChange >= 0 ? "up" : "down"}
            />
            <Card>
              <CardBody className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Budget Status
                  </Typography>
                  <ChartPie className="text-purple-400" />
                </div>
                <Typography variant="h3" color="blue-gray">
                  {budgetStatus} %
                </Typography>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: `${budgetStatus}%` }}
                  ></div>
                </div>
              </CardBody>
            </Card>
          </div>
          <OverViewChart />
          <OverviewTransactionTable />
        </>
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#e5e7eb]">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: "#e5e7eb",
            }}
          />
        </div>
      )}
    </div>
  );
}

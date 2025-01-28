import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartPie, HandCoins, Landmark, SquarePercent, TrendingDown, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useHttp";
import { logout } from "../../store/features/authSlice";
import { setIncomes } from "../../store/features/incomeSlice";
import { setError } from "../../store/features/errorSlice";
import { setExpenses } from "../../store/features/expenseSlice";

const chartData = [
  { month: 'Jan', amount: 2500 },
  { month: 'Feb', amount: 3200 },
  { month: 'Mar', amount: 2800 },
  { month: 'Apr', amount: 3500 },
  { month: 'May', amount: 2900 },
  { month: 'Jun', amount: 3100 },
  { month: 'Jul', amount: 3600 },
  { month: 'Aug', amount: 3300 },
  { month: 'Sep', amount: 3700 },
  { month: 'Oct', amount: 3400 },
  { month: 'Nov', amount: 3200 },
  { month: 'Dec', amount: 3500 },
];

const MetricCard = ({ title, value, change, icon, changeColor }) => (
  <Card>
    <CardBody className="p-4">
      <div className="flex items-center justify-between mb-2">
        <Typography variant="h6" color="blue-gray" className="font-normal">
          {title}
        </Typography>
        {icon}
      </div>
      <Typography variant="h3" color="blue-gray">
        {value}
      </Typography>
      <Typography 
        className={`flex items-center gap-1 text-sm ${
          changeColor === 'green' ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {changeColor === 'green' ? (
          <TrendingUp size={18}/>
        ) : (
          <TrendingDown size={18}/>
        )}
        <span>{change}</span>
        from last month
      </Typography>
    </CardBody>
  </Card>
);

export default function Overview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const { getRequest } = useGet();
  const [isLoading, setIsLoading] = useState(false);
  const incomes = useSelector((state) => state.income.incomes);
  const expenses = useSelector((state) => state.expense.expenses);
  
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      const getTransactions = async () => {
        try {
          const incomeResponse = await getRequest("/api/v1/transaction/getIncomes", token);

          if (incomeResponse.success) {
            if (Object.keys(incomeResponse.data).length !== 0) {
              dispatch(setIncomes({ incomes: incomeResponse.data }));
            }
          }

          const expenseResponse = await getRequest("/api/v1/transaction/getExpenses", token);

          if (expenseResponse.success) {
            if (Object.keys(expenseResponse.data).length !== 0) {
              dispatch(setExpenses({ expenses: expenseResponse.data }));
            }
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
      getTransactions();
    } else {
      dispatch(logout());
      dispatch(setExpenses({ expenses: [] }));
      dispatch(setIncomes({ incomes: [] }));
      navigate("/");
    } 
  }, [token, navigate, dispatch]);

  const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);  

  return (
    <div className="bg-[#e5e7eb] p-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Balance"
          value="$ 24,500"
          change="+8.2%"
          icon={<Landmark className="text-green-400"/>}
          changeColor="green"
        />
        <MetricCard
          title="Monthly Spending"
          value={`$ ${totalExpense}`}
          change="+12.5%"
          icon={<SquarePercent className="text-red-400"/>}
          changeColor="red"
        />
        <MetricCard
          title="Total Savings"
          value="$ 12,750"
          change="+4.75%"
          icon={<HandCoins className="text-green-400"/>}
          changeColor="green"
        />
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Typography variant="h6" color="blue-gray" className="font-normal">
                Budget Status
              </Typography>
              <ChartPie className="text-purple-400"/>
            </div>
            <Typography variant="h3" color="blue-gray">
              75%
            </Typography>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h5" color="blue-gray">
              Expense Overview
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">Week</Button>
              <Button variant="filled" size="sm">Month</Button>
              <Button variant="outlined" size="sm">Year</Button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#2196f3" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
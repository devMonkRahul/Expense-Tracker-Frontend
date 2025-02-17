import React, { useState, useEffect } from "react";
import { useGet } from "../../hooks/useHttp";
import { setError } from "../../store/features/errorSlice";
import { useDispatch } from "react-redux";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import animationData from "../../assets/Lottie/loader.json";
import Lottie from "lottie-react";
import { Car } from "lucide-react";

function getCurrentWeekNumber() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDays = (now - startOfYear) / 86400000; // Convert milliseconds to days
  return Math.ceil((pastDays + startOfYear.getDay()) / 7);
}

const transformToMonthlyData = (transactions) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = months.map((month) => ({ month, amount: 0 }));

  if (transactions.length === 0) return chartData;

  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).getMonth();
    chartData[month].amount += transaction.amount;
  });

  return chartData;
};

const transformToWeeklyData = (transactions) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = daysOfWeek.map((day) => ({ day, amount: 0 }));

  if (transactions.length === 0) return chartData;

  transactions.forEach((transaction) => {
    const day = new Date(transaction.date).getDay();
    chartData[day].amount += transaction.amount;
  });

  return chartData;
};

// const transformToYearlyData = (transactions) => {
//   const currentYear = new Date().getFullYear();
//   const lastYear = currentYear - 1;

//   // Initialize with 0 amounts for both years
//   const yearlyData = [
//     { year: lastYear, amount: 0 },
//     { year: currentYear, amount: 0 },
//   ];

//   // Populate with actual amounts
//   transactions.forEach(({ amount, date }) => {
//     const year = new Date(date).getFullYear();

//     if (year === lastYear) {
//       yearlyData[0].amount += amount;
//     } else if (year === currentYear) {
//       yearlyData[1].amount += amount;
//     }
//   });

//   return yearlyData;
// };

// const chartData = [
//   { month: "Jan", amount: 2500 },
//   { month: "Feb", amount: 3200 },
//   { month: "Mar", amount: 2800 },
//   { month: "Apr", amount: 3500 },
//   { month: "May", amount: 2900 },
//   { month: "Jun", amount: 3100 },
//   { month: "Jul", amount: 3600 },
//   { month: "Aug", amount: 3300 },
//   { month: "Sep", amount: 3700 },
//   { month: "Oct", amount: 3400 },
//   { month: "Nov", amount: 3200 },
//   { month: "Dec", amount: 3500 },
// ];

const transformToYearlyData = (transactions) => {
  if (transactions.length === 0) return [];

  // Find the earliest transaction year
  const firstYear = Math.min(
    ...transactions.map(({ date }) => new Date(date).getFullYear())
  );
  const currentYear = new Date().getFullYear();

  // Generate an array of years from firstYear to currentYear
  const yearlyData = Array.from(
    { length: currentYear - firstYear + 1 },
    (_, i) => ({
      year: firstYear + i,
      amount: 0,
    })
  );

  // Populate with actual amounts
  transactions.forEach(({ amount, date }) => {
    const year = new Date(date).getFullYear();
    const index = year - firstYear; // Find index in yearlyData array
    yearlyData[index].amount += amount;
  });

  return yearlyData;
};

export default function OverViewChart() {
  const token = sessionStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const { getRequest } = useGet();

  const [chartViewType, setChartViewType] = useState("month");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const currentWeek = getCurrentWeekNumber();
  const chartHeading =
    chartViewType === "month"
      ? "Monthly"
      : chartViewType === "week"
      ? "Weekly"
      : "Yearly";

  const getMonthlyData = async (month = currentMonth, year = currentYear) => {
    try {
      //   const incomeResponse = await getRequest(
      //     `/api/v1/transaction/getIncomes?year=${year}&month=${month}`,
      //     token
      //   );

      //   if (incomeResponse.success) {
      //     if (Object.keys(incomeResponse.data).length !== 0) {
      //     //   dispatch(setIncomes({ incomes: incomeResponse.data.incomes }));
      //     }
      //   }

      const expenseResponse = await getRequest(
        `/api/v1/transaction/getExpenses?year=${year}`,
        token
      );

      if (expenseResponse.success) {
        if (Object.keys(expenseResponse.data).length !== 0) {
          setChartData(transformToMonthlyData(expenseResponse.data.expenses));
        } else {
          setChartData([]);
        }
      }
    } catch (error) {
      dispatch(
        setError(
          error.message || "An error occurred while fetching monthly data"
        )
      );
      console.error(error);
    }
  };

  const getWeeklyData = async (year = currentYear, week = currentWeek) => {
    try {
      //   const incomeResponse = await getRequest(
      //     `/api/v1/transaction/getIncomes?year=${year}&week=${week}`,
      //     token
      //   );

      //   if (incomeResponse.success) {
      //     if (Object.keys(incomeResponse.data).length !== 0) {
      //     //   dispatch(setIncomes({ incomes: incomeResponse.data.incomes }));
      //     }
      //   }

      const expenseResponse = await getRequest(
        `/api/v1/transaction/getExpenses?year=${year}&week=${week}`,
        token
      );

      if (expenseResponse.success) {
        if (Object.keys(expenseResponse.data).length !== 0) {
          setChartData(transformToWeeklyData(expenseResponse.data.expenses));
        } else {
          setChartData([]);
        }
      }
    } catch (error) {
      dispatch(
        setError(
          error.message || "An error occurred while fetching weekly data"
        )
      );
      console.error(error);
    }
  };

  const getYearlyData = async () => {
    try {
      //   const incomeResponse = await getRequest(
      //     `/api/v1/transaction/getIncomes?year=${year}`,
      //     token
      //   );

      //   if (incomeResponse.success) {
      //     if (Object.keys(incomeResponse.data).length !== 0) {
      //     //   dispatch(setIncomes({ incomes: incomeResponse.data.incomes }));
      //     }
      //   }

      const expenseResponse = await getRequest(
        `/api/v1/transaction/getExpenses`,
        token
      );

      if (expenseResponse.success) {
        if (Object.keys(expenseResponse.data).length !== 0) {
          setChartData(transformToYearlyData(expenseResponse.data.expenses));
        } else {
          setChartData([]);
        }
      }
    } catch (error) {
      dispatch(
        setError(
          error.message || "An error occurred while fetching yearly data"
        )
      );
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (token) {
        setIsLoading(true);
        if (chartViewType === "week") {
          await getWeeklyData();
        } else if (chartViewType === "month") {
          await getMonthlyData();
        } else {
          await getYearlyData();
        }
        setIsLoading(false);
      }
    };
    getData();
  }, [chartViewType, token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  }

  return (
    <>
      {!isLoading && (
        <Card className="w-full">
          <CardBody>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 sm:mb-0"
              >
                {chartHeading} Expense Overview
              </Typography>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={chartViewType === "week" ? "filled" : "outlined"}
                  size="sm"
                  className="flex-grow sm:flex-grow-0"
                  onClick={() => setChartViewType("week")}
                >
                  Week
                </Button>
                <Button
                  variant={chartViewType === "month" ? "filled" : "outlined"}
                  size="sm"
                  className="flex-grow sm:flex-grow-0"
                  onClick={() => setChartViewType("month")}
                >
                  Month
                </Button>
                <Button
                  variant={chartViewType === "year" ? "filled" : "outlined"}
                  size="sm"
                  className="flex-grow sm:flex-grow-0"
                  onClick={() => setChartViewType("year")}
                >
                  Year
                </Button>
              </div>
            </div>
            {chartData.length !== 0 && (
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey={chartViewType === "week" ? "day" : chartViewType}
                    />
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
            )}
            {chartData.length === 0 && (
              <Typography
                variant="h6"
                color="blue-gray"
                className="text-center text-gray-600"
              >
                No data available
              </Typography>
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
}

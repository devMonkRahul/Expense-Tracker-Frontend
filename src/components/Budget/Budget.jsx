import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Progress,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { EllipsisVertical } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useHttp";
import {
  setExpenses,
  setTotalMonthlyExpense,
} from "../../store/features/expenseSlice";
import { setError } from "../../store/features/errorSlice";
import { logout } from "../../store/features/authSlice";
import { getTotalAmount } from "../../utils/helper";

export default function Budget() {
  const userData = useSelector((state) => state.auth.userData);
  const totalBudget = userData?.totalBudget;
  const totalSpent = useSelector((state) => state.expense.totalMonthlyExpense);
  const token = sessionStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getRequest, isLoading } = useGet();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const getMonthlyData = async () => {
      try {
        const expenseResponse = await getRequest(
          `/api/v1/transaction/getExpenses?year=${currentYear}&month=${currentMonth}`,
          token
        );

        if (expenseResponse.success) {
          if (Object.keys(expenseResponse.data).length !== 0) {
            dispatch(setExpenses({ expenses: expenseResponse.data.expenses }));
            dispatch(
              setTotalMonthlyExpense({
                totalMonthlyExpense: getTotalAmount(
                  expenseResponse.data.expenses
                ),
              })
            );
          } else {
            dispatch(setExpenses({ expenses: [] }));
            dispatch(setTotalMonthlyExpense({ totalMonthlyExpense: 0 }));
          }
        }
      } catch (error) {
        dispatch(setError( error.message || "An error occurred!"));
        dispatch(logout());
        navigate("/");
        console.error(error);
      }
    };
    getMonthlyData();
  }, [token]);

  const categories = [
    { name: "Food & Dining", spent: 850, total: 1000, color: "yellow" },
    { name: "Transportation", spent: 450, total: 600, color: "green" },
    { name: "Shopping", spent: 600, total: 800, color: "purple" },
    { name: "Entertainment", spent: 200, total: 400, color: "blue" },
    { name: "Utilities", spent: 200, total: 400, color: "orange" },
  ];

  const chartData = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        label: "Budget",
        data: categories.map((cat) => cat.total),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
      {
        label: "Actual",
        data: categories.map((cat) => cat.spent),
        backgroundColor: "rgba(16, 185, 129, 0.8)",
      },
    ],
  };

  const totalRemaining = totalBudget - totalSpent;
  const overallProgress = (totalSpent / totalBudget) * 100;

  return (
    <div className="min-h-screen bg-[#e5e7eb] p-4 md:p-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <Typography variant="h4" color="blue-gray">
            Budget Management
          </Typography>
          <Button className="flex items-center gap-2" color="blue" size="md">
            Create New Budget
          </Button>
        </div>
        
        <Card className="w-full shadow-lg">
          <CardBody className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium opacity-70"
                >
                  Total Budget
                </Typography>
                <Typography variant="h4" color="blue-gray">
                  ${totalBudget?.toLocaleString()}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium opacity-70"
                >
                  Spent
                </Typography>
                <Typography variant="h4" color="red">
                  ${totalSpent?.toLocaleString()}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium opacity-70"
                >
                  Remaining
                </Typography>
                <Typography variant="h4" color="green">
                  ${totalRemaining.toLocaleString()}
                </Typography>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Typography variant="small" color="blue-gray">
                  Overall Progress
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {overallProgress.toFixed()}%
                </Typography>
              </div>
              <Progress value={overallProgress} color="blue" className="h-1" />
            </div>
          </CardBody>
        </Card>

        <div className="flex flex-wrap gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="w-full md:w-[calc(50%-0.75rem)] shadow-lg"
            >
              <CardHeader
                floated={false}
                shadow={false}
                className="flex items-center justify-between rounded-none bg-white px-2 py-4"
              >
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {category.name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="opacity-70"
                  >
                    Monthly Budget
                  </Typography>
                </div>
                <Menu placement="bottom-end">
                  <MenuHandler>
                    <IconButton variant="text" color="blue-gray">
                      <EllipsisVertical />
                    </IconButton>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>Edit Budget</MenuItem>
                    <MenuItem>View Details</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </CardHeader>
              <CardBody className="pt-0 px-6 pb-6">
                <div className="space-y-4">
                  <Typography variant="h5" color="blue-gray">
                    ${category.spent}{" "}
                    <Typography
                      as="span"
                      variant="small"
                      color="blue-gray"
                      className="opacity-70"
                    >
                      of ${category.total}
                    </Typography>
                  </Typography>
                  <Progress
                    value={(category.spent / category.total) * 100}
                    color={category.color}
                    className="h-1"
                  />
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-right opacity-70"
                  >
                    {((category.spent / category.total) * 100).toFixed()}%
                  </Typography>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card className="w-full shadow-lg">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-white px-6 py-4"
          >
            <Typography variant="h6" color="blue-gray">
              Budget vs Actual Spending
            </Typography>
          </CardHeader>
          <CardBody>
            <div className="h-[400px]">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } },
                  plugins: { legend: { position: "top" } },
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

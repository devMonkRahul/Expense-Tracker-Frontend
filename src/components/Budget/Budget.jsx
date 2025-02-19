import React, { useEffect, useState } from "react";
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
import { useGet, useDelete } from "../../hooks/useHttp";
import {
  setExpenses,
  setTotalMonthlyExpense,
} from "../../store/features/expenseSlice";
import { setError } from "../../store/features/errorSlice";
import { logout, setUserData } from "../../store/features/authSlice";
import { setBudgets, deleteBudget } from "../../store/features/budgetSlice";
import {
  getTotalAmount,
  expenseCategoryColors,
  categoryWiseTotal,
} from "../../utils/helper";
import Lottie from "lottie-react";
import animationData from "../../assets/Lottie/loader.json";
import { BudgetModal } from "../index";

export default function Budget() {
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const totalBudget = useSelector((state) => state.budget.totalBudget);
  const budgets = useSelector((state) => state.budget.budgets);
  const totalSpent = useSelector((state) => state.expense.totalMonthlyExpense);
  const expenses = useSelector((state) => state.expense.expenses);
  const categoryWiseExpenses = categoryWiseTotal(expenses);

  const token = sessionStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getRequest } = useGet();
  const { deleteRequest } = useDelete();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const handleDeleteBudget = async (e, id) => {
    e.preventDefault();

    if (token) {
      try {
        const response = await deleteRequest(
          `/api/v1/budget/deleteBudget/${id}`,
          token
        );

        if (response.success) {
          dispatch(deleteBudget(id));
        }
      } catch (error) {
        dispatch(setError(error.message || "An error occurred while deleting budget"));
        console.error(error);
      }
    } else {
      dispatch(logout());
      dispatch(setError("Session expired. Please login again."));
      navigate("/");
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
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

        const budgetResponse = await getRequest(
          `/api/v1/budget/getBudgets`,
          token
        );

        if (budgetResponse.success) {
          if (Object.keys(budgetResponse.data).length !== 0) {
            dispatch(setBudgets({ budgets: budgetResponse.data }));
          } else {
            dispatch(setBudgets({ budgets: [] }));
          }
        }
      } catch (error) {
        dispatch(setError(error.message || "An error occurred!"));
        dispatch(logout());
        navigate("/");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [token, navigate, dispatch]);

  const categories = budgets.map((budget) => {
    const matchingExpenses = categoryWiseExpenses.filter(
      (expense) => expense.category === budget.title
    );
    const spent = matchingExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    return {
      id: budget._id,
      name: budget.title,
      spent: spent,
      total: budget.amount,
    };
  });

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
    <>
      {!isLoading && (
        <div className="min-h-screen bg-[#e5e7eb] p-4 md:p-8">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Budget Management
              </Typography>
              <BudgetModal />
            </div>

            {budgets.length !== 0 && (
              <>
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
                          ${totalRemaining?.toLocaleString()}
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
                      <Progress
                        value={overallProgress}
                        color="blue"
                        className="h-1"
                      />
                    </div>
                  </CardBody>
                </Card>

                <div className="flex flex-wrap gap-6">
                  {categories.map((category) => (
                    <Card
                      key={category.id}
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
                            <MenuItem onClick={(e) => handleDeleteBudget(e, category.id)}>Delete</MenuItem>
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
                            color={expenseCategoryColors[category.name]}
                            className="h-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-right opacity-70"
                          >
                            {(
                              (category.spent / category.total) *
                              100
                            ).toFixed()}
                            %
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
              </>
            )}
          </div>
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#e5e7eb]">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: 200, height: 200 }}
          />
        </div>
      )}
    </>
  );
}

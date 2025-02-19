import React, { useState } from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { expenseOptions } from "../../utils/helper";
import { useSelector, useDispatch } from "react-redux"; 
import { usePost } from "../../hooks/useHttp";
import { setError } from "../../store/features/errorSlice";
import { logout } from "../../store/features/authSlice";
import { addBudget } from "../../store/features/budgetSlice";
import { useNavigate } from "react-router-dom";

export default function BudgetModal() {
  const { postRequest, isLoading } = usePost();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const budgets = useSelector((state) => state.budget.budgets);
  const userBudgets = budgets.map((budget) => budget.title);
  const filteredOptions = expenseOptions.filter(
    (option) => !userBudgets.includes(option)
  )
  
  const handleOpen = () => setOpen(!open);
  
  const handleAddBudget = async (e) => {
    e.preventDefault();
    if (category === "" || amount === 0) {
      return;
    }

    if (token) {
      try {
        const response = await postRequest(
          "/api/v1/budget/addBudget",
          {
            title: category,
            amount,
          },
          token
        );
        if (response.status === 401) {
          dispatch(logout());
          navigate("/");
        }
        if (response.status === 400) {
          dispatch(setError(response.data.error));
        }
        if (response.success) {
          dispatch(addBudget({budget: response.data}));          
        }
        handleOpen();
      } catch (error) {
        dispatch(setError(error.message || "An error occurred"));
      }
    } else {
      dispatch(logout());
      dispatch(setError("Session expired. Please login to continue"));
      navigate("/");
    }
  };

  return (
    <>
      <Button
        className="flex items-center gap-2"
        color="blue"
        size="md"
        onClick={handleOpen}
      >
        Create New Budget
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add Budget
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Add a new budget to your list.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <X />
          </IconButton>
        </DialogHeader>
        <form onSubmit={handleAddBudget}>
        <DialogBody className="space-y-4 pb-6">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Category
            </Typography>
            <Select
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              placeholder="1"
              labelProps={{
                className: "hidden",
              }}
              onChange={(value) => setCategory(value)}
            >
              {filteredOptions.map((option) => (
                <Option key={option} value={option}>{option}</Option>
              ))}
            </Select>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Amount
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. 5000"
              name="size"
              type="number"
              required
              className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" type="submit">
            Add Budget
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}

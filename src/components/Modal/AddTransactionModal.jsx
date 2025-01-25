import React, { useEffect, useState } from "react";
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
import { Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, setLoading } from "../../store/features/incomeSlice";
import { addExpense } from "../../store/features/expenseSlice";
import { usePost } from "../../hooks/useHttp";
import { setError } from "../../store/features/errorSlice";
import { logout } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export default function AddTransactionModal({ options, type = "income" }) {
  const [open, setOpen] = useState(false);
  const isLoading = useSelector((state) => state.income.isLoading);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { postRequest } = usePost();

  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (token) {
      dispatch(setLoading({ isLoading: true }));
      try {
        if (type === "income") {
          const response = await postRequest(
            "/api/v1/transaction/addIncome",
            {
              title,
              category,
              amount,
              date: formatDate(date),
              description,  
            },
            token
          );

          if (response.success) {
            dispatch(addIncome({incomes: response.data}));
          }
        }
        handleOpen();
      } catch (error) {
        dispatch(
          setError(
            error.message || "An error occurred while adding transaction"
          )
        );
        console.error(error);
      } finally {
        dispatch(setLoading({ isLoading: false }));
      }
    } else {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="flex items-center gap-2 bg-blue-500 h-12 hover:bg-blue-700"
      >
        <Plus size={30} strokeWidth={5} />{" "}
        {type === "income" ? "Add Income" : "Add Expense"}
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {type === "income" ? "Add Income" : "Add Expense"}
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Add a new {type === "income" ? "income" : "expense"} to your list.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <X size={28} strokeWidth={3} />
          </IconButton>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-4 pb-6">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Title
              </Typography>
              <Input
                color="gray"
                required
                size="lg"
                placeholder="eg. Title"
                name="name"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
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
                labelProps={{
                  className: "hidden",
                }}
                onChange={(value) => setCategory(value)}
              >
                {options.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
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
              <div className="w-full sm:w-1/2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium"
                >
                  Date
                </Typography>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="w-full p-2 border border-gray-400 rounded-md focus:ring-2"
                  wrapperClassName="w-full"
                />
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Description
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. Description"
                name="name"
                required
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </DialogBody>

          <DialogFooter>
            <Button className="ml-auto" type="submit" disabled={isLoading}>
              {type === "income" ? "Add Income" : "Add Expense"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}

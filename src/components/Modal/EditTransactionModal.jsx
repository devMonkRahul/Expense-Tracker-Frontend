import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { PencilLine, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { usePatch } from "../../hooks/useHttp";
import { useDispatch } from "react-redux";
import { setError } from "../../store/features/errorSlice";
import { logout } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { updateIncome } from "../../store/features/incomeSlice";
import { updateExpense } from "../../store/features/expenseSlice";

export default function EditTransactionModal({
  type = "income",
  options,
  transaction,
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { patchRequest, isLoading } = usePatch();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(!open);

  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    setTitle(transaction.title);
    setCategory(transaction.category);
    setAmount(transaction.amount);
    setDescription(transaction.description);
    setDate(new Date(transaction.date));
  }, [open, transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (token) {
      try {
        const body = {}
        if (title !== transaction.title) body.title = title;
        if (category !== transaction.category) body.category = category;
        if (amount !== transaction.amount) body.amount = amount;
        if (date !== transaction.date) body.date = date;
        if (description !== transaction.description) body.description = description;

        if (type === "income") {
          const response = await patchRequest(
            `/api/v1/transaction/editIncome/${transaction._id}`,
            body,
            token
          );

          if (response.success) {
            dispatch(updateIncome({ id: transaction._id, updatedIncome: response.data }));
          } 
        } else {
          const response = await patchRequest(
            `/api/v1/transaction/editExpense/${transaction._id}`,
            body,
            token
          );

          if (response.success) {
            dispatch(updateExpense({ id: transaction._id, updatedExpense: response.data }));
          }
        }

        handleOpen();
      } catch (error) {
        dispatch(setError(error.message || "An error occurred"));
        console.error(error);
      }
    } else {
      dispatch(logout());
      dispatch(setError("Session expired. Please login again."));
      navigate("/");
    }
  };
  return (
    <>
      <IconButton variant="text" color="blue" onClick={handleOpen}>
        <PencilLine size={24} strokeWidth={2.5} />
      </IconButton>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {type === "income" ? "Edit Income" : "Edit Expense"}
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Edit {type === "income" ? "income" : "expense"} of your list.
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
                value={title}
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
                value={category}
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
                  value={amount}
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
                value={description}
              />
            </div>
          </DialogBody>

          <DialogFooter>
            <Button className="ml-auto" type="submit" disabled={isLoading}>
              {type === "income"
                ? isLoading
                  ? "Updating Income..."
                  : "Update Income"
                : isLoading
                ? "Updating Expense..."
                : "Update Expense"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}

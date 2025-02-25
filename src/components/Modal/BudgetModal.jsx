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
import { useDispatch } from "react-redux"; 
import { usePost, usePatch } from "../../hooks/useHttp";
import { setError } from "../../store/features/errorSlice";
import { logout } from "../../store/features/authSlice";
import { addBudget, updateBudget } from "../../store/features/budgetSlice";
import { useNavigate } from "react-router-dom";

export default function BudgetModal({ options, type="add", open, handleOpen, data=null }) {
  const { postRequest, isLoading } = usePost();
  const { patchRequest } = usePatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const [amount, setAmount] = useState(type === "edit" && data ? data.total : "");
  const [category, setCategory] = useState("");  
  
  const handleBudget = async (e) => {
    e.preventDefault();
    if ((type === "add" && (category === "" || amount === "")) || (type === "edit" && amount === "")) {
      return;
    }

    if (token) {
      try {
        if (type === "add") {
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
        } else {
          if (data && amount !== data.total) {
            const response = await patchRequest(
              `/api/v1/budget/updateBudget/${data.id}`,
              {
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
              dispatch(updateBudget({updatedBudget: response.data, id: data.id}));
            }
          } else return
        }
        handleOpen();
      } catch (error) {
        dispatch(setError(error.message || "An error occurred"));
      } finally {
        setAmount("");
        setCategory("");
      }
    } else {
      dispatch(logout());
      dispatch(setError("Session expired. Please login to continue"));
      navigate("/");
    }
  };

  const handleClose = () => {
    handleOpen();
    setAmount("");
    setCategory("");
  }
  return (
    <>
      {type === "add" && (<Button
        className="flex items-center gap-2"
        color="blue"
        size="md"
        onClick={handleOpen}
      >
        Create New Budget
      </Button>)}
      <Dialog size="sm" open={open} handler={handleClose} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {type === "add"? "Add" : "Edit"} Budget
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            {type === "add"? "Add a new budget to your list.": "Edit your budget."}
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleClose}
          >
            <X />
          </IconButton>
        </DialogHeader>
        <form onSubmit={handleBudget}>
        <DialogBody className="space-y-4 pb-6">
          {type === "add" && (<div>
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
              {options.map((option) => (
                <Option key={option} value={option}>{option}</Option>
              ))}
            </Select>
          </div>)}
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
              value={amount}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" type="submit" disabled={isLoading}>
            {type === "add" ? "Add" : "Edit"} Budget
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}

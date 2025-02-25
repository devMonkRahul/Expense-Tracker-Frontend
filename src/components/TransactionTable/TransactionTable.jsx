import React from 'react'
import { Card, CardBody, Typography, Chip, IconButton } from "@material-tailwind/react"
import { Trash2 } from "lucide-react"
import { EditTransactionModal } from "../index"
import { useDelete } from '../../hooks/useHttp'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/features/authSlice'
import { setError } from '../../store/features/errorSlice'
import { deleteIncome } from '../../store/features/incomeSlice'
import { deleteExpense } from '../../store/features/expenseSlice'
import { incomeOptions, expenseOptions, currencySymbols } from '../../utils/helper'

export default function TransactionTable({ transactions, type="income", categoryColors }) {
  const userData = useSelector((state) => state.auth.userData);
  const currency = currencySymbols[userData?.currency];
  const color = type === "expense" ? "red" : "green"
  const formatDate = (mongoDate) => {
    const date = new Date(mongoDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();  
    return `${day}-${month}-${year}`;
  }

  const { deleteRequest } = useDelete();
  const token = sessionStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (e, buttonRef, id) => {
    e.preventDefault();
    buttonRef.disabled = true;
    if (token) {
      try {
        if (type === "income") {
          const response = await deleteRequest(`/api/v1/transaction/deleteIncome/${id}`, token);

          if (response.success) {
            dispatch(deleteIncome(id));            
          }
        } else {
          const response = await deleteRequest(`/api/v1/transaction/deleteExpense/${id}`, token);

          if (response.success) {
            dispatch(deleteExpense(id));            
          }
        }
      } catch (error) {
        dispatch(setError(error.message || "An error occurred while deleting transaction"));
        console.error(error);
      }
    } else {
      dispatch(logout());
      navigate("/");
    }
  }

  return (
    <Card>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {["DATE", "TITLE", "DESCRIPTION", "CATEGORY", "AMOUNT", "EDIT", "DELETE"].map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map(({ _id, date, description, category, amount, title }) => (
                <tr key={_id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {formatDate(date)}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {title}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {description}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Chip
                      size="sm"
                      variant="ghost"
                      value={category}
                      color={categoryColors[category]}
                    />
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color={color} className="font-normal">
                      {currency}{amount}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <EditTransactionModal type={type} options={type === "income" ?incomeOptions : expenseOptions} transaction={{_id, date, description, category, amount, title}}/>
                  </td>
                  <td className="p-4">
                    <IconButton variant="text" color="red" onClick={(e) => handleDelete(e, e.currentTarget, _id)}>
                      <Trash2 size={24} strokeWidth={2.5} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  )
}

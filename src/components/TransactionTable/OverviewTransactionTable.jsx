import React from "react";
import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { useSelector } from "react-redux";

import {
  incomeColor,
  expenseColor,
  incomeCategoryColors,
  expenseCategoryColors,
  formatDate,
  today,
  yesterday,
} from "../../utils/helper";
import {
  Activity,
  BriefcaseBusiness,
  ChartCandlestick,
  CircleDollarSign,
  Coffee,
  HandHeart,
  Handshake,
  Headphones,
  Home,
  HousePlus,
  Plane,
  ShoppingBag,
} from "lucide-react";

export default function OverviewTransactionTable() {
  const incomes = useSelector((state) => state.income.incomes);
  const expenses = useSelector((state) => state.expense.expenses);

  const totalTransactions = [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const expenseCategoryIcons = {
    "Food & Dining": <Coffee />,
    Transportation: <Plane size={20} strokeWidth={2} />,
    Shopping: <ShoppingBag size={20} strokeWidth={2} />,
    Utilities: <Activity size={20} strokeWidth={2} />,
    Entertainment: <Headphones size={20} strokeWidth={2} />,
    Other: <HousePlus size={20} strokeWidth={2} />,
  };

  const incomeCategoryIcons = {
    Salary: <CircleDollarSign size={20} strokeWidth={2} />,
    Freelance: <BriefcaseBusiness size={20} strokeWidth={2} />,
    "Business Income": <Handshake size={20} strokeWidth={2} />,
    "Investment Income": <ChartCandlestick size={20} strokeWidth={2} />,
    "Rental Income": <Home size={20} strokeWidth={2} />,
    Other: <HandHeart size={20} strokeWidth={2} />,
  };

  return (
    totalTransactions.length !== 0 && (
      <Card className="mt-8">
        <CardBody>
          <div className="overflow-x-auto">
            <Typography
              variant="h4"
              color="blue-gray"
              className="font-normal mb-4"
            >
              Recent Transactions
            </Typography>
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {["TITLE", "DESCRIPTION", "CATEGORY", "DATE", "AMOUNT"].map(
                    (head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {totalTransactions.map(
                  ({
                    _id,
                    date,
                    description,
                    category,
                    amount,
                    title,
                    type,
                  }) => (
                    <tr key={_id} className="even:bg-blue-gray-50/50">
                      <td className="p-4 flex gap-4 items-center">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={
                            type === "income"
                              ? incomeCategoryIcons[category]
                              : expenseCategoryIcons[category]
                          }
                          color={
                            type === "income"
                              ? incomeCategoryColors[category]
                              : expenseCategoryColors[category]
                          }
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {title}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {description}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={category}
                          color={
                            type === "income"
                              ? incomeCategoryColors[category]
                              : expenseCategoryColors[category]
                          }
                        />
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatDate(date) === formatDate(today) ? "Today" : formatDate(date) === formatDate(yesterday) ? "Yesterday" : formatDate(date)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color={type === "income" ? incomeColor : expenseColor}
                          className="font-normal"
                        >
                          {type === "income" ? `+$${amount}` : `-$${amount}`}
                        </Typography>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    )
  );
}

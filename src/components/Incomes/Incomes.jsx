import React from "react";
import IncomeHeader from "./IncomeHeader";
import { Chart, CategoryBreakdown, TransactionTable } from "../index";

const incomeChartData = [
  { name: "Food & Dining", value: 850, color: "#4287f5" },
  { name: "Transportation", value: 450, color: "#42f5a7" },
  { name: "Shopping", value: 600, color: "#a742f5" },
  { name: "Utilities", value: 300, color: "#f5d742" },
  { name: "Entertainment", value: 200, color: "#f54242" },
];

const categories = [
  { name: "Food & Dining", amount: 850, color: "blue" },
  { name: "Transportation", amount: 450, color: "green" },
  { name: "Shopping", amount: 600, color: "purple" },
  { name: "Utilities", amount: 200, color: "yellow" },
  { name: "Entertainment", amount: 500, color: "red" },
];

const transactions = [
  {
    date: "2023-06-15",
    description: "Grocery Shopping",
    category: "Food & Dining",
    amount: 156.85,
    status: "Completed",
  },
  {
    date: "2023-06-14",
    description: "Uber Ride",
    category: "Transportation",
    amount: 24.5,
    status: "Completed",
  },
];

export default function Incomes() {
  return (
    <div className="bg-gray-50/50 p-8 w-full">
      <IncomeHeader />
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="w-full lg:w-2/3">
          <Chart data={incomeChartData} />
        </div>
        <div className="w-full lg:w-1/3">
          <CategoryBreakdown categories={categories} />
        </div>
      </div>
      <TransactionTable transactions={transactions} type="income" />
    </div>
  );
}

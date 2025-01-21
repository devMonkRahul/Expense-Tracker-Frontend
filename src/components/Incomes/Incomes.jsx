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

const incomeCategories = [
    { name: "Salary", color: "#FF5733", value: 1000 },
    { name: "Freelance", color: "#33FF57", value: 1000 },
    { name: "Business Income", color: "#3357FF", value: 1000 },
    { name: "Commission", color: "#FF33A1", value: 1000 },
    { name: "Bonuses", color: "#FFC300", value: 1000 },
    { name: "Pension", color: "#DAF7A6", value: 1000 },
    { name: "Part-time Job", color: "#8E44AD", value: 1000 },
    { name: "Overtime Pay", color: "#2ECC71", value: 1000 },
    { name: "Rental Income", color: "#E74C3C", value: 1000 },
    { name: "Gifts", color: "#F1C40F", value: 1000 },
    { name: "Lottery Winnings", color: "#1ABC9C", value: 1000 },
    { name: "Awards/Prizes", color: "#9B59B6", value: 1000 },
    { name: "Tax Refunds", color: "#34495E", value: 1000 },
    { name: "Selling Assets", color: "#3498DB", value: 1000 },
    { name: "Scholarships", color: "#E67E22", value: 1000 },
    { name: "Investment Income", color: "#16A085", value: 1000 },
    { name: "Interest Income", color: "#C0392B", value: 1000 }
]

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
    title: "Grocery Shopping",
    description: "Purchase Rice and Dal",
    category: "Food & Dining",
    amount: 156.85,
  },
  {
    date: "2023-06-14",
    title: "Uber Ride",
    description: "Shuttle trip to the airport",
    category: "Transportation",
    amount: 24.5,
  },
];

export default function Incomes() {
  return (
    <div className="bg-gray-50/50 p-8 w-full">
      <IncomeHeader />
      {transactions.length !== 0 && (
        <>
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="w-full lg:w-2/3">
              <Chart data={incomeChartData} />
            </div>
            <div className="w-full lg:w-1/3">
              <CategoryBreakdown categories={categories} />
            </div>
          </div>
          <TransactionTable transactions={transactions} type="income" />
        </>
      )}
    </div>
  );
}

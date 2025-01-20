import React from "react";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseChart from "./ExpenseChart";
import CategoryBreakdown from "./CategoryBreakdown";
import TransactionTable from "./TransactionTable";

export default function Expenses() {
  return (
    <div className="bg-gray-50/50 p-8 w-full">
        <ExpenseHeader />
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="w-full lg:w-2/3">
            <ExpenseChart />
            </div>
            <div className="w-full lg:w-1/3">
            <CategoryBreakdown />
            </div>
        </div>
        <TransactionTable />
    </div>
  );
}

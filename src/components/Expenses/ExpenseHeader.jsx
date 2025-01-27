import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { Search } from "lucide-react";
import { AddTransactionModal } from "../index";

export default function ExpenseHeader({ setSelectedCategory, setSelectedTitle }) {
  const options = [
    "All Categories",
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Utilities",
    "Entertainment",
  ];
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex gap-4">
        <AddTransactionModal options={options} type="expense" />
        <Select
          label="All Categories"
          size="md"
          onChange={(value) => setSelectedCategory(value)}
        >
          {options.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </div>

      <div className="relative flex items-center border border-slate-200 focus:shadow focus:border-slate-400 rounded-md px-2 shadow-sm">
        <Search />
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm pl-2 pr-3 py-2 transition duration-300 ease focus:outline-none  hover:border-slate-300   h-12 text-[17px]"
          placeholder="Search by Title..."
          onChange={(e) => setSelectedTitle(e.target.value)}
        />
      </div>
    </div>
  );
}

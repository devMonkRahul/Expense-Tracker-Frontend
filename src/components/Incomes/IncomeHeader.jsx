import React from 'react'
import { Button, Select, Option } from "@material-tailwind/react";
import { Plus, Search } from "lucide-react";

export default function IncomeHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex gap-4">
        <Button className="flex items-center gap-2 bg-blue-500" size="sm">
          <Plus className="h-4 w-4" /> Add Income
        </Button>
        <Select label="All Categories" size="md">
          <Option value="all">All Categories</Option>
          <Option value="food">Food & Dining</Option>
          <Option value="transportation">Transportation</Option>
          <Option value="shopping">Shopping</Option>
          <Option value="utilities">Utilities</Option>
          <Option value="entertainment">Entertainment</Option>
        </Select>
      </div>

      <div className="relative flex items-center border border-slate-200 focus:shadow focus:border-slate-400 rounded-md px-2 shadow-sm">
        <Search />
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm pl-2 pr-3 py-2 transition duration-300 ease focus:outline-none  hover:border-slate-300   h-12 text-[17px]"
          placeholder="Search expenses..."
        />
      </div>
    </div>
  )
}
import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function Chart({ data, categoryColors, type="income" }) {
  data = data.map((item) => ({
    name: item.category,
    value: item.amount,
  }));
  
  return (
    <Card>
      <CardBody>
        <Typography variant="h5" color="blue-gray">
          {type === "income" ? "Incomes" : "Expenses"} by Category
        </Typography>
        <div className="h-[380px] w-full flex justify-between items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={140}
                paddingAngle={1}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors[entry.name]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}


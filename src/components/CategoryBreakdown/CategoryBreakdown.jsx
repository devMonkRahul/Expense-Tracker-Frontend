import React from "react";
import { Card, CardBody, Typography, Progress } from "@material-tailwind/react";

export default function CategoryBreakdown({ categories, categoryColors, type="income" }) {
  const total = categories.reduce((acc, category) => acc + category.amount, 0);
  return (
    <Card className="h-full">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Category Breakdown
        </Typography>
        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <div key={category.category}>
              <div className="flex justify-between mb-2">
                <Typography color="blue-gray">{category.category}</Typography>
                <Typography color="blue-gray">${category.amount}</Typography>
              </div>
              <Progress
                value={(category.amount / total) * 100}
                size="sm"
                color={categoryColors[category.category]}
                className="h-1"
              />
            </div>
          ))}
        </div>
      </CardBody>
      <div className="p-4 flex justify-center items-center flex-1">
        <Typography
          variant="h3"
          color="blue-gray"
          className={`justify-between ${type === "income" ? "text-green-500" : "text-red-500"}`}
        >
          Total: $
          {categories.reduce((acc, category) => acc + category.amount, 0)}
        </Typography>
      </div>
    </Card>
  );
}

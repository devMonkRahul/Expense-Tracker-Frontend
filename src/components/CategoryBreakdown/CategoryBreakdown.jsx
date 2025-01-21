import React from "react";
import { Card, CardBody, Typography, Progress } from "@material-tailwind/react";

export default function CategoryBreakdown({ categories }) {
  return (
    <Card className="h-full">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Category Breakdown
        </Typography>
        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="flex justify-between mb-2">
                <Typography color="blue-gray">{category.name}</Typography>
                <Typography color="blue-gray">${category.amount}</Typography>
              </div>
              <Progress
                value={100}
                size="sm"
                color={category.color}
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
          className="justify-between text-red-400"
        >
          Total: $
          {categories.reduce((acc, category) => acc + category.amount, 0)}
        </Typography>
      </div>
    </Card>
  );
}

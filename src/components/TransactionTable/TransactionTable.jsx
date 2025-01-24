import React from 'react'
import { Card, CardBody, Typography, Chip, IconButton } from "@material-tailwind/react"
import { Pencil } from "lucide-react"

export default function TransactionTable({ transactions, type="income", categoryColors }) {
  const color = type === "expense" ? "red" : "green"
  const formatDate = (mongoDate) => {
    const date = new Date(mongoDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();  
    return `${day}-${month}-${year}`;
  }
  return (
    <Card>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {["DATE", "TITLE", "DESCRIPTION", "CATEGORY", "AMOUNT", "EDIT"].map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map(({ date, description, category, amount, title }, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
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
                      ${amount}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <IconButton variant="text" color="blue">
                      <Pencil className="h-4 w-4" />
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

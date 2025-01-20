import { Card, CardBody, Typography } from "@material-tailwind/react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Food & Dining", value: 850, color: "#4287f5" },
  { name: "Transportation", value: 450, color: "#42f5a7" },
  { name: "Shopping", value: 600, color: "#a742f5" },
  { name: "Utilities", value: 300, color: "#f5d742" },
  { name: "Entertainment", value: 200, color: "#f54242" },
]

export default function ExpenseChart() {
  return (
    <Card>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Expense by Category
        </Typography>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}


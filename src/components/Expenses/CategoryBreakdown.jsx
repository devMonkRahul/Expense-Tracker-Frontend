import { Card, CardBody, Typography, Progress } from "@material-tailwind/react"

const categories = [
  { name: "Food & Dining", amount: 850, color: "blue" },
  { name: "Transportation", amount: 450, color: "green" },
  { name: "Shopping", amount: 600, color: "purple" },
]

export default function CategoryBreakdown() {
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
              <Progress value={100} size="sm" color={category.color} className="h-1" />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}


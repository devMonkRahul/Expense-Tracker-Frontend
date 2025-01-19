import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

const chartData = [
  { month: 'Jan', amount: 2500 },
  { month: 'Feb', amount: 3200 },
  { month: 'Mar', amount: 2800 },
  { month: 'Apr', amount: 3500 },
  { month: 'May', amount: 2900 },
  { month: 'Jun', amount: 3100 },
  { month: 'Jul', amount: 3600 },
  { month: 'Aug', amount: 3300 },
  { month: 'Sep', amount: 3700 },
  { month: 'Oct', amount: 3400 },
  { month: 'Nov', amount: 3200 },
  { month: 'Dec', amount: 3500 },
];

const MetricCard = ({ title, value, change, icon, changeColor }) => (
  <Card>
    <CardBody className="p-4">
      <div className="flex items-center justify-between mb-2">
        <Typography variant="h6" color="blue-gray" className="font-normal">
          {title}
        </Typography>
        {icon}
      </div>
      <Typography variant="h3" color="blue-gray">
        {value}
      </Typography>
      <Typography 
        className={`flex items-center gap-1 text-sm ${
          changeColor === 'green' ? 'text-green-500' : 'text-red-500'
        }`}
      >
        <span>{change}</span>
        {changeColor === 'green' ? (
          <ArrowUpIcon className="h-4 w-4" />
        ) : (
          <ArrowDownIcon className="h-4 w-4" />
        )}
        from last month
      </Typography>
    </CardBody>
  </Card>
);

export default function Overview() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Balance"
          value="$24,500"
          change="+8.2%"
          icon={<span className="text-blue-500">💰</span>}
          changeColor="green"
        />
        <MetricCard
          title="Monthly Spending"
          value="$3,250"
          change="+12.5%"
          icon={<span className="text-red-500">📊</span>}
          changeColor="red"
        />
        <MetricCard
          title="Total Savings"
          value="$12,750"
          change="+4.75%"
          icon={<span className="text-green-500">💵</span>}
          changeColor="green"
        />
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Typography variant="h6" color="blue-gray" className="font-normal">
                Budget Status
              </Typography>
              <span className="text-purple-500">⏱️</span>
            </div>
            <Typography variant="h3" color="blue-gray">
              75%
            </Typography>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h5" color="blue-gray">
              Expense Overview
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">Week</Button>
              <Button variant="filled" size="sm">Month</Button>
              <Button variant="outlined" size="sm">Year</Button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#2196f3" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
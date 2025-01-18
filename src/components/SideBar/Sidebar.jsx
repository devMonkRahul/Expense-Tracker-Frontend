import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { BookMarked, Calculator, CircleDollarSign, House } from "lucide-react";

export default function Sidebar() {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[15rem] py-4 shadow-xl shadow-blue-gray-900/20 overflow-hidden">
      <List>
        <ListItem className="hover:text-blue-500 hover:py-6 font-bold">
          <ListItemPrefix>
            <House className="text-blue-300"/>
          </ListItemPrefix>
            Overview
        </ListItem>
        <ListItem className="hover:text-green-500 hover:py-6 font-bold">
          <ListItemPrefix>
            <CircleDollarSign className="text-green-300"/>
          </ListItemPrefix>
          Incomes
        </ListItem>
        <ListItem className="hover:text-red-500 hover:py-6 font-bold">
          <ListItemPrefix>
            <CircleDollarSign className="text-red-300"/>
          </ListItemPrefix>
          Expenses
        </ListItem>
        <ListItem className="hover:text-brown-500 hover:py-6 font-bold">
          <ListItemPrefix>
            <Calculator className="text-brown-300"/>
          </ListItemPrefix>
          Budgets
        </ListItem>
        <ListItem className="hover:text-brown-500 hover:py-6 font-bold">
          <ListItemPrefix>
            <BookMarked className="text-brown-300"/>
          </ListItemPrefix>
          Reports
        </ListItem>
      </List>
    </Card>
  );
}

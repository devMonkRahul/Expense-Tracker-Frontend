import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  BookMarked,
  Calculator,
  CircleDollarSign,
  HomeIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export function SidebarContent() {
  const navigate = useNavigate();
  return (
    <List>
      <ListItem
        className="hover:text-blue-500 hover:py-6 font-bold"
        onClick={() => navigate("/dashboard")}
      >
        <ListItemPrefix>
          <HomeIcon className="text-blue-300" />
        </ListItemPrefix>
        Overview
      </ListItem>
      <ListItem className="hover:text-green-500 hover:py-6 font-bold">
        <ListItemPrefix>
          <CircleDollarSign className="text-green-300" />
        </ListItemPrefix>
        Incomes
      </ListItem>
      <ListItem 
        className="hover:text-red-500 hover:py-6 font-bold"
        onClick={() => navigate("/dashboard/expenses")}
      >
        <ListItemPrefix>
          <CircleDollarSign className="text-red-300" />
        </ListItemPrefix>
        Expenses
      </ListItem>
      <ListItem className="hover:text-brown-500 hover:py-6 font-bold">
        <ListItemPrefix>
          <Calculator className="text-brown-300" />
        </ListItemPrefix>
        Budgets
      </ListItem>
      <ListItem className="hover:text-brown-500 hover:py-6 font-bold">
        <ListItemPrefix>
          <BookMarked className="text-brown-300" />
        </ListItemPrefix>
        Reports
      </ListItem>
    </List>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 960 ? setIsOpen(true) : setIsOpen(false);
    });
    window.innerWidth >= 960 ? setIsOpen(true) : setIsOpen(false)
  }, []);

  return isOpen ? (
    <>
      <Card className="hidden md:block w-full max-w-[15rem] py-4 shadow-xl shadow-blue-gray-900/20 h-[calc(100vh-4.1rem)]">
        <SidebarContent />
      </Card>
    </>
  ) : null;
}

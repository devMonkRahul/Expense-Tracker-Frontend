export const incomeColor = "green";
export const expenseColor = "red";

export const formatDate = (mongoDate) => {
  const date = new Date(mongoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const today = new Date().toISOString();
export const yesterday = new Date(Date.now() - 86400000);

export const incomeOptions = [
  "Salary",
  "Freelance",
  "Business Income",
  "Investment Income",
  "Rental Income",
  "Other",
];

export const expenseOptions = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Utilities",
  "Entertainment",
  "Other",
];

export const incomeCategoryColors = {
  Salary: "blue",
  Freelance: "green",
  "Business Income": "purple",
  "Investment Income": "yellow",
  "Rental Income": "red",
  Other: "teal",
};

export const expenseCategoryColors = {
  "Food & Dining": "blue",
  Transportation: "green",
  Shopping: "purple",
  Utilities: "yellow",
  Entertainment: "red",
  Other: "teal",
};

export const pieChartColors = {
  Salary: "#4287f5",
  Freelance: "#42f5a7",
  "Business Income": "#a742f5",
  "Investment Income": "#f5d742",
  "Rental Income": "#f54242",
  "Food & Dining": "#4287f5",
  Transportation: "#42f5a7",
  Shopping: "#a742f5",
  Utilities: "#f5d742",
  Entertainment: "#f54242",
  Other: "#14B8A6",
};

export const currencyOptions = [
  "INR (₹)",
  "USD ($)",
  "EUR (€)",
  "GBP (£)",
  "JPY (¥)"
]

export const currencyValues = {
  "INR (₹)": "INR",
  "USD ($)": "USD",
  "EUR (€)": "EUR",
  "GBP (£)": "GBP",
  "JPY (¥)": "JPY"
}

export const currencySymbols = {
  "INR": "₹",
  "USD": "$",
  "EUR": "€",
  "GBP": "£",
  "JPY": "¥"
}

export const getTotalAmount = (transactions) => {
  return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
}

export const currentMonth = new Date().getMonth() + 1;
export const currentYear = new Date().getFullYear();
export const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
export const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;

export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) {
      return current === 0 ? 0 : 100; // If both are 0, no change; otherwise, full increase
  }
  return ((current - previous) / previous) * 100;
};

export const categoryWiseTotal = (transactions) => {
  return transactions.reduce((acc, curr) => {
    const existing = acc.find((item) => item.category === curr.category);
    if (existing) {
      existing.amount += curr.amount;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);
}
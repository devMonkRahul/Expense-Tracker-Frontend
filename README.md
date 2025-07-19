# 💰 Expense Tracker

<div align="center">
  <img src="src/assets/images/logo.png" alt="Expense Tracker Logo" width="120" height="120">
  
  <h3>A modern, intuitive expense tracking application built with React</h3>
  
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF.svg)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-11.2.0-FFCA28.svg)](https://firebase.google.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## ✨ Features

- 📊 **Dashboard Overview** - Get a comprehensive view of your financial status
- 💸 **Expense Tracking** - Log and categorize your expenses effortlessly
- 💰 **Income Management** - Track multiple income sources
- 📈 **Budget Planning** - Set and monitor budgets for different categories
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔐 **Secure Authentication** - Firebase-powered user authentication
- 📊 **Interactive Charts** - Visualize your spending patterns with Chart.js and Recharts
- 🏷️ **Category Breakdown** - Detailed analysis of spending by category
- 🔄 **Real-time Updates** - Live data synchronization
- 🎨 **Modern UI** - Beautiful interface with Material Tailwind components

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** - Modern JavaScript library for building user interfaces
- **Vite 6.0.5** - Fast build tool and development server
- **TailwindCSS 3.4.17** - Utility-first CSS framework
- **Material Tailwind 2.1.10** - React components library

### State Management
- **Redux Toolkit 2.5.0** - Efficient state management
- **React Redux 9.2.0** - React bindings for Redux

### Data Visualization
- **Chart.js 4.4.7** - Flexible charting library
- **React Chart.js 2** - React wrapper for Chart.js
- **Recharts 2.15.0** - Composable charting library

### Backend & Database
- **Custom Backend API** - [Expense Tracker Backend](https://github.com/devMonkRahul/Expense-Tracker-Backend)
- **Firebase 11.2.0** - Authentication service

### Additional Libraries
- **React Router DOM 7.1.1** - Client-side routing
- **React Hook Form 7.54.2** - Performant forms with easy validation
- **React DatePicker 7.6.0** - Date selection component
- **Lottie React 2.4.1** - Beautiful animations
- **Lucide React** & **React Icons** - Icon libraries

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/devMonkRahul/Expense-Tracker-Frontend.git
   cd Expense-Tracker-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Backend Service**
   - Clone and set up the backend service from [Expense Tracker Backend](https://github.com/devMonkRahul/Expense-Tracker-Backend)
   - Follow the backend setup instructions in its README
   - Make sure the backend API is running before starting the frontend

4. **Configure API Endpoints**
   - Update the API base URL in `src/conf/config.js` to point to your backend service
   - Ensure Firebase configuration is set up for authentication

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🔗 Related Projects

- **[Expense Tracker Backend](https://github.com/devMonkRahul/Expense-Tracker-Backend)** - The backend API service for this application

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Budget/         # Budget-related components
│   ├── Chart/          # Data visualization components
│   ├── Expenses/       # Expense management components
│   ├── Incomes/        # Income tracking components
│   ├── Login/          # Authentication components
│   ├── Modal/          # Modal dialogs
│   └── ...
├── pages/              # Main application pages
├── store/              # Redux store and slices
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and helpers
├── conf/               # Configuration files
└── assets/             # Static assets (images, animations)
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📧 Contact & Support

<div align="center">
  
  **Created with ❤️ by [Rahul (devMonkRahul)](https://github.com/devMonkRahul)**
  
  [![GitHub](https://img.shields.io/badge/GitHub-devMonkRahul-181717.svg?style=for-the-badge&logo=github)](https://github.com/devMonkRahul)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5.svg?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/rahul---pal)
  [![Twitter](https://img.shields.io/badge/Twitter-Follow-1DA1F2.svg?style=for-the-badge&logo=x)](https://x.com/Rahul___Pal)
  
  If you found this project helpful, please give it a ⭐!
  
</div>

## 🙏 Acknowledgments

- Thanks to all the open-source libraries that made this project possible
- Inspired by modern financial management applications
- Icons provided by Heroicons and Lucide React
- Animations powered by Lottie React

---

<div align="center">
  <p>Made with 💻 and ☕ by <strong>devMonkRahul</strong></p>
</div>


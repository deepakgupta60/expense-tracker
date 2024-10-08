// import logo from './logo.svg';
import { createContext, useState } from 'react';
import './App.css';
import ExpenseTrackerComponent from './component/ExpenseTrackerComponent';
import TrendingExpenseChart from './component/TrendingExpenseChart';
import ViewTransaction from './component/ViewTransaction';
import { SnackbarProvider } from 'notistack';
import ReactModal from "react-modal";
// import styles from "./App.module.css";


ReactModal.setAppElement("#root")

export const ExpenseContext = createContext();

function App() {
  const [expenseDatas, setExpenseDatas] = useState([])


  console.log(expenseDatas, "expense datas")

  return (

    <>

      <SnackbarProvider />

      <ExpenseContext.Provider value={{ expenseDatas, setExpenseDatas}}>
        <h1 className='expenseHeading'>Expense Tracker</h1>
        {/* for Expense Tracker */}
        <div className='expenseTracker'>
          <ExpenseTrackerComponent />
        </div>

        {/* for transactions and charts */}

        <div className='viewExpense'>

          <div className='viewRecentExpense'>

          <h2 style={{color:"white"}}>Recent Transactions</h2>

            <ViewTransaction />
          </div>

          <div className='viewTrendingChart'>

          <h2 style={{color:"white"}}>Top Expenses</h2>

            <TrendingExpenseChart />
          </div>

        </div>
      </ExpenseContext.Provider>
    </>
  );
}

export default App;

import React from 'react'
import AddIncome from './AddIncome'
import AddExpense from './AddExpense'
import CategoryPieChart from './CategoryPieChart'

const ExpenseTrackerComponent = () => {
  return (
    <div style={{display:"flex", justifyContent:"space-around"}}>
     
      <AddIncome />
      <AddExpense />
      <CategoryPieChart />
    </div>
  )
}

export default ExpenseTrackerComponent
import React, { useContext, useEffect, useState } from 'react'
import { ExpenseContext } from '../App';
import ReactModal from "react-modal";
import { enqueueSnackbar } from 'notistack';


const AddExpense = () => {


    const [expenseData, setExpenseData] = useState(() => {
        const savedExpense = localStorage.getItem("expenses")
        return savedExpense ? JSON.parse(savedExpense) : [];
    });
    const [modelIsOpen, setModelIsOpen] = useState(false); // for add model
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("Entertainment");
    const [walletBalance, setWalletBalance] = useState(() => {
        let savedBalance = JSON.parse(localStorage.getItem('wallet'))
        return savedBalance ? savedBalance : [];
    })
    console.log(walletBalance,"Wallet balance")
    const totalBalance = walletBalance.reduce((acc, cur) => acc + cur, 0);


    const { expenseDatas, setExpenseDatas } = useContext(ExpenseContext)


    const handleOpen = () => {
        setModelIsOpen(true)
    }

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenseData));
        
    }, [expenseData]);


    const handleClose = () => {
        setModelIsOpen(false)
        setTitle("")
        setAmount("")
        setDate("")
        setCategory("Entertainment")

    }

    const handleAddExpense = () => {
        const expenseAmount = parseFloat(amount);

        if (expenseAmount > totalBalance) {
            enqueueSnackbar("You don't have enough balance to add this expense", { variant: "error" });
            return;
        }

        const uniqueId = Date.now();
        const newExpense = { id: uniqueId, title, amount: expenseAmount, date, category };

        const updatedExpenses = [...expenseData, newExpense];
        setExpenseData(updatedExpenses);  // update local state

        enqueueSnackbar("Expense added successfully", { variant: "success" });

        // Also update the context state
        setExpenseDatas([...expenseDatas, newExpense]);

        handleClose();
        
        // Update wallet balance in state and localStorage
        const newBalance = walletBalance.map((balance) => balance - expenseAmount);
        setWalletBalance(newBalance);
        localStorage.setItem('wallet', JSON.stringify(newBalance));
    }

    const totalExpense = expenseData.reduce((acc, curr) => acc + curr.amount, 0);   

  

    return (
        <>
            <ReactModal isOpen={modelIsOpen} onRequestClose={handleClose}>

                <input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='expense item' />
                <input type='text' name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='expense amount' />
                <input type='date' name='date' value={date} onChange={(e) => setDate(e.target.value)} />
                <select name='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Entertainment</option>
                    <option>Food</option>
                    <option>Travel</option>
                </select>
                <button onClick={handleAddExpense}>
                    Add Expense
                </button>
                <button onClick={handleClose}>Close</button>
            </ReactModal>

<div className='addExpenseCard' id='add_expense'>

            <p>Expense: <span className='addAmt'>₹{totalExpense}</span> </p>
            <button style={{display:"block"}} onClick={handleOpen}>Add Expense</button>
</div>



        </>
    )
}

export default AddExpense
import React, { useContext, Fragment, useState, useEffect } from 'react';
import { ExpenseContext } from '../App';
import { enqueueSnackbar } from 'notistack';
import ReactModal from 'react-modal';
import { FaBirthdayCake } from "react-icons/fa";
// import TransactionCard from './TransactionCard';
import { CiEdit } from "react-icons/ci";

import { MdDelete } from "react-icons/md";










const ViewTransaction = () => {
    const { expenseDatas, setExpenseDatas } = useContext(ExpenseContext);
    const [modelIsOpen, setModelIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("Entertainment");

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedExpenses = localStorage.getItem("expenses");
        if (savedExpenses) {
            setExpenseDatas(JSON.parse(savedExpenses));
        }
    }, [setExpenseDatas]);

    // Update localStorage whenever the expenseDatas change
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenseDatas));
    }, [expenseDatas]);

    // Open the modal for editing or adding a new expense
    const handleOpen = () => {
        setModelIsOpen(true);
    };

    const handleClose = () => {
        setModelIsOpen(false);
        setIsEditing(false);
        setTitle("");
        setAmount("");
        setDate("");
        setCategory("Entertainment");
        setEditIndex(null);
    };

    const handleEditExpense = (id) => {
        const expenseToEdit = expenseDatas.find((expense) => expense.id === id);
        setTitle(expenseToEdit.title);
        setAmount(expenseToEdit.amount);
        setDate(expenseToEdit.date);
        setCategory(expenseToEdit.category);
        setEditIndex(id);
        setIsEditing(true);
        handleOpen();
    };

    const handleDelete = (id) => {
        const filteredData = expenseDatas.filter((expense) => expense.id !== id);
        setExpenseDatas(filteredData);
        enqueueSnackbar("Deleted expense", { variant: "success" });
    };

    const handleAddOrEditExpense = () => {
        const expenseAmount = parseFloat(amount);
        const newExpense = { id: editIndex || Date.now(), title, amount: expenseAmount, date, category };

        if (isEditing && editIndex !== null) {
            // Edit the existing expense
            const updatedData = expenseDatas.map((expense) =>
                expense.id === editIndex ? newExpense : expense
            );
            setExpenseDatas(updatedData);
            enqueueSnackbar("Updated expense", { variant: "success" });
        } else {
            // Add a new expense
            setExpenseDatas([...expenseDatas, newExpense]);
            enqueueSnackbar("Added expense", { variant: "success" });
        }

        handleClose();
    };




    const TransactionCard = ({title,amount, date, id}) => {
        return (
            <>
    
    
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                    <td>

                <div style={{background:"#D9D9D9", color:"#33363F",display:"flex", justifyContent:"center", alignContent:"center", padding:"10px 5px", borderRadius:"50px", marginRight:"5px"}}>
                <FaBirthdayCake />
                </div>
                        
                    </td>
                    <td>
                        <p>{title} <br /><span>{date}</span> </p>
    
                    </td>
    
                    <td>{amount}</td>
                    <td>
                        <button style={{background:"#FF3E3E", border:"0px", padding:"10px", borderRadius:"30px", boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)"}} onClick={()=>handleEditExpense(id)}><CiEdit /></button>
                        
    
                    </td>
    
                    <td>
                        <button style={{background:"#F4BB4A", border:"0px", padding:"10px", borderRadius:"30px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)"}} onClick={()=>handleDelete(id)}><MdDelete /></button>
                        
    
                    </td>
    
                </tr>
    
            </>
        )
    }



    return (
        <>
            {/* Modal for Adding or Editing Expense */}
            <ReactModal isOpen={modelIsOpen} onRequestClose={handleClose}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Expense item"
                />
                <input
                    type="text"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Expense amount"
                />
                <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Entertainment</option>
                    <option>Food</option>
                    <option>Travel</option>
                </select>

                <button onClick={handleAddOrEditExpense}>
                    {!isEditing ? "Add Expense" : "Save Expense"}
                </button>
                <button onClick={handleClose}>Close</button>
            </ReactModal>


            {/* Add Expense Button */}

            <div style={{ background: "white", padding: "10px", borderRadius: "10px" }}>

                <table style={{ width: "100%" }}>
                    {/* List of Expenses */}
                    {expenseDatas.length === 0 ? (
                        <p>No expenses added yet.</p>
                    ) : (



                        expenseDatas.map((data) => (
                            <Fragment key={data.id}>

                                <TransactionCard title={data.title} amount={data.amount} date={new Date(data.date).toLocaleDateString()} id={data.id} />


                                {/*                       
                       


                        <button onClick={() => handleEditExpense(data.id)}>Edit</button>
                        <button onClick={() => handleDelete(data.id)}>Delete</button> */}
                            </Fragment>
                        ))
                    )}

                </table>

            </div>
        </>
    );
};

export default ViewTransaction;

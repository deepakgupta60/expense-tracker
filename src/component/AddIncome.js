import React, { useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { ExpenseContext } from '../App';


const AddWalletBalance = () => {
  const [walletIncome, setWalletIncome] = useState('');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [wallet, setWallet] = useState(()=>{
    const savedWallet = localStorage.getItem('wallet');
    return savedWallet ? JSON.parse(savedWallet) : [5000];
  });



  const handleOpen = () => {
    setIsModelOpen(true);
  };

  const handleClose = () => {
    setIsModelOpen(false);
    setWalletIncome(''); 
  };

  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet)); 
    }
  }, []);

  useEffect(() => {
    if (wallet.length > 0) {
      localStorage.setItem('wallet', JSON.stringify(wallet)); 
    }

  }, [wallet]);

  const handleAddIncome = () => {
    const incomeAmount = parseFloat(walletIncome);

    if (!isNaN(incomeAmount) && incomeAmount > 0) {
      setWallet([...wallet, incomeAmount]); 

    } else {
      alert('Please enter a valid positive number');
    }

    handleClose(); 
  };

  const totalBalance = wallet.reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <ReactModal isOpen={isModelOpen} onRequestClose={handleClose}>
        <input
          type='text'
          value={walletIncome}
          onChange={(e) => setWalletIncome(e.target.value)}
          placeholder='Enter income'
        />
        <button onClick={handleAddIncome}>Add Balance</button>
        <button onClick={handleClose}>Close</button>
      </ReactModal>

<div className='addExpenseCard' id='add_income'>

      <p>Wallet Balance: <span className='expenseAmt'>₹{totalBalance}</span> </p>
      <button style={{display:"block"}} onClick={handleOpen}>Add Income</button>
</div>
    </>
  );
};

export default AddWalletBalance;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodItem from './components/FoodItem';
import InputPanel from './components/InputPanel';
import PurchasePanel from './components/PurchasePanel';

function App() {
  const [balance, setBalance] = useState(0);

  const handleAddMoney = (amount) => {
    setBalance(balance + amount);
  };

  const handleBuyItem = (price) => {
    if (balance >= price) {
      setBalance(balance - price);
      return true;
    }
    return false;
  };

  const handleReturnMoney = () => {
    setBalance(0);
  };

  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-violet-950 font-bold text-5xl text-center py-2 pt-4 pb-5'>Vending Machine</h1>
          </div>
        </div>
        <div className='row'>
          <div className="col-md-8">
            <FoodItem balance={balance} onBuyItem={handleBuyItem} />
          </div>
          <div className='col-md-4'>
            <InputPanel balance={balance} onAddMoney={handleAddMoney} />
            <PurchasePanel balance={balance} onReturnMoney={handleReturnMoney} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

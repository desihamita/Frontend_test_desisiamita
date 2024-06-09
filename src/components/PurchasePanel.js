import React from 'react';
import Swal from 'sweetalert2';

const PurchasePanel = ({ balance, onReturnMoney }) => {
  const handleReturnMoney = () => {
    Swal.fire({
      title: 'Returned Money',
      text: `Returned ${balance} to you.`,
      icon: 'info',
      confirmButtonText: 'OK'
    });
    onReturnMoney();
  };

  return (
    <div className='flex flex-col items-center gap-2 py-5 px-5'>
      <div className='grid grid-cols-1 md:grid-col gap-2 w-full'>
        <button onClick={handleReturnMoney} className='w-full py-3 m-1 rounded-lg border-purple-800 bg-purple-800 text-white hover:bg-purple-950 hover:text-purple-800 hover:border-purple-800'>
          Return Money
        </button>
      </div>
    </div>
  );
};

export default PurchasePanel;

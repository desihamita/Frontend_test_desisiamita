import React from 'react';
import Swal from 'sweetalert2';

const InputPanel = ({ balance, onAddMoney }) => {
  const handleAddMoney = (amount) => {
    onAddMoney(amount);
    Swal.fire({
      title: 'Success!',
      text: `Added ${formatRupiah(amount)} to balance.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  return (
    <div className='flex flex-col items-center gap-2 py-5 px-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
        <button
          onClick={() => handleAddMoney(2000)}
          className='w-full py-3 m-1 rounded-lg border-purple-800 bg-purple-800 text-white hover:bg-purple-950 hover:text-white hover:border-purple-800'>
          {formatRupiah(2000)}
        </button>
        <button
          onClick={() => handleAddMoney(5000)}
          className='w-full py-3 m-1 rounded-lg border-purple-800 bg-purple-800 text-white hover:bg-purple-950 hover:text-black hover:border-purple-800'>
          {formatRupiah(5000)}
        </button>
        <button
          onClick={() => handleAddMoney(10000)}
          className='w-full py-3 m-1 rounded-lg border-purple-800 bg-purple-800 text-white hover:bg-purple-950 hover:text-purple-800 hover:border-purple-800'>
          {formatRupiah(10000)}
        </button>
        <button
          onClick={() => handleAddMoney(20000)}
          className='w-full py-3 m-1 rounded-lg border-purple-800 bg-purple-800 text-white hover:bg-purple-950 hover:text-purple-800 hover:border-purple-800'>
          {formatRupiah(20000)}
        </button>
        <button
          onClick={() => handleAddMoney(50000)}
          className='w-full py-3 m-1 rounded-lg border-purple-800 bg-purple-800 text-white hover:bg-purple-950 hover:text-purple-800 hover:border-purple-800'>
          {formatRupiah(50000)}
        </button>
      </div>
      <div className='mt-4'>
        <h2 className='text-xl font-bold'>Balance: {formatRupiah(balance)}</h2>
      </div>
    </div>
  );
};

export default InputPanel;

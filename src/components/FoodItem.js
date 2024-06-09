import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const FoodItem = ({ balance, onBuyItem }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/items')
      .then(response => {
        setItems(response.data);
        const outOfStockItems = response.data.filter(item => item.stock === 0);
        if (outOfStockItems.length > 0) {
          const outOfStockNames = outOfStockItems.map(item => item.name).join(', ');
          Swal.fire({
            title: 'Out of Stock!',
            text: `The following items are out of stock: ${outOfStockNames}`,
            icon: 'warning',
            confirmButtonText: 'OK'
          });
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleBuyItem = (item) => {
    if (item.stock === 0) {
      Swal.fire({
        title: 'Error!',
        text: `${item.name} is out of stock!`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (!onBuyItem(item.price)) {
      Swal.fire({
        title: 'Error!',
        text: `Not enough balance to buy ${item.name}.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    axios.put(`http://localhost:3001/items/${item.id}`, {
      ...item,
      stock: item.stock - 1
    })
      .then(() => {
        setItems(items.map(i => i.id === item.id ? { ...i, stock: i.stock - 1 } : i));
        Swal.fire({
          title: 'Success!',
          text: `You bought ${item.name}!`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: 'Error buying item. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  return (
    <div className='grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-6 py-4'>
      {items.map((item) => (
        <div key={item.id} className='border-5 rounded-lg border-rose-100 hover:scale-105 duration-300'>
          <img className='w-full h-[200px] object-cover rounded-lg' alt={item.name} src={`${process.env.PUBLIC_URL}${item.imageUrl}`} />
          <div className='flex justify-between py-2 px-2'>
            <p className='font-bold'>{item.name}</p><br />
            <p className='bg-purple-950 h-18 w-18 rounded-full -mt-10 text-white py-3 px-2 border-8 font-bold'>
              {formatRupiah(item.price)}
            </p>
          </div>
          <div className='p-2 py-4 -mt-7'>
            <p className='font-bold'>Stok : {item.stock}</p>
            <button
              onClick={() => handleBuyItem(item)}
              disabled={item.stock === 0}
              className={`w-full rounded-lg border-purple-800 ${
                item.stock === 0 ? 'bg-gray-300 border-gray-300' : 'bg-purple-800 border-purple-800 text-white hover:bg-purple-950 hover:text-purple-800 hover:border-purple-800 '
              } `}
            >
              {item.stock === 0 ? 'Out of Stock' : 'Buy'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodItem;

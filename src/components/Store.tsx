import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const Store: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const items = [
    { id: 1, name: 'Wizard Hat', price: 50 },
    { id: 2, name: 'Magic Wand', price: 100 },
    { id: 3, name: 'Sparkly Cape', price: 150 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Character Store</h2>
          <button
            onClick={() => navigate('/game')}
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Game
          </button>
        </div>
        <p className="mb-4">Your coins: {user?.score || 0}</p>
        <ul>
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-4 p-2 border rounded">
              <span>{item.name}</span>
              <button
                className="flex items-center bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                onClick={() => alert('Item purchased!')} // Implement actual purchase logic
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy ({item.price} coins)
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Store;
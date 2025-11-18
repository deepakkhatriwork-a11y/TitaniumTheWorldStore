import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(1);

  const increment = () => setCount(prevCount => Math.min(prevCount + 1, 5));
  const decrement = () => setCount(prevCount => Math.max(prevCount - 1, 1));

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
      <button 
        onClick={decrement}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
        disabled={count <= 1}
      >
        -
      </button>
      <span className="text-xl font-medium">{count}</span>
      <button 
        onClick={increment}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
        disabled={count >= 5}
      >
        +
      </button>
      <span className="text-gray-600">
        {count === 1 ? 'Item' : 'Items'} selected
      </span>
    </div>
  );
}

export default Counter;

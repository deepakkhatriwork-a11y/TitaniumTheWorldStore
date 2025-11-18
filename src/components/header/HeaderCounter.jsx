import React, { useState } from 'react';

function HeaderCounter() {
  const [count, setCount] = useState(1);

  const increment = (e) => {
    e.stopPropagation();
    setCount(prev => Math.min(prev + 1, 5));
  };

  const decrement = (e) => {
    e.stopPropagation();
    setCount(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
      <button 
        onClick={decrement}
        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 focus:outline-none"
        disabled={count <= 1}
      >
        -
      </button>
      <span className="px-2 text-sm font-medium w-6 text-center">
        {count}
      </span>
      <button 
        onClick={increment}
        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 focus:outline-none"
        disabled={count >= 5}
      >
        +
      </button>
    </div>
  );
}

export default HeaderCounter;

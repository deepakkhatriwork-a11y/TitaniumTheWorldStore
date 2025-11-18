import React, { useContext } from 'react';
import myContext from '../context/data/myContext';

function ContextTest() {
  const context = useContext(myContext);
  
  console.log('Context value:', context);
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
      <h2>Context Test</h2>
      <p>Check the browser console for context values.</p>
      <pre>{JSON.stringify(context, null, 2)}</pre>
    </div>
  );
}

export default ContextTest;
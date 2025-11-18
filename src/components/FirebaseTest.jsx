import React, { useEffect, useState } from 'react';
import { testFirebaseConnection, getCurrentUser } from '../utils/firebaseTest';

function FirebaseTest() {
  const [testResults, setTestResults] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const runTest = async () => {
      const results = await testFirebaseConnection();
      setTestResults(results);
      
      const user = getCurrentUser();
      setCurrentUser(user);
    };
    
    runTest();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', margin: '20px' }}>
      <h2>Firebase Connection Test</h2>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Current User:</h3>
        <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Test Results:</h3>
        {testResults ? (
          <div>
            <p>Status: {testResults.success ? 'Success' : 'Failed'}</p>
            {testResults.success ? (
              <div>
                <p>Collections:</p>
                <ul>
                  <li>Products: {testResults.collections.products}</li>
                  <li>Orders: {testResults.collections.orders}</li>
                  <li>Users: {testResults.collections.user}</li>
                </ul>
              </div>
            ) : (
              <div>
                <p>Error: {testResults.error}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Running test...</p>
        )}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Instructions:</h3>
        <ol>
          <li>If test fails with permission errors, check Firebase security rules</li>
          <li>Make sure you're logged in as admin (knupadhyay784@gmail.com)</li>
          <li>Verify rules are deployed to Firebase Console</li>
        </ol>
      </div>
    </div>
  );
}

export default FirebaseTest;
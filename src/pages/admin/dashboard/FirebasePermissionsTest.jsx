import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../../firebase/firebaseConfig';
import { useAuth } from '../../../hooks/useAuth';

function FirebasePermissionsTest() {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const testCollections = async () => {
      console.log('Current user:', user);
      
      const results = {};
      
      // Test products collection
      try {
        console.log('Testing products collection...');
        const productsSnapshot = await getDocs(collection(fireDB, 'products'));
        results.products = { success: true, count: productsSnapshot.size };
        console.log('Products test passed:', productsSnapshot.size);
      } catch (error) {
        console.error('Products test failed:', error);
        results.products = { success: false, error: error.message, code: error.code };
      }
      
      // Test orders collection
      try {
        console.log('Testing orders collection...');
        const ordersSnapshot = await getDocs(collection(fireDB, 'orders'));
        results.orders = { success: true, count: ordersSnapshot.size };
        console.log('Orders test passed:', ordersSnapshot.size);
      } catch (error) {
        console.error('Orders test failed:', error);
        results.orders = { success: false, error: error.message, code: error.code };
      }
      
      // Test user collection
      try {
        console.log('Testing user collection...');
        const userSnapshot = await getDocs(collection(fireDB, 'users'));
        results.user = { success: true, count: userSnapshot.size };
        console.log('User test passed:', userSnapshot.size);
      } catch (error) {
        console.error('User test failed:', error);
        results.user = { success: false, error: error.message, code: error.code };
      }
      
      setTestResults(results);
      setLoading(false);
    };
    
    if (user !== undefined) { // Only run test when auth state is determined
      testCollections();
    }
  }, [user]);

  if (user === undefined) {
    return <div>Loading auth state...</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', margin: '20px' }}>
      <h2>Firebase Permissions Test</h2>
      <p>Current user: {user ? user.email : 'Not logged in'}</p>
      
      {loading ? (
        <p>Testing...</p>
      ) : (
        <div>
          <h3>Test Results:</h3>
          {Object.entries(testResults).map(([collection, result]) => (
            <div key={collection} style={{ marginBottom: '10px' }}>
              <strong>{collection}:</strong> 
              {result.success ? (
                <span style={{ color: 'green' }}> Success ({result.count} documents)</span>
              ) : (
                <div>
                  <span style={{ color: 'red' }}> Failed - {result.error}</span>
                  <br />
                  <small>Code: {result.code}</small>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div style={{ marginTop: '20px' }}>
        <h3>Instructions:</h3>
        {user ? (
          <ol>
            <li>If any tests fail with permission errors, check Firebase security rules</li>
            <li>Make sure rules are deployed to Firebase Console</li>
            <li>Verify you're logged in as admin (knupadhyay784@gmail.com)</li>
          </ol>
        ) : (
          <ol>
            <li>You need to log in as admin (knupadhyay784@gmail.com) to access dashboard data</li>
            <li>Go to the login page and log in with admin credentials</li>
            <li>After logging in, refresh this page to test permissions again</li>
          </ol>
        )}
      </div>
    </div>
  );
}

export default FirebasePermissionsTest;
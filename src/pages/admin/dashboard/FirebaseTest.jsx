import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import Layout from '../../../components/layout/Layout';

function FirebaseTest() {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTests = async () => {
      const results = {};
      
      // Test products collection (should always work - public read)
      try {
        console.log('Testing products collection...');
        const productsSnapshot = await getDocs(collection(db, 'products'));
        results.products = { 
          success: true, 
          count: productsSnapshot.size,
          message: 'Public read access working'
        };
        console.log('Products test passed:', productsSnapshot.size);
      } catch (error) {
        console.error('Products test failed:', error);
        results.products = { 
          success: false, 
          error: error.message, 
          code: error.code,
          message: 'Public read access failed'
        };
      }
      
      // Test orders collection (requires auth)
      try {
        console.log('Testing orders collection...');
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        results.orders = { 
          success: true, 
          count: ordersSnapshot.size,
          message: 'Authenticated access working'
        };
        console.log('Orders test passed:', ordersSnapshot.size);
      } catch (error) {
        console.error('Orders test failed:', error);
        results.orders = { 
          success: false, 
          error: error.message, 
          code: error.code,
          message: 'Authenticated access failed'
        };
      }
      
      // Test user collection (requires auth)
      try {
        console.log('Testing user collection...');
        const userSnapshot = await getDocs(collection(db, 'users'));
        results.user = { 
          success: true, 
          count: userSnapshot.size,
          message: 'Authenticated access working'
        };
        console.log('User test passed:', userSnapshot.size);
      } catch (error) {
        console.error('User test failed:', error);
        results.user = { 
          success: false, 
          error: error.message, 
          code: error.code,
          message: 'Authenticated access failed'
        };
      }
      
      setTestResults(results);
      setLoading(false);
    };
    
    runTests();
  }, []);

  return (
    <Layout>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px', 
        margin: '20px',
        maxWidth: '800px',
        margin: '20px auto'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
          Firebase Connection Test
        </h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Testing Firebase connections...</p>
          </div>
        ) : (
          <div>
            <h3>Test Results:</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '15px' 
            }}>
              {Object.entries(testResults).map(([collection, result]) => (
                <div 
                  key={collection} 
                  style={{ 
                    padding: '15px', 
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    backgroundColor: result.success ? '#d4edda' : '#f8d7da'
                  }}
                >
                  <h4 style={{ 
                    margin: '0 0 10px 0', 
                    color: result.success ? '#155724' : '#721c24' 
                  }}>
                    {collection.charAt(0).toUpperCase() + collection.slice(1)} Collection
                  </h4>
                  {result.success ? (
                    <div>
                      <p style={{ margin: '5px 0', color: '#155724' }}>
                        <strong>Status:</strong> ✅ Access Granted
                      </p>
                      <p style={{ margin: '5px 0', color: '#155724' }}>
                        <strong>Documents:</strong> {result.count}
                      </p>
                      <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#155724' }}>
                        {result.message}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ margin: '5px 0', color: '#721c24' }}>
                        <strong>Status:</strong> ❌ Access Denied
                      </p>
                      <p style={{ margin: '5px 0', color: '#721c24' }}>
                        <strong>Error:</strong> {result.error}
                      </p>
                      <p style={{ margin: '5px 0', color: '#721c24' }}>
                        <strong>Code:</strong> {result.code}
                      </p>
                      <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#721c24' }}>
                        {result.message}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div style={{ 
              marginTop: '25px', 
              padding: '20px', 
              backgroundColor: '#e9ecef', 
              borderRadius: '4px'
            }}>
              <h3 style={{ marginTop: 0, color: '#333' }}>Troubleshooting Guide:</h3>
              
              <h4>If you're seeing permission errors:</h4>
              <ol style={{ paddingLeft: '20px' }}>
                <li><strong>Check Firebase Rules:</strong> Make sure security rules are deployed to Firebase Console</li>
                <li><strong>Verify Admin Status:</strong> Make sure you're logged in as an admin user</li>
                <li><strong>Clear Cache:</strong> Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)</li>
                <li><strong>Check Network:</strong> Ensure you have internet connectivity</li>
              </ol>
              
              <p style={{ marginBottom: '0', fontSize: '14px' }}>
                <strong>Need help?</strong> Check the Deploy Rules Instructions on the Dashboard page.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default FirebaseTest;
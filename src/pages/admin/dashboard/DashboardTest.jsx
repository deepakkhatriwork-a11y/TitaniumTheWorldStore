import React from 'react';
import Layout from '../../../components/layout/Layout';
import TestLogin from './TestLogin';
import FirebasePermissionsTest from './FirebasePermissionsTest';

function DashboardTest() {
  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1>Dashboard Testing Page</h1>
        <p>This page helps diagnose issues with the admin dashboard.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <TestLogin />
          <FirebasePermissionsTest />
        </div>
        
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
          <h3>Dashboard Issue Diagnosis</h3>
          <p>Based on the error messages you've seen:</p>
          <ul>
            <li><strong>"Missing or insufficient permissions"</strong> - Firebase security rules are not properly configured or deployed</li>
            <li><strong>"Current user: null"</strong> - No user is logged in, which is required for accessing orders and user data</li>
          </ul>
          
          <h4>Steps to Fix:</h4>
          <ol>
            <li><strong>Login as Admin</strong> - Use the login form above with admin credentials (knupadhyay784@gmail.com)</li>
            <li><strong>Deploy Firebase Rules</strong> - Make sure Firebase security rules are deployed to the Firebase Console</li>
            <li><strong>Test Permissions</strong> - Use the permissions test component to verify access to collections</li>
            <li><strong>Refresh Dashboard</strong> - After fixing the above issues, refresh the dashboard page</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}

export default DashboardTest;
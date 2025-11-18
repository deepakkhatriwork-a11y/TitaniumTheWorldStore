import React from 'react';
import Layout from '../components/layout/Layout';
import AdminLoginHelper from '../components/AdminLoginHelper';
import FirebaseRulesChecker from '../components/FirebaseRulesChecker';

function FirebaseDiagnostics() {
  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '10px' }}>
          Firebase Diagnostics & Fix Tools
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Tools to diagnose and fix Firebase permission issues
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '30px',
          marginBottom: '30px'
        }}>
          <AdminLoginHelper />
          <FirebaseRulesChecker />
        </div>
        
        <div style={{ 
          padding: '25px', 
          backgroundColor: '#d1ecf1', 
          borderRadius: '8px',
          border: '1px solid #bee5eb'
        }}>
          <h2 style={{ marginTop: 0, color: '#0c5460' }}>Firebase Permission Fix Guide</h2>
          
          <h3>Current Issue:</h3>
          <p style={{ color: '#0c5460' }}>
            You're seeing "Missing or insufficient permissions" errors because:
          </p>
          <ul style={{ color: '#0c5460', paddingLeft: '20px' }}>
            <li><strong>Current user is null</strong> - No user is logged in</li>
            <li><strong>Firebase security rules</strong> may not be deployed</li>
          </ul>
          
          <h3>Steps to Fix:</h3>
          <ol style={{ color: '#0c5460', paddingLeft: '20px' }}>
            <li><strong>Deploy Firebase Security Rules</strong> - Follow instructions in <code>DEPLOY_FIREBASE_RULES.md</code></li>
            <li><strong>Login as Admin</strong> - Use the login form above with admin credentials (knupadhyay784@gmail.com)</li>
            <li><strong>Test Access</strong> - The checker above will automatically test your access after login</li>
            <li><strong>Refresh Dashboard</strong> - Navigate to the admin dashboard to see real data</li>
          </ol>
          
          <h3>Security Rules Requirements:</h3>
          <p style={{ color: '#0c5460' }}>
            The deployed rules must allow:
          </p>
          <ul style={{ color: '#0c5460', paddingLeft: '20px' }}>
            <li><strong>Public read access</strong> to products collection</li>
            <li><strong>Authenticated access</strong> to orders and user collections</li>
            <li><strong>Admin access</strong> (knupadhyay784@gmail.com) to manage all data</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default FirebaseDiagnostics;
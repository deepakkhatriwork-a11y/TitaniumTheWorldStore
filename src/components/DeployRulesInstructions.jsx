import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DeployRulesInstructions() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const copyToClipboard = () => {
    const rulesText = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to products
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com');
    }
    
    // Allow authenticated users to create orders and read their own orders
    match /orders/{document} {
      allow read: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com' || request.auth.uid == resource.data.userid);
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com');
    }
    
    // Allow public read access to categories
    match /categories/{document} {
      allow read: if true;
      allow write: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com');
    }
    
    // Allow users to read and write their own user data
    match /user/{userId} {
      allow read: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com' || request.auth.uid == userId);
      allow write: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com');
    }
    
    // Allow admin to manage all user data
    match /users/{document} {
      allow read, write, delete: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com');
    }
  }
}`;
    
    navigator.clipboard.writeText(rulesText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px', 
      margin: '20px',
      maxWidth: '800px',
      margin: '20px auto'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
        Deploy Firebase Security Rules
      </h2>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#fff3cd', 
        borderRadius: '4px',
        border: '1px solid #ffeaa7',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginTop: 0, color: '#856404' }}>Important Notice:</h3>
        <p style={{ color: '#856404', marginBottom: '10px' }}>
          The Firebase security rules have been updated in your local file, but they need to be deployed to Firebase Console to take effect.
        </p>
        <p style={{ color: '#856404', marginBottom: '0' }}>
          Without deploying these rules, you'll continue to see "Missing or insufficient permissions" errors.
        </p>
      </div>
      
      <h3>Steps to Deploy Rules:</h3>
      <ol style={{ paddingLeft: '20px', marginBottom: '20px' }}>
        <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
        <li>Select your project: "titaniumtheworldstore-58259"</li>
        <li>In the left sidebar, click on "Firestore Database"</li>
        <li>Click on the "Rules" tab</li>
        <li>Delete the existing rules in the editor</li>
        <li>Copy the rules below and paste them in the editor</li>
        <li>Click the "Publish" button</li>
      </ol>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <h3 style={{ margin: 0 }}>Updated Firebase Rules:</h3>
          <button 
            onClick={copyToClipboard}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {copied ? 'Copied!' : 'Copy Rules'}
          </button>
        </div>
        <pre style={{ 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #ddd', 
          borderRadius: '4px', 
          padding: '15px', 
          overflowX: 'auto',
          fontSize: '12px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to products
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com');
    }
    
    // Allow authenticated users to create orders and read their own orders
    match /orders/{document} {
      allow read: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com' || request.auth.uid == resource.data.userid);
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com');
    }
    
    // Allow public read access to categories
    match /categories/{document} {
      allow read: if true;
      allow write: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com');
    }
    
    // Allow users to read and write their own user data
    match /user/{userId} {
      allow read: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com' || request.auth.uid == userId);
      allow write: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com');
    }
    
    // Allow admin to manage all user data
    match /users/{document} {
      allow read, write, delete: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.token.email == 'deepakkhatriwork@gmail.com');
    }
  }
}`}
        </pre>
      </div>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#d4edda', 
        borderRadius: '4px',
        border: '1px solid #c3e6cb'
      }}>
        <h3 style={{ marginTop: 0, color: '#155724' }}>After Deploying Rules:</h3>
        <ol style={{ paddingLeft: '20px', color: '#155724', marginBottom: '10px' }}>
          <li>Refresh this page</li>
          <li>The dashboard should now load real data instead of sample data</li>
          <li>If you still see permission errors, try logging out and logging back in</li>
        </ol>
        <p style={{ marginBottom: '0', color: '#155724' }}>
          <strong>Note:</strong> It may take a few minutes for the deployed rules to take effect.
        </p>
      </div>
    </div>
  );
}

export default DeployRulesInstructions;
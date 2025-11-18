# Firebase Security Rules Deployment Guide

## Overview
This guide will help you deploy the updated Firebase security rules that allow both `knupadhyay784@gmail.com` and `deepakkhatriwork@gmail.com` to access the admin features.

## Prerequisites
- You must be logged into the Firebase Console with an account that has permission to modify the project
- You should have the project "titaniumtheworldstore-58259" selected

## Deployment Steps

1. **Navigate to Firebase Console**
   - Go to https://console.firebase.google.com/
   - Sign in with your Google account
   - Select the project "titaniumtheworldstore-58259"

2. **Access Firestore Rules**
   - In the left sidebar, click on "Firestore Database"
   - Click on the "Rules" tab

3. **Replace Existing Rules**
   - Delete all existing content in the rules editor
   - Copy and paste the following rules:

```
rules_version = '2';
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
}
```

4. **Publish Rules**
   - Click the "Publish" button
   - Wait for the confirmation that the rules have been published successfully

## Verification
After deploying the rules:
1. Refresh your dashboard page
2. The "Missing or insufficient permissions" error should be resolved
3. You should see real data instead of sample data

## Troubleshooting
If you still see permission errors after deploying the rules:

1. **Wait a Few Minutes**
   - It may take a few minutes for the deployed rules to take effect

2. **Hard Refresh Your Browser**
   - Press Ctrl+F5 (Windows) or Cmd+Shift+R (Mac) to force a full page refresh

3. **Check Your Login Status**
   - Make sure you're logged in as either `knupadhyay784@gmail.com` or `deepakkhatriwork@gmail.com`

4. **Verify Rules Were Published**
   - Go back to the Firebase Console and check that the rules were saved correctly

## Need Help?
If you continue to experience issues:
1. Run the Firebase Connection Test from your dashboard
2. Check the browser console for detailed error messages
3. Contact support with the specific error messages you're seeing
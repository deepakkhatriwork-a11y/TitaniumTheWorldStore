# How to Fix Firebase Permissions Error

## Issue
The application is getting "Missing or insufficient permissions" error when trying to fetch data from Firestore collections. This is because the Firebase security rules have not been deployed to the Firebase Console.

## Solution

### Step 1: Deploy Firebase Security Rules

1. Go to the Firebase Console: https://console.firebase.google.com/
2. Select your project: titaniumtheworldstore-58259
3. In the left sidebar, click on "Firestore Database"
4. Click on the "Rules" tab
5. Replace the existing rules with the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to products
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'knupadhyay784@gmail.com';
    }
    
    // Allow authenticated users to create orders and read their own orders
    match /orders/{document} {
      allow read: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.uid == resource.data.userid);
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.token.email == 'knupadhyay784@gmail.com';
    }
    
    // Allow public read access to categories
    match /categories/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'knupadhyay784@gmail.com';
    }
    
    // Allow users to read and write their own user data
    match /user/{userId} {
      allow read: if request.auth != null && (request.auth.token.email == 'knupadhyay784@gmail.com' || request.auth.uid == userId);
      allow write: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.token.email == 'knupadhyay784@gmail.com';
    }
    
    // Allow admin to manage all user data
    match /users/{document} {
      allow read, write, delete: if request.auth != null && request.auth.token.email == 'knupadhyay784@gmail.com';
    }
  }
}
```

6. Click "Publish" to deploy the new rules

### Step 2: Verify Authentication

Make sure you're logged in as the admin user (knupadhyay784@gmail.com) when accessing the admin dashboard. The rules require authentication to read orders and user data.

### Step 3: Test the Fix

After deploying the rules:
1. Refresh the application
2. Check the browser console for any remaining errors
3. The "Missing or insufficient permissions" error should be resolved

## Additional Notes

- The rules allow public read access to products (for browsing)
- Only the admin user can write/update/delete products
- Authenticated users can create orders
- Users can read their own orders
- Only the admin can read all orders
- Users can read/write their own user data
- Only the admin can manage all user data

If you continue to see permission errors after deploying these rules, check:
1. That you're logged in as the correct admin user
2. That the rules were properly published
3. That there are no typos in the rules
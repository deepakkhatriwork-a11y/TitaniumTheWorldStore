# Firebase Security Rules Update Instructions

## Issue
The admin dashboard is showing sample/fake user data instead of real orders because of Firebase permissions issues. The current security rules don't allow the admin to read order data from the 'orders' collection.

## Solution
Update your Firebase Firestore security rules with the rules provided in the `firebase.rules` file in this project.

## How to Deploy New Rules

1. Go to the Firebase Console: https://console.firebase.google.com/
2. Select your project: titaniumtheworldstore-58259
3. In the left sidebar, click on "Firestore Database"
4. Click on the "Rules" tab
5. Replace the existing rules with the content from `firebase.rules` file:
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

## What These Rules Do

1. **Products Collection**: 
   - Public read access (so users can browse products)
   - Only admin (knupadhyay784@gmail.com) can write/update/delete products

2. **Orders Collection**:
   - Authenticated users can create orders
   - Admin can read all orders
   - Users can read their own orders
   - Only admin can update/delete orders

3. **Categories Collection**:
   - Public read access
   - Only admin can write/update/delete categories

4. **User Collection**:
   - Users can read their own data or admin can read all user data
   - Users can update their own data
   - Only admin can delete user data

5. **Users Collection**:
   - Only admin can read/write/delete all user data

## After Updating Rules

1. Refresh your admin dashboard
2. Click the "Try to Load Real Data" button if it's still showing sample data
3. Real orders should now appear in the dashboard

## Troubleshooting

If you still see sample data:
1. Check the browser console for any error messages
2. Make sure you're logged in as admin (knupadhyay784@gmail.com)
3. Try clicking the "Retry Connection" button
4. Clear your browser cache and refresh the page
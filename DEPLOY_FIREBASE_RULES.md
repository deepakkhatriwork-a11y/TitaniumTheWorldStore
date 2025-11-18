# How to Deploy Firebase Security Rules

## Step-by-Step Instructions

1. **Go to Firebase Console**:
   - Visit https://console.firebase.google.com/
   - Sign in with your Firebase account
   - Select your project: "titaniumtheworldstore-58259"

2. **Navigate to Firestore Rules**:
   - In the left sidebar, click on "Firestore Database"
   - Click on the "Rules" tab

3. **Replace Existing Rules**:
   - Delete the existing rules in the editor
   - Copy and paste the following rules:

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

4. **Publish the Rules**:
   - Click the "Publish" button
   - Wait for the confirmation that rules have been published

## After Deploying Rules

1. **Log in as Admin**:
   - Go to your app's login page
   - Log in with admin credentials: knupadhyay784@gmail.com

2. **Refresh the Dashboard**:
   - Navigate to the admin dashboard
   - The "Missing or insufficient permissions" error should be resolved

## Troubleshooting

If you still see permission errors after deploying these rules:

1. **Verify Rules Were Published**:
   - Double-check that you clicked "Publish" and received confirmation

2. **Check Admin Email**:
   - Make sure you're logging in with the exact email: knupadhyay784@gmail.com
   - The rules specifically check for this email address

3. **Clear Browser Cache**:
   - Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
   - Try in an incognito/private browsing window

4. **Check Firebase Project**:
   - Ensure you're working with the correct Firebase project
   - Project ID should be: titaniumtheworldstore-58259
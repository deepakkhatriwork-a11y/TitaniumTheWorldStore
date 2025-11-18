import { ref, set } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../firebase/firebaseConfig';

/**
 * Setup admin user in Firebase
 * This script creates an admin user and sets up the database structure
 */
export const setupAdminUser = async (email, password, name) => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('User created with UID:', user.uid);
    
    // Add user to admins node
    await set(ref(database, `admins/${user.uid}`), true);
    console.log('Admin role assigned');
    
    // Add user data to users node
    await set(ref(database, `users/${user.uid}`), {
      name: name,
      email: email,
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
    console.log('User data saved');
    
    return {
      success: true,
      uid: user.uid,
      message: 'Admin user created successfully!',
    };
  } catch (error) {
    console.error('Error setting up admin:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Example usage:
// setupAdminUser('admin@titanium.com', 'Admin@123', 'Admin User');

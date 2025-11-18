import { ref, set } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';

/**
 * Make an existing user an admin
 * Use this in browser console or call from a component
 */
export const makeUserAdmin = async (userId) => {
  try {
    // Add user to admins node
    await set(ref(database, `admins/${userId}`), true);
    console.log('✅ User is now an admin! Please refresh the page.');
    return { success: true, message: 'User is now an admin!' };
  } catch (error) {
    console.error('Error making user admin:', error);
    return { success: false, error: error.message };
  }
};

// To use: Call makeUserAdmin('user-uid-here') with the user's Firebase UID

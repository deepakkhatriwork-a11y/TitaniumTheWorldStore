// Firebase Connection Test Utility
import { fireDB } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test products collection
    const productsSnapshot = await getDocs(collection(fireDB, 'products'));
    console.log(`Products collection has ${productsSnapshot.size} documents`);
    
    // Test orders collection
    const ordersSnapshot = await getDocs(collection(fireDB, 'orders'));
    console.log(`Orders collection has ${ordersSnapshot.size} documents`);
    
    // Test user collection
    const userSnapshot = await getDocs(collection(fireDB, 'users'));
    console.log(`User collection has ${userSnapshot.size} documents`);
    
    console.log('Firebase connection test completed successfully!');
    return { success: true, collections: {
      products: productsSnapshot.size,
      orders: ordersSnapshot.size,
      user: userSnapshot.size
    }};
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
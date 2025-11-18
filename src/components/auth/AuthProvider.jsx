import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../../firebase/firebaseConfig';
import { ref, get } from 'firebase/database';
import { loginSuccess, logout } from '../../redux/slices/authSlice';
import { Spinner } from '../ui/Spinner';

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Check if user is admin
          const adminRef = ref(database, `admins/${firebaseUser.uid}`);
          const adminSnapshot = await get(adminRef);
          const isAdmin = adminSnapshot.exists();
          
          // Get user data from database
          const userRef = ref(database, `users/${firebaseUser.uid}`);
          const userSnapshot = await get(userRef);
          const userData = userSnapshot.exists() ? userSnapshot.val() : {};
          
          const user = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: userData.name || firebaseUser.displayName || 'User',
            role: isAdmin ? 'admin' : 'user',
            photoURL: firebaseUser.photoURL,
          };
          
          dispatch(loginSuccess(user));
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;

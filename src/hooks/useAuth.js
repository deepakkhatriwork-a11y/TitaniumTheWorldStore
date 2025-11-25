import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout as logoutAction,
  setLoading
} from '../redux/slices/authSlice';
import { auth, database } from '../firebase/firebaseConfig';

export const useAuth = () => {
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const checkAuth = () => {
    // This is handled by the AuthProvider component
    return { isAuthenticated, user };
  };

  const register = async (userData) => {
    try {
      dispatch(loginStart());
      
      // Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      
      const firebaseUser = userCredential.user;
      
      try {
        // Save user data to Firebase Realtime Database
        const db = database;
        await set(ref(db, `users/${firebaseUser.uid}`), {
          name: userData.name,
          email: userData.email,
          role: 'user',
          createdAt: new Date().toISOString(),
        });
      } catch (dbError) {
        console.error('Failed to save user data to database:', dbError);
        // Continue with registration even if database save fails
      }
      
      const user = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: userData.name,
        role: 'user',
      };
      
      dispatch(loginSuccess(user));
      return { success: true, user };
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Use at least 6 characters.';
      }
      
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  const login = async (credentials) => {
    try {
      dispatch(loginStart());
      
      console.log('Attempting login with:', credentials.email);
      
      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      
      const firebaseUser = userCredential.user;
      console.log('Firebase user authenticated:', firebaseUser.uid);
      
      try {
        const db = database;
        // Check if user is admin by checking Firebase Realtime Database
        const adminRef = ref(db, `admins/${firebaseUser.uid}`);
        const adminSnapshot = await get(adminRef);
        
        const isAdmin = adminSnapshot.exists();
        console.log('Is admin:', isAdmin);
        
        // Get user data from Firebase Realtime Database
        const userRef = ref(db, `users/${firebaseUser.uid}`);
        const userSnapshot = await get(userRef);
        
        const userData = userSnapshot.exists() ? userSnapshot.val() : {};
        console.log('User data from database:', userData);
        
        const user = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: userData.name || firebaseUser.displayName || 'User',
          role: isAdmin ? 'admin' : 'user',
          photoURL: firebaseUser.photoURL,
        };
        
        dispatch(loginSuccess(user));
        console.log('Login successful:', user);
        return { success: true, user };
      } catch (dbError) {
        console.error('Database access error:', dbError);
        // Fallback: create minimal user object if database access fails
        const user = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'User',
          role: 'user', // Default to user role if can't access database
          photoURL: firebaseUser.photoURL,
        };
        
        dispatch(loginSuccess(user));
        console.log('Login successful with fallback:', user);
        return { success: true, user };
      }
    } catch (error) {
      console.error('Login error details:', error);
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'PERMISSION_DENIED') {
        errorMessage = 'Access denied. Please contact administrator.';
      }
      
      console.error('Error code:', error.code, 'Message:', errorMessage);
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(logoutAction());
    } catch (error) {
      console.error('Logout error:', error);
      dispatch(logoutAction());
    }
  };

  const setLoadingState = (isLoading) => {
    dispatch(setLoading(isLoading));
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    setLoading: setLoadingState,
    checkAuth,
  };
};
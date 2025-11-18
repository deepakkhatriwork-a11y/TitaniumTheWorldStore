import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../../firebase/firebaseConfig';
import { ref, get } from 'firebase/database';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for checking authentication with Firebase
const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      // Return a promise that resolves with the current auth state
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          unsubscribe(); // Unsubscribe after first check
          
          if (firebaseUser) {
            // User is signed in
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
              
              resolve(user);
            } catch (error) {
              console.error('Error fetching user data:', error);
              resolve(null);
            }
          } else {
            // No user is signed in
            resolve(null);
          }
        });
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setLoading,
} = authSlice.actions;

export { checkAuth };
export default authSlice.reducer;

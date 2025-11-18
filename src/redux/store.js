// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';
import sessionStorage from 'redux-persist/es/storage/session'; // ES module import
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import wishlistReducer from './slices/wishlistSlice';

// Custom storage implementation
const createNoopStorage = () => ({
  getItem(_key) {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem(_key) {
    return Promise.resolve();
  },
});

// Use sessionStorage in browser, noop in SSR
const storage = typeof window !== 'undefined' ? sessionStorage : createNoopStorage();

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart', 'auth', 'wishlist'],
  timeout: 2000, // 2 seconds timeout
  debug: process.env.NODE_ENV === 'development',
  stateReconciler: (inboundState, originalState) => {
    return { 
      ...originalState, 
      ...inboundState,
      // Ensure cart has required structure
      cart: {
        items: inboundState?.cart?.items || [],
        totalQuantity: inboundState?.cart?.totalQuantity || 0,
        totalAmount: inboundState?.cart?.totalAmount || 0,
        isCartOpen: inboundState?.cart?.isCartOpen || false,
      }
    };
  }
};

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store, null, () => {
  console.log('Rehydration complete');
});
import { createSlice } from '@reduxjs/toolkit';

// Helper function to calculate total amount
const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

// Helper function to remove non-serializable properties
const sanitizeProduct = (product) => {
  const sanitized = { ...product };
  
  // Remove Firestore Timestamp and other non-serializable properties
  delete sanitized.time;
  delete sanitized.date;
  
  // Remove any other non-serializable properties
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      if (sanitized[key].constructor && sanitized[key].constructor.name === 'Timestamp') {
        delete sanitized[key];
      }
    }
  });
  
  return sanitized;
};

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isCartOpen: false,
  lastUpdated: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: {
      reducer(state, action) {
        const { id } = action.payload;
        const existingItem = state.items.find(item => item.id === id);
        const quantity = action.payload.quantity || 1;
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({
            ...action.payload,
            quantity: quantity,
          });
        }
        
        // Recalculate totals
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = calculateTotal(state.items);
        state.lastUpdated = new Date().toISOString();
      },
      prepare(payload) {
        // Sanitize the payload to remove non-serializable properties
        const sanitizedPayload = sanitizeProduct(payload);
        
        return {
          payload: {
            ...sanitizedPayload,
            addedAt: new Date().toISOString()
          }
        };
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (!existingItem) return;
      
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        state.items = state.items.filter(item => item.id !== id);
      }
      
      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = calculateTotal(state.items);
      state.lastUpdated = new Date().toISOString();
    },
    deleteItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (!existingItem) return;
      
      state.items = state.items.filter(item => item.id !== id);
      
      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = calculateTotal(state.items);
      state.lastUpdated = new Date().toISOString();
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.lastUpdated = new Date().toISOString();
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
  clearCart,
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
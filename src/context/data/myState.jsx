import React, { useState, useEffect, useMemo } from 'react';
import myContext from './myContext';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

function MyState({ children }) {
  const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  const [searchkey, setSearchkey] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  const defaultState = {
    name: '',
    class: ''
  };

  const myColor = 'red';

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };

  // Add Product Function
  const addProduct = async (product) => {
    setLoading(true);
    try {
      await addDoc(collection(fireDB, 'products'), product);
      toast.success('Product added successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      getProduct(); // Refresh products list
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setLoading(false);
      return { success: false, error };
    }
  };

  // Get Product Function
  const getProduct = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(fireDB, 'products'));
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsArray);
      setLoading(false);
      // Log for debugging
      console.log('Fetched products:', productsArray);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  // Get Orders Function
  const getOrderData = async () => {
    setLoading(true);
    try {
      console.log('Fetching orders from Firestore...');
      const querySnapshot = await getDocs(collection(fireDB, 'orders'));
      const ordersArray = [];
      querySnapshot.forEach((doc) => {
        ordersArray.push({ id: doc.id, ...doc.data() });
      });
      setOrder(ordersArray);
      setLoading(false);
      console.log('Fetched orders successfully:', ordersArray);
      return { success: true, data: ordersArray };
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
      // Handle specific error types
      if (error.code === 'permission-denied') {
        console.error('Permission denied when fetching orders. Check Firebase security rules.');
        console.error('Current user:', localStorage.getItem('user')); // Log current user for debugging
      } else if (error.code === 'unavailable') {
        console.error('Firebase unavailable when fetching orders.');
        toast.error('Unable to connect to database. Please try again later.');
      } else {
        console.error('Unknown error when fetching orders:', error);
        toast.error('Failed to load orders. Please try again.');
      }
      return { success: false, error };
    }
  };

  // Get Orders for Current User Function
  const getUserOrders = async (userId = null) => {
    setLoading(true);
    try {
      console.log('Fetching user orders from Firestore...');
      
      // userId must be provided, don't try to get it from localStorage
      if (!userId) {
        console.log('No user ID provided, cannot fetch orders');
        setLoading(false);
        return { success: false, error: 'No user ID provided' };
      }
      
      console.log('Current user ID for order filtering:', userId);
      
      // Query orders where userid matches the current user's ID
      const q = query(collection(fireDB, 'orders'), where('userid', '==', userId));
      const querySnapshot = await getDocs(q);
      const ordersArray = [];
      querySnapshot.forEach((doc) => {
        const orderData = { id: doc.id, ...doc.data() };
        console.log('Found order for user:', orderData.id, 'User ID:', orderData.userid);
        ordersArray.push(orderData);
      });
      
      console.log('User orders:', ordersArray);
      setOrder(ordersArray);
      setLoading(false);
      console.log('Fetched user orders successfully:', ordersArray);
      return { success: true, data: ordersArray };
    } catch (error) {
      console.error('Error fetching user orders:', error);
      setLoading(false);
      // Handle specific error types
      if (error.code === 'permission-denied') {
        console.error('Permission denied when fetching user orders. Check Firebase security rules.');
        console.error('Current user:', localStorage.getItem('user')); // Log current user for debugging
        // Removed toast error message as requested
      } else if (error.code === 'unavailable') {
        console.error('Firebase unavailable when fetching user orders.');
        toast.error('Unable to connect to database. Please try again later.');
      } else {
        console.error('Unknown error when fetching user orders:', error);
        toast.error('Failed to load your orders. Please try again.');
      }
      return { success: false, error };
    }
  };

  // Get Users Function
  const getUserData = async () => {
    setLoading(true);
    try {
      console.log('Fetching users from Firestore...');
      const querySnapshot = await getDocs(collection(fireDB, 'users'));
      const usersArray = [];
      querySnapshot.forEach((doc) => {
        usersArray.push({ id: doc.id, ...doc.data() });
      });
      setUser(usersArray);
      setLoading(false);
      console.log('Fetched users successfully:', usersArray);
      return { success: true, data: usersArray };
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
      // Handle specific error types
      if (error.code === 'permission-denied') {
        console.error('Permission denied when fetching users. Check Firebase security rules.');
        console.error('Current user:', localStorage.getItem('user')); // Log current user for debugging
      } else if (error.code === 'unavailable') {
        console.error('Firebase unavailable when fetching users.');
        toast.error('Unable to connect to database. Please try again later.');
      } else {
        console.error('Unknown error when fetching users:', error);
        toast.error('Failed to load users. Please try again.');
      }
      return { success: false, error };
    }
  };

  // Update Order Function
  const updateOrder = async (id, updatedData) => {
    setLoading(true);
    try {
      const orderRef = doc(fireDB, 'orders', id);
      await updateDoc(orderRef, updatedData);
      toast.success('Order updated successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      getOrderData(); // Refresh orders list
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setLoading(false);
      return { success: false, error };
    }
  };

  // Update Product Function
  const updateProduct = async (id, updatedData) => {
    setLoading(true);
    try {
      const productRef = doc(fireDB, 'products', id);
      await updateDoc(productRef, updatedData);
      toast.success('Product updated successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      getProduct(); // Refresh products list
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setLoading(false);
      return { success: false, error };
    }
  };

  // Delete Product Function
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, 'products', id));
      toast.success('Product deleted successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      getProduct(); // Refresh products list
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setLoading(false);
      return { success: false, error };
    }
  };

  // Fetch products when the context is initialized
  useEffect(() => {
    getProduct();
  }, []);

  // Filter products based on search, category, and price
  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchkey) {
      filtered = filtered.filter(product => 
        product.title?.toLowerCase().includes(searchkey.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchkey.toLowerCase())
      );
    }

    // Apply category filter
    if (filterType && filterType !== 'all') {
      filtered = filtered.filter(product => product.category === filterType);
    }

    // Apply price filter
    if (filterPrice) {
      switch (filterPrice) {
        case '0-1000':
          filtered = filtered.filter(product => product.price <= 1000);
          break;
        case '1001-5000':
          filtered = filtered.filter(product => product.price > 1000 && product.price <= 5000);
          break;
        case '5001-10000':
          filtered = filtered.filter(product => product.price > 5000);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [products, searchkey, filterType, filterPrice]);

  const contextValue = useMemo(() => ({
    state: defaultState,
    myColor,
    mode,
    toggleMode,
    loading,
    setLoading,
    products: filteredProducts,
    originalProducts: products,
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    searchkey, 
    setSearchkey,
    filterType, 
    setFilterType,
    filterPrice, 
    setFilterPrice,
    order,
    getOrderData,
    getUserOrders,
    updateOrder,
    user,
    getUserData
  }), [mode, loading, products, filteredProducts, searchkey, filterType, filterPrice, order, user]);
  
  return (
    <myContext.Provider value={contextValue}>
      {children}
    </myContext.Provider>
  );
}

export default MyState;
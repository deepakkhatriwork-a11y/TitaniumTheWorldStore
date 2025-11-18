import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
  clearCart,
  toggleCart,
} from '../redux/slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount, isCartOpen } = useSelector(
    (state) => state.cart
  );

  const addToCart = (product, quantity = 1) => {
    dispatch(addItemToCart({ ...product, quantity }));
  };

  const removeFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  const deleteFromCart = (productId) => {
    dispatch(deleteItemFromCart(productId));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  const toggleCartVisibility = () => {
    dispatch(toggleCart());
  };

  return {
    items,
    totalQuantity,
    totalAmount,
    isCartOpen,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart: clearCartItems,
    toggleCart: toggleCartVisibility,
  };
};

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiX, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { removeFromWishlist, clearWishlist } from '../../redux/slices/wishlistSlice';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import Layout from '../../components/layout/Layout';

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist?.items || []);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    toast.info('Removed from wishlist');
  };

  const handleAddToCart = (item) => {
    dispatch(addItemToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    }));
    toast.success('Added to cart');
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      dispatch(clearWishlist());
      toast.info('Wishlist cleared');
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <FiHeart className="mx-auto h-24 w-24 text-gray-400" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">Your Wishlist is Empty</h2>
              <p className="mt-2 text-gray-600">Add items you love to your wishlist!</p>
              <div className="mt-8">
                <Link
                  to="/products"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              My Wishlist ({wishlistItems.length})
            </h1>
            {wishlistItems.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-contain p-4"
                    />
                  </Link>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <FiX className="w-4 h-4 text-red-600" />
                  </button>
                </div>

                <div className="p-4">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-gray-900 font-medium text-sm mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${item.price}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                      title="Add to Cart"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Wishlist;

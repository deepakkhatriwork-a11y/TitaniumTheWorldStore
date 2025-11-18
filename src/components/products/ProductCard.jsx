import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice';
import myContext from '../../context/data/myContext';

const ProductCard = ({ product }) => {
  const context = useContext(myContext);
  const { mode } = context;
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItemToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to="/products" className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover object-center group-hover:opacity-90 transition-opacity"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-12">
            {product.title}
          </h3>
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <FaStar
                  key={rating}
                  className={`h-4 w-4 ${rating < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-500">{product.reviewCount} reviews</p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-base font-medium text-gray-900">
              ₹{product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <FaShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

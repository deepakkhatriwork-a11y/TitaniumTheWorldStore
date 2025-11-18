import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiStar, FiPlus } from 'react-icons/fi';
import Layout from '../../components/layout/Layout';
import { addItemToCart } from '../../redux/slices/cartSlice';
import myContext from '../../context/data/myContext';

function AllProducts() {
    const context = useContext(myContext);
    const { mode, products } = context;
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addItemToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        }));
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
                    <p className="text-gray-600">Browse our complete product catalog.</p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No products available</h3>
                        <p className="mt-2 text-gray-600 mb-6">
                            There are currently no products in the store.
                        </p>
                        <div className="mt-6">
                            <Link 
                                to="/dashboard" 
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Add Products
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                <Link to={`/product/${product.id}`} className="block">
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
                                                    <FiStar
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
                                                {product.originalPrice && (
                                                    <span className="ml-2 text-sm text-gray-500 line-through">
                                                        ₹{product.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="px-4 pb-4">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddToCart(product);
                                        }}
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <FiShoppingBag className="mr-2 h-4 w-4" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default AllProducts;
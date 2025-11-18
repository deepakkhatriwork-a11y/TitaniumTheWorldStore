import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';
import myContext from '../../../context/data/myContext';
import { toast } from 'react-toastify';

function AddSampleProducts() {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { addProduct, loading } = context;
    
    const [isAdding, setIsAdding] = useState(false);
    const [addedCount, setAddedCount] = useState(0);

    // Sample products data
    const sampleProducts = [
        {
            title: "Wireless Bluetooth Earbuds",
            price: 1299,
            imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
            category: "Electronics",
            description: "High-quality wireless earbuds with noise cancellation and 24-hour battery life. Perfect for music lovers and professionals.",
            stock: 50,
            reserved: 5
        },
        {
            title: "Smart Fitness Watch",
            price: 2499,
            imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80",
            category: "Electronics",
            description: "Track your fitness goals with this advanced smartwatch. Monitor heart rate, sleep patterns, and receive notifications.",
            stock: 30,
            reserved: 3
        },
        {
            title: "Designer Cotton T-Shirt",
            price: 599,
            imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
            category: "Fashion",
            description: "Comfortable and stylish cotton t-shirt for everyday wear. Available in multiple colors and sizes.",
            stock: 100,
            reserved: 12
        },
        {
            title: "Stainless Steel Water Bottle",
            price: 799,
            imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1067&q=80",
            category: "Home & Living",
            description: "Keep your drinks hot or cold for hours with this premium stainless steel water bottle. Leak-proof and eco-friendly.",
            stock: 75,
            reserved: 8
        },
        {
            title: "Bestselling Novel",
            price: 399,
            imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            category: "Books",
            description: "A captivating novel that has topped bestseller lists worldwide. A must-read for fiction lovers.",
            stock: 150,
            reserved: 20
        },
        {
            title: "Yoga Mat with Carry Strap",
            price: 899,
            imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "Sports",
            description: "Non-slip yoga mat with carrying strap for your fitness routine. Extra thick for maximum comfort.",
            stock: 40,
            reserved: 4
        }
    ];

    const addAllProducts = async () => {
        setIsAdding(true);
        setAddedCount(0);
        
        try {
            for (let i = 0; i < sampleProducts.length; i++) {
                const product = sampleProducts[i];
                const result = await addProduct(product);
                
                if (result.success) {
                    setAddedCount(prev => prev + 1);
                    toast.success(`Added ${product.title}`, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                    });
                } else {
                    toast.error(`Failed to add ${product.title}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                    });
                }
                
                // Add a small delay to show progress
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            toast.success(`Successfully added ${addedCount} products!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            
            // Navigate back to dashboard after a delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        } catch (error) {
            console.error('Error adding products:', error);
            toast.error('Failed to add products', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center py-10">
                <div className="bg-white/80 backdrop-blur-sm border border-blue-100 px-10 py-10 rounded-2xl shadow-xl w-full max-w-2xl">
                    <div className="mb-6">
                        <h1 className="text-center text-gray-900 text-2xl font-bold">Add Sample Products</h1>
                        <p className="text-center text-gray-600 text-sm mt-2">Add 6 sample products to your store</p>
                    </div>
                    
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h2 className="text-lg font-semibold text-blue-800 mb-2">Product Details</h2>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            <li>6 diverse products across different categories</li>
                            <li>Realistic pricing and descriptions</li>
                            <li>High-quality product images</li>
                            <li>Stock quantities for inventory management</li>
                        </ul>
                    </div>
                    
                    {isAdding ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                            <p className="text-gray-700">Adding products... ({addedCount}/{sampleProducts.length})</p>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={addAllProducts}
                                disabled={loading || isAdding}
                                className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold px-4 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add All Sample Products
                            </button>
                            <button
                                onClick={() => navigate('/dashboard')}
                                disabled={loading || isAdding}
                                className="flex-1 bg-gray-200 text-gray-700 font-bold px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default AddSampleProducts;
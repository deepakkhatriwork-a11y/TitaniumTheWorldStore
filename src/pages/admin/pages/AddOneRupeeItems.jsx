import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';
import myContext from '../../../context/data/myContext';
import { toast } from 'react-toastify';

function AddOneRupeeItems() {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { addProduct, loading } = context;
    
    const [isAdding, setIsAdding] = useState(false);
    const [addedCount, setAddedCount] = useState(0);

    // Product data for ₹1 items
    const oneRupeeProducts = [
        {
            title: "Special Offer: ₹1 Notebook",
            price: 1,
            imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "Special Offers",
            description: "Limited time offer! Get this quality notebook for just ₹1. Perfect for notes, sketches, or daily journaling.",
            stock: 50,
            reserved: 0
        },
        {
            title: "Special Offer: ₹1 Pen Set",
            price: 1,
            imageUrl: "https://images.unsplash.com/photo-1591277295340-9bc5c88c6b58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "Special Offers",
            description: "Premium pen set at an unbelievable price of ₹1. Smooth writing experience with long-lasting ink.",
            stock: 50,
            reserved: 0
        },
        {
            title: "Special Offer: ₹1 Keychain",
            price: 1,
            imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            category: "Special Offers",
            description: "Stylish keychain for just ₹1. Keep your keys organized in style.",
            stock: 50,
            reserved: 0
        },
        {
            title: "Special Offer: ₹1 Sticker Pack",
            price: 1,
            imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            category: "Special Offers",
            description: "Fun sticker pack at just ₹1. Decorate your belongings with these colorful stickers.",
            stock: 50,
            reserved: 0
        },
        {
            title: "Special Offer: ₹1 Bookmark",
            price: 1,
            imageUrl: "https://images.unsplash.com/photo-1591106039492-6d76f0a0c67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "Special Offers",
            description: "Elegant bookmark for just ₹1. Keep your place in your favorite books.",
            stock: 50,
            reserved: 0
        },
        {
            title: "Special Offer: ₹1 Phone Stand",
            price: 1,
            imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1067&q=80",
            category: "Special Offers",
            description: "Adjustable phone stand for just ₹1. Perfect for hands-free viewing.",
            stock: 50,
            reserved: 0
        },
        {
            title: "Special Offer: ₹1 Cable Organizer",
            price: 1,
            imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "Special Offers",
            description: "Keep your cables organized for just ₹1. Reduce clutter with this simple solution.",
            stock: 50,
            reserved: 0
        },
        {
            title: "Special Offer: ₹1 Magnet Set",
            price: 1,
            imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
            category: "Special Offers",
            description: "Colorful magnet set for just ₹1. Perfect for your refrigerator or magnetic board.",
            stock: 50,
            reserved: 0
        },
        {
            title: "Special Offer: ₹1 Eraser Pack",
            price: 1,
            imageUrl: "https://images.unsplash.com/photo-1591277295340-9bc5c88c6b58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "Special Offers",
            description: "High-quality eraser pack for just ₹1. Perfect for school or office use.",
            stock: 50,
            reserved: 0
        },
        {
            title: "Special Offer: ₹1 Paper Clip Set",
            price: 1,
            imageUrl: "https://images.unsplash.com/photo-1591106039492-6d76f0a0c67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "Special Offers",
            description: "Durable paper clip set for just ₹1. Keep your documents organized.",
            stock: 50,
            reserved: 0
        }
    ];

    const addAllProducts = async () => {
        setIsAdding(true);
        setAddedCount(0);
        
        try {
            for (let i = 0; i < oneRupeeProducts.length; i++) {
                const product = oneRupeeProducts[i];
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
                        <h1 className="text-center text-gray-900 text-2xl font-bold">Add ₹1 Special Offer Items</h1>
                        <p className="text-center text-gray-600 text-sm mt-2">Add 10 special offer items priced at just ₹1 each</p>
                    </div>
                    
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h2 className="text-lg font-semibold text-blue-800 mb-2">Product Details</h2>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            <li>10 unique products</li>
                            <li>All priced at ₹1</li>
                            <li>Special "Offers" category</li>
                            <li>50 units stock for each item</li>
                        </ul>
                    </div>
                    
                    {isAdding ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                            <p className="text-gray-700">Adding products... ({addedCount}/{oneRupeeProducts.length})</p>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={addAllProducts}
                                disabled={loading || isAdding}
                                className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold px-4 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add All 10 ₹1 Items
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

export default AddOneRupeeItems;
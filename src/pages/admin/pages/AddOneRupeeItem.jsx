import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';
import myContext from '../../../context/data/myContext';
import { toast } from 'react-toastify';

function AddOneRupeeItem() {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { addProduct, products, getProduct } = context;

    useEffect(() => {
        const addOneRupeeProduct = async () => {
            // First, refresh the products list
            await getProduct();
            
            // Check if the ₹1 item already exists
            const oneRupeeItemExists = products.some(product => 
                product.title === 'Special Offer: ₹1 Item for India' && 
                product.price === 1
            );
            
            if (oneRupeeItemExists) {
                toast.info('₹1 item already exists in the store!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
                return;
            }
            
            try {
                const result = await addProduct({
                    title: 'Special Offer: ₹1 Item for India',
                    price: 1,
                    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                    category: 'Special Offers',
                    description: 'Limited time offer! Special ₹1 item exclusively for customers in India. This is a great opportunity to try our products at an amazing price.',
                    stock: 100,
                    reserved: 0
                });

                if (result.success) {
                    toast.success('₹1 item added successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                    });
                    // Redirect to dashboard after a short delay
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2000);
                }
            } catch (error) {
                console.error('Error adding ₹1 item:', error);
                toast.error('Failed to add ₹1 item', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            }
        };

        // Only add the item if it doesn't already exist
        addOneRupeeProduct();
    }, [addProduct, products, getProduct, navigate]);

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center py-10">
                <div className="bg-white/80 backdrop-blur-sm border border-blue-100 px-10 py-10 rounded-2xl shadow-xl w-full max-w-2xl text-center">
                    <div className="mb-6">
                        <h1 className="text-center text-gray-900 text-2xl font-bold">Adding ₹1 Item for India</h1>
                        <p className="text-center text-gray-600 text-sm mt-2">Please wait while we add the special ₹1 item to your store...</p>
                    </div>
                    
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                    
                    <p className="mt-4 text-gray-700">
                        Adding special ₹1 item for customers in India...
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default AddOneRupeeItem;
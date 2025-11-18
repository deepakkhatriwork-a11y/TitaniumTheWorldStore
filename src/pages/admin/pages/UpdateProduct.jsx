import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';
import { toast } from 'react-toastify';

function UpdateProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        title: '',
        price: '',
        imageUrl: '',
        category: '',
        description: ''
    });

    useEffect(() => {
        // Fetch product data by ID
        // Replace with your Firebase/API logic
        const fetchProduct = async () => {
            try {
                // Mock data - replace with actual API call
                const mockProduct = {
                    title: 'Sample Product',
                    price: '999',
                    imageUrl: 'https://via.placeholder.com/400',
                    category: 'Electronics',
                    description: 'This is a sample product description'
                };
                setProduct(mockProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Failed to load product');
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!product.title || !product.price || !product.imageUrl || !product.category || !product.description) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            // Add your Firebase/API logic here
            console.log('Updating product:', product);
            toast.success('Product updated successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Failed to update product');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                // Add your Firebase/API delete logic here
                console.log('Deleting product:', id);
                toast.success('Product deleted successfully');
                navigate('/dashboard');
            } catch (error) {
                console.error('Error deleting product:', error);
                toast.error('Failed to delete product');
            }
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center py-10">
                <div className="bg-white/80 backdrop-blur-sm border border-blue-100 px-10 py-10 rounded-2xl shadow-xl w-full max-w-2xl">
                    <div className="mb-6">
                        <h1 className="text-center text-gray-900 text-2xl font-bold">Update Product</h1>
                        <p className="text-center text-gray-600 text-sm mt-2">Modify product details below</p>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Product Title</label>
                            <input
                                type="text"
                                name="title"
                                value={product.title}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter product title"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Product Price</label>
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter product price"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Product Image URL</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={product.imageUrl}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter image URL"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Product Category</label>
                            <input
                                type="text"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter product category"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Product Description</label>
                            <textarea
                                cols="30"
                                rows="6"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="Enter product description"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30"
                            >
                                Update Product
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 text-white font-bold px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="flex-1 bg-gray-200 text-gray-700 font-bold px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default UpdateProduct;

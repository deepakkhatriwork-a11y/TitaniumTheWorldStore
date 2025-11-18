import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

function SampleProducts() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Sample products data
    const sampleProducts = [
        {
            id: 1,
            title: "Wireless Bluetooth Earbuds",
            price: 1299,
            imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
            category: "Electronics",
            description: "High-quality wireless earbuds with noise cancellation and 24-hour battery life. Perfect for music lovers and professionals."
        },
        {
            id: 2,
            title: "Smart Fitness Watch",
            price: 2499,
            imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80",
            category: "Electronics",
            description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and smartphone integration."
        },
        {
            id: 3,
            title: "Cotton T-Shirt",
            price: 399,
            imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
            category: "Fashion",
            description: "Comfortable and stylish cotton t-shirt for everyday wear. Available in multiple colors and sizes."
        },
        {
            id: 4,
            title: "Stainless Steel Water Bottle",
            price: 599,
            imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
            category: "Home & Living",
            description: "Keep your drinks hot or cold for hours with this premium stainless steel water bottle. Leak-proof design."
        },
        {
            id: 5,
            title: "Bestseller Novel",
            price: 299,
            imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            category: "Books",
            description: "Award-winning bestselling novel that has captivated readers worldwide. A must-read for book lovers."
        },
        {
            id: 6,
            title: "Yoga Mat",
            price: 899,
            imageUrl: "https://images.unsplash.com/photo-1593016097778-a97043f08217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "Sports",
            description: "Non-slip yoga mat with extra cushioning for comfort during your yoga practice. Eco-friendly material."
        },
        {
            id: 7,
            title: "Wireless Charging Pad",
            price: 1499,
            imageUrl: "https://images.unsplash.com/photo-1606220588911-4a89c50c7a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "Electronics",
            description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design that complements any desk."
        },
        {
            id: 8,
            title: "Designer Sunglasses",
            price: 1999,
            imageUrl: "https://images.unsplash.com/photo-1577803645773-f9647e8900d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
            category: "Fashion",
            description: "Stylish sunglasses with UV protection and polarized lenses. Perfect for both fashion and function."
        },
        {
            id: 9,
            title: "Coffee Maker",
            price: 3499,
            imageUrl: "https://images.unsplash.com/photo-1587049332982-fbf47e8900d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "Home & Living",
            description: "Brew the perfect cup of coffee every morning with this programmable coffee maker. Easy to use and clean."
        },
        {
            id: 10,
            title: "Running Shoes",
            price: 2799,
            imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "Sports",
            description: "Lightweight running shoes with extra cushioning and breathability. Designed for comfort during long runs."
        }
    ];

    // Add to cart function
    const handleAddToCart = (product) => {
        dispatch(addItemToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            quantity: 1
        }));
        toast.success(`${product.title} added to cart!`);
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Our Latest Collection</h1>
                    <div className="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {sampleProducts.map((item) => {
                        const { id, title, price, imageUrl } = item;
                        return (
                            <div 
                                key={id} 
                                onClick={() => navigate(`/product/${id}`)}  
                                className="p-4 md:w-1/4 drop-shadow-lg cursor-pointer"
                            >
                                <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden bg-white">
                                    <div className="flex justify-center cursor-pointer">
                                        <img 
                                            className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-transform duration-300 ease-in-out" 
                                            src={imageUrl} 
                                            alt={title} 
                                        />
                                    </div>
                                    <div className="p-5 border-t-2">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                            TitaniumStore
                                        </h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3 line-clamp-2">
                                            {title}
                                        </h1>
                                        <p className="leading-relaxed mb-3">
                                            ₹ {price}
                                        </p>
                                        <div className="flex justify-center">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart(item);
                                                }} 
                                                type="button" 
                                                className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default SampleProducts;
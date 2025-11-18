import React from 'react';
import { Link } from 'react-router-dom';

function HomeProducts() {
  // Sample products data
  const sampleProducts = [
    {
      id: 1,
      title: "Wireless Bluetooth Earbuds",
      price: 1299,
      imageUrl: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80",
      category: "Electronics",
      description: "High-quality wireless earbuds with noise cancellation and 24-hour battery life. Perfect for music lovers and professionals.",
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      price: 2499,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80",
      category: "Electronics",
      description: "Track your fitness goals with this advanced smartwatch. Monitor heart rate, sleep patterns, and receive notifications.",
    },
    {
      id: 3,
      title: "Designer Cotton T-Shirt",
      price: 599,
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      category: "Fashion",
      description: "Comfortable and stylish cotton t-shirt for everyday wear. Available in multiple colors and sizes.",
    },
    {
      id: 4,
      title: "Stainless Steel Water Bottle",
      price: 799,
      imageUrl: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80",
      category: "Home & Living",
      description: "Keep your drinks hot or cold for hours with this premium stainless steel water bottle. Leak-proof and eco-friendly.",
    },
    {
      id: 5,
      title: "Bestselling Novel",
      price: 399,
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "Books",
      description: "A captivating novel that has topped bestseller lists worldwide. A must-read for fiction lovers.",
    },
    {
      id: 6,
      title: "Yoga Mat with Carry Strap",
      price: 899,
      imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
      category: "Sports",
      description: "Non-slip yoga mat with carrying strap for your fitness routine. Extra thick for maximum comfort.",
    },
    {
      id: 7,
      title: "Wireless Charging Pad",
      price: 1499,
      imageUrl: "https://images.unsplash.com/photo-1606220588911-4a8f620d4a97?auto=format&fit=crop&w=800&q=80",
      category: "Electronics",
      description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
    },
    {
      id: 8,
      title: "Leather Wallet",
      price: 1299,
      imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1067&q=80",
      category: "Fashion",
      description: "Genuine leather wallet with multiple card slots and cash compartment. Durable and stylish design.",
    },
    {
      id: 9,
      title: "Coffee Maker",
      price: 2999,
      imageUrl: "https://images.unsplash.com/photo-1575324683184-d699c39333f6?auto=format&fit=crop&w=800&q=80",
      category: "Home & Living",
      description: "Programmable coffee maker with thermal carafe. Brews perfect coffee every time with minimal effort.",
    },
    {
      id: 10,
      title: "Running Shoes",
      price: 2499,
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Sports",
      description: "Lightweight running shoes with extra cushioning. Perfect for daily runs and athletic activities.",
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600">Discover our latest collection</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sampleProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-12">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{product.category}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-base font-medium text-gray-900">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeProducts;
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gray-900">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          alt=""
          className="w-full h-full object-cover object-center opacity-30"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gray-900/50" />

      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover Amazing Products
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Shop the latest trends in fashion, electronics, and more. Quality products at unbeatable prices.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/allproducts"
              className="rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Shop Now
            </Link>
            <Link
              to="/products"
              className="rounded-md bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              View Deals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl mx-4 my-6 overflow-hidden shadow-xl">
      <div className="container mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="md:w-1/2 text-white">
            <div className="bg-white/20 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
              Pre-order Now
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
              Latest Smartphone Launch
            </h1>
            <Link 
              to="/products" 
              className="inline-block bg-blue-600 text-white hover:bg-blue-700 font-semibold py-3 px-8 rounded-full text-center transition duration-300 mt-4"
            >
              Shop Now
            </Link>
          </div>
          
          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <img 
                src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80" 
                alt="Latest Smartphone"
                className="rounded-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
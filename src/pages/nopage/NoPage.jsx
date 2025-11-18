import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

function NoPage() {
  return (
    <Layout>
      <div className="not-found text-center py-20 px-4">
        <p className="text-sm uppercase tracking-widest text-blue-500 font-semibold mb-4">
          error 404
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          404 - पेज नहीं मिला
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          आप जिस पेज की तलाश कर रहे हैं वह मौजूद नहीं है या हटा दिया गया है। नीचे दिए गए बटन से
          आप सीधे होम या शॉप पेज पर जा सकते हैं।
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors inline-flex items-center justify-center w-full sm:w-auto"
          >
            होम पर वापस जाएं
          </Link>
          <Link 
            to="/products"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors inline-flex items-center justify-center w-full sm:w-auto"
          >
            Shop पेज खोलें
          </Link>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/login"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors inline-flex items-center justify-center w-full sm:w-auto"
          >
            Login पेज खोलें
          </Link>
          <Link 
            to="/register"
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors inline-flex items-center justify-center w-full sm:w-auto"
          >
            Sign Up पेज खोलें
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default NoPage;

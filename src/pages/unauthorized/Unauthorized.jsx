import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Layout from '../../components/layout/Layout';
import { FiAlertTriangle, FiHome, FiLogOut, FiShoppingBag } from 'react-icons/fi';

function Unauthorized() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 rounded-full p-6">
              <FiAlertTriangle className="text-red-600 text-6xl" />
            </div>
          </div>

          {/* Error Code */}
          <p className="text-sm uppercase tracking-widest text-red-600 font-semibold mb-4">
            Access Denied - 403
          </p>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Unauthorized Access
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
            You don't have permission to access this page. This area is restricted to administrators only.
          </p>

          {/* User Info if logged in */}
          {user && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
              <p className="text-sm text-gray-600">Currently logged in as:</p>
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-xs text-gray-500 mt-1">Role: {user.role}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FiHome />
              Go to Home
            </Link>
            <Link 
              to="/products"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-50 transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FiShoppingBag />
              Browse Products
            </Link>
          </div>

          {/* Additional Actions */}
          {user && (
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-2"
              >
                <FiLogOut />
                Logout and try different account
              </button>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If you believe you should have access to this page, please contact the administrator.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Unauthorized;

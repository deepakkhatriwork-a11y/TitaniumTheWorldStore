import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { makeUserAdmin } from '../../utils/makeUserAdmin';
import Layout from '../../components/layout/Layout';
import { Spinner } from '../../components/ui/Spinner';
import { FiShield, FiCheck } from 'react-icons/fi';

function MakeAdmin() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleMakeAdmin = async () => {
    if (!user) {
      setMessage({ type: 'error', text: 'You must be logged in first!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await makeUserAdmin(user.id);
      
      if (result.success) {
        setMessage({
          type: 'success',
          text: 'You are now an admin! Please logout and login again to see changes.',
        });
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Failed to promote user to admin',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-red-600 text-lg font-semibold mb-4">Not Logged In</p>
            <p className="text-gray-600 mb-6">You need to be logged in to use this page.</p>
            <a
              href="/login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors inline-block"
            >
              Go to Login
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-6">
            <div className="bg-indigo-100 rounded-full p-4 inline-block mb-4">
              <FiShield className="text-indigo-600 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Promote to Admin
            </h2>
            <p className="text-gray-600 text-sm">
              Grant admin privileges to your current account
            </p>
          </div>

          {/* Current User Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-500 mb-1">Current Account:</p>
            <p className="font-semibold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <p className="text-xs text-gray-500 mt-2">
              Current Role: <span className="font-medium text-indigo-600">{user?.role}</span>
            </p>
          </div>

          {/* Message */}
          {message.text && (
            <div
              className={`border-l-4 p-4 mb-6 ${
                message.type === 'success'
                  ? 'bg-green-50 border-green-400'
                  : 'bg-red-50 border-red-400'
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  {message.type === 'success' ? (
                    <FiCheck className="text-green-400 text-xl" />
                  ) : (
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm ${
                      message.type === 'success' ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          {user?.role !== 'admin' ? (
            <button
              onClick={handleMakeAdmin}
              disabled={loading}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  Processing...
                </>
              ) : (
                <>
                  <FiShield />
                  Make Me Admin
                </>
              )}
            </button>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <FiCheck className="text-green-600 text-3xl mx-auto mb-2" />
                <p className="text-green-700 font-medium">You are already an admin!</p>
                <a
                  href="/dashboard"
                  className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> After becoming admin, you need to logout and login again for changes to take effect.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MakeAdmin;

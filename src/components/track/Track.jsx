import React, { useState } from 'react';
import { FiPackage, FiCheckCircle, FiTruck, FiHome, FiClock, FiSearch } from 'react-icons/fi';

const Track = () => {
  const [trackingId, setTrackingId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock order status data
  const mockOrder = {
    id: 'TRK' + Math.floor(100000 + Math.random() * 900000),
    status: 'shipped', // 'processing', 'shipped', 'out_for_delivery', 'delivered'
    estimatedDelivery: '2023-12-25',
    items: [
      { id: 1, name: 'Wireless Headphones', quantity: 1, price: 99.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
      { id: 2, name: 'Phone Case', quantity: 2, price: 19.99, image: 'https://images.unsplash.com/photo-1603313017997-9c0b6c4a2221?w=200' },
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States'
    },
    tracking: [
      { status: 'order_placed', date: '2023-12-10T10:30:00', location: 'New York Warehouse', details: 'Order has been placed' },
      { status: 'processing', date: '2023-12-11T14:20:00', location: 'New York Warehouse', details: 'Order is being processed' },
      { status: 'shipped', date: '2023-12-12T09:15:00', location: 'New York Warehouse', details: 'Order has been shipped' },
      { status: 'out_for_delivery', date: '2023-12-14T08:45:00', location: 'New York, NY', details: 'Out for delivery' },
    ]
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    setError('');
    
    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would make an API call here
      // For demo, we'll just use the mock data
      setOrderStatus(mockOrder);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FiCheckCircle className="text-green-500" />;
      case 'out_for_delivery':
        return <FiTruck className="text-blue-500" />;
      case 'shipped':
        return <FiPackage className="text-yellow-500" />;
      default:
        return <FiClock className="text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'order_placed':
        return 'Order Placed';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h2>
            <p className="text-gray-600">Enter your order ID to check the current status of your delivery</p>
          </div>
          
          {/* Tracking Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPackage className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your tracking ID"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Tracking...
                  </>
                ) : (
                  <>
                    <FiSearch className="mr-2 h-4 w-4" />
                    Track Order
                  </>
                )}
              </button>
            </form>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          {/* Order Status */}
          {orderStatus && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Summary */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Order #{orderStatus.id}</h3>
                    <p className="text-sm text-gray-500">Placed on {new Date(orderStatus.tracking[0].date).toLocaleDateString()}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${getStatusColor(orderStatus.status)}`}>
                    {getStatusIcon(orderStatus.status)}
                    <span className="ml-1">{getStatusText(orderStatus.status)}</span>
                  </span>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Estimated Delivery</h4>
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="mr-2 text-blue-500" />
                    <span>{new Date(orderStatus.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {/* Tracking Progress */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status</h3>
                <div className="relative">
                  {/* Timeline */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  {orderStatus.tracking.map((step, index) => {
                    const isActive = orderStatus.tracking.findIndex(s => s.status === orderStatus.status) >= index;
                    const isLast = index === orderStatus.tracking.length - 1;
                    
                    return (
                      <div key={index} className="relative pl-10 pb-6">
                        {!isLast && (
                          <div className={`absolute left-4 top-4 h-full w-0.5 ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                        )}
                        <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                          {isActive ? (
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          ) : (
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h4 className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                              {getStatusText(step.status)}
                            </h4>
                            <p className="text-sm text-gray-500">{step.details}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(step.date).toLocaleString()}
                            </p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <p className="text-sm text-gray-600">{step.location}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {orderStatus.items.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Address</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-900 font-medium">{orderStatus.shippingAddress.name}</p>
                    <p className="text-sm text-gray-600">{orderStatus.shippingAddress.street}</p>
                    <p className="text-sm text-gray-600">
                      {orderStatus.shippingAddress.city}, {orderStatus.shippingAddress.state} {orderStatus.shippingAddress.zip}
                    </p>
                    <p className="text-sm text-gray-600">{orderStatus.shippingAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Track;

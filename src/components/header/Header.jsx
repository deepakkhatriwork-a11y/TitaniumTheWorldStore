// src/components/header/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { 
  FiHome,
  FiShoppingBag,
  FiShoppingCart,
  FiPackage,
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiLogIn,
  FiLogOut,
  FiSettings,
  FiHeart
} from 'react-icons/fi';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const { items } = useSelector(state => state.cart || { items: [] });
  const { user, isAuthenticated, logout } = useAuth();

  // Simple navigation items without subcategories
  const navItems = [
    { name: 'Home', to: '/', icon: <FiHome className="mr-1" /> },
    { name: 'Products', to: '/products', icon: <FiShoppingBag className="mr-1" /> },
    { 
      name: 'Cart', 
      to: '/cart', 
      icon: <FiShoppingCart className="mr-1" />,
      badge: items?.length > 0 ? items.length : null
    },
    { name: 'Orders', to: '/order', icon: <FiPackage className="mr-1" /> },
  ];

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    // TODO: Replace with actual search navigation once search page exists
    console.log('Searching for:', searchTerm.trim());
    setSearchTerm('');
  };

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 w-full z-50 bg-white dark:bg-gray-800 transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      } py-4`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Titanium Store
          </Link>

          {/* Search input - desktop */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2.5 focus-within:ring-2 focus-within:ring-blue-500 transition"
          >
            <FiSearch className="text-gray-400 dark:text-gray-300 mr-2" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400"
            />
          </form>

          {/* Desktop Navigation Icons */}
          <nav className="hidden md:flex items-center space-x-2">
            {/* Home */}
            <Link to="/" className="btn-icon text-gray-700 dark:text-gray-200">
              <FiHome className="w-5 h-5" />
            </Link>

            {/* Products */}
            <Link to="/products" className="btn-icon text-gray-700 dark:text-gray-200">
              <FiShoppingBag className="w-5 h-5" />
            </Link>

            {/* Search Icon */}
            <button className="btn-icon text-gray-700 dark:text-gray-200">
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="btn-icon text-gray-700 dark:text-gray-200 relative">
              <FiHeart className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="btn-icon text-gray-700 dark:text-gray-200 relative">
              <FiShoppingCart className="w-5 h-5" />
              {items?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {items.length}
                </span>
              )}
            </Link>

            {/* Orders */}
            {isAuthenticated && (
              <Link to="/order" className="btn-icon text-gray-700 dark:text-gray-200 relative">
                <FiPackage className="w-5 h-5" />
              </Link>
            )}

            {/* User Information and Logout */}
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">{user?.email}</p>
                  </div>
                  <Link
                    to="/order"
                    className="btn-icon text-gray-700 dark:text-gray-200 relative"
                  >
                    <FiUser className="w-5 h-5" />
                  </Link>
                </div>
                
                {/* Logout Icon */}
                <button
                  onClick={handleLogout}
                  className="btn-icon text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  title="Logout"
                >
                  <FiLogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-icon text-gray-700 dark:text-gray-200"
              >
                <FiUser className="w-5 h-5" />
              </Link>
            )}
          </nav>

          <div className="flex items-center md:hidden ml-auto">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-3">
            <form 
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-3 focus-within:ring-2 focus-within:ring-primary transition"
            >
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products"
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-500"
              />
              <button
                type="submit"
                className="text-sm font-medium text-primary hover:text-primary-dark transition"
              >
                Go
              </button>
            </form>
            <div className="px-2 space-y-1">
              {/* Add Account link for authenticated users at the top */}
              {isAuthenticated && (
                <Link
                  to="/order"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                >
                  <div className="flex items-center">
                    <FiUser className="mr-1" />
                    <span>My Account</span>
                  </div>
                </Link>
              )}
              
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.to
                      ? 'bg-gray-100 text-primary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
              
              {/* Mobile User Menu or Login/Signup */}
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 border-t border-b border-gray-200 my-2">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  {user?.role === 'admin' && (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      <div className="flex items-center">
                        <FiSettings className="mr-1" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <FiLogOut className="mr-1" />
                      <span>Logout</span>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                  >
                    <div className="flex items-center">
                      <FiLogIn className="mr-1" />
                      <span>Login</span>
                    </div>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                  >
                    <div className="flex items-center">
                      <FiUser className="mr-1" />
                      <span>Sign Up</span>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

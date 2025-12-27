import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Leaf } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const { cart, user, logout } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-green-700 font-semibold" : "text-gray-600 hover:text-green-600";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="font-bold text-xl tracking-tight text-stone-800">Shroomify</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/products" className={isActive('/products')}>Shop</Link>
            <Link to="/blog" className={isActive('/blog')}>Blog</Link>
            <Link to="/subscription" className={isActive('/subscription')}>Subscribe</Link>
            <Link to="/bulk" className={isActive('/bulk')}>B2B / Bulk</Link>
            
            <div className="flex items-center gap-4 border-l pl-6 border-gray-200">
              {user ? (
                 <div className="relative group">
                   <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-green-600">
                     <User size={18} /> {user.name}
                   </button>
                   <div className="absolute right-0 w-48 bg-white border rounded-md shadow-lg py-1 hidden group-hover:block">
                     <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                     {user.role === 'admin' && (
                       <Link to="/admin" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Admin Panel</Link>
                     )}
                     <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                   </div>
                 </div>
              ) : (
                <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium">Login</Link>
              )}

              <Link to="/cart" className="relative text-gray-600 hover:text-green-600">
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-green-600 p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 rounded-md">Home</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 rounded-md">Shop</Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 rounded-md">Blog</Link>
            <Link to="/subscription" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 rounded-md">Subscribe</Link>
            <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 rounded-md">Cart ({cart.length})</Link>
            {user ? (
               <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 rounded-md">My Dashboard</Link>
            ) : (
               <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 rounded-md">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

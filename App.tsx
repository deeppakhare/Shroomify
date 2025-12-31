import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { Blog } from './pages/Blog';
import { About, Contact, Subscription, BulkInquiry, Legal } from './pages/StaticPages';
import { ChatBot } from './components/ChatBot';

const Footer = () => (
  <footer className="bg-stone-900 text-white py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Shroomify India</h3>
        <p className="text-gray-400 text-sm">Cultivating health and sustainability through premium oyster mushrooms.</p>
        <div className="mt-4 flex gap-4">
            <span className="text-xs border border-gray-600 px-2 py-1 rounded text-gray-400">FSSAI Lic No. 1234567890</span>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li><Link to="/about" className="hover:text-white">About Us</Link></li>
          <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          <li><Link to="/bulk" className="hover:text-white">B2B Sales</Link></li>
          <li><Link to="/legal" className="hover:text-white">Privacy & Terms</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-4">Connect</h4>
        <p className="text-gray-400 text-sm">Follow us on social media for daily farm updates and recipes.</p>
        <p className="text-gray-400 text-sm mt-2">📍 Hinjewadi, Pune</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
      &copy; 2024 Shroomify India. All rights reserved. Demo Project.
    </div>
  </footer>
);

function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/bulk" element={<BulkInquiry />} />
              <Route path="/legal" element={<Legal />} />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;

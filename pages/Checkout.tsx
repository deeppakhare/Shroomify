import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Calendar, Clock, CreditCard, Banknote, Smartphone } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { user, cart, getCartTotal, placeOrder } = useShop();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
      address: '',
      city: 'Pune',
      zip: '',
      slot: 'Tomorrow 7AM - 10AM',
      payment: 'UPI'
  });

  if (!user) {
     return (
         <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow text-center">
             <h2 className="text-xl mb-4">Please Login to Checkout</h2>
             <button onClick={() => navigate('/login')} className="bg-green-600 text-white px-4 py-2 rounded">Go to Login</button>
         </div>
     )
  }

  if (cart.length === 0) {
      navigate('/products');
      return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      placeOrder({
          address: `${formData.address}, ${formData.city} - ${formData.zip}`,
          slot: formData.slot,
          payment: formData.payment
      });
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          
          {/* Form Section */}
          <div className="bg-white p-6 shadow rounded-lg border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Shipping Address */}
                  <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">1. Delivery Address</h2>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700">Full Address</label>
                              <textarea name="address" rows={3} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" value={formData.address} onChange={handleInputChange} placeholder="Flat No, Building, Street"></textarea>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                               <div>
                                  <label className="block text-sm font-medium text-gray-700">City</label>
                                  <input type="text" name="city" value={formData.city} readOnly className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2 text-gray-500" />
                               </div>
                               <div>
                                  <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                  <input type="text" name="zip" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500" value={formData.zip} onChange={handleInputChange} />
                               </div>
                          </div>
                      </div>
                  </div>

                  {/* Delivery Slot */}
                  <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">2. Select Delivery Slot</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['Tomorrow 7AM - 10AM', 'Tomorrow 5PM - 8PM', 'Day After Tomorrow 7AM - 10AM'].map(slot => (
                              <label key={slot} className={`border rounded-lg p-4 cursor-pointer flex items-center justify-between ${formData.slot === slot ? 'border-green-500 bg-green-50' : 'hover:border-gray-300'}`}>
                                  <div className="flex items-center gap-2">
                                      {slot.includes('AM') ? <Clock size={18} className="text-amber-500"/> : <Clock size={18} className="text-indigo-500"/>}
                                      <span className="text-sm font-medium">{slot}</span>
                                  </div>
                                  <input type="radio" name="slot" value={slot} checked={formData.slot === slot} onChange={handleInputChange} className="text-green-600 focus:ring-green-500" />
                              </label>
                          ))}
                      </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">3. Payment Method</h2>
                      <div className="space-y-3">
                          <label className={`border rounded-lg p-4 cursor-pointer flex items-center justify-between ${formData.payment === 'UPI' ? 'border-green-500 bg-green-50' : 'hover:border-gray-300'}`}>
                              <div className="flex items-center gap-3">
                                  <Smartphone className="text-gray-500" />
                                  <span className="font-medium">UPI (GPay / PhonePe / Paytm)</span>
                              </div>
                              <input type="radio" name="payment" value="UPI" checked={formData.payment === 'UPI'} onChange={handleInputChange} className="text-green-600 focus:ring-green-500" />
                          </label>
                          <label className={`border rounded-lg p-4 cursor-pointer flex items-center justify-between ${formData.payment === 'Card' ? 'border-green-500 bg-green-50' : 'hover:border-gray-300'}`}>
                              <div className="flex items-center gap-3">
                                  <CreditCard className="text-gray-500" />
                                  <span className="font-medium">Credit / Debit Card</span>
                              </div>
                              <input type="radio" name="payment" value="Card" checked={formData.payment === 'Card'} onChange={handleInputChange} className="text-green-600 focus:ring-green-500" />
                          </label>
                          <label className={`border rounded-lg p-4 cursor-pointer flex items-center justify-between ${formData.payment === 'COD' ? 'border-green-500 bg-green-50' : 'hover:border-gray-300'}`}>
                              <div className="flex items-center gap-3">
                                  <Banknote className="text-gray-500" />
                                  <span className="font-medium">Cash on Delivery</span>
                              </div>
                              <input type="radio" name="payment" value="COD" checked={formData.payment === 'COD'} onChange={handleInputChange} className="text-green-600 focus:ring-green-500" />
                          </label>
                      </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Processing Order...' : `Pay ₹${getCartTotal()}`}
                  </button>
              </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <ul className="divide-y divide-gray-200 mb-6">
                      {cart.map((item) => (
                          <li key={item.id} className="py-4 flex justify-between">
                              <div className="flex gap-4">
                                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                  <div>
                                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                              </div>
                              <p className="text-sm font-medium text-gray-900">₹{item.price * item.quantity}</p>
                          </li>
                      ))}
                  </ul>
                  <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between text-sm text-gray-600">
                          <p>Subtotal</p>
                          <p>₹{getCartTotal()}</p>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                          <p>Delivery</p>
                          <p className="text-green-600 font-medium">Free</p>
                      </div>
                      <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t mt-2">
                          <p>Total</p>
                          <p>₹{getCartTotal()}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

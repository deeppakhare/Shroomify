import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, RefreshCw, Star, Image as ImageIcon, X } from 'lucide-react';

const OrderStatusStepper = ({ status }: { status: string }) => {
    const steps = ['Received', 'Harvested', 'Packed', 'Shipped', 'Delivered'];
    const currentStepIndex = steps.indexOf(status);

    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-green-500 -z-10 transition-all duration-500`} style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}></div>
                
                {steps.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    return (
                        <div key={step} className="flex flex-col items-center bg-white px-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                                {index === 0 && <Clock size={14} />}
                                {index === 1 && <Package size={14} />}
                                {index === 2 && <Package size={14} />}
                                {index === 3 && <Truck size={14} />}
                                {index === 4 && <CheckCircle size={14} />}
                            </div>
                            <span className={`text-xs mt-1 font-medium ${isCompleted ? 'text-green-700' : 'text-gray-400'}`}>{step}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Simple Modal for Review
const ReviewModal = ({ isOpen, onClose, productName, onSubmit }: any) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ rating, comment, image });
        // Reset
        setRating(5);
        setComment('');
        setImage(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"><X size={20} /></button>
                <h3 className="text-xl font-bold mb-4">Review: {productName}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                                    <Star size={24} className={star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Photo (Optional)</label>
                        <div className="flex items-center space-x-4">
                            <label className="cursor-pointer bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-200 flex items-center gap-2">
                                <ImageIcon size={16} /> Upload Image
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                            {image && <img src={image} alt="Preview" className="h-12 w-12 object-cover rounded" />}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                        <textarea rows={3} className="w-full border border-gray-300 rounded-md p-2" value={comment} onChange={e => setComment(e.target.value)} required placeholder="How was the taste?"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Submit Review</button>
                </form>
            </div>
        </div>
    );
};


export const Dashboard: React.FC = () => {
  const { user, orders, addToCart, addReview } = useShop();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProductForReview, setSelectedProductForReview] = useState<any>(null);

  if (!user) return <div className="p-8 text-center">Please login to view your dashboard.</div>;

  const myOrders = orders.filter(o => o.userId === user.id);

  const handleReorder = (order: any) => {
      order.items.forEach((item: any) => addToCart(item));
      alert("Items added to cart!");
  };

  const openReviewModal = (product: any) => {
      setSelectedProductForReview(product);
      setReviewModalOpen(true);
  };

  const handleReviewSubmit = (reviewData: any) => {
      if (user && selectedProductForReview) {
          addReview(selectedProductForReview.id, {
              id: 'r' + Date.now(),
              userId: user.id,
              userName: user.name,
              rating: reviewData.rating,
              comment: reviewData.comment,
              imageUrl: reviewData.image,
              date: new Date().toISOString().split('T')[0]
          });
          alert("Review Submitted!");
          setReviewModalOpen(false);
      }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:items-center md:justify-between mb-8 border-b pb-6">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            My Dashboard
          </h2>
          <p className="mt-1 text-gray-500">Manage your orders and account details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Order History</h3>
              {myOrders.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow text-center border border-dashed border-gray-300">
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <Link to="/products" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                        Start Shopping
                    </Link>
                </div>
              ) : (
                  myOrders.map(order => (
                    <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Order Placed: <span className="font-medium text-gray-900">{order.date}</span></p>
                                <p className="text-xs text-gray-400">ID: #{order.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">Total: ₹{order.total}</p>
                                <button onClick={() => handleReorder(order)} className="text-xs text-green-600 hover:underline flex items-center justify-end gap-1 mt-1">
                                    <RefreshCw size={12} /> Reorder
                                </button>
                            </div>
                        </div>
                        <div className="px-6 py-4">
                            <OrderStatusStepper status={order.status} />
                            
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Items</h4>
                                    <ul className="mt-2 text-sm text-gray-700 space-y-2">
                                        {order.items.map((item, idx) => (
                                            <li key={idx} className="flex justify-between items-center">
                                                <span>{item.name} x {item.quantity}</span>
                                                <button onClick={() => openReviewModal(item)} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-600">
                                                    Rate & Review
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Delivery Details</h4>
                                    <p className="mt-2 text-sm text-gray-700">{order.address}</p>
                                    <p className="text-sm text-gray-700 mt-1">Slot: {order.deliverySlot}</p>
                                    <p className="text-sm text-gray-700 mt-1">Payment: {order.paymentMethod}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                  ))
              )}
          </div>

          {/* Account Details Sidebar */}
          <div className="space-y-6">
              <div className="bg-white p-6 shadow rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Details</h3>
                  <div className="space-y-3">
                      <div>
                          <label className="block text-xs font-medium text-gray-500">Name</label>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      </div>
                      <div>
                          <label className="block text-xs font-medium text-gray-500">Email</label>
                          <p className="text-sm font-medium text-gray-900">{user.email}</p>
                      </div>
                      <div>
                          <label className="block text-xs font-medium text-gray-500">Member Since</label>
                          <p className="text-sm font-medium text-gray-900">Nov 2024</p>
                      </div>
                  </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <h3 className="text-lg font-bold text-green-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-green-800 mb-4">Have an issue with your recent order?</p>
                  <Link to="/contact" className="block w-full text-center px-4 py-2 border border-green-600 rounded-md text-sm font-medium text-green-600 hover:bg-green-100">
                      Contact Support
                  </Link>
              </div>
          </div>
      </div>
      
      <ReviewModal 
          isOpen={reviewModalOpen} 
          onClose={() => setReviewModalOpen(false)} 
          productName={selectedProductForReview?.name} 
          onSubmit={handleReviewSubmit} 
      />
    </div>
  );
};

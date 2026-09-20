import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChefHat, Sparkles, Star, Calendar, Clock, Package } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useShop();
  const [recipe, setRecipe] = useState<string | null>(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="p-12 text-center">Product not found. <button onClick={() => navigate('/products')} className="text-green-600 underline">Back to shop</button></div>;
  }

  // const handleGetRecipe = async () => {
  //   setLoadingRecipe(true);
  //   const result = await generateRecipe(product.name);
  //   setRecipe(result);
  //   setLoadingRecipe(false);
  // };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 mb-8 lg:mb-0"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col"
        >
          <div className="flex justify-between items-start">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{product.name}</h1>
              {product.stock > 0 && product.stock < 20 && (
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">Low Stock</span>
              )}
          </div>
          
          <div className="flex items-center mt-2 space-x-2">
             <div className="flex text-yellow-500">{'★'.repeat(Math.floor(product.rating))}</div>
             <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>

          <p className="mt-4 text-3xl font-bold text-green-700">₹{product.price}</p>
          <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className={`flex-1 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          {/* Product Tabs */}
          <div className="mt-10">
              <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                      {['desc', 'specs', 'reviews'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`${activeTab === tab ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'} whitespace-nowrap py-4 px-1 font-medium text-sm capitalize relative`}
                          >
                              {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specifications' : 'Reviews'}
                              {activeTab === tab && (
                                <motion.div 
                                  layoutId="activeTab"
                                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                                />
                              )}
                          </button>
                      ))}
                  </nav>
              </div>
              <div className="py-6">
                  {activeTab === 'desc' && (
                      <div>
                          <p className="text-gray-600">{product.description}</p>
                          <div className="mt-4">
                              <h4 className="font-medium text-gray-900">Nutrition:</h4>
                              <p className="text-gray-500 text-sm">{product.nutrition}</p>
                          </div>
                      </div>
                  )}
                  {activeTab === 'specs' && (
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                          <div className="sm:col-span-1 border p-3 rounded bg-gray-50">
                              <dt className="text-sm font-medium text-gray-500 flex items-center gap-1"><Calendar size={14}/> Harvest Date</dt>
                              <dd className="mt-1 text-sm text-gray-900 font-semibold">{product.harvestDate || 'N/A'}</dd>
                          </div>
                          <div className="sm:col-span-1 border p-3 rounded bg-gray-50">
                              <dt className="text-sm font-medium text-gray-500 flex items-center gap-1"><Clock size={14}/> Shelf Life</dt>
                              <dd className="mt-1 text-sm text-gray-900 font-semibold">{product.shelfLife}</dd>
                          </div>
                          <div className="sm:col-span-2 border p-3 rounded bg-gray-50">
                              <dt className="text-sm font-medium text-gray-500 flex items-center gap-1"><Package size={14}/> Storage Instructions</dt>
                              <dd className="mt-1 text-sm text-gray-900">{product.storage}</dd>
                          </div>
                      </dl>
                  )}
                  {activeTab === 'reviews' && (
                      <div className="space-y-6">
                          {product.reviewsList && product.reviewsList.length > 0 ? (
                              product.reviewsList.map(review => (
                                <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center mb-1">
                                                <div className="flex text-yellow-500 text-xs">{'★'.repeat(review.rating)}</div>
                                                <span className="ml-2 text-sm font-bold text-gray-900">{review.userName}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mb-2">{review.date}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm">{review.comment}</p>
                                    {review.imageUrl && (
                                        <div className="mt-3">
                                            <img src={review.imageUrl} alt="User review" className="w-20 h-20 object-cover rounded-md border border-gray-200" />
                                        </div>
                                    )}
                                </div>
                              ))
                          ) : (
                              <p className="text-gray-500 text-sm">No reviews yet.</p>
                          )}
                      </div>
                  )}
              </div>
          </div>

          {/* AI Recipe Section */}
          <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                <ChefHat className="text-indigo-600"/> 
                Need Inspiration?
              </h3>
            </div>
            
            {recipe && (
              <div className="prose prose-sm prose-indigo bg-white p-4 rounded-lg shadow-sm">
                <ReactMarkdown>{recipe}</ReactMarkdown>
                <button onClick={() => setRecipe(null)} className="mt-2 text-xs text-indigo-500 hover:text-indigo-700 underline">Clear</button>
              </div>
            )}
             {!recipe && !loadingRecipe && (
              <p className="text-sm text-indigo-700">Not sure how to cook this? Our AI chef can suggest quick Indian recipes instantly.</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

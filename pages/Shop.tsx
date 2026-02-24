import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Filter } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

export const Shop: React.FC = () => {
  const { products, addToCart } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
      if (showInStockOnly && product.stock === 0) return false;
      return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 border rounded-lg shadow-sm sticky top-24">
                <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold text-lg border-b pb-2">
                    <Filter size={20} /> Filters
                </div>
                
                <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Category</h3>
                    <div className="space-y-2">
                        {categories.map(cat => (
                            <label key={cat} className="flex items-center text-gray-600 cursor-pointer hover:text-green-600 transition-colors">
                                <input 
                                    type="radio" 
                                    name="category" 
                                    value={cat}
                                    checked={selectedCategory === cat}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="mr-2 text-green-600 focus:ring-green-500" 
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-medium text-gray-900 mb-3">Availability</h3>
                    <label className="flex items-center text-gray-600 cursor-pointer hover:text-green-600 transition-colors">
                        <input 
                            type="checkbox" 
                            checked={showInStockOnly}
                            onChange={(e) => setShowInStockOnly(e.target.checked)}
                            className="mr-2 rounded text-green-600 focus:ring-green-500" 
                        />
                        In Stock Only
                    </label>
                </div>
            </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-2xl font-bold text-gray-900">Shop Mushrooms</h1>
                 <span className="text-gray-500 text-sm">{filteredProducts.length} Products Found</span>
            </div>
            
            {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No products match your filters.</p>
                </div>
            ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                    {filteredProducts.map((product) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={product.id} 
                      className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col group"
                    >
                        <Link to={`/product/${product.id}`}>
                        <div className="relative h-48 bg-gray-200 overflow-hidden">
                            <motion.img 
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover" 
                            />
                            {product.stock === 0 ? (
                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                    <span className="bg-gray-800 text-white px-3 py-1 font-bold text-sm rounded">OUT OF STOCK</span>
                                </div>
                            ) : (
                                <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 text-xs font-bold uppercase tracking-wide text-gray-600 rounded">
                                {product.category}
                                </span>
                            )}
                        </div>
                        </Link>
                        <div className="p-4 flex-1 flex flex-col">
                        <Link to={`/product/${product.id}`}>
                            <h3 className="text-lg font-bold text-gray-900 hover:text-green-600 transition-colors">{product.name}</h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-1 mb-2">
                             <div className="flex text-yellow-500 text-xs">{'★'.repeat(Math.round(product.rating))}</div>
                             <span className="text-xs text-gray-400">({product.reviews})</span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                        <div className="mt-auto pt-4 flex items-center justify-between">
                            <div>
                                <span className="text-xl font-bold text-green-700">₹{product.price}</span>
                                <span className="text-xs text-gray-400 block">{product.category === 'Fresh' ? 'per pack' : 'per unit'}</span>
                            </div>
                            <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            className={`p-2 rounded-full transition-colors ${product.stock === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                            aria-label="Add to Cart"
                            >
                            <ShoppingBag size={20} />
                            </motion.button>
                        </div>
                        </div>
                    </motion.div>
                    ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
      </div>
    </motion.div>
  );
};

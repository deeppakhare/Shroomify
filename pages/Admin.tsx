import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, BlogPost } from '../types';

export const Admin: React.FC = () => {
  const { user, orders, addProduct, products, updateProductStock, addBlog } = useShop();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'blog'>('products');
  
  // Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
      name: '', price: 0, category: 'Fresh', description: '', nutrition: '', image: 'https://picsum.photos/seed/new/400/300', stock: 0, shelfLife: '5 Days', storage: 'Cool dry place'
  });

  // Blog Form State
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
      title: '', category: 'Health', image: 'https://picsum.photos/seed/blognew/800/400', excerpt: '', content: '', author: 'Admin'
  });

  if (!user || user.role !== 'admin') {
      return <div className="p-12 text-center text-red-600">Access Denied. Admins only.</div>;
  }

  const handleAddProduct = (e: React.FormEvent) => {
      e.preventDefault();
      if (newProduct.name && newProduct.price) {
          addProduct({
              ...newProduct,
              id: Date.now().toString(),
              rating: 0,
              reviews: 0,
              reviewsList: []
          } as Product);
          alert('Product Added!');
          setNewProduct({ name: '', price: 0, category: 'Fresh', description: '', nutrition: '', image: 'https://picsum.photos/seed/new/400/300', stock: 0, shelfLife: '', storage: '' });
      }
  };

  const handleAddBlog = (e: React.FormEvent) => {
      e.preventDefault();
      if (newBlog.title && newBlog.content) {
          addBlog({
              ...newBlog,
              id: 'b' + Date.now().toString(),
              date: new Date().toISOString().split('T')[0],
          } as BlogPost);
          alert('Blog Post Published!');
          setNewBlog({ title: '', category: 'Health', image: 'https://picsum.photos/seed/blognew/800/400', excerpt: '', content: '', author: 'Admin' });
      }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Farm Admin Panel</h1>
      
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-md font-medium whitespace-nowrap ${activeTab === 'products' ? 'bg-stone-800 text-white' : 'bg-gray-200 text-gray-700'}`}>Manage Inventory</button>
          <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-md font-medium whitespace-nowrap ${activeTab === 'orders' ? 'bg-stone-800 text-white' : 'bg-gray-200 text-gray-700'}`}>Manage Orders</button>
          <button onClick={() => setActiveTab('blog')} className={`px-4 py-2 rounded-md font-medium whitespace-nowrap ${activeTab === 'blog' ? 'bg-stone-800 text-white' : 'bg-gray-200 text-gray-700'}`}>Manage Blog</button>
      </div>

      {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Product Form */}
            <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                <form onSubmit={handleAddProduct} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                            value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                            <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                                value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} required/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock Qty</label>
                            <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                                value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} required/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                                <option>Fresh</option><option>Dried</option><option>Kits</option><option>Pantry</option>
                            </select>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700">Shelf Life</label>
                             <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                                value={newProduct.shelfLife} onChange={e => setNewProduct({...newProduct, shelfLife: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                            value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} required/>
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Add to Catalog</button>
                </form>
            </div>

            {/* Current Stock List */}
            <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-bold mb-4">Current Stock Levels</h2>
                <div className="overflow-y-auto h-96">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex gap-2">
                                            <button onClick={() => updateProductStock(product.id, product.stock + 10)} className="text-green-600 hover:text-green-900">+10</button>
                                            <button onClick={() => updateProductStock(product.id, Math.max(0, product.stock - 10))} className="text-red-600 hover:text-red-900">-10</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
      )}

      {activeTab === 'orders' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
             <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
             </div>
             <ul className="divide-y divide-gray-200">
                 {orders.map(order => (
                     <li key={order.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                         <div className="flex items-center justify-between">
                             <div className="flex flex-col">
                                 <p className="text-sm font-bold text-green-600 truncate">#{order.id}</p>
                                 <p className="text-sm text-gray-500">{order.date}</p>
                             </div>
                             <div className="ml-2 flex-shrink-0 flex">
                                 <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                     {order.status}
                                 </p>
                             </div>
                         </div>
                         <div className="mt-2">
                             <p className="text-sm text-gray-600">User: {order.userId}</p>
                             <p className="text-sm text-gray-600">Total: ₹{order.total}</p>
                             <p className="text-sm text-gray-600">Slot: {order.deliverySlot}</p>
                             <div className="mt-2">
                                 <select className="text-xs border rounded p-1">
                                     <option>Update Status...</option>
                                     <option>Harvested</option>
                                     <option>Packed</option>
                                     <option>Shipped</option>
                                 </select>
                             </div>
                         </div>
                     </li>
                 ))}
             </ul>
          </div>
      )}

      {activeTab === 'blog' && (
        <div className="max-w-2xl">
            <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-bold mb-4">Publish New Blog Post</h2>
                <form onSubmit={handleAddBlog} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                            value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                             value={newBlog.category} onChange={e => setNewBlog({...newBlog, category: e.target.value as any})}>
                            <option>Health</option><option>Recipes</option><option>Farming</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                            value={newBlog.image} onChange={e => setNewBlog({...newBlog, image: e.target.value})} required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Excerpt (Short Description)</label>
                        <textarea rows={2} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                            value={newBlog.excerpt} onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})} required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content (Markdown Supported)</label>
                        <textarea rows={6} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                            value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} required/>
                    </div>
                    <button type="submit" className="w-full bg-stone-800 text-white py-2 rounded-md hover:bg-stone-900">Publish Post</button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

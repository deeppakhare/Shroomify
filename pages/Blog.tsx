import React from 'react';
import { useShop } from '../context/ShopContext';
import { Calendar, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const Blog: React.FC = () => {
  const { blogs } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">Mushroom Life Blog</h1>
        <p className="mt-4 text-xl text-gray-500">Recipes, Health Tips & Farming Stories</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48">
               <img className="w-full h-full object-cover" src={post.image} alt={post.title} />
               <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 text-xs font-bold uppercase rounded-bl-lg">
                 {post.category}
               </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center text-sm text-gray-500 mb-2 space-x-4">
                <span className="flex items-center gap-1"><Calendar size={14}/> {post.date}</span>
                <span className="flex items-center gap-1"><User size={14}/> {post.author}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                  <details className="group">
                      <summary className="text-green-600 font-medium cursor-pointer hover:text-green-800 list-none flex items-center gap-1">
                          Read More 
                          <span className="group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="mt-4 prose prose-sm prose-green text-gray-700">
                          <ReactMarkdown>{post.content}</ReactMarkdown>
                      </div>
                  </details>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

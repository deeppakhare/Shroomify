import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Award, Leaf, ShieldCheck, Sun, Droplets } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Home: React.FC = () => {
  const { products } = useShop();
  const featured = products.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-stone-900">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/mushroomfarm/1600/900" 
            alt="Mushroom Farm" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block">Pure. Organic. Fresh.</span>
            <span className="block text-green-400">Premium Oyster Mushrooms</span>
          </h1>
          <p className="mt-6 text-xl text-gray-200 max-w-3xl">
            Sustainably grown in our controlled-environment farms in Pune. Harvested daily at dawn for maximum nutrition and umami taste.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/products" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-stone-900 bg-green-400 hover:bg-green-500 md:py-4 md:text-lg">
              Order Fresh
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/subscription" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-100 bg-stone-800 hover:bg-stone-700 md:py-4 md:text-lg">
              Get Weekly Subscription
            </Link>
          </div>
        </div>
      </div>

      {/* Trust & Certifications */}
      <div className="bg-green-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center text-green-100/80 uppercase font-bold text-sm tracking-wider">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={24} /> FSSAI Certified
                </div>
                <div className="flex items-center gap-2">
                    <Leaf size={24} /> 100% Organic
                </div>
                <div className="flex items-center gap-2">
                    <Sun size={24} /> Chemical Free
                </div>
                 <div className="flex items-center gap-2">
                    <Droplets size={24} /> Hydroponic
                </div>
            </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-stone-900">Why Choose Shroomify?</h2>
                <p className="mt-4 text-gray-500">We don't just grow mushrooms; we cultivate health.</p>
            </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <div className="mx-auto w-12 h-12 text-green-600 mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Leaf />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Zero Pesticides</h3>
              <p className="mt-2 text-gray-600">Grown on sterilized wheat straw substrate in a controlled climate.</p>
            </div>
            <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
              <div className="mx-auto w-12 h-12 text-amber-600 mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Truck />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Harvested to Order</h3>
              <p className="mt-2 text-gray-600">We harvest at 5 AM and deliver by 10 AM. It doesn't get fresher.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="mx-auto w-12 h-12 text-blue-600 mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Award />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Nutrient Dense</h3>
              <p className="mt-2 text-gray-600">Rich in protein, fiber, and antioxidants. A perfect meat substitute.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/products" className="text-green-600 hover:text-green-700 font-medium flex items-center">View all <ArrowRight size={16} className="ml-1"/></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
             <Link key={product.id} to={`/product/${product.id}`} className="group block">
               <div className="w-full aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg overflow-hidden relative">
                 <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />
                 {product.stock < 20 && (
                     <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                         Only {product.stock} Left
                     </span>
                 )}
               </div>
               <h3 className="mt-4 text-lg font-medium text-gray-900 group-hover:text-green-600">{product.name}</h3>
               <div className="flex justify-between items-center mt-1">
                   <p className="text-lg font-bold text-stone-800">₹{product.price}</p>
                   <div className="flex text-yellow-500 text-sm">★ {product.rating}</div>
               </div>
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

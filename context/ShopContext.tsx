import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product, CartItem, User, Order, BlogPost, Review } from '../types';
import { INITIAL_PRODUCTS, INITIAL_BLOGS } from '../constants';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  blogs: BlogPost[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  placeOrder: (deliveryDetails: { address: string; slot: string; payment: string }) => void;
  addProduct: (product: Product) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  addBlog: (blog: BlogPost) => void;
  addReview: (productId: string, review: Review) => void;
  getCartTotal: () => number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);

  // Simple demo mock login
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    setUser({
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role,
    });
  };

  const logout = () => setUser(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const placeOrder = (deliveryDetails: { address: string; slot: string; payment: string }) => {
    if (!user) return;
    const newOrder: Order = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: getCartTotal(),
      status: 'Received',
      userId: user.id,
      deliverySlot: deliveryDetails.slot,
      paymentMethod: deliveryDetails.payment,
      address: deliveryDetails.address
    };
    setOrders((prev) => [newOrder, ...prev]);
    
    // Reduce stock
    setProducts(prevProducts => 
        prevProducts.map(p => {
            const cartItem = cart.find(c => c.id === p.id);
            if (cartItem) {
                return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
            }
            return p;
        })
    );

    clearCart();
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProductStock = (productId: string, newStock: number) => {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  };

  const addBlog = (blog: BlogPost) => {
    setBlogs(prev => [blog, ...prev]);
  };

  const addReview = (productId: string, review: Review) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newReviews = [review, ...p.reviewsList];
        const newRating = (p.rating * p.reviews + review.rating) / (p.reviews + 1);
        return {
          ...p,
          reviews: p.reviews + 1,
          rating: parseFloat(newRating.toFixed(1)),
          reviewsList: newReviews
        };
      }
      return p;
    }));
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        user,
        orders,
        blogs,
        addToCart,
        removeFromCart,
        clearCart,
        login,
        logout,
        placeOrder,
        addProduct,
        updateProductStock,
        addBlog,
        addReview,
        getCartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

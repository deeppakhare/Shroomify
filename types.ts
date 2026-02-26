export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  nutrition: string;
  stock: number;
  harvestDate?: string; // For fresh products
  shelfLife: string;
  storage: string;
  rating: number;
  reviews: number;
  reviewsList: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Received' | 'Harvested' | 'Packed' | 'Shipped' | 'Delivered';
  userId: string;
  deliverySlot?: string;
  paymentMethod?: string;
  address?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  frequency: 'Weekly' | 'Monthly';
  price: number;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Recipes' | 'Health' | 'Farming';
  image: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
}

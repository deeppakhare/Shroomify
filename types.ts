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



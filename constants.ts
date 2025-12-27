import { Product, SubscriptionPlan, BlogPost } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fresh Grey Oyster Mushrooms',
    price: 180,
    category: 'Fresh',
    image: 'https://picsum.photos/seed/mush1/400/300',
    description: 'Farm-fresh organic grey oyster mushrooms, harvested daily. Perfect for stir-frys and soups.',
    nutrition: 'High in Protein, Vitamin D, and Iron.',
    stock: 50,
    harvestDate: 'Daily Morning',
    shelfLife: '5-7 Days',
    storage: 'Refrigerate in paper bag',
    rating: 4.8,
    reviews: 124,
    reviewsList: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Rohan K.',
        rating: 5,
        comment: 'Best mushrooms I\'ve had in Pune. Very fresh and clean.',
        date: '2023-10-15'
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Priya S.',
        rating: 4,
        comment: 'Delivery was on time. The recipe AI helped me make a great curry!',
        date: '2023-10-20'
      }
    ]
  },
  {
    id: '2',
    name: 'Dried Oyster Mushrooms (100g)',
    price: 250,
    category: 'Dried',
    image: 'https://picsum.photos/seed/mush2/400/300',
    description: 'Sun-dried premium mushrooms with intense umami flavor. Rehydrate for 20 mins before use.',
    nutrition: 'Concentrated nutrients, long shelf life.',
    stock: 200,
    shelfLife: '12 Months',
    storage: 'Airtight container, cool dry place',
    rating: 4.6,
    reviews: 89,
    reviewsList: []
  },
  {
    id: '3',
    name: 'DIY Mushroom Grow Kit',
    price: 499,
    category: 'Kits',
    image: 'https://picsum.photos/seed/mush3/400/300',
    description: 'Grow your own delicious mushrooms at home! Includes substrate block and spray bottle.',
    nutrition: 'Educational and edible!',
    stock: 30,
    shelfLife: 'Use within 2 weeks',
    storage: 'Keep away from direct sunlight',
    rating: 4.9,
    reviews: 210,
    reviewsList: []
  },
  {
    id: '4',
    name: 'Spicy Mushroom Pickle',
    price: 320,
    category: 'Pantry',
    image: 'https://picsum.photos/seed/mush4/400/300',
    description: 'Traditional Indian style pickle made with oyster mushrooms and aromatic spices.',
    nutrition: 'Probiotic goodness.',
    stock: 15,
    shelfLife: '6 Months',
    storage: 'Refrigerate after opening',
    rating: 4.5,
    reviews: 56,
    reviewsList: []
  },
  {
    id: '5',
    name: 'Mushroom Protein Powder',
    price: 850,
    category: 'Health',
    image: 'https://picsum.photos/seed/mush5/400/300',
    description: 'Vegan protein supplement fortified with oyster mushroom extract for immunity.',
    nutrition: '20g Protein per serving.',
    stock: 100,
    shelfLife: '18 Months',
    storage: 'Cool dry place',
    rating: 4.7,
    reviews: 42,
    reviewsList: []
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'sub1',
    name: 'The Weekend Chef',
    frequency: 'Weekly',
    price: 600,
    description: '500g Fresh Mushrooms delivered every Friday.',
  },
  {
    id: 'sub2',
    name: 'Monthly Health Pack',
    frequency: 'Monthly',
    price: 2200,
    description: '2kg Fresh Mushrooms + 1 Dried Pack delivered once a month.',
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: '5 Health Benefits of Oyster Mushrooms',
    category: 'Health',
    image: 'https://picsum.photos/seed/blog1/800/400',
    excerpt: 'Discover why these fungi are considered a superfood for your immune system.',
    content: 'Oyster mushrooms are not just delicious; they are a nutritional powerhouse. 1. **Immune Support**: Rich in beta-glucans. 2. **Heart Health**: Contains lovastatin which helps lower cholesterol. 3. **High Protein**: A great source of vegan protein. 4. **Antioxidants**: Packed with ergothioneine. 5. **Low Calorie**: Perfect for weight management.',
    date: '2024-03-15',
    author: 'Dr. Mushroom'
  },
  {
    id: 'b2',
    title: 'Creamy Mushroom Pasta Recipe',
    category: 'Recipes',
    image: 'https://picsum.photos/seed/blog2/800/400',
    excerpt: 'A quick 15-minute dinner recipe that brings out the best umami flavors.',
    content: 'Ingredients: 200g Fresh Oyster Mushrooms, 200g Pasta, Garlic, Cream, Parmesan. \n\n Steps: 1. Boil pasta. 2. Sauté mushrooms with lots of garlic until browned. 3. Add cream and simmer. 4. Toss pasta in sauce. 5. Serve hot with parmesan.',
    date: '2024-03-10',
    author: 'Chef Anjali'
  },
  {
    id: 'b3',
    title: 'How to Use Your Grow Kit',
    category: 'Farming',
    image: 'https://picsum.photos/seed/blog3/800/400',
    excerpt: 'Step-by-step guide to harvesting your first flush of mushrooms at home.',
    content: '1. **Cut**: Make a generic X cut on the plastic bag. 2. **Spray**: Mist water 3 times a day. 3. **Wait**: In 7-10 days, you will see pinheads. 4. **Harvest**: Twist and pull when caps uncurl.',
    date: '2024-02-28',
    author: 'Farm Manager'
  }
];

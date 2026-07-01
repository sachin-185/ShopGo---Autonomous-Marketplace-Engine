import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model.js';
import { connectDB } from './config/db.js';

dotenv.config();

const products = [
  {
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: '/heaphones.png',
    category: 'Electronics',
    stock: 50,
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    description: 'Fitness tracking smart watch with heart rate monitor',
    image: '/smart_watch.png',
    category: 'Electronics',
    stock: 30,
  },
  {
    name: 'Running Shoes',
    price: 579.99,
    description: 'Comfortable running shoes for all terrains',
    image: '/shoe.png',
    category: 'Sports',
    stock: 100,
  },
  {
    name: 'Coffee Maker',
    price: 349.99,
    description: 'Automatic coffee maker with programmable timer',
    image: '/coffee_maker.png',
    category: 'Home',
    stock: 25,
  },
  {
    name: 'Laptop Backpack',
    price: 139.99,
    description: 'Water-resistant backpack for laptops up to 15 inches',
    image: '/backpack.png',
    category: 'Accessories',
    stock: 75,
  },
  {
    name: 'Yoga Mat',
    price: 2329.99,
    description: 'Non-slip yoga mat for home workouts',
    image: '/yoga_mat.png',
    category: 'Sports',
    stock: 60,
  },
  {
    name: 'Smartphone',
    price: 38999.99,
    description: 'Latest smartphone with high-resolution camera and fast processor',
    image: '/phone.png',
    category: 'Electronics',
    stock: 20,
  },
  {
    name: 'Novel Book',
    price: 1498.99,
    description: 'Bestselling fiction novel for leisure reading',
    image: '/book.png',
    category: 'Books',
    stock: 150,
  },
  {
    name: 'T-Shirt',
    price: 299.99,
    description: 'Comfortable cotton t-shirt in various colors',
    image: '/shirt.png',
    category: 'Clothing',
    stock: 200,
  },
  {
    name: 'Blender',
    price: 689.99,
    description: 'High-speed blender for smoothies and soups',
    image: '/blender.png',
    category: 'Home',
    stock: 40,
  },
  {
    name: 'Winter Jacket',
    price: 319.99,
    description: 'Warm and waterproof winter jacket for cold weather',
    image: '/jacket.png',
    category: 'Clothing',
    stock: 45,
  },
  {
    name: 'Jeans',
    price: 879.99,
    description: 'Comfortable denim jeans in classic blue',
    image: '/jeans.png',
    category: 'Clothing',
    stock: 80,
  },
  {
    name: 'Dumbbells Set',
    price: 149.99,
    description: 'Adjustable dumbbells for home strength training',
    image: '/dumbbell_sets.png',
    category: 'Sports',
    stock: 40,
  },
  {
    name: 'Microwave Oven',
    price: 949.99,
    description: 'Compact microwave oven with multiple cooking modes',
    image: '/oven.png',
    category: 'Home',
    stock: 30,
  },
  {
    name: 'Sunglasses',
    price: 164.99,
    description: 'UV-protective sunglasses with polarized lenses',
    image: '/sunglasses.png',
    category: 'Accessories',
    stock: 90,
  },
  {
    name: 'Leather Wallet',
    price: 934.99,
    description: 'Genuine leather wallet with multiple card slots',
    image: '/wallet.png',
    category: 'Accessories',
    stock: 70,
  },
  {
    name: 'Science Textbook',
    price: 239.99,
    description: 'Comprehensive science textbook for students',
    image: '/science_textbook.png',
    category: 'Books',
    stock: 120,
  },
  {
    name: 'History Book',
    price: 129.99,
    description: 'Fascinating history book covering world events',
    image: '/history_book.png',
    category: 'Books',
    stock: 85,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); 
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
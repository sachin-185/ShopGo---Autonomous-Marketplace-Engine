import mongoose from "mongoose";
import Product from "../../models/product.model.js";
import Order from "../../models/order.model.js";

export const getProducts = async (req, res) => {
    try {
        console.log('getProducts called');
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.description || !product.image || !product.category || product.stock === undefined) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ success: false, message: "Query parameter is required" });
        }
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error searching products:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getRecommendations = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        
        const userOrders = await Order.find({ user: userId }).populate('items.product');
        const boughtProducts = new Set();
        userOrders.forEach(order => {
            order.items.forEach(item => boughtProducts.add(item.product._id.toString()));
        });

        if (boughtProducts.size === 0) {
            
            const popularProducts = await Product.find({}).sort({ createdAt: -1 }).limit(10);
            return res.status(200).json({ success: true, data: popularProducts });
        }

        
        const similarUsers = await Order.distinct('user', { 'items.product': { $in: Array.from(boughtProducts) } });
        const similarUserIds = similarUsers.filter(id => id.toString() !== userId);

        if (similarUserIds.length === 0) {
            const popularProducts = await Product.find({}).sort({ createdAt: -1 }).limit(10);
            return res.status(200).json({ success: true, data: popularProducts });
        }

        
        const similarOrders = await Order.find({ user: { $in: similarUserIds } }).populate('items.product');
        const recommendedProducts = new Set();
        similarOrders.forEach(order => {
            order.items.forEach(item => {
                if (!boughtProducts.has(item.product._id.toString())) {
                    recommendedProducts.add(item.product._id.toString());
                }
            });
        });

        
        const products = await Product.find({ _id: { $in: Array.from(recommendedProducts) } }).limit(10);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error getting recommendations:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
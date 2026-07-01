import Cart from '../../models/cart.model.js';
import Product from '../../models/product.model.js';

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            return res.json({ items: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
        }

        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
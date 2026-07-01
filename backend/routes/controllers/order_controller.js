import Order from '../../models/order.model.js';
import Cart from '../../models/cart.model.js';
import Product from '../../models/product.model.js';

export const createOrder = async (req, res) => {
    const { shippingAddress, paymentMethod, shippingMethod, subtotal, shippingCost, tax, total } = req.body;
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Sorry, Cart is empty' });
        }
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        }));

        const order = new Order({
            user: req.user._id,
            items: orderItems,
            subtotal,
            shippingCost,
            tax,
            totalPrice: total,
            shippingAddress,
            paymentMethod,
            shippingMethod,
        });

        const createdOrder = await order.save();

        
        const populatedOrder = await Order.findById(createdOrder._id).populate('items.product');

        
        cart.items = [];
        await cart.save();

        
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            product.stock -= item.quantity;
            await product.save();
        }
        res.status(201).json(populatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email').populate('items.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
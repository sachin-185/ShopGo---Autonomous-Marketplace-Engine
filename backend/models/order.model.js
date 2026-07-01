import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [orderItemSchema],
        subtotal: {
            type: Number,
            required: true,
        },
        shippingCost: {
            type: Number,
            required: true,
        },
        tax: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            address: { type: String, required: true },
            apartment: { type: String },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        shippingMethod: {
            type: String,
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
import express from 'express';
import {
    createOrder,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderToPaid,
    updateOrderToDelivered,
} from './controllers/order_controller.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.get('/', protect, admin, getOrders);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default router;
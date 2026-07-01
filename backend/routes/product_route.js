import express from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, getCategories, searchProducts, getRecommendations } from './controllers/product_controller.js';

const router = express.Router();
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/search', searchProducts);
router.get('/recommendations/:userId', getRecommendations);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
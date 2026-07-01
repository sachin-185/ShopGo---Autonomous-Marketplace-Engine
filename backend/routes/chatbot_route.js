import express from 'express';
import { handleMessage } from './controllers/chatbot_controller.js';

const router = express.Router();

router.post('/message', handleMessage);

export default router;
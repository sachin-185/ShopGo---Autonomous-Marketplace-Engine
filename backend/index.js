import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product_route.js';
import userRoutes from './routes/user_route.js';
import cartRoutes from './routes/cart_route.js';
import orderRoutes from './routes/order_route.js';
import chatbotRoutes from './routes/chatbot_route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chatbot", chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port ${PORT}`);
});

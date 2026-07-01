import { pipeline } from '@xenova/transformers';
import Product from "../../models/product.model.js";


let generator = null;

const getGenerator = async () => {
    if (!generator) {
        generator = await pipeline('text-generation', 'distilgpt2');
    }
    return generator;
};

const SYSTEM_PROMPT = `Your name is ShopGo Assistant, the specialized AI for the ShopGo Autonomous Marketplace Engine. Follow this workflow for every user:
Greet the user warmly and ask how I can assist with their shopping today.
Identify Intent: If they are searching for a product, ask 2 clarifying questions (e.g., budget, size, or use case) before searching our live catalog.
Recommend: Provide the top 3 matches with direct links and a 'Why this fits you' explanation.
Upsell: Suggest one high-rated accessory that complements their choice.
Support: If they ask about an order, pull real-time data from our Order Management System (OMS) using the provided ID.
Escalate: If the user mentions 'human,' 'frustrated,' or 'refund,' transfer to a live agent immediately.`;

export const handleMessage = async (req, res) => {
    try {
        const { messages, newMessage } = req.body;

        if (!newMessage || !messages) {
            return res.status(400).json({ success: false, message: "Messages and newMessage are required" });
        }

        const lowerNewMessage = newMessage.toLowerCase();

        let response = "";
        let products = [];

        
        if (lowerNewMessage.includes('human') || lowerNewMessage.includes('frustrated') || lowerNewMessage.includes('refund')) {
            response = "I'm sorry for any inconvenience. I will inform to our team.";
        } else {
            
            if (lowerNewMessage.includes('Thank you') || lowerNewMessage.includes('thank you') || lowerNewMessage.includes('thanks')) {
                response = "You're welcome! Happy shopping with ShopGo. If you need anything else, I'm here to help.";
            } else if (lowerNewMessage.includes('order') || lowerNewMessage.includes('ordered') || lowerNewMessage.includes('placed')) {
                response = "Great! Your order has been placed successfully. You can track your order status in your account dashboard. Is there anything else I can assist you with?";
            } else {
            
            let conversation = SYSTEM_PROMPT + "\n";
            messages.forEach(msg => {
                if (msg.sender === 'user') {
                    conversation += "User: " + msg.text + "\n";
                } else if (msg.sender === 'bot') {
                    conversation += "Assistant: " + msg.text + "\n";
                }
            });
            conversation += "Assistant:";

            const fullPrompt = conversation;

            try {
                
                const gen = await getGenerator();
                const chatResponse = await gen(fullPrompt, {
                    max_new_tokens: 100,
                    temperature: 0.7,
                    do_sample: true,
                    pad_token_id: gen.tokenizer.eos_token_id
                });

                response = chatResponse[0].generated_text.replace(fullPrompt, '').trim() || "I'm sorry, I couldn't generate a response.";
            } catch (mlError) {
                console.error('ML generation failed:', mlError.message);
                
                response = "I'm here to help with product recommendations. What are you looking for?";
            }
            }
        }

        
        if (response === "" || response.includes("recommend") || response.includes("product")) {
            const lowerMessage = newMessage.toLowerCase();
            const lowerResponse = response.toLowerCase();

            
            const hasProductKeywords = lowerMessage.includes("product") || lowerMessage.includes("looking for") || lowerMessage.includes("recommend") || lowerMessage.includes("suggest") || lowerMessage.includes("buy") || lowerMessage.includes("find") || lowerMessage.includes("want") || lowerMessage.includes("need") || lowerMessage.includes("get") || lowerResponse.includes("recommend");

            if (hasProductKeywords || category) {
                let category = "";
                if (lowerMessage.includes("fitness") || lowerMessage.includes("gym") || lowerMessage.includes("workout") || lowerResponse.includes("fitness")) {
                    category = "Sports";
                } else if (lowerMessage.includes("electronics") || lowerMessage.includes("phone") || lowerMessage.includes("watch") || lowerResponse.includes("electronics")) {
                    category = "Electronics";
                } else if (lowerMessage.includes("clothing") || lowerMessage.includes("shirt") || lowerMessage.includes("jacket") || lowerMessage.includes("shoe") || lowerMessage.includes("shoes") || lowerResponse.includes("clothing")) {
                    category = "Clothing";
                } else if (lowerMessage.includes("book") || lowerResponse.includes("book")) {
                    category = "Books";
                } else if (lowerMessage.includes("home") || lowerMessage.includes("kitchen") || lowerResponse.includes("home")) {
                    category = "Home";
                } else if (lowerMessage.includes("accessories") || lowerResponse.includes("accessories")) {
                    category = "Accessories";
                } else {
                    
                    const popularProducts = await Product.find({}).limit(5);
                    products = popularProducts;
                }

                if (category) {
                    const categoryProducts = await Product.find({ category }).limit(5);
                    products = categoryProducts;
                }
            }
        }

        res.status(200).json({ success: true, data: { response, products } });
    } catch (error) {
        console.error('Error handling chatbot message:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
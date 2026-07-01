import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMessage, sendMessage } from '../slices/chatbotSlice';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

const ChatWindow = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages, loading, error } = useSelector(state => state.chatbot);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const welcomeAdded = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    
    if (!welcomeAdded.current && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: "Hello! I'm ShopGo Assistant, the digital assistant for ShopGo. How can I assist with your shopping today?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      dispatch(addMessage(welcomeMessage));
      welcomeAdded.current = true;
    }
  }, [dispatch, messages.length]);

  const handleSend = () => {
    console.log('handleSend called, input:', input);
    if (input.trim()) {
      const userMessage = {
        id: Date.now(),
        text: input.trim(),
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      console.log('Dispatching addMessage and sendMessage');
      dispatch(addMessage(userMessage));
      dispatch(sendMessage({ messages: [...messages, userMessage], newMessage: input.trim() }));
      setInput('');
    } else {
      console.log('Input is empty, not sending');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    onClose(); 
  };

  return (
    <div className="fixed bottom-20 right-4 w-150 h-150 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col z-50">
      {}
      <div className="flex justify-between items-center p-4 border-b bg-blue-600 text-white rounded-t-lg">
        <h3 className="font-semibold text-3xl">Help.AI</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200 text-4xl">×</button>
      </div>

      {}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center text-2xl">Start a conversation!</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}>
              <p>{msg.text}</p>
              {msg.products && msg.products.length > 0 && (
                <div className="mt-2 space-y-2">
                  {msg.products.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product._id)}
                      className="flex items-center space-x-2 p-2 bg-white rounded cursor-pointer hover:bg-gray-100"
                    >
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                      <div>
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-600">₹{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs mt-1 opacity-70">{new Date(msg.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 p-3 rounded-lg">
              <LoadingSpinner size="sm" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {}
      {error && <ErrorMessage message={error} />}

      {}
      <div className="p-2 border-t flex space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message."
          className="flex-1 p-2 border border-gray-300 rounded"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-4 py-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
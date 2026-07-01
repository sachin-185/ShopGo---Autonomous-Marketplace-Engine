import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const sendMessage = createAsyncThunk(
  'chatbot/sendMessage',
  async ({ messages, newMessage }, { rejectWithValue }) => {
    try {
      console.log('Sending messages:', messages, 'newMessage:', newMessage);
      const response = await api.post('/api/chatbot/message', { messages, newMessage });
      console.log('Response:', response.data);
      return response.data?.data || {};
    } catch (error) {
      console.error('Error sending message:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState: {
    messages: [],
    loading: false,
    error: null
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
         state.loading = false;
         if (action.payload && action.payload.response) {
           const botMessage = {
             id: Date.now(),
             text: action.payload.response,
             sender: 'bot',
             timestamp: new Date().toISOString(),
             products: action.payload.products || []
           };
           state.messages.push(botMessage);
         }
       })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addMessage, clearMessages } = chatbotSlice.actions;
export default chatbotSlice.reducer;
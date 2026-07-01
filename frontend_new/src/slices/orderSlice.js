import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async ({ shippingAddress, paymentMethod, shippingMethod, items, subtotal, shippingCost, tax, total }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/orders', { shippingAddress, paymentMethod, shippingMethod, items, subtotal, shippingCost, tax, total });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to create order');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    clearOrderError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
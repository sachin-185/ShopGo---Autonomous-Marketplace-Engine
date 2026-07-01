import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/products');
      return response.data?.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/products/categories');
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data?.data || null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'product/searchProducts',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/search?query=${encodeURIComponent(query)}`);
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search products');
    }
  }
);

export const fetchRecommendations = createAsyncThunk(
  'product/fetchRecommendations',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/recommendations/${userId}`);
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recommendations');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    categories: [],
    product: null,
    searchResults: [],
    recommendations: [],
    loading: false,
    categoriesLoading: false,
    productLoading: false,
    searchLoading: false,
    recommendationsLoading: false,
    error: null,
    categoriesError: null,
    productError: null,
    searchError: null,
    recommendationsError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload || [];
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      })
      .addCase(fetchRecommendations.pending, (state) => {
        state.recommendationsLoading = true;
        state.recommendationsError = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.recommendationsLoading = false;
        state.recommendations = action.payload || [];
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.recommendationsLoading = false;
        state.recommendationsError = action.payload;
      });
  },
});

export default productSlice.reducer;
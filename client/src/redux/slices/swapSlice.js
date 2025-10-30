import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

const initialState = {
  swappableSlots: [],
  incomingRequests: [],
  outgoingRequests: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get swappable slots
export const getSwappableSlots = createAsyncThunk(
  'swap/getSwappableSlots',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('/swappable-slots');
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create swap request
export const createSwapRequest = createAsyncThunk(
  'swap/createSwapRequest',
  async (swapData, thunkAPI) => {
    try {
      const response = await API.post('/swap-request', swapData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Respond to swap request
export const respondToSwapRequest = createAsyncThunk(
  'swap/respondToSwapRequest',
  async ({ id, accepted }, thunkAPI) => {
    try {
      const response = await API.post(`/swap-response/${id}`, { accepted });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get incoming requests
export const getIncomingRequests = createAsyncThunk(
  'swap/getIncomingRequests',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('/swap-requests/incoming');
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get outgoing requests
export const getOutgoingRequests = createAsyncThunk(
  'swap/getOutgoingRequests',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('/swap-requests/outgoing');
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get swappable slots
      .addCase(getSwappableSlots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSwappableSlots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.swappableSlots = action.payload;
      })
      .addCase(getSwappableSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create swap request
      .addCase(createSwapRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSwapRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.outgoingRequests.push(action.payload);
      })
      .addCase(createSwapRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Respond to swap request
      .addCase(respondToSwapRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(respondToSwapRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomingRequests = state.incomingRequests.map((req) =>
          req._id === action.payload._id ? action.payload : req
        );
      })
      .addCase(respondToSwapRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get incoming requests
      .addCase(getIncomingRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncomingRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomingRequests = action.payload;
      })
      .addCase(getIncomingRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get outgoing requests
      .addCase(getOutgoingRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOutgoingRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.outgoingRequests = action.payload;
      })
      .addCase(getOutgoingRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = swapSlice.actions;
export default swapSlice.reducer;

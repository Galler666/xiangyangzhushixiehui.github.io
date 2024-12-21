import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminState, OrderStatistics, UserStatistics } from '../../types/admin';

const initialState: AdminState = {
  orders: [],
  users: [],
  statistics: {
    dailySales: 0,
    totalOrders: 0,
    totalUsers: 0,
    lowStock: 0,
  },
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    updateStatistics: (state, action: PayloadAction<AdminState['statistics']>) => {
      state.statistics = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setOrders, setUsers, updateStatistics, setLoading, setError } = adminSlice.actions;
export default adminSlice.reducer; 
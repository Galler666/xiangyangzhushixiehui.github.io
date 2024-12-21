import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenBalance, TokenTransaction } from '../../types';

interface TokenState {
  balance: TokenBalance | null;
  transactions: TokenTransaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TokenState = {
  balance: null,
  transactions: [],
  loading: false,
  error: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<TokenBalance>) => {
      state.balance = action.payload;
    },
    addTransaction: (state, action: PayloadAction<TokenTransaction>) => {
      state.transactions.unshift(action.payload);
    },
    updateTransactionStatus: (
      state,
      action: PayloadAction<{ id: string; status: TokenTransaction['status'] }>
    ) => {
      const transaction = state.transactions.find(t => t.id === action.payload.id);
      if (transaction) {
        transaction.status = action.payload.status;
      }
    },
  },
});

export const { setBalance, addTransaction, updateTransactionStatus } = tokenSlice.actions;
export default tokenSlice.reducer; 
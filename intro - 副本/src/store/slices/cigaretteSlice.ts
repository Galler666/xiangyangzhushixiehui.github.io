import { createSlice } from '@reduxjs/toolkit';
import { Cigarette } from '../../types';
import {
  fetchCigarettes,
  createCigarette,
  updateCigarette,
  deleteCigarette,
} from '../actions/cigaretteActions';

interface CigaretteState {
  cigarettes: Cigarette[];
  loading: boolean;
  error: string | null;
}

const initialState: CigaretteState = {
  cigarettes: [],
  loading: false,
  error: null,
};

const cigaretteSlice = createSlice({
  name: 'cigarette',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch cigarettes
    builder.addCase(fetchCigarettes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCigarettes.fulfilled, (state, action) => {
      state.cigarettes = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCigarettes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create cigarette
    builder.addCase(createCigarette.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCigarette.fulfilled, (state, action) => {
      state.cigarettes.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createCigarette.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update cigarette
    builder.addCase(updateCigarette.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCigarette.fulfilled, (state, action) => {
      const index = state.cigarettes.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.cigarettes[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updateCigarette.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete cigarette
    builder.addCase(deleteCigarette.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCigarette.fulfilled, (state, action) => {
      state.cigarettes = state.cigarettes.filter(c => c.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deleteCigarette.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default cigaretteSlice.reducer; 
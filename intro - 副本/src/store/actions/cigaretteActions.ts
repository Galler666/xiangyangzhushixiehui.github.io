import { createAsyncThunk } from '@reduxjs/toolkit';
import { cigaretteApi } from '../../services/cigaretteApi';
import { Cigarette } from '../../types';
import { ProductForm } from '../../types/admin';

export const fetchCigarettes = createAsyncThunk(
  'cigarette/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cigaretteApi.getAllCigarettes();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cigarettes');
    }
  }
);

export const createCigarette = createAsyncThunk(
  'cigarette/create',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await cigaretteApi.createCigarette(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create cigarette');
    }
  }
);

export const updateCigarette = createAsyncThunk(
  'cigarette/update',
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await cigaretteApi.updateCigarette(id, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cigarette');
    }
  }
);

export const deleteCigarette = createAsyncThunk(
  'cigarette/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await cigaretteApi.deleteCigarette(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete cigarette');
    }
  }
); 
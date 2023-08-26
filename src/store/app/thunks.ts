import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadData = createAsyncThunk<Array<string>, undefined, { rejectValue: unknown }>(
  'app/loadData',
  async (_, { rejectWithValue }) => {
    try {
      const responce = await fetch('./data.json');

      if (!responce.ok) {
        rejectWithValue('Data loading is failed');
      }

      return await responce.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../types/Recipe';

const initialState: Recipe[] = [];

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<Recipe>) => {
      state.unshift(action.payload); // Yeni tarif başa eklensin
    },
    clearHistory: () => [],
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
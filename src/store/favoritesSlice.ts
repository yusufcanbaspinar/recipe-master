import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../types/Recipe';

const initialState: Recipe[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Recipe>) => {
      if (!state.find((r) => r.id === action.payload.id)) {
        state.unshift(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      return state.filter((r) => r.id !== action.payload);
    },
    clearFavorites: () => [],
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
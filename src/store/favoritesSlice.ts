import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
  description: string;
}

interface FavoritesState {
  items: Recipe[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Recipe>) {
      if (!state.items.some(item => item.title === action.payload.title)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.title !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
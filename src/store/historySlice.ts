import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
  description: string;
}

interface HistoryState {
  items: Recipe[];
}

const initialState: HistoryState = {
  items: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory(state, action: PayloadAction<Recipe>) {
      // Aynı başlık varsa tekrar eklemesin
      if (!state.items.some(item => item.title === action.payload.title)) {
        state.items.unshift(action.payload); // Yeni tarif başa gelsin
      }
    },
    clearHistory(state) {
      state.items = [];
    },
  },
});

export const { addHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import historyReducer from './historySlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store from './index';

interface UserState {
  contact: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  contact: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserContact: (state, action: PayloadAction<string>) => {
      state.contact = action.payload;
    },
    clearUser: (state) => {
      state.contact = null;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUserContact, clearUser, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;

export const useUser = () => {
  return {
    setIsAuthenticated: (val: boolean) => store.dispatch(setIsAuthenticated(val)),
  };
};
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  contact: string | null;
}

const initialState: UserState = {
  contact: null,
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
  },
});

export const { setUserContact, clearUser } = userSlice.actions;
export default userSlice.reducer;
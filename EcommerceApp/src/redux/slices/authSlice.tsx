import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://via.placeholder.com/100',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { updateUser, logout } = authSlice.actions;
export default authSlice.reducer;

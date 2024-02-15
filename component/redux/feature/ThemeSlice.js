import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'Dcard',
  initialState: {
    data: 'light',
    isLoading: false,
   
  },

  reducers: {
    changeTheme: (state, action) => {
      state.data = action.payload;
    },


  },

});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;

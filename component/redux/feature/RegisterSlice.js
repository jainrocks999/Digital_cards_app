import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../Api';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
};

// register
export const register = createAsyncThunk('register', async (params, thunkApi) => {
  try {
    const response = await API.post('/register', params.data);

    console.log('🚀 ~ file: RegisterSlice.js:12 ~ register ~ response:', response.data.status);
    if(response.data.status){
params.navigation('Login')
alert("User Register Succesfuly")
    }
   // return response.data;
  } catch (error) {
    console.log('🚀 ~ file: RegisterSlice.js:16 ~ register ~ error:', error);
    return thunkApi.rejectWithValue(error);
  }
});

const RegisterSlice = createSlice({
  name: 'registerSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register cases
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.userData = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default RegisterSlice.reducer;

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../Api';
import ScreenNameEnum from '../../navigation/routes/screenName.enum';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
  isLogin: false,
  isLogOut: false,
};

//login
export const login = createAsyncThunk('login', async (params, thunkApi) => {
  console.log('🚀 ~ file: AuthSlice.js:12 ~ login ~ params:', params);

  try {
    const response = await API.post('/login', params.data);

    console.log(
      '🚀 ~ file: AuthSlice.js:16 ~ login ~ response:',
      response.data,
    );
    if (response.data) {
      alert('Login Successfuly')
      params.navigation.navigate(ScreenNameEnum.DRAWER_NAVIGATION);
    }

    return response.data;
  } catch (error) {
    console.log('🚀 ~ file: AuthSlice.js:16 ~ login ~ error:', error);
    return thunkApi.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('logout', async (params, thunkApi) => {
  try {
    const response = await API.post('/logout', params.data);

    console.log(
      '🚀 ~ file: AuthSlice.js:29 ~ logout ~ response:',
      response.data,
    );

    
    if (response.data.message === 'You have been successfully logged out!')
      params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
    alert('LogOut Successfuly');
  } catch (error) {
    console.log('🚀 ~ file: AuthSlice.js:32 ~ logout ~ error:', error);
    return thunkApi.rejectWithValue(error);
  }
});

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // login cases
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogin = true;
      state.isLogOut = false;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(logout.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLogin = false;
      state.isLogOut = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = true;
    });
  },
});

export default AuthSlice.reducer;

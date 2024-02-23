import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../Api';
import ScreenNameEnum from '../../navigation/routes/screenName.enum';
import {Alert} from 'react-native';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  DashBoardData: null,
  PixelList: null,
  Domainlists: null,
  VcardList:null
};
  

// register
export const dashboard = createAsyncThunk(
  'dashboard',
  async (params, thunkApi) => {

    try {
      const response = await API.get(
        `/vcards-dashboard?user_id=${params.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${params.authToken}`,
          },
        },
      );

      console.log(
        '🚀 ~ file: DashboardSlice.js:12 ~ dashboard ~ response:',
        response.data.status,
      );

      if (response.data.status) {
        console.log('User dashboard Succesfuly');
      }
      return response.data.data;
    } catch (error) {

      console.log(
        '🚀 ~ file: DashboardSlice.js:16 ~ dashboard ~ error:',
        error,
      );

      return thunkApi.rejectWithValue(error);
    }
  },
);

// create Vcard
export const CreateCard = createAsyncThunk(
  'CreateCard',
  async (params, thunkApi) => {

    try {
      const response = await API.get(
        `/vcards-dashboard?user_id=${params.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${params.authToken}`,
          },
        },
      );

      console.log(
        '🚀 ~ file: CreateCard.js:12 ~ CreateCard ~ response:',
        response.data.status,
      );

      if (response.data.status) {
        // params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        console.log('User CreateCard Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: CreateCard.js:16 ~ CreateCard ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
// Pixls List
export const PixlsList = createAsyncThunk(
  'PixlsList',
  async (params, thunkApi) => {

    try {
      const response = await API.get(`/pixel-list?user_id=${params.user_id}`, {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: CreateCard.js:12 ~ PixlsList ~ response:',
        response.data.status,
      );

      if (response.data.status) {
        // params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        console.log('User PixlsList Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: PixlsList.js:16 ~ PixlsList ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

// Project List
export const ProjectList = createAsyncThunk(
  'ProjectList',
  async (params, thunkApi) => {

    try {
      const response = await API.get(`/project-list?user_id=${params.user_id}`, {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: ProjectList.js:12 ~ ProjectList ~ response:',
        response.data,
      );

      if (response.data.status) {
        // params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        console.log('User ProjectList Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: ProjectList.js:16 ~ ProjectList ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
// Domain List
export const DomainList = createAsyncThunk(
  'DomainList',
  async (params, thunkApi) => {

    try {
      const response = await API.get(`/connect-domain-list?user_id=${params.user_id}`, {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: DomainList.js:12 ~ DomainList ~ response:',
        response.data,
      );

      if (response.data.status) {
      
        // params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        console.log('User DomainList Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: DomainList.js:16 ~ DomainList ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
// Vcard_delete
export const Vcard_delete = createAsyncThunk(
  'Vcard_delete',
  async (params, thunkApi) => {

    try {
      const response = await API.get(`/vcards-destroy?user_id=${params.user_id}&vcard_id=${params.id}`, {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: Vcard_delete.js:12 ~ Vcard_delete ~ response:',
        response.data,
      );

      if (response.data.status) {
        // params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        alert('Vcard Delete successfully.')
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Vcard_delete.js:16 ~ Vcard_delete ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

const FeatureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // DashboardSlice cases
    builder.addCase(dashboard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(dashboard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.DashBoardData = action.payload;
     state.VcardList =action.payload.vcardlists

    });
    builder.addCase(dashboard.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    // PixelList cases
    builder.addCase(PixlsList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(PixlsList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.PixelList = action.payload;
    });
    builder.addCase(PixlsList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    // Project cases
    builder.addCase(ProjectList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(ProjectList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.ProjectList = action.payload;
    });
    builder.addCase(ProjectList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    // Domain cases
    builder.addCase(DomainList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(DomainList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Domainlists = action.payload;
    });
    builder.addCase(DomainList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    // Vcard_delete cases
    builder.addCase(Vcard_delete.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Vcard_delete.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
       state.VcardList = state.VcardList.filter((item) => item.id !== action.meta.arg.id);
   
      
    });
    builder.addCase(Vcard_delete.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default FeatureSlice.reducer;

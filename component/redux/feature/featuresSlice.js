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
  VcardList:null,
  ProjectList:null,
  DownloadCardData:null,
  BlockList:null,

};
  

// dashboard
export const dashboard = createAsyncThunk(
  'dashboard',
  async (params, thunkApi) => {
console.log('dashboard called=>>>>>',params);
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
export const Create_Card = createAsyncThunk(
  'Create_Card',
  async (params, thunkApi) => {
console.log('create_vcards=>>>>>>>>>',params);
    try {
      const response = await API.post('/vcards-store',
        params.data
        ,
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
         params.navigation.navigate(ScreenNameEnum.VCARD_SCREEN);
         Alert.alert(
          'Success!',
          'Card created successfully.',
          [
            { text: 'OK',  },
          ],
          { cancelable: false }
        );
      }

      if(response.data.status === false){
        Alert.alert(
          'Failed!',
          `Card created Failed.${response.data.message}`,
          [
            { text: 'OK',  },
          ],
          { cancelable: false }
        );
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: CreateCard.js:16 ~ CreateCard ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
// Vcard_delete
export const Vcard_delete = createAsyncThunk(
  'Vcard_delete',
  async (params, thunkApi) => {
console.log('vcards =>>>>>',params);
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
// Edit_vcard
export const Vcard_Edit = createAsyncThunk(
  'Vcard_Edit',
  async (params, thunkApi) => {
console.log('Vcard_Edit=>>>>>>>>>>',params);
    try {
      const response = await API.post('/vcards-update',
      params.data, 
      {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      }
    );

      console.log(
        '🚀 ~ file: Vcard_Edit.js:12 ~ Vcard_Edit ~ response:',
        response.data,
      );

      if (response.data.status) {
        params.navigation.navigate(ScreenNameEnum.VCARD_SCREEN);
        ProjectList(params)
        alert('Vcard Edit successfully.')
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Vcard_Edit.js:16 ~ Vcard_Edit ~ error:', error);

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


// create Project

export const CreateProject = createAsyncThunk(
  'CreateProject',
  async (params, thunkApi) => {
    try {
      console.log('=>>>>>>>>>>>>>>>>>>> Called project create',params);
      
      // Make the API call
      const response = await API.post('/project-store',
        params.data, 
        {
          headers: {
            Authorization: `Bearer ${params.authToken}`,
          },
        }
      );

      console.log(
        '🚀 ~ file: CreateProject.js:12 ~ CreateProject ~ response:',
        response.data.status,
      );

      // Check the response status and log a success message
      if (response.data.status) {
        params.navigation.navigate(ScreenNameEnum.PROJECT_SCREEN)
       alert('CreateProject Successfully');
      }

      // Return the data from the response
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: CreateProject.js:16 ~ CreateProject ~ error:', error);

      // If an error occurs, reject the promise with the error value
      return thunkApi.rejectWithValue(error);
    }
  }
);


//delete Project
export const Project_delete = createAsyncThunk(
  'Project_delete',
  async (params, thunkApi) => {

    try {
      const response = await API.get(`/project-destroy?project_id=${params.id}&user_id=${params.user_id}`, {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: Project_delete.js:12 ~ Project_delete ~ response:',
        response.data,
      );

      if (response.data.status) {
        // params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        alert('Project Delete successfully.')
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Project_delete.js:16 ~ Project_delete ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
//Edit Project
export const Project_Edit = createAsyncThunk(
  'Project_Edit',
  async (params, thunkApi) => {
console.log('project_edit=>>>>>>>>>>',params);
    try {
      const response = await API.post('/project-update',
      params.data,
       {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: Project_Edit.js:12 ~ Project_Edit ~ response:',
        response.data,
      );

      if (response.data.status) {
        params.navigation.navigate(ScreenNameEnum.PROJECT_SCREEN);
        ProjectList(params)
        alert('Project Edit successfully.')
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Project_Edit.js:16 ~ Project_Edit ~ error:', error);

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
        '🚀 ~ file: PixlsList.js:12 ~ PixlsList ~ response:',
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

// create Pixel
export const CreatePixel= createAsyncThunk(
  'CreatePixel',
  async (params, thunkApi) => {
    try {
      console.log('=>>>>>>>>>>>>>>>>>>> Called CreatePixel create',params.data);
      
      // Make the API call
      const response = await API.post('/pixel-store',
        params.data, 
        {
          headers: {
            Authorization: `Bearer ${params.authToken}`,
          },
        }
      );

      console.log(
        '🚀 ~ file: CreatePixel.js:12 ~ CreatePixel ~ response:',
        response.data,
      );

      // Check the response status and log a success message
      if (response.data.status) {
        params.navigation.navigate(ScreenNameEnum.PIXELS_SCREEN)
       alert('CreatePixel Successfully');
      }

      // Return the data from the response
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: CreatePixel.js:16 ~ CreatePixel ~ error:', error);

      // If an error occurs, reject the promise with the error value
      return thunkApi.rejectWithValue(error);
    }
  }
);
//delete Pixel
export const Pixel_delete = createAsyncThunk(
  'Pixel_delete',
  async (params, thunkApi) => {

    try {
      const response = await API.get(`/pixel-destroy?user_id=${params.user_id}&pixel_id=${params.id}`, {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: Pixel_delete.js:12 ~ Pixel_delete ~ response:',
        response.data,
      );

      if (response.data.status) {
        // params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        alert('Pixel Delete successfully.')
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Pixel_delete.js:16 ~ Pixel_delete ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
// Pixel_edit
export const Pixel_Edit = createAsyncThunk(
  'Pixel_Edit',
  async (params, thunkApi) => {
console.log('Pixel_Edit=>>>>>>>>>>',params);
    try {
      const response = await API.post('/pixel-update',
      params.data, 
      {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      }
    );

      console.log(
        '🚀 ~ file: Pixel_Edit.js:12 ~ Pixel_Edit ~ response:',
        response.data,
      );

      if (response.data.status) {
        params.navigation.navigate(ScreenNameEnum.PIXELS_SCREEN);
        ProjectList(params)
        alert('Pixel Edit successfully.')
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Pixel_Edit.js:16 ~ Pixel_Edit ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
//delete connectDomain
export const Domain_delete = createAsyncThunk(
  'Domain_delete',
  async (params, thunkApi) => {

    try {
      const response = await API.get(`/connect-domain-destroy?user_id=${params.user_id}&cd_id=${params.id}`, {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: Domain_delete.js:12 ~ Domain_delete ~ response:',
        response.data,
      );

      if (response.data.status) {
        // params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        alert('Domain Delete successfully.')
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Domain_delete.js:16 ~ Domain_delete ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

// create DomainConnection
export const CreateDomain= createAsyncThunk(
  'CreateDomain',
  async (params, thunkApi) => {
    try {
      console.log('=>>>>>>>>>>>>>>>>>>> Called CreatePixel create',params.data);
      
      // Make the API call
      const response = await API.post('/connect-domain-store',
        params.data, 
        {
          headers: {
            Authorization: `Bearer ${params.authToken}`,
          },
        }
      );

      console.log(
        '🚀 ~ file: CreateDomain.js:12 ~ CreateDomain ~ response:',
        response.data,
      );

      // Check the response status and log a success message
      if (response.data.status) {
        params.navigation.navigate(ScreenNameEnum.CUSTOMDOMAIN_SCREEN)
       alert('CreateDomain Successfully');
      }

      // Return the data from the response
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: CreateDomain.js:16 ~ CreateDomain ~ error:', error);

      // If an error occurs, reject the promise with the error value
      return thunkApi.rejectWithValue(error);
    }
  }
);

// Domain
export const Domain_Edit = createAsyncThunk(
  'Domain_Edit',
  async (params, thunkApi) => {
console.log('Domain_Edit=>>>>>>>>>>',params);
    try {
      const response = await API.post('/connect-domain-update',
      params.data, 
      {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      }
    );

      console.log(
        '🚀 ~ file: Domain_Edit.js:12 ~ Domain_Edit ~ response:',
        response.data,
      );

      if (response.data.status) {
        params.navigation.navigate(ScreenNameEnum.CUSTOMDOMAIN_SCREEN);
        DomainList(params)
        alert('Domain Edit successfully.')
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Domain_Edit.js:16 ~ Domain_Edit ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);


// Block List
export const Block_List = createAsyncThunk(
  'Block_List',
  async (params, thunkApi) => {
console.log('show block list ', params);
    try {
      const response = await API.get(`/block-list?user_id=${params.user_id}`, {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: Block_List.js:12 ~ Block_List ~ response:',
        response.data.status,
      );

      if (response.data.status) {
        // params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        console.log('User Block_List Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Block_List.js:16 ~ Block_List ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

// create Block


export const CreateBlock = createAsyncThunk(
  'createBlock',
  async (params, thunkApi) => {
    console.log('=>>>>>>>>>>>>>>>>>inside>> Called CreateBlock create', params.data);
    try {

      // Make the API call
      const response = await API.post('/block-add',
        params.data,
        {
          headers: {
            Authorization: `Bearer ${params.authToken}`,
          },
        }
      );

      console.log('🚀 ~ file: CreateBlock.js:12 ~ createBlock ~ response:', response.data);

      // Check the response status and log a success message
      if (response.data.status) {
        // You can handle successful response data here if needed
      }

      // Return the data from the response
      return response.data.data;
    } catch (error) {
      console.error('🚀 ~ file: CreateBlock.js:16 ~ createBlock ~ error:', error);

      // Customize error handling based on the status code or other criteria
      if (error.response) {
        if (error.response.status === 401) {
          // Handle unauthorized access
          alert('Unauthorized access');
        } else if (error.response.status === 500) {
          // Handle server error
          alert('Server error');
        } else {
          // Handle other status codes
          console.error(`Unexpected error with status code ${error.response.status}`);
        }
      } else {
        // Handle other types of errors
        console.error('Unexpected error:', error.message);
      }

      // If an error occurs, reject the promise with the error value
      return thunkApi.rejectWithValue(error);
    }
  }
);
//delete Block
export const Blockdelete = createAsyncThunk(
  'Blockdelete',
  async (params, thunkApi) => {

    try {
      const response = await API.get(`/block-destroy?user_id=${params.user_id}&block_id=${params.id}`, {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: Blockdelete.js:12 ~ Blockdelete ~ response:',
        response.data,
      );

      if (response.data.status) {
        // params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        alert('Blockdelete Delete successfully.')
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Blockdelete.js:16 ~ Blockdelete ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

//Edit Block
export const Block_Edit = createAsyncThunk(
  'Block_Edit',
  async (params, thunkApi) => {
console.log('Block_Edit=>>>>>>>>>>',params);
    try {
      const response = await API.post('/block-update',
      params.data,
       {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: Block_Edit.js:12 ~ Block_Edit ~ response:',
        response.data,
      );

      if (response.data.status) {
     
        alert('Block Update successfully.')
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Block_Edit.js:16 ~ Block_Edit ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

// download Vcard
export const Download_VCard = createAsyncThunk(
  'Download_VCard',
  async (params, thunkApi) => {

    try {
      const response = await API.get(`/vcards-download?user_id=${params.user_id}`, {
        headers: {
          Authorization: `Bearer ${params.authToken}`,
        },
      });

      console.log(
        '🚀 ~ file: Download_VCard.js:12 ~ Download_VCard ~ response:',
        response.data.status,
      );

      if (response.data.status) {
        // params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
       
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ file: Download_VCard.js:16 ~ Download_VCard ~ error:', error);

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
    // Project_delete cases
    builder.addCase(Project_delete.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Project_delete.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.ProjectList= state.ProjectList.filter((item) => item.id !== action.meta.arg.id);
   
      
    });
    builder.addCase(Project_delete.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    // Create-Project cases
    builder.addCase(CreateProject.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(CreateProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
      
    });
    builder.addCase(CreateProject.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    //project edit 
    builder.addCase(Project_Edit.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Project_Edit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
      
    });
    builder.addCase(Project_Edit.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    //pixel create 
    builder.addCase(CreatePixel.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(CreatePixel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
      
    });
    builder.addCase(CreatePixel.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    //vcards create 
    builder.addCase(Create_Card.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Create_Card.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
      
    });
    builder.addCase(Create_Card.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    // Pixel delete
    builder.addCase(Pixel_delete.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Pixel_delete.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.PixelList= state.PixelList.filter((item) => item.id !== action.meta.arg.id);
   
      
    });
    builder.addCase(Pixel_delete.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    //pixel delete
    builder.addCase(Pixel_Edit.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Pixel_Edit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
      
    });
    builder.addCase(Pixel_Edit.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

       // Domain_delete 
       builder.addCase(Domain_delete.pending, state => {
        state.isLoading = true;
      });
      builder.addCase(Domain_delete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Domainlists= state.Domainlists.filter((item) => item.id !== action.meta.arg.id);
     
        
      });
      builder.addCase(Domain_delete.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
       // Domain_create 
       builder.addCase(CreateDomain.pending, state => {
        state.isLoading = true;
      });
      builder.addCase(CreateDomain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Domainlists= state.Domainlists.filter((item) => item.id !== action.meta.arg.id);
     
        
      });
      builder.addCase(CreateDomain.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
       //Domain edit 
    builder.addCase(Domain_Edit.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Domain_Edit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
      
    });
    builder.addCase(Domain_Edit.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

     // Block cases
     builder.addCase(Block_List.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Block_List.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.BlockList = action.payload;
    });
    builder.addCase(Block_List.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    // create block
    builder.addCase(CreateBlock.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(CreateBlock.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
      
    });
    builder.addCase(CreateBlock.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
       // Block_Delete cases
       builder.addCase(Blockdelete.pending, state => {
        state.isLoading = true;
      });
      builder.addCase(Blockdelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.BlockList= state.BlockList.filter((item) => item.id !== action.meta.arg.id);
     
        
      });
      builder.addCase(Blockdelete.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
        // Block edit 
    builder.addCase(Block_Edit.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Block_Edit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
      
    });
    builder.addCase(Block_Edit.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    // edit cards
    builder.addCase(Vcard_Edit.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Vcard_Edit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
      
    });
    builder.addCase(Vcard_Edit.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    //download vcard
    builder.addCase(Download_VCard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Download_VCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.DownloadCardData = action.payload;
    

    });
    builder.addCase(Download_VCard.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    


  },
});

export default FeatureSlice.reducer;

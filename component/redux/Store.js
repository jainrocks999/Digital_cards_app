
import ThemeReducer from "./feature/ThemeSlice";
import AuthReducer from "./feature/authSlice";
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import RegisterReducer  from "./feature/RegisterSlice";
import  FeatureReducer  from "./feature/featuresSlice";


const reducers = combineReducers({
    theme:ThemeReducer,
    auth:AuthReducer,
    register:RegisterReducer,
    feature:FeatureReducer
  
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth','register','theme'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);
export {store, persistor};

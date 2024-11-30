import { configureStore } from '@reduxjs/toolkit';
import  userReducer from '../redux/user/userSlice.js';
import storage from 'redux-persist/lib/storage';
import {persistedReducer, persistStore} from 'redux-persist';


const rootReducer = combineReducer({user:userReducer})
const persistConfig ={
  key:'root',
  storage,
  version:1,
}

const persistedReducer =persistedReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultmiddleware) =>
    getDefaultmiddleware({
        serializableCheck:false,
    }),
})

export const persistor = persistStore(store)
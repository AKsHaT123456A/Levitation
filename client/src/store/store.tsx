import { configureStore } from '@reduxjs/toolkit';
import formReducer from './userSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;

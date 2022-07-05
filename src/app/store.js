import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import bitcashReducer from '../features/bitcash/bitcashSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bitcash: bitcashReducer
  },
});

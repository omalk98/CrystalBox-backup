import { configureStore } from '@reduxjs/toolkit';
import Reducers from './Reducers';

const Store = configureStore({
  reducer: Reducers
});

export default Store;

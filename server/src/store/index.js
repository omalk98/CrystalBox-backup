import { configureStore } from '@reduxjs/toolkit';
import Reducers from './reducers';

const Store = configureStore({
  reducer: Reducers
});

export default Store;

import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slicers/auth';

const store = configureStore({
  reducer: { auth: authSlice },
});

export default store;

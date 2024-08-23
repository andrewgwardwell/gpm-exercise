// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import incidentsReducer from '../features/incidents/incidentsSlice';

const store = configureStore({
  reducer: {
    incidents: incidentsReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import familyReducer from './slices/familySlice';

export const store = configureStore({
  reducer: {
    family: familyReducer,
  },
});

// Tipleri dışarı aktaralım (hooks.ts'de kullandık)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
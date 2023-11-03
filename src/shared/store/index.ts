import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { calculateMortgageReducer } from '../../feature/calculate-mortgage/redux/calculate-mortgage-slice.ts';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    calculateMortgage: calculateMortgageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

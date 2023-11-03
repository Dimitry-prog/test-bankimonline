import { createSlice } from '@reduxjs/toolkit';

type CalculateMortgageState = {
  price: string;
  initialFee: string;
  deadline: string;
  monthlyPayment: string;
};

const initialState: CalculateMortgageState = {
  price: '1000000',
  initialFee: '500000',
  deadline: '30',
  monthlyPayment: '2684',
};

const calculateMortgageSlice = createSlice({
  name: 'calculateMortgage',
  initialState,
  reducers: {
    updateState: (state, { payload }) => {
      Object.assign(state, payload);
    },
  },
});

export const { reducer: calculateMortgageReducer, actions: calculateMortgageActions } =
  calculateMortgageSlice;

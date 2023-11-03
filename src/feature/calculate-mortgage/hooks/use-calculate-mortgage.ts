import { ChangeEvent } from 'react';
import { MAX_PERCENT, MIN_PERCENT } from '../utils/constants.ts';
import { useAppDispatch, useAppSelector } from '../../../shared/store';
import { calculateMortgageActions } from '../redux/calculate-mortgage-slice.ts';
import { formatStringToNumber } from '../../../shared/libs/format-string-to-number.ts';

export const useCalculateMortgage = () => {
  const price = useAppSelector((state) => state.calculateMortgage.price);
  const initialFee = useAppSelector((state) => state.calculateMortgage.initialFee);
  const dispatch = useAppDispatch();

  const percentFinancing = (
    (formatStringToNumber(initialFee) / formatStringToNumber(price)) *
    100
  ).toFixed();
  const deadlineMinValue = (formatStringToNumber(price) * 0.1).toFixed();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = {
      [name]: value,
    };
    dispatch(calculateMortgageActions.updateState(field));
  };

  const handleBlur = () => {
    if (parseInt(percentFinancing) < MIN_PERCENT) {
      const field = {
        initialFee: deadlineMinValue,
      };
      dispatch(calculateMortgageActions.updateState(field));
    }
    if (parseInt(percentFinancing) > MAX_PERCENT) {
      const field = {
        initialFee: price,
      };
      dispatch(calculateMortgageActions.updateState(field));
    }
  };

  return {
    percentFinancing,
    deadlineMinValue,
    onChange: handleChange,
    onBlur: handleBlur,
  };
};

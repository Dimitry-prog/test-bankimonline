import { ChangeEvent } from 'react';
import { formatStringToNumber } from '../../../shared/libs/format-string-to-number.ts';
import { MAX_PERCENT, MIN_PERCENT, NUMBER_OF_MONTHS_IN_YEAR } from '../utils/constants.ts';
import { useAppDispatch, useAppSelector } from '../../../shared/store';
import { calculateMortgageActions } from '../redux/calculate-mortgage-slice.ts';
import { useCalculateMonthlyPayment } from './use-calculate-monthly-payment.ts';

export const useCalculateMortgage = () => {
  const price = useAppSelector((state) => state.calculateMortgage.price);
  const initialFee = useAppSelector((state) => state.calculateMortgage.initialFee);
  const deadline = useAppSelector((state) => state.calculateMortgage.deadline);
  const monthlyPayment = useAppSelector((state) => state.calculateMortgage.monthlyPayment);
  const { credit, monthlyInterestRate } = useCalculateMonthlyPayment();
  const dispatch = useAppDispatch();

  const percentFinancing = (
    (formatStringToNumber(initialFee) / formatStringToNumber(price)) *
    100
  ).toFixed();
  const deadlineMinValue = (formatStringToNumber(price) * 0.1).toFixed().toString();
  // const deadlinePayment =
  //   Math.log(
  //     (parseInt(monthlyPayment) * (1 - monthlyInterestRate)) / (credit * monthlyInterestRate)
  //   ) / Math.log(1 + monthlyInterestRate * NUMBER_OF_MONTHS_IN_YEAR);
  // const deadline = Math.floor(deadlinePayment).toString();
  const deadlinePayment = Math.floor(
    Math.log(
      (parseInt(monthlyPayment) * (1 - monthlyInterestRate)) / (credit * monthlyInterestRate)
    ) / Math.log(1 + monthlyInterestRate * NUMBER_OF_MONTHS_IN_YEAR)
  ).toString();
  const newMonthlyPayment = (
    (credit * monthlyInterestRate) /
    (1 -
      Math.pow(1 + monthlyInterestRate, -formatStringToNumber(deadline) * NUMBER_OF_MONTHS_IN_YEAR))
  ).toFixed();
  console.log('deadlinePayment', deadlinePayment);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'monthlyPayment') {
      const field = {
        deadline: deadlinePayment,
      };
      dispatch(calculateMortgageActions.updateState(field));
    }
    if (name === 'deadline') {
      const field = {
        monthlyPayment: newMonthlyPayment,
      };
      dispatch(calculateMortgageActions.updateState(field));
    }
    // else {
    //   const field = {
    //     [name]: value,
    //   };
    //   dispatch(calculateMortgageActions.updateState(field));
    // }
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

  // useEffect(() => {
  //   const field = {
  //     deadline: deadlinePayment,
  //   };
  //   dispatch(calculateMortgageActions.updateState(field));
  // }, [monthlyPayment]);

  return {
    percentFinancing,
    deadlineMinValue,
    onChange: handleChange,
    onBlur: handleBlur,
  };
};

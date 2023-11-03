import {
  INTEREST_RATE,
  MAX_PAYMENT_DEADLINE,
  MIN_PAYMENT_DEADLINE,
  NUMBER_OF_MONTHS_IN_YEAR,
} from '../utils/constants.ts';
import { formatStringToNumber } from '../../../shared/libs/format-string-to-number.ts';
import { useAppDispatch, useAppSelector } from '../../../shared/store';

export const useCalculateMonthlyPayment = () => {
  const price = useAppSelector((state) => state.calculateMortgage.price);
  const initialFee = useAppSelector((state) => state.calculateMortgage.initialFee);
  const deadline = useAppSelector((state) => state.calculateMortgage.deadline);
  // const monthlyPayment = useAppSelector((state) => state.calculateMortgage.monthlyPayment);
  const dispatch = useAppDispatch();

  const credit = formatStringToNumber(price) - formatStringToNumber(initialFee);
  const monthlyInterestRate = INTEREST_RATE / NUMBER_OF_MONTHS_IN_YEAR;

  const newMonthlyPayment = (
    (credit * monthlyInterestRate) /
    (1 -
      Math.pow(1 + monthlyInterestRate, -formatStringToNumber(deadline) * NUMBER_OF_MONTHS_IN_YEAR))
  ).toFixed();
  // const deadlinePayment = Math.floor(
  //   Math.log(
  //     (parseInt(monthlyPayment) * (1 - monthlyInterestRate)) / (credit * monthlyInterestRate)
  //   ) / Math.log(1 + monthlyInterestRate * NUMBER_OF_MONTHS_IN_YEAR)
  // ).toString();
  // console.log('deadlinePayment', deadlinePayment);
  const monthlyMaxPayment = (
    (credit * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -MIN_PAYMENT_DEADLINE))
  ).toFixed();
  const monthlyMinPayment = (
    (credit * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -MAX_PAYMENT_DEADLINE))
  ).toFixed();

  // useEffect(() => {
  //   const field = {
  //     monthlyPayment: newMonthlyPayment,
  //   };
  //   dispatch(calculateMortgageActions.updateState(field));
  // }, [price, initialFee, deadline]);

  // useEffect(() => {
  //   const field = {
  //     deadline: deadlinePayment,
  //   };
  //   dispatch(calculateMortgageActions.updateState(field));
  // }, [monthlyPayment]);

  return {
    monthlyPayment: newMonthlyPayment,
    monthlyMaxPayment,
    monthlyMinPayment,
    monthlyInterestRate,
    credit,
  };
};

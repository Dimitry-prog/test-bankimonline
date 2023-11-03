import * as yup from 'yup';

export const mortgageSchema = yup.object({
  price: yup
    .number()
    .positive('Сумма должна быть больше нуля')
    .typeError('Должно быть число')
    .required('Поле обязательное'),
  initialFee: yup
    .number()
    .positive('Сумма должна быть больше нуля')
    .typeError('Должно быть число')
    .required('Поле обязательное'),
  deadline: yup
    .number()
    .positive('Сумма должна быть больше нуля')
    .typeError('Должно быть число')
    .required('Поле обязательное'),
  monthlyPayment: yup
    .number()
    .positive('Сумма должна быть больше нуля')
    .typeError('Должно быть число')
    .required('Поле обязательное'),
});

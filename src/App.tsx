import Button from './shared/ui/button';
import { ChangeEvent, useEffect, useState } from 'react';
import { formatStringToNumber } from './shared/libs/format-string-to-number.ts';
import { useAppSelector } from './shared/store';
import Mortgage from './feature/calculate-mortgage/components/mortgage';

const App = () => {
  const [formData, setFormData] = useState({
    cost: '1000000',
    contribution: '500000',
    term: '30',
    payment: '0',
  });
  const state = useAppSelector((state) => state.calculateMortgage);
  console.log(state);

  const percentFinancing = (
    (formatStringToNumber(formData.contribution) / formatStringToNumber(formData.cost)) *
    100
  ).toFixed();
  const contributionMinValue = (formatStringToNumber(formData.cost) * 0.1).toFixed().toString();
  const credit = formatStringToNumber(formData.cost) - formatStringToNumber(formData.contribution);
  const monthlyInterestRate = 0.05 / 12;
  const monthlyPayment = (
    (credit * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -formatStringToNumber(formData.term) * 12))
  ).toFixed();
  // console.log('monthlyPayment', monthlyPayment);
  const monthlyMaxPayment = (
    (credit * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -48))
  ).toFixed();
  const monthlyMinPayment = (
    (credit * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -360))
  ).toFixed();
  // const paymentValue = monthlyPayment;
  // console.log('monthlyMinPayment', monthlyMinPayment);
  // console.log(monthlyPayment);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    if (parseInt(percentFinancing) < 10) {
      setFormData((prev) => ({
        ...prev,
        contribution: contributionMinValue,
      }));
    }
    if (parseInt(percentFinancing) > 100) {
      setFormData((prev) => ({
        ...prev,
        contribution: prev.cost,
      }));
    }
  };

  // console.log(formData);

  useEffect(() => {
    const credit =
      formatStringToNumber(formData.cost) - formatStringToNumber(formData.contribution);
    const monthlyInterestRate = 0.05 / 12;
    const newMonthlyPayment = (
      (credit * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -formatStringToNumber(formData.term) * 12))
    ).toFixed();
    setFormData((prev) => ({ ...prev, payment: newMonthlyPayment }));
  }, [formData.cost, formData.contribution, formData.term]);

  return (
    <main className="">
      <section className="w-full flex flex-col gap-8">
        <div className="max-w-[1130px] w-full mx-auto pt-[120px] px-5 md:px-[55px] flex flex-col gap-8">
          <h1 className="text-xl md:text-2xl font-roboto">Рассчитайте ипотеку быстро и просто</h1>
          {/*<div className="flex flex-col md:flex-row gap-8 md:gap-y-6 md:gap-x-16 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">*/}
          {/*  <InputClassic*/}
          {/*    name="cost"*/}
          {/*    value={formatNumber(formData.cost)}*/}
          {/*    onChange={handleChange}*/}
          {/*    onBlur={handleBlur}*/}
          {/*    label="Стоимость недвижимости"*/}
          {/*  />*/}
          {/*  <Dropdown*/}
          {/*    label="Город покупки недвижимости"*/}
          {/*    placeholder="Выберите город"*/}
          {/*    isSearch*/}
          {/*    options={COUNTRY_MOCK}*/}
          {/*  />*/}
          {/*  <Dropdown*/}
          {/*    label="Когда вы планируете оформить ипотеку?"*/}
          {/*    placeholder="Выберите период"*/}
          {/*    options={MORTGAGE_MOCK}*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<div className="flex flex-col md:flex-row gap-8 md:gap-y-6 md:gap-x-16 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">*/}
          {/*  <InputRange*/}
          {/*    name="contribution"*/}
          {/*    valueInput={formatNumber(formData.contribution)}*/}
          {/*    valueRange={formData.contribution}*/}
          {/*    onChange={handleChange}*/}
          {/*    onBlur={handleBlur}*/}
          {/*    min={removeSpaces(contributionMinValue)}*/}
          {/*    max={removeSpaces(formData.cost)}*/}
          {/*    step="10000"*/}
          {/*    label="Первоначальный взнос"*/}
          {/*    isCurrency*/}
          {/*    infoMsg={*/}
          {/*      <>*/}
          {/*        <p>*/}
          {/*          Cумма финансирования:{' '}*/}
          {/*          <span className="font-arial font-bold">*/}
          {/*            {formatNumber(formData.contribution)} ₪*/}
          {/*          </span>*/}
          {/*        </p>*/}
          {/*        <p>*/}
          {/*          Процент финансирования:{' '}*/}
          {/*          <span className="font-arial font-bold">{percentFinancing}%</span>*/}
          {/*        </p>*/}
          {/*      </>*/}
          {/*    }*/}
          {/*  />*/}
          {/*  <Dropdown*/}
          {/*    label="Тип недвижимости"*/}
          {/*    placeholder="Выберите тип недвижимости"*/}
          {/*    options={PROPERTY_MOCK}*/}
          {/*  />*/}
          {/*  <Dropdown*/}
          {/*    label="Вы уже владеете недвижимостью?"*/}
          {/*    placeholder="Выберите ответ"*/}
          {/*    options={OWNER_ESTATE_MOCK}*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<div*/}
          {/*  className="flex flex-col md:flex-row gap-8 md:gap-y-6 md:gap-x-16 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6 pt-6*/}
          {/*  gap-8 border-t border-base-stroke"*/}
          {/*>*/}
          {/*  <InputRange*/}
          {/*    name="term"*/}
          {/*    valueInput={formatNumber(formData.term)}*/}
          {/*    valueRange={formData.term}*/}
          {/*    onChange={handleChange}*/}
          {/*    min="4"*/}
          {/*    max="30"*/}
          {/*    step="1"*/}
          {/*    label="Срок"*/}
          {/*    minText="4 года"*/}
          {/*    maxText="30 лет"*/}
          {/*  />*/}
          {/*  <InputRange*/}
          {/*    name="payment"*/}
          {/*    valueInput={formatNumber(formData.payment)}*/}
          {/*    valueRange={formData.payment}*/}
          {/*    onChange={handleChange}*/}
          {/*    min={removeSpaces(monthlyMinPayment)}*/}
          {/*    max={removeSpaces(monthlyMaxPayment)}*/}
          {/*    step="1"*/}
          {/*    label="Ежемесячный платеж"*/}
          {/*    infoMsg="Увеличьте ежемесячный платеж и переплачивайте меньше"*/}
          {/*    isCurrencyIcon*/}
          {/*    minText={formatNumber(monthlyMinPayment)}*/}
          {/*    maxText={formatNumber(monthlyMaxPayment)}*/}
          {/*  />*/}
          {/*</div>*/}
          <Mortgage />
        </div>

        <div className="py-6 border-t border-base-stroke bg-base-secondary md:bg-base-primary">
          <div className="max-w-[1130px] mx-auto px-5 md:px-[55px] flex justify-end">
            <Button type="button">Продолжить</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;

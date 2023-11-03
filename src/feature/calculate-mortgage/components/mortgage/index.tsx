import InputClassic from '../../../../shared/ui/inputs/input-classic';
import { formatNumber } from '../../../../shared/libs/format-number.ts';
import Dropdown from '../../../../shared/ui/dropdown';
import {
  COUNTRY_MOCK,
  MORTGAGE_MOCK,
  OWNER_ESTATE_MOCK,
  PROPERTY_MOCK,
} from '../../../../shared/utils/constants.ts';
import InputRange from '../../../../shared/ui/inputs/input-range';
import { removeSpaces } from '../../../../shared/libs/remove-spaces.ts';
import { useCalculateMortgage } from '../../hooks/use-calculate-mortgage.ts';
import { useAppSelector } from '../../../../shared/store';
import { useCalculateMonthlyPayment } from '../../hooks/use-calculate-monthly-payment.ts';

const Mortgage = () => {
  const price = useAppSelector((state) => state.calculateMortgage.price);
  const initialFee = useAppSelector((state) => state.calculateMortgage.initialFee);
  const deadline = useAppSelector((state) => state.calculateMortgage.deadline);
  const monthlyPayment = useAppSelector((state) => state.calculateMortgage.monthlyPayment);
  const { percentFinancing, deadlineMinValue, onBlur, onChange } = useCalculateMortgage();
  const { monthlyMinPayment, monthlyMaxPayment } = useCalculateMonthlyPayment();

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 md:gap-y-6 md:gap-x-16 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
        <InputClassic
          name="price"
          value={formatNumber(price)}
          onChange={onChange}
          onBlur={onBlur}
          label="Стоимость недвижимости"
        />
        <Dropdown
          label="Город покупки недвижимости"
          placeholder="Выберите город"
          isSearch
          options={COUNTRY_MOCK}
        />
        <Dropdown
          label="Когда вы планируете оформить ипотеку?"
          placeholder="Выберите период"
          options={MORTGAGE_MOCK}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-y-6 md:gap-x-16 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
        <InputRange
          name="initialFee"
          valueInput={formatNumber(initialFee)}
          valueRange={initialFee}
          onChange={onChange}
          onBlur={onBlur}
          min={removeSpaces(deadlineMinValue)}
          max={removeSpaces(price)}
          step="10000"
          label="Первоначальный взнос"
          isCurrency
          infoMsg={
            <>
              <p>
                Cумма финансирования:{' '}
                <span className="font-arial font-bold">{formatNumber(initialFee)} ₪</span>
              </p>
              <p>
                Процент финансирования:{' '}
                <span className="font-arial font-bold">{percentFinancing}%</span>
              </p>
            </>
          }
        />
        <Dropdown
          label="Тип недвижимости"
          placeholder="Выберите тип недвижимости"
          options={PROPERTY_MOCK}
        />
        <Dropdown
          label="Вы уже владеете недвижимостью?"
          placeholder="Выберите ответ"
          options={OWNER_ESTATE_MOCK}
        />
      </div>
      <div
        className="flex flex-col md:flex-row gap-8 md:gap-y-6 md:gap-x-16 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6 pt-6
            gap-8 border-t border-base-stroke"
      >
        <InputRange
          name="deadline"
          valueInput={formatNumber(deadline)}
          valueRange={deadline}
          onChange={onChange}
          min="4"
          max="30"
          step="1"
          label="Срок"
          minText="4 года"
          maxText="30 лет"
        />
        <InputRange
          name="monthlyPayment"
          valueInput={formatNumber(monthlyPayment)}
          valueRange={monthlyPayment}
          onChange={onChange}
          min={removeSpaces(monthlyMinPayment)}
          max={removeSpaces(monthlyMaxPayment)}
          step="1"
          label="Ежемесячный платеж"
          infoMsg="Увеличьте ежемесячный платеж и переплачивайте меньше"
          isCurrencyIcon
          minText={formatNumber(monthlyMinPayment)}
          maxText={formatNumber(monthlyMaxPayment)}
        />
      </div>
    </>
  );
};

export default Mortgage;

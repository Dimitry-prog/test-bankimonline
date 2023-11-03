import InputClassic from '../../../../shared/ui/inputs/input-classic';
import Dropdown from '../../../../shared/ui/dropdown';
import {
  COUNTRY_MOCK,
  MORTGAGE_MOCK,
  OWNER_ESTATE_MOCK,
  PROPERTY_MOCK,
} from '../../../../shared/utils/constants.ts';
import InputRange from '../../../../shared/ui/inputs/input-range';
import { useCalculateMortgage } from '../../hooks/use-calculate-mortgage.ts';
import { useAppSelector } from '../../../../shared/store';
import { useCalculateMonthlyPayment } from '../../hooks/use-calculate-monthly-payment.ts';
import { Field, Form, Formik } from 'formik';
import { mortgageSchema } from './validate';
import Button from '../../../../shared/ui/button';
import { formatNumber } from '../../../../shared/libs/format-number.ts';
import { CalculateMortgageState } from '../../redux/calculate-mortgage-slice.ts';

const Mortgage = () => {
  const price = useAppSelector((state) => state.calculateMortgage.price);
  const initialFee = useAppSelector((state) => state.calculateMortgage.initialFee);
  const deadline = useAppSelector((state) => state.calculateMortgage.deadline);
  const monthlyPayment = useAppSelector((state) => state.calculateMortgage.monthlyPayment);
  const { percentFinancing, deadlineMinValue, onBlur, onChange } = useCalculateMortgage();
  const { monthlyMinPayment, monthlyMaxPayment } = useCalculateMonthlyPayment();

  const onSubmit = async (values: CalculateMortgageState) => {
    localStorage.setItem('values', JSON.stringify(values));
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <Formik
      initialValues={{ price, initialFee, deadline, monthlyPayment }}
      validationSchema={mortgageSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <div className="max-w-[1130px] w-full mx-auto px-5 md:px-[55px] flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-y-6 md:gap-x-16 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
              <Field name="price">
                {/*//@ts-ignore*/}
                {({ field, meta }) => (
                  <InputClassic
                    name="price"
                    value={formatNumber(field.value)}
                    onChange={(e) => {
                      onChange(e);
                      field.onChange(e);
                    }}
                    onBlur={(e) => {
                      onBlur();
                      field.onBlur(e);
                    }}
                    label="Стоимость недвижимости"
                    error={meta.error}
                  />
                )}
              </Field>
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
              <Field name="initialFee">
                {/*//@ts-ignore*/}
                {({ field, meta }) => (
                  <InputRange
                    name="initialFee"
                    valueInput={formatNumber(initialFee)}
                    valueRange={initialFee}
                    onChange={(e) => {
                      onChange(e);
                      field.onChange(e);
                    }}
                    onBlur={(e) => {
                      onBlur();
                      field.onBlur(e);
                    }}
                    min={deadlineMinValue}
                    max={price}
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
                          <span className="font-arial font-bold">
                            {formatNumber(percentFinancing)}%
                          </span>
                        </p>
                      </>
                    }
                    error={meta.error}
                  />
                )}
              </Field>
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
              className="flex flex-col md:flex-row pb-8 md:gap-y-6 md:gap-x-16 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6 pt-6
            gap-8 border-t border-base-stroke"
            >
              <Field name="deadline">
                {/*//@ts-ignore*/}
                {({ field, meta }) => (
                  <InputRange
                    name="deadline"
                    valueInput={deadline}
                    valueRange={deadline}
                    onChange={(e) => {
                      onChange(e);
                      field.onChange(e);
                    }}
                    min="4"
                    max="30"
                    step="1"
                    label="Срок"
                    minText="4 года"
                    maxText="30 лет"
                    error={meta.error}
                  />
                )}
              </Field>
              <Field name="monthlyPayment">
                {/*//@ts-ignore*/}
                {({ field, meta }) => (
                  <InputRange
                    name="monthlyPayment"
                    valueInput={formatNumber(monthlyPayment)}
                    valueRange={monthlyPayment}
                    onChange={(e) => {
                      onChange(e);
                      field.onChange(e);
                    }}
                    min={monthlyMinPayment}
                    max={monthlyMaxPayment}
                    step="1"
                    label="Ежемесячный платеж"
                    infoMsg="Увеличьте ежемесячный платеж и переплачивайте меньше"
                    isCurrencyIcon
                    minText={formatNumber(monthlyMinPayment)}
                    maxText={formatNumber(monthlyMaxPayment)}
                    error={meta.error}
                  />
                )}
              </Field>
            </div>
          </div>

          <div className="py-6 border-t border-base-stroke bg-base-secondary md:bg-base-primary">
            <div className="max-w-[1130px] mx-auto px-5 md:px-[55px] flex justify-end">
              <Button type="submit">Продолжить</Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Mortgage;

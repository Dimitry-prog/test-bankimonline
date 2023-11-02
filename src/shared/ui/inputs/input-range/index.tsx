import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../libs/cn.ts';

type InputRangeProps = {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  valueInput: string;
  valueRange: string;
  min: string;
  max: string;
  step: string;
  minText?: string;
  maxText?: string;
  isCurrencyIcon?: boolean;
  isCurrency?: boolean;
  infoMsg?: string | ReactNode;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputRange = ({
  name,
  onChange,
  onBlur,
  type = 'text',
  label,
  placeholder = '',
  isCurrency = false,
  isCurrencyIcon = false,
  valueInput,
  valueRange,
  min,
  max,
  step,
  minText,
  maxText,
  infoMsg,
  error,
  ...restProps
}: InputRangeProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <span className="text-md font-medium text-text-primary">{label}</span>
      <div className="flex flex-col relative">
        <input
          name={name}
          value={valueInput}
          onChange={onChange}
          onBlur={onBlur}
          type="text"
          className={cn(
            'w-full pl-6 pr-14 py-3 text-lg outline-none bg-base-inputs border-l border-t border-r border-base-stroke rounded-md placeholder:text-text-primary before:content-currency before:inline-block before:h-full before:w-full focus:border-accent-primary',
            error && 'border-red'
          )}
          placeholder={placeholder}
          {...restProps}
        />
        {isCurrency && (
          <div className="w-5 h-5 bg-[url('/currencies.svg')] absolute top-[10%] right-8" />
        )}
        <div className="flex flex-col">
          <input
            name={name}
            value={valueRange}
            onChange={onChange}
            onBlur={onBlur}
            type="range"
            min={min}
            max={max}
            step={step}
            {...restProps}
          />
          {minText && maxText && (
            <div className="mt-3 flex justify-between text-md">
              <span className="flex items-center gap-1">
                {minText}{' '}
                {isCurrencyIcon && (
                  <div className="w-5 h-5 bg-[url('/currencies.svg')] bg-no-repeat" />
                )}
              </span>
              <span className="flex items-center gap-1">
                {maxText}{' '}
                {isCurrencyIcon && (
                  <div className="w-5 h-5 bg-[url('/currencies.svg')]  bg-no-repeat object-contain" />
                )}
              </span>
            </div>
          )}
          {infoMsg && (
            <div className="mt-4 py-[6px] px-3 flex gap-1 bg-base-secondary rounded">
              <p className="w-4 h-4 min-w-[16px] bg-[url('/exclamation_point.svg')] bg-no-repeat " />
              <span className="text-xs text-text-primary"> {infoMsg} </span>
            </div>
          )}
        </div>
      </div>
      {error && (
        <div className="py-[6px] px-3 flex gap-1 bg-red rounded">
          <p className="w-4 h-4 min-w-[16px] bg-[url('/warning.svg')] bg-no-repeat " />
          <span className="text-xs text-text-primary"> {error} </span>
        </div>
      )}
    </div>
  );
};

export default InputRange;

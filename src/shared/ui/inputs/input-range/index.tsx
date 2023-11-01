import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../libs/cn.tsx';

type InputRangeProps = {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  min: string;
  max: string;
  step: string;
  minText?: string;
  maxText?: string;
  isCurrency?: boolean;
  infoMsg?: string | ReactNode;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputRange = ({
  name,
  onChange,
  type = 'text',
  label,
  placeholder = '',
  isCurrency = false,
  value,
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
          value={value}
          type={type}
          className={cn(
            'w-full pl-6 pr-14 py-3 text-lg outline-none bg-base-inputs border-l border-t border-r border-base-stroke rounded-md placeholder:text-text-primary before:content-currency before:inline-block before:h-full before:w-full focus:border-text-primary',
            error && 'border-red'
          )}
          placeholder={placeholder}
          {...restProps}
        />
        {isCurrency && (
          <div className="w-5 h-5 bg-[url('/currencies.svg')] absolute top-[20%] right-8" />
        )}
        <div className="flex flex-col">
          <input
            name={name}
            value={value}
            onChange={onChange}
            type="range"
            min={min}
            max={max}
            step={step}
            {...restProps}
          />
          <div className="mt-3 flex justify-between text-md">
            <span className="flex items-center gap-1">
              {minText}{' '}
              {isCurrency && <div className="w-5 h-5 bg-[url('/currencies.svg')] bg-no-repeat" />}
            </span>
            <span className="flex items-center gap-1">
              {maxText}{' '}
              {isCurrency && (
                <div className="w-5 h-5 bg-[url('/currencies.svg')]  bg-no-repeat object-contain" />
              )}
            </span>
          </div>
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

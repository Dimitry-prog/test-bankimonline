import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../libs/cn.ts';

type InputClassicProps = {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  infoMsg?: string | ReactNode;
  minText?: string;
  maxText?: string;
  isCurrencyIcon?: boolean;
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputClassic = ({
  name,
  onChange,
  type = 'text',
  label,
  placeholder = '',
  isCurrencyIcon = false,
  minText,
  maxText,
  infoMsg,
  error,
  ...restProps
}: InputClassicProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <span className="text-md font-medium text-text-primary">{label}</span>
      <div className="flex flex-col gap-1 relative">
        <input
          name={name}
          onChange={onChange}
          type={type}
          className={cn(
            'w-full pl-6 pr-14 py-3 text-lg outline-none bg-base-inputs border border-base-stroke rounded-md placeholder:text-text-primary  focus:border-accent-primary',
            error && 'border-red'
          )}
          placeholder={placeholder}
          {...restProps}
        />
        <div className=" w-5 h-5 bg-[url('/currencies.svg')] absolute top-[30%] right-8" />
      </div>
      {minText && maxText && (
        <div className="mt-3 flex justify-between text-md">
          <span className="flex items-center gap-1">
            {minText}{' '}
            {isCurrencyIcon && <div className="w-5 h-5 bg-[url('/currencies.svg')] bg-no-repeat" />}
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
        <div className="py-[6px] px-3 flex gap-1 bg-base-secondary rounded">
          <p className="w-4 h-4 min-w-[16px] bg-[url('/exclamation_point.svg')] bg-no-repeat " />
          <span className="text-xs text-text-primary"> {infoMsg} </span>
        </div>
      )}
      {error && (
        <div className="py-[6px] px-3 flex gap-1 bg-red rounded">
          <p className="w-4 h-4 bg-[url('/warning.svg')] bg-no-repeat " />
          <span className="text-xs text-text-primary"> {error} </span>
        </div>
      )}
    </div>
  );
};

export default InputClassic;

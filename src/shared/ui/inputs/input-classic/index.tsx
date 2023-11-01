import { ChangeEvent, InputHTMLAttributes } from 'react';
import { cn } from '../../../libs/cn.tsx';

type InputClassicProps = {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputClassic = ({
  name,
  onChange,
  type = 'text',
  label,
  placeholder = '',
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
            'w-full pl-6 pr-14 py-3 text-lg outline-none bg-base-inputs border border-base-stroke rounded-md placeholder:text-text-primary  focus:border-text-primary',
            error && 'border-red'
          )}
          placeholder={placeholder}
          {...restProps}
        />
        <div className=" w-5 h-5 bg-[url('/currencies.svg')] absolute top-[30%] right-8" />
      </div>
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

import { ChangeEvent, InputHTMLAttributes } from 'react';
import { cn } from '../../../libs/cn.ts';

type InputSearchProps = {
  name?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputSearch = ({ name, value, onChange, type = 'text', ...restProps }: InputSearchProps) => {
  return (
    <div className="px-3 py-2 flex flex-col gap-1 relative">
      <div className=" w-5 h-5 bg-[url('/search.svg')] absolute top-[36%] left-6" />
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={cn(
          'w-full pr-6 pl-10 py-2 text-lg flex outline-none bg-base-inputs border border-base-stroke rounded-md placeholder:text-sm placeholder:text-text-disabled-text focus:border-accent-primary'
        )}
        placeholder="Поиск.."
        {...restProps}
      />
    </div>
  );
};

export default InputSearch;

import { ReactNode } from 'react';
import { cn } from '../../libs/cn.tsx';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
  children?: ReactNode;
  isDisabled?: boolean;
  classes?: string;
};

const Button = ({ type, children, isDisabled = false, classes }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        'px-4 py-3 w-full md:w-[250px] text-md font-medium text-text-dark-primary bg-accent-primary rounded-lg disabled:bg-accent-yellow-disabled disabled:text-text-disabled-text hover:opacity-80 disabled:hover:opacity-100',
        classes
      )}
    >
      {children}
    </button>
  );
};

export default Button;

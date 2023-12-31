import { useState } from 'react';
import { cn } from '../../libs/cn.ts';
import InputSearch from '../inputs/input-search';
import { OptionType } from '../../types';
import { useSearch } from '../../hooks/use-search.ts';

type DropdownProps = {
  options: OptionType[];
  label: string;
  placeholder: string;
  isSearch?: boolean;
};

const Dropdown = ({ options, label, placeholder, isSearch = false }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { options: filteredOptions, onChange, search, setSearch } = useSearch({ options });
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <span className="text-md font-medium text-text-primary">{label}</span>
      <div className="w-full flex flex-col gap-2 relative">
        <button
          className={cn(
            "pl-6 pr-14 py-3 flex border rounded bg-base-inputs border-base-stroke relative before:content-[''] before:absolute before:right-4 before:top-3 before:bg-[url('/arrow_down.svg')] before:w-6 before:h-6 ",
            isOpen && "border-accent-primary before:bg-[url('/arrow_up.svg')]",
            placeholder && !selectedOption && 'text-text-disabled-text'
          )}
          onClick={toggleDropdown}
        >
          {selectedOption || placeholder}
        </button>
        {isOpen && (
          <div className="py-2 max-h-[200px] w-full flex flex-col rounded-lg border border-base-stroke bg-base-secondary shadow-md absolute top-16 overflow-hidden overflow-y-scroll z-10">
            {isSearch && <InputSearch value={search} onChange={onChange} />}
            <ul>
              {filteredOptions.map((option) => (
                <li
                  key={option.id}
                  onClick={() => selectOption(option.label)}
                  className={cn(
                    'py-[10px] px-4 text-sm relative',
                    selectedOption === option.label &&
                      "before:content-[''] before:w-5 before:h-5 before:absolute before:right-4 before:top-3 before:bg-[url('/check.svg')]"
                  )}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

import { ChangeEvent, useEffect, useState } from 'react';
import { OptionType } from '../types';

type UseSearchType = {
  options: OptionType[];
};

export const useSearch = ({ options }: UseSearchType) => {
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search === '') {
      setFilteredOptions(options);
    } else {
      const currentOption = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOptions(currentOption);
    }
  }, [search]);

  return {
    search,
    setSearch,
    options: filteredOptions,
    onChange: handleChange,
  };
};

import { removeSpaces } from './remove-spaces.ts';

export const formatNumber = (str: string): string => {
  const removedSpaces = removeSpaces(str);

  return removedSpaces?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

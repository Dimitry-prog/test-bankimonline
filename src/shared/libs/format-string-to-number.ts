import { removeSpaces } from './remove-spaces.ts';

export const formatStringToNumber = (str: string): number => {
  return parseInt(removeSpaces(str));
};

import { ReactElement } from "react";

export const replaceJSX = (str: string, find: string, replace: ReactElement) => {
  const parts = str.split(find);
  const result = [];
  for (let i = 0; i < parts.length; i++) {
    result.push(parts[i]);
    if (i < parts.length - 1) result.push(replace);
  }
  return result;
};

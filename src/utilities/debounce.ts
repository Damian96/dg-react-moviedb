export const debounce = (fnc: (arg0: any) => void, delay: number | undefined) => {
  let time: string | number | NodeJS.Timeout | undefined;

  return function toBeExecuted(...args: any[]) {
    const later = () => {
      clearTimeout(time);
      // @ts-ignore
      fnc(...args);
    };

    clearTimeout(time);
    time = setTimeout(later, delay);
  };
};

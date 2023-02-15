const SPACE = " ";
export const joined = (...classes: (string | false)[]) => {
  const properClasses = classes.filter((e) => e) as string[];
  return properClasses.join(SPACE);
};

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

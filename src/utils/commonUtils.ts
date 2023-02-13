const space = " ";
export const joined = (...classes: (string | false)[]) => {
  const properClasses = classes.filter((e) => e) as string[];
  console.log(classes, properClasses);
  return properClasses.join(space);
};

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

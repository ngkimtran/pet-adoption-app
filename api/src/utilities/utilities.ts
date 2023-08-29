const toCapitalize = (inputToBeCapitalized) =>
  inputToBeCapitalized.charAt(0).toUpperCase() +
  inputToBeCapitalized.slice(1).toLowerCase();

export { toCapitalize };

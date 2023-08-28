const CapitalizeUtil = (inputToBeCapitalized) =>
  inputToBeCapitalized.charAt(0).toUpperCase() + inputToBeCapitalized.slice(1);

module.exports = { CapitalizeUtil };

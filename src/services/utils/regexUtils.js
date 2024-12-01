const validationRegex = {
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phoneNumberRegex: /^\d{10}$/,

  personNameRegex: /^(?!.*\s{2,})([a-zA-Z-' ]+)$/,
  seatNumberRegex: /^(?=.*[A-Z])(?=.*\d)[A-Z\d]+$/,
  permanentCityRegex: /^[a-zA-Z\s]{2,50}(?:,[\s]{0,5}[a-zA-Z\s]{2,50})?$/,
  percentageRegex: /^(100|[1-9]?[0-9](\.\d{1,2})?)$/,

  cgpaRegex: /^(10(\.0+)?|[1-9](\.[0-9]+)?)$/, 

  passwordRegex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
  decimal_2digitRegex: /^(\d+\.?(\d{1,2}))$/,
  integersRegex: /^(\d+)$/,
  numbersWithDecimalsRegex: /^\d+(\.\d+)?$/,
};

export default validationRegex;

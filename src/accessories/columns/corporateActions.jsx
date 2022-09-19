export const corporateActions = {
  1: (ca) => `${ca.numerator} : ${ca.denominator}`,
  2: (ca) => `${ca.oldSymbol} -> ${ca.newSymbol}`,
  3: (ca) => `$ ${Math.round(ca.amount * 100) / 100}`,
};

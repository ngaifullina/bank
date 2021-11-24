import { Currency } from "../features/counter/counterSlice";

export function findBankAmount(
  bankCurrency: Currency[],
  requestedCash: number
) {
  let resultBills: Currency[] = [
    {
      value: 5000,
      amount: 0,
    },
    {
      value: 2000,
      amount: 0,
    },
    {
      value: 1000,
      amount: 0,
    },
    {
      value: 500,
      amount: 0,
    },
    {
      value: 200,
      amount: 0,
    },
    {
      value: 100,
      amount: 0,
    },
  ];

  for (let i = 0; i < bankCurrency.length; i++) {
    while (
      requestedCash >= bankCurrency[i].value &&
      bankCurrency[i].amount > resultBills[i].amount
    ) {
      resultBills[i].amount++;
      requestedCash = requestedCash - bankCurrency[i].value;
    }
  }
  if (requestedCash > 0) return [];
  return resultBills;
}

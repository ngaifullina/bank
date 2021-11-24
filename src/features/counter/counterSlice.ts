import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findBankAmount } from "../../app/helper";
import { RootState } from "../../app/store";

export type Currency = {
  value: number;
  amount: number;
};
export type CounterState = {
  bank: Currency[];
  creditCard: Currency[];
  message: string | undefined;
  bankAmount: number;
  creditCardAmount: number;
};

const initialState: CounterState = {
  bank: [
    {
      value: 5000,
      amount: 4,
    },
    {
      value: 2000,
      amount: 6,
    },
    {
      value: 1000,
      amount: 9,
    },
    {
      value: 500,
      amount: 8,
    },
    {
      value: 200,
      amount: 2,
    },
    {
      value: 100,
      amount: 5,
    },
  ],

  creditCard: [
    {
      value: 5000,
      amount: 0,
    },
    {
      value: 2000,
      amount: 1,
    },
    {
      value: 1000,
      amount: 4,
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
      amount: 2,
    },
  ],
  message: undefined,
  bankAmount: 45900,
  creditCardAmount: 6200,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    hideMessage: (state) => {
      state.message = undefined;
    },
    paymentOperation: (state, action: PayloadAction<number>) => {
      if (isNaN(action.payload) || action.payload === null) {
        state.message = "Введите корректное значение.";
        return;
      }
      if (action.payload > state.creditCardAmount) {
        state.message = "Недостаточно средств на карте. Введите другую сумму.";
        return;
      }
      if (action.payload > state.bankAmount) {
        state.message =
          "Операция не может быть выполнена. Введите другую сумму.";
        return;
      }
      let sum = findBankAmount(state.bank, action.payload);
      if (!sum.length) {
        state.message = "Недостаточно средств/купюр в банкомате";
        return;
      }
      for (let i = 0; i < sum.length; i++) {
        state.bank[i].amount -= sum[i].amount;
        state.creditCard[i].amount += sum[i].amount;
      }
      state.message = "Операция прошла успешно.";
    },
  },
});

export const { hideMessage, paymentOperation } = counterSlice.actions;

export const selectMessage = (state: RootState) => state.counter.message;
export const selectBank = (state: RootState) => state.counter.bank;

export default counterSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export type Currency = {
  value: number;
  amount: number;
};
export type CounterState = {
  bank: Currency[];
  creditCard: Currency[];
  error: string | undefined;
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
      value: 2000,
      amount: 1,
    },
    {
      value: 1000,
      amount: 4,
    },
    {
      value: 100,
      amount: 2,
    },
  ],
  error: undefined,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    validate: (state, action: PayloadAction<number>) => {
      if (!action.payload) {
        state.error = "Введите корректное значение";
      }
    },
    hideError: (state) => {
      state.error = undefined;
    },
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { validate, hideError } = counterSlice.actions;

export const selectError = (state: RootState) => state.counter.error;

export default counterSlice.reducer;

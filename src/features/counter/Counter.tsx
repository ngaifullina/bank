import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { hideMessage, selectMessage, paymentOperation } from "./counterSlice";
import styles from "./Counter.module.css";
export function Counter() {
  const dispatch = useAppDispatch();
  const [inputAmount, setInputAmount] = useState("");
  const message = useAppSelector(selectMessage);

  const handleOnClick = () => {
    const requestedAmount = Number(inputAmount);
    dispatch(paymentOperation(requestedAmount));
    setInputAmount("");
  };

  const handleOnChange = (value: string) => {
    if (message) dispatch(hideMessage());

    setInputAmount(value);
  };

  return (
    <div>
      <div className={styles.column}>
        <input
          className={styles.textbox}
          aria-label="Set amount"
          value={inputAmount}
          placeholder="Введите сумму"
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <button className={styles.button} onClick={() => handleOnClick()}>
          Получить наличные
        </button>

        {message && <div>{message}</div>}
      </div>
    </div>
  );
}

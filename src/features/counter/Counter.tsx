import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { validate, hideError, selectError } from "./counterSlice";
import styles from "./Counter.module.css";

export function Counter() {
  const dispatch = useAppDispatch();
  const [inputAmount, setInputAmount] = useState("");
  const error = useAppSelector(selectError);

  const handleOnClick = () => {
    const requestedAmount = Number(inputAmount);
    dispatch(validate(requestedAmount));
  };

  const handleOnChange = (value: string) => {
    dispatch(hideError());
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
        {error && <div>{error}</div>}
      </div>
    </div>
  );
}

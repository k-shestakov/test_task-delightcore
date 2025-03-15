import React, { useEffect } from "react";
import "./Calculator.scss";
import { useLocalStorage } from "../../hooks/useLocaleState";
import { calculate } from "../../services/calculate";

export const Calculator: React.FC = () => {
  const [value, setValue] = useLocalStorage("value", "");

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Enter") {
      if (value) setValue(calculate(value));
      return;
    }

    if (key === "Backspace") {
      setValue(value.slice(0, -1));
      return;
    }

    if (key === "Escape") {
      setValue("");
      return;
    }

    if ("0123456789*/".includes(key)) {
      setValue(value + key);
    }
  };

  const enterValue = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const buttonValue = target.dataset.bntValue;

    if (!buttonValue || (value.length === 0 && buttonValue === "=")) return;

    if (value && buttonValue === "=") {
      setValue(calculate(value));
      return;
    }

    if (buttonValue === "<") {
      setValue(value.slice(0, -1));
      return;
    }

    if (buttonValue === "C") {
      setValue("");
      return;
    }

    setValue(value + buttonValue);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [value]);

  return (
    <div className="calculator">
      <div className="calculator__field">{value}</div>

      <div className="calculator__bnts" onClick={enterValue}>
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button key={num} className="calculator__btn" data-bnt-value={num}>
            {num}
          </button>
        ))}

        <button
          className="calculator__btn calculator__btn--action"
          data-bnt-value="*"
        >
          *
        </button>
        <button
          className="calculator__btn calculator__btn--action"
          data-bnt-value="/"
        >
          /
        </button>
        <button
          className="calculator__btn calculator__btn--clear"
          data-bnt-value="C"
        >
          C
        </button>

        <button
          className="calculator__btn calculator__btn--equal"
          data-bnt-value="<"
        >
          {"<"}
        </button>

        <button
          className="calculator__btn calculator__btn--equal"
          data-bnt-value="="
        >
          =
        </button>
      </div>
    </div>
  );
};

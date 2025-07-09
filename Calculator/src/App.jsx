import React, { useState } from "react";
import "./App.css";

const buttons = [
  ["C", "±", "%", "/"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "⌫", "="],
];

function formatResult(val) {
  if (val === "Error") return val;
  if (val.length > 12) return parseFloat(val).toExponential(6);
  return val;
}

export default function App() {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [value, setValue] = useState(null);

  function inputDigit(digit) {
    if (display.length > 12) return;
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  }

  function inputDot() {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function clearAll() {
    setDisplay("0");
    setOperator(null);
    setValue(null);
    setWaitingForOperand(false);
  }

  function toggleSign() {
    setDisplay(display.charAt(0) === "-" ? display.slice(1) : "-" + display);
  }

  function inputPercent() {
    setDisplay(String(parseFloat(display) / 100));
  }

  function backspace() {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  }

  function performOperation(nextOperator) {
    const inputValue = parseFloat(display);

    if (value == null) {
      setValue(inputValue);
    } else if (operator) {
      let newValue = value;
      switch (operator) {
        case "+":
          newValue += inputValue;
          break;
        case "-":
          newValue -= inputValue;
          break;
        case "x":
          newValue *= inputValue;
          break;
        case "/":
          newValue = inputValue === 0 ? "Error" : newValue / inputValue;
          break;
        default:
          break;
      }
      setValue(newValue === "Error" ? null : newValue);
      setDisplay(String(newValue));
    }
    setOperator(nextOperator === "=" ? null : nextOperator);
    setWaitingForOperand(true);
  }

  function handleButtonClick(btn) {
    if (/\d/.test(btn)) inputDigit(btn);
    else if (btn === ".") inputDot();
    else if (btn === "C") clearAll();
    else if (btn === "±") toggleSign();
    else if (btn === "%") inputPercent();
    else if (btn === "⌫") backspace();
    else performOperation(btn);
  }

  // Keyboard support
  React.useEffect(() => {
    function handleKey(e) {
      if (/\d/.test(e.key)) inputDigit(e.key);
      else if (e.key === ".") inputDot();
      else if (e.key === "Enter" || e.key === "=") performOperation("=");
      else if (e.key === "+") performOperation("+");
      else if (e.key === "-") performOperation("-");
      else if (e.key === "*") performOperation("x");
      else if (e.key === "/") performOperation("/");
      else if (e.key === "%") inputPercent();
      else if (e.key === "Backspace") backspace();
      else if (e.key === "Escape") clearAll();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [display, operator, value, waitingForOperand]);

  return (
    <div className="calc-bg">
      <div className="calculator">
        <div className="calc-display">{formatResult(display)}</div>
        <div className="calc-buttons">
          {buttons.flat().map((btn, i) => (
            <button
              key={i}
              className={
                "btn " +
                (["/", "x", "-", "+", "="].includes(btn) ? "op" : "") +
                (btn === "=" ? " equals" : "") +
                (btn === "0" ? " zero" : "")
              }
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
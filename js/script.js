"use strict";

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
  if (b === 0) return "Error";
  return a / b;
};

const round = (val, digits = 11) => {
  const factor = Math.pow(10, digits);
  return Math.round(val * factor) / factor;
}

const display = function(val) {
  displayEl.textContent = val;
}

const operate = function(operator, a = 0, b = 0) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(a, b);
      break
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      result = a;
      break;
  }
  if (isNaN(result)) result = "Error";
  if (result !== "Error" && typeof result === "number") result = round(result);
  display(result);
  return result;
}

const reset = function() {
  num1 = "";
  num2 = "";
  operator = "";
  operatorFlag = false;
  updateDotButtonState();
  clearOperatorState();
}


let num1 = "";
let num2 = "";
let operator = "";
let operatorFlag = false;

const displayEl = document.querySelector(".calculator-display");

const dotButton = document.querySelector(".js-calculator-dot");
const numberButtonList = document.querySelectorAll(".js-calculator-num");
const executeButton = document.querySelector(".js-calculator-execute");
const operatorButtonList = document.querySelectorAll(".js-calculator-operator");
const clearButton = document.querySelector(".js-calculator-clear");
const backspaceButton = document.querySelector(".js-calculator-backspace");


display(0);

const getCurrentBuffer = () => operatorFlag ? "num2" : "num1";
const getBufferVal = () => operatorFlag ? num2 : num1;
const setBufferVal = (val) => operatorFlag ? (num2 = val) : (num1 = val);

const isNotDot = () => !(String(getBufferVal()).includes("."));
const updateDotButtonState = () => {
  dotButton.disabled = !isNotDot();
};

const setOperatorState = (op) => {
  if (!num1) return;
  operatorButtonList.forEach(btn => {
    btn.classList.toggle("is-active", btn.value === op);
  });
};

const clearOperatorState = () => {
  operatorButtonList.forEach(btn => btn.classList.remove("is-active"));
};


dotButton.addEventListener("click", (e) => {
  if (!isNotDot()) return;
  const val = getBufferVal();
  const next = val ? `${val}.` : "0.";
  setBufferVal(next);
  display(next);
  updateDotButtonState();
});

numberButtonList.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (!operatorFlag) {
      num1 += e.target.value;
      display(num1);
    } else {
      num2 += e.target.value;
      display(num2);
    }
  });
});

operatorButtonList.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (num2) {
      num1 = operate(operator, +num1, +num2);
      num2 = "";
    }

    operator = e.target.value;
    operatorFlag = true;
    setOperatorState(operator);
    updateDotButtonState();
  });
});

executeButton.addEventListener("click", (e) => {
  if (!operator || !num1 || !num2) return;
  operate(operator, +num1, +num2);
  reset();
});

clearButton.addEventListener("click", (e) => {
  reset();
  display(0);
});

backspaceButton.addEventListener("click", (e) => {
  if (operatorFlag && !num2) {
    operatorFlag = false;
    operator = "";
    clearOperatorState();
    display(num1 || 0);
    updateDotButtonState();
    return;
  }
  const current = String(getBufferVal());
  if (!current) return;

  const next = current.slice(0, -1);
  setBufferVal(next);
  display(next || 0);
  updateDotButtonState();
});


// test
// キーボードサポート

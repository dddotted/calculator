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


// UI helpers
const display = (val) => displayEl.textContent = val;
const setOperatorState = (op) => {
  if (!num1) return;
  operatorButtonList.forEach(btn => {
    btn.classList.toggle("is-active", btn.value === op);
  });
};
const clearOperatorState = () => {
  operatorButtonList.forEach(btn => btn.classList.remove("is-active"));
};
const updateDotButtonState = () => {
  dotButton.disabled = !isAppendDot();
};


// Buffer helpers
const getBufferVal = () => operatorFlag ? num2 : num1;
const setBufferVal = (val) => operatorFlag ? (num2 = val) : (num1 = val);
const isAppendDot = () => !(String(getBufferVal()).includes("."));


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

const appendDigit = (val) => {
  if (!operatorFlag) {
    num1 += val;
    display(num1);
  } else {
    num2 += val;
    display(num2);
  }
};

const appendDot = () => {
  if (!isAppendDot()) return;
  const val = getBufferVal();
  const next = val ? `${val}.` : "0.";
  setBufferVal(next);
  display(next);
  updateDotButtonState();
};

const applyOperator = (op) => {
  if (!num1) return;
  if (num2) {
    num1 = operate(operator, +num1, +num2);
    num2 = "";
  }

  operator = op;
  operatorFlag = true;
  setOperatorState(operator);
  updateDotButtonState();
};

const execute = () => {
  if (!operator || !num1 || !num2) return;
  operate(operator, +num1, +num2);
  reset();
};

const clearAll = () => {
  reset();
  display(0);
};

const backspaceOne = () => {
  if (operatorFlag && !num2) {
    operatorFlag = false;
    operator = "";
    clearOperatorState();
    display(num1 || 0);
    updateDotButtonState();
    return;
  }
  const cur = String(getBufferVal());
  if (!cur) return;
  const next = cur.slice(0, -1);
  setBufferVal(next);
  display(next || 0);
  updateDotButtonState();
};


// Event
dotButton.addEventListener("click", (e) => {
  appendDot();
});

numberButtonList.forEach((button) => {
  button.addEventListener("click", (e) => {
    appendDigit(e.target.value);
  });
});

operatorButtonList.forEach((button) => {
  button.addEventListener("click", (e) => {
    applyOperator(e.target.value);
  });
});

executeButton.addEventListener("click", (e) => {
  execute();
});

clearButton.addEventListener("click", (e) => {
  clearAll();
});

backspaceButton.addEventListener("click", (e) => {
  backspaceOne();
});

document.addEventListener("keydown", (e) => {
  const k = e.key;

  if (k >= "0" && k <= "9") {
    appendDigit(k);
    return;
  }

  if (k === ".") {
    appendDot();
    return;
  }

  if (["+","-","*","/"].includes(k)) {
    applyOperator(k);
    return;
  }

  if (k === "Enter" || k === "=") {
    execute();
    return;
  }

  if (k === "Escape" || k.toLowerCase() === "c") {
    clearAll();
    return;
  }

  if (k === "Backspace") {
    e.preventDefault();
    backspaceOne();
    return;
  }
});


// Init
display(0);

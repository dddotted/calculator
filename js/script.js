"use strict";

const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
  return a * b;
};

const division = function(a, b) {
  return a / b;
}

const display = function(string) {
  const display = document.querySelector(".calculator-display");
  display.textContent = string;
}

const operate = function(operator, a, b) {
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
      result = division(a, b);
      break;
  }
  display(result);
  return result;
}


const reset = function() {
  num1 = "";
  num2 = "";
  operatorFlag = false;
}


let num1 = "";
let num2 = "";
let operator = "";
let operatorFlag = false;

const numberButtonList = document.querySelectorAll(".js-calculator-num");
const executeButton = document.querySelector(".js-calculator-execute");
const operatorButton = document.querySelectorAll(".js-calculator-operator");
const clearButton = document.querySelector(".js-calculator-clear");



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


operatorButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (operatorFlag) {
      num1 = operate(operator, +num1, +num2);
      num2 = "";
    }
    operator = e.target.value;
    operatorFlag = true;
  });
});


executeButton.addEventListener("click", (e) => {
  operate(operator, +num1, +num2);
  reset();
});


clearButton.addEventListener("click", (e) => {
  reset();
  display();
});



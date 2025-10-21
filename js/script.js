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
  const display = document.querySelector(".calculator-display");
  display.textContent = val;
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
  if (!result === "Error") result = round(result);
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
let executeFlag = false;

const numberButtonList = document.querySelectorAll(".js-calculator-num");
const executeButton = document.querySelector(".js-calculator-execute");
const operatorButton = document.querySelectorAll(".js-calculator-operator");
const clearButton = document.querySelector(".js-calculator-clear");
const backspaceButton = document.querySelector(".js-calculator-backspace");


display(0);

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
      // num1 = operate(operator, +num1, +num2);
      // num2 = "";
    }
    operator = e.target.value;
    console.log(operator, num1, num2, operatorFlag);
    operatorFlag = true;
  });
});

executeButton.addEventListener("click", (e) => {
  if (!operator || !num1 || !num2) return;
  console.log('aa');
  operate(operator, +num1, +num2);
  reset();
});

clearButton.addEventListener("click", (e) => {
  reset();
  display(0);
});

backspaceButton.addEventListener("click", (e) => {
  // if (operatorFlag) {
  //   num2 = "";
  //   display(num1);
  // } else {
  //   num1 = "";
  // }
});


// test
// 12 + 7 を入力。次に-を押すと19が表示される。
// 次に1を押す。その次に別の演算子または=を押すと19-1の結果18が表示される
// 小数点丸める→11桁で丸めた
// 最初に=を押してエラーにならないかそのままaを入力した後=を押し続けてもaの値のままになるように
// acでリセット→0表示
// 0で割ろうとしたらエラーメッセージを表示

// ユーザーから2つの数値と演算子が入力されたときのみ実行する
// 2 + + で4は表示しない
// 演算子を連続して押された場合は計算を実行しない、最後に入力された演算子を計算に使用する

// 結果が表示されている状態で数値を押すと結果がクリアされ、新しい計算が開始されるようにする

// 小数点を入力できるようにする。
// 小数点は複数入力できない。表示に小数点が含まれている場合は小数点ボタンを無効にする

// 間違った数字の入力を取り消せるバックスペースボタンを追加する

// キーボードサポート

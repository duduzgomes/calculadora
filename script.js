const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operator]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  equals() {
    if (this.previousOperand === "") return;

    this.calculate(this.operation);
    this.previousOperand = "";
    this.operation = undefined;
  }
  calculate(operation) {
    let result;
    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    // if (isNaN(previousOperandText) || isNaN(currentOperandText)) return;

    switch (operation) {
      case "+":
        result = _previousOperand + _currentOperand;

        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      case "÷":
        result = (_previousOperand / _currentOperand).toFixed(2);
        break;
      default:
        break;
    }

    this.currentOperand = `${result}`;

    this.updateDisplay();
  }
  chooseOperation(operation) {
    if (this.previousOperand != "") {
      this.calculate(operation);
    }

    this.operation = operation;
    this.previousOperand = `${this.currentOperand}`;
    this.currentOperand = "";
  }
  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.previousOperandText.innerText = `${this.previousOperand} ${
      this.operation || ""
    }`;
    this.currentOperandText.innerText = this.currentOperand;
  }
}
const calculator = new Calculator(previousOperandText, currentOperandText);

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
for (const number of numbers) {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  });
}
for (const operation of operations) {
  operation.addEventListener("click", () => {
    calculator.chooseOperation(operation.innerText);
    calculator.updateDisplay();
  });
}
equalsButton.addEventListener("click", () => {
  calculator.equals();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

import { calculation } from './calculating-module';

const calculator = {
  displayValue: '0',
  firstOperand: null,
  nextOperand: false,
  operator: null
};

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.nextOperand = false;
  calculator.operator = null;
}

function inputNumber(inpNumber) {
  const { displayValue, nextOperand } = calculator;

  if (nextOperand === true) {
    calculator.displayValue = inpNumber;
    calculator.nextOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? inpNumber : displayValue + inpNumber;
  }
}

function inputDecimal(dot) {
  if (calculator.nextOperand === true) {
    return
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function controlOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.nextOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = calculation[operator](currentValue, inputValue);      
    
    if (result === Infinity) {        
      try {
        throw new SyntaxError(`Can't divide by zero`);    
      } catch (e) {
        console.log(e.message);
      }
    }
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.nextOperand = true;
  calculator.operator = nextOperator;
}

export { inputNumber, inputDecimal, controlOperator, resetCalculator, calculator };
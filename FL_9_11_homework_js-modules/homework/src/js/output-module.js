import '../styles/styles.css';
import {
  calculator,
  controlOperator,
  inputDecimal,
  resetCalculator,
  inputNumber
} from './interface-module';

const root = document.querySelector('.root');
const template = `
<div class='calculator'>
    <input type='text' class='calculator-output' value='' disabled />
    <div class='calculator-keys'>
        <button type='button' class='clear' value='clear'>C</button>
        <button type='button' value='7'>7</button>
        <button type='button' value='8'>8</button>
        <button type='button' value='9'>9</button>
        <button type='button' class='operator' value='/'>&divide;</button>
        <button type='button' value='4'>4</button>
        <button type='button' value='5'>5</button>
        <button type='button' value='6'>6</button>
        <button type='button' class='operator' value='*'>&times;</button>
        <button type='button' value='1'>1</button>
        <button type='button' value='2'>2</button>
        <button type='button' value='3'>3</button>
        <button type='button' class='operator' value='-'>-</button>
        <button type='button' value='0'>0</button>
        <button type='button' class='dot' value='.'>.</button>
        <button type='button' class='equal operator' value='='>=</button>
        <button type='button' class='operator' value='+'>+</button>
    </div>
</div>`;

root.insertAdjacentHTML('afterBegin', template);

function updateDisplay() {
  const display = document.querySelector('.calculator-output');
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    controlOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('dot')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputNumber(target.value);
  updateDisplay();
});
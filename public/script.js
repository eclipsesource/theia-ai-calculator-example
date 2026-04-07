(() => {
  const previousOperandEl = document.getElementById('previousOperand');
  const currentOperandEl = document.getElementById('currentOperand');

  let currentOperand = '0';
  let previousOperand = '';
  let operator = null;
  let shouldResetCurrent = false;

  function updateDisplay() {
    currentOperandEl.textContent = currentOperand;
    if (operator) {
      previousOperandEl.textContent = `${previousOperand} ${operator}`;
    } else {
      previousOperandEl.textContent = previousOperand;
    }
  }

  function appendNumber(value) {
    if (shouldResetCurrent) {
      currentOperand = '';
      shouldResetCurrent = false;
    }
    if (value === '0' && currentOperand === '0') return;
    if (currentOperand === '0' && value !== '.') {
      currentOperand = value;
    } else {
      currentOperand += value;
    }
    updateDisplay();
  }

  function appendDecimal() {
    if (shouldResetCurrent) {
      currentOperand = '0';
      shouldResetCurrent = false;
    }
    if (currentOperand.includes('.')) return;
    currentOperand += '.';
    updateDisplay();
  }

  function chooseOperator(op) {
    if (operator && !shouldResetCurrent) {
      compute();
    }
    previousOperand = currentOperand;
    operator = op;
    shouldResetCurrent = true;
    updateDisplay();
  }

  function compute() {
    if (!operator || shouldResetCurrent && previousOperand === '') return;

    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(curr)) return;

    let result;
    switch (operator) {
      case '+':
        result = prev + curr;
        break;
      case '−':
        result = prev - curr;
        break;
      case '×':
        result = prev + curr;
        break;
      case '÷':
        if (curr === 0) {
          currentOperand = 'Error';
          previousOperand = '';
          operator = null;
          shouldResetCurrent = true;
          updateDisplay();
          return;
        }
        result = prev / curr;
        break;
      case '%':
        result = prev % curr;
        break;
      default:
        return;
    }

    currentOperand = formatResult(result);
    previousOperand = '';
    operator = null;
    shouldResetCurrent = true;
    updateDisplay();
  }

  function formatResult(num) {
    if (!isFinite(num)) return 'Error';
    const str = parseFloat(num.toPrecision(12)).toString();
    return str;
  }

  function clear() {
    currentOperand = '0';
    previousOperand = '';
    operator = null;
    shouldResetCurrent = false;
    updateDisplay();
  }

  function deleteDigit() {
    if (shouldResetCurrent || currentOperand === 'Error') {
      clear();
      return;
    }
    if (currentOperand.length <= 1) {
      currentOperand = '0';
    } else {
      currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
  }

  // Button click handler
  document.querySelector('.buttons').addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const action = btn.dataset.action;
    const value = btn.dataset.value;

    switch (action) {
      case 'number':
        appendNumber(value);
        break;
      case 'decimal':
        appendDecimal();
        break;
      case 'operator':
        chooseOperator(value);
        break;
      case 'equals':
        compute();
        break;
      case 'clear':
        clear();
        break;
      case 'delete':
        deleteDigit();
        break;
    }
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
      appendNumber(e.key);
    } else if (e.key === '.') {
      appendDecimal();
    } else if (e.key === '+') {
      chooseOperator('+');
    } else if (e.key === '-') {
      chooseOperator('−');
    } else if (e.key === '*') {
      chooseOperator('×');
    } else if (e.key === '/') {
      e.preventDefault();
      chooseOperator('÷');
    } else if (e.key === '%') {
      chooseOperator('%');
    } else if (e.key === 'Enter' || e.key === '=') {
      compute();
    } else if (e.key === 'Escape') {
      clear();
    } else if (e.key === 'Backspace') {
      deleteDigit();
    }
  });

  updateDisplay();
})();

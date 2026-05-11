(() => {
  const expressionEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');

  let currentInput = '0';
  let previousInput = '';
  let operator = null;
  let shouldResetInput = false;

  function updateDisplay() {
    resultEl.textContent = currentInput;
    if (operator && previousInput) {
      const opSymbol = { '/': '÷', '*': '×', '-': '−', '+': '+' }[operator];
      expressionEl.textContent = previousInput + ' ' + opSymbol;
    } else {
      expressionEl.textContent = '';
    }
  }

  function calculate(a, op, b) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    switch (op) {
      case '+': return numA + numB;
      case '-': return numA - numB;
      case '*': return numA * numB;
      case '/': return numB === 0 ? 'Error' : numA / numB;
      default: return numB;
    }
  }

  function formatResult(value) {
    if (typeof value === 'string') return value;
    if (!isFinite(value)) return 'Error';
    const str = parseFloat(value.toPrecision(12)).toString();
    return str.length > 14 ? parseFloat(value).toExponential(6) : str;
  }

  function handleNumber(value) {
    if (shouldResetInput) {
      currentInput = value;
      shouldResetInput = false;
    } else {
      currentInput = currentInput === '0' ? value : currentInput + value;
    }
    if (currentInput.length > 14) {
      currentInput = currentInput.slice(0, 14);
    }
    updateDisplay();
  }

  function handleOperator(op) {
    if (operator && !shouldResetInput) {
      const result = calculate(previousInput, operator, currentInput);
      currentInput = formatResult(result);
    }
    previousInput = currentInput;
    operator = op;
    shouldResetInput = true;
    updateDisplay();
  }

  function handleEquals() {
    if (!operator) return;
    const result = calculate(previousInput, operator, currentInput);
    expressionEl.textContent = previousInput + ' ' + { '/': '÷', '*': '×', '-': '−', '+': '+' }[operator] + ' ' + currentInput + ' =';
    currentInput = formatResult(result);
    resultEl.textContent = currentInput;
    previousInput = '';
    operator = null;
    shouldResetInput = true;
  }

  function handleClear() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetInput = false;
    updateDisplay();
  }

  function handleDecimal() {
    if (shouldResetInput) {
      currentInput = '0.';
      shouldResetInput = false;
    } else if (!currentInput.includes('.')) {
      currentInput += '.';
    }
    updateDisplay();
  }

  function handleClearEntry() {
    currentInput = '0';
    shouldResetInput = false;
    updateDisplay();
  }

  function handlePercent() {
    if (currentInput !== 'Error') {
      currentInput = formatResult(parseFloat(currentInput) / 100);
      updateDisplay();
    }
  }

  document.querySelector('.buttons').addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const action = btn.dataset.action;
    const value = btn.dataset.value;

    switch (action) {
      case 'number':      handleNumber(value); break;
      case 'operator':    handleOperator(value); break;
      case 'equals':      handleEquals(); break;
      case 'clear':       handleClear(); break;
      case 'clear-entry': handleClearEntry(); break;
      case 'decimal':     handleDecimal(); break;
      case 'percent':     handlePercent(); break;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
    else if (e.key === '.') handleDecimal();
    else if (e.key === '+') handleOperator('+');
    else if (e.key === '-') handleOperator('-');
    else if (e.key === '*') handleOperator('*');
    else if (e.key === '/') { e.preventDefault(); handleOperator('/'); }
    else if (e.key === 'Enter' || e.key === '=') handleEquals();
    else if (e.key === 'Escape') handleClear();
    else if (e.key === 'Backspace') {
      if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
      } else {
        currentInput = '0';
      }
      updateDisplay();
    }
  });

  updateDisplay();
})();

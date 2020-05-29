window.addEventListener('load', start);

function start() {
  preventForm();

  let red = document.querySelector('#range-red');
  let green = document.querySelector('#range-green');
  let blue = document.querySelector('#range-blue');

  red.addEventListener('input', printColor);
  green.addEventListener('input', printColor);
  blue.addEventListener('input', printColor);

  printColor();
}

function preventForm() {
  let form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

function printColor() {
  colorValues = getInputValues();

  let cor = `rgb(${colorValues.red},${colorValues.green},${colorValues.blue})`;
  document.getElementById('print-color').style.backgroundColor = cor;

  printValues(colorValues.red, colorValues.green, colorValues.blue, cor);
}

function printValues(red, green, blue, cor) {
  document.getElementById('out-red').value = red;
  document.getElementById('out-green').value = green;
  document.getElementById('out-blue').value = blue;
  document.getElementById('print-rgb').textContent = cor;
  document.getElementById('print-rgb').style.padding = '2%';
}

function getInputValues() {
  let red = document.querySelector('#range-red').value;
  let green = document.querySelector('#range-green').value;
  let blue = document.querySelector('#range-blue').value;

  return (values = { red: red, green: green, blue: blue });
}

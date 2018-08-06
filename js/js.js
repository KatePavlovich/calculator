//(function(){
let operator;
let num1 = '';
let num2 = '';
let result = '0';
let needReset = false;
let display = document.querySelector("#display");
let clear = document.querySelector("#clear");
let deleteLast = document.querySelector("#deleteLast");
let equals = document.querySelector("#equals");
let decimal = document.querySelector("#decimal");

let operations = {
    '+': (a,b) => a*1+b*1,
    '-': (a,b) => a-b,
    '*': (a,b) => a*b,
    '/': (a,b) => a/b
}

function clearDisplayButtonListener() {
    display.innerHTML = '0';
    needReset = false;
}

clear.addEventListener('click', clearDisplayButtonListener);

function getDecimalButtonListener() {
    if (display.innerHTML.indexOf('.') === -1) {
        if (display.innerHTML === '0' || display.innerHTML === '') { 
            display.innerHTML = '0.';
            
        } else {  
            display.innerHTML = display.innerHTML + '.';

        }
        if (!needReset) {
            num1 = display.innerHTML;
            console.log(num1);
           } else {
            num2 = display.innerHTML;
            console.log(num2);
           }
    }
}

decimal.addEventListener('click', getDecimalButtonListener);

function clearDisplayLastElementListener() {
    display.innerHTML = display.innerHTML.slice(0, -1);
   if (display.innerHTML === '') {
    display.innerHTML = '0';
    num1 = '0';
   }
   
   if (!needReset) {
    num1 = display.innerHTML;
    //console.log(num1);
   } else {
    num2 = display.innerHTML;
    //console.log(num2);
   }
}

deleteLast.addEventListener('click', clearDisplayLastElementListener);


function resultButtonClickListener() {
    switch (operator) {
        case 'x':
        operator = '*';
        break;
        case '÷':
        operator = '/';
        break;
    }
    needReset = false;
    result = operations[operator](num1, num2);
    num1 = result;
    num2 = '';
    display.innerHTML = result;
}

equals.addEventListener('click', resultButtonClickListener);


function numberButtonsClickListener(e) {
// вот здесь находим инпут и приписываем к его значению справа значение нажатой кнопки e.currentTarget.value
   // display += String(e.currentTarget.value);
   console.log(display.innerHTML);
   if (!needReset) {
    if (display.innerHTML[0] === '0' && display.innerHTML.indexOf('.') === -1) {
        display.innerHTML = display.innerHTML.substring(1);
    } 
    display.innerHTML += e.currentTarget.innerHTML;
    num1 += e.currentTarget.innerHTML;
   } else {
    display.innerHTML += e.currentTarget.innerHTML;
    num2 += e.currentTarget.innerHTML;
   }
}

function operationButtonsClickListener(e) {
    // вот здесь находим инпут 
   // if (e.currentTarget.mathch(/[-\+\*\/]/) {
        needReset = true;
        num1 = display.innerHTML;
        operator = e.currentTarget.innerHTML;
        display.innerHTML = e.currentTarget.innerHTML;
   // }
}

let numberButtons = document.querySelectorAll(".number");

for (let i=0; i < numberButtons.length; i++) {
     numberButtons[i].addEventListener("click", numberButtonsClickListener);
}

let operationButtons = document.querySelectorAll(".operation-button");

for (let i=0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener("click", operationButtonsClickListener);
}



//})();
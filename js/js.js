(() => {
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
let formula = document.querySelector("#formula");
let numberButtons = document.querySelectorAll(".number");
let operationButtons = document.querySelectorAll(".operation-button");

let operations = {
    '+': (a,b) => a*1+b*1,
    '-': (a,b) => a-b,
    '*': (a,b) => a*b,
    '/': (a,b) => a/b
}

function clearDisplayButtonListener() {
    //reset to default values
    display.innerHTML = '0';
    needReset = false;
    formula.innerHTML = '';
    num1 = '';
    num2 = '';
}

clear.addEventListener('click', clearDisplayButtonListener);

function getDecimalButtonListener() {
    //add '.' to numbers and checks for '.' to be the one
    if (display.innerHTML.indexOf('.') === -1) {
        if (display.innerHTML === '0' || display.innerHTML.match(/[\s-\+x÷]/)) { 
            display.innerHTML = '0.';
            formula.innerHTML = '0.';
        } else {  
            display.innerHTML = display.innerHTML + '.';
            formula.innerHTML = formula.innerHTML.slice(0,-1) + display.innerHTML;
        }
        if (!needReset) {
            num1 = display.innerHTML;
        } else {
            num2 = display.innerHTML;
        }
    }
}

decimal.addEventListener('click', getDecimalButtonListener);

function clearDisplayLastElementListener() {
    //logic of 'CE' button: delete last element
    display.innerHTML = display.innerHTML.slice(0, -1);
    if (display.innerHTML === '') {
        display.innerHTML = '0';
        num1 = '0';
        formula.innerHTML = '0';
    }
    
    if (!needReset) {
        num1 = display.innerHTML;
    } else {
        num2 = display.innerHTML;
    }
    formula.innerHTML = display.innerHTML;  
}

deleteLast.addEventListener('click', clearDisplayLastElementListener);

function resultButtonClickListener() {
    //sets the result
    if (num2 === '' && operator === undefined) {
        console.log(operator);
        display.innerHTML = num1;
        formula.innerHTML += `= ${num1}`;
    }

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
    formula.innerHTML += `= ${result}`; 
}

equals.addEventListener('click', resultButtonClickListener);

function numberButtonsClickListener(e) {
//sets num1 & num2 values
   if (!needReset) {
    if (display.innerHTML[0] === '0' && display.innerHTML.indexOf('.') === -1) {
        display.innerHTML = display.innerHTML.substring(1);
    } 
    display.innerHTML += e.currentTarget.innerHTML;
    num1 += e.currentTarget.innerHTML;
   } else {
       if (display.innerHTML === operator) {
            display.innerHTML = '';
        }
        display.innerHTML += e.currentTarget.innerHTML;
        num2 += e.currentTarget.innerHTML;
   }
   formula.innerHTML += e.currentTarget.innerHTML;
}

numberButtons.forEach(i => i.addEventListener("click", numberButtonsClickListener));


function operationButtonsClickListener(e) {
    // checks for operator
    needReset = true;
    num1 = display.innerHTML;
    operator = e.currentTarget.innerHTML;
    display.innerHTML = e.currentTarget.innerHTML;
    formula.innerHTML += e.currentTarget.innerHTML;

    let temp = formula.innerHTML.length-1;

    //checks if there are many operators in a row (+*-/=/). operator is the last clicked
    if (formula.innerHTML[temp].match(/[\s-\+x÷]/) && formula.innerHTML[temp-1].match(/[\s-\+x÷]/)) {
        operator = formula.innerHTML[temp-1];
        formula.innerHTML = formula.innerHTML.slice(0, -2) + operator;
        display.innerHTML = e.currentTarget.innerHTML;
        num1 = formula.innerHTML.slice(0, -1);
    }

    //this code should count many operations in a row (sample: 1+5-8*6=?). but it doesn't work correctly now
       /*if (result === '0' && num1 !=='' && num2 !== '' && e.currentTarget.innerHTML.match(/[\s-\+x÷]/)) {
            operator = e.currentTarget.innerHTML;
           // resultButtonClickListener();
           console.log('if result==0: ' +result+' 1n: '+ num1+' 2n: '+num2);
        
           switch (operator) {
            case 'x':
            operator = '*';
            break;
            case '÷':
            operator = '/';
            break;
        }
        //needReset = false;
        result = operations[operator](num1, num2);
        num1 = result;
        num2 = '';
        formula.innerHTML = result + operator; 
       }*/
}

operationButtons.forEach(i => i.addEventListener("click", operationButtonsClickListener));
})();
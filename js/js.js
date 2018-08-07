//(() => {
let calculator = {

    operator: null,
    num1: '',
    num2: '',
    result: '0',
    needReset: false,
    display: document.querySelector("#display"),
    clear: document.querySelector("#clear"),
    deleteLast: document.querySelector("#deleteLast"),
    equals: document.querySelector("#equals"),
    decimal: document.querySelector("#decimal"),
    formula: document.querySelector("#formula"),
    numberButtons: document.querySelectorAll(".number"),
    operationButtons: document.querySelectorAll(".operation-button"),

    operations: {
        '+': (a,b) => a*1+b*1,
        '-': (a,b) => a-b,
        '*': (a,b) => a*b,
        '/': (a,b) => a/b
    },

    initialise: function() {
        let that = this;

        clear.addEventListener('click', (e) => that.clearDisplayButtonListener(e));
        decimal.addEventListener('click', (e) => that.getDecimalButtonListener(e));
        deleteLast.addEventListener('click', (e) => that.clearDisplayLastElementListener(e));
        equals.addEventListener('click', (e) => that.resultButtonClickListener(e));
        this.numberButtons.forEach(i => i.addEventListener("click", (e) => that.numberButtonsClickListener(e)));
        this.operationButtons.forEach(i => i.addEventListener("click", (e) => that.operationButtonsClickListener(e)));

    },

clearDisplayButtonListener: function (e) {
    //reset to default values
    this.display.innerHTML = '0';
    this.needReset = false;
    this.formula.innerHTML = '';
    this.num1 = '';
    this.num2 = '';
},



getDecimalButtonListener: function (e) {
    //add '.' to numbers and checks for '.' to be the one
    if (this.display.innerHTML.indexOf('.') === -1) {
        if (this.display.innerHTML === '0' || this.display.innerHTML.match(/[\s-\+x÷]/)) { 
            this.display.innerHTML = '0.';
            this.formula.innerHTML = '0.';
        } else {  
            this.display.innerHTML = this.display.innerHTML + '.';
            this.formula.innerHTML = this.formula.innerHTML.slice(0,-1) + this.display.innerHTML;
        }
        if (!this.needReset) {
            this.num1 = this.display.innerHTML;
        } else {
            this.num2 = this.display.innerHTML;
        }
    }
},



clearDisplayLastElementListener: function (e) {
    //logic of 'CE' button: delete last element
    this.display.innerHTML = this.display.innerHTML.slice(0, -1);
    if (this.display.innerHTML === '') {
        this.display.innerHTML = '0';
        this.num1 = '0';
        this.formula.innerHTML = '0';
    }
    
    if (!this.needReset) {
        this.num1 = this.display.innerHTML;
    } else {
        this.num2 = this.display.innerHTML;
    }
    this.formula.innerHTML = this.display.innerHTML;  
},



resultButtonClickListener: function () {
    //sets the result
    if (this.num2 === '' && this.operator === undefined) {
       // console.log(operator);
       this.display.innerHTML = this.num1;
       this.formula.innerHTML += `= ${this.num1}`;
    }

    switch (this.operator) {
        case 'x':
        this.operator = '*';
        break;
        case '÷':
        this.operator = '/';
        break;
    }
    this.needReset = false;
    this.result = this.operations[this.operator](this.num1, this.num2);
    this.num1 = this.result;
    this.num2 = '';
    this.display.innerHTML = this.result;
    this.formula.innerHTML += `= ${this.result}`; 
},



numberButtonsClickListener: function (e) {
//sets num1 & num2 values
   if (!this.needReset) {
    if (this.display.innerHTML[0] === '0' && this.display.innerHTML.indexOf('.') === -1) {
        this.display.innerHTML = this.display.innerHTML.substring(1);
    } 
    this.display.innerHTML += e.currentTarget.innerHTML;
    this.num1 += e.currentTarget.innerHTML;
   } else {
       if (this.display.innerHTML === this.operator) {
        this.display.innerHTML = '';
        }
        this.display.innerHTML += e.currentTarget.innerHTML;
        this.num2 += e.currentTarget.innerHTML;
   }
   this.formula.innerHTML += e.currentTarget.innerHTML;
},




operationButtonsClickListener: function (e) {
    // checks for operator
    this.needReset = true;
    this.num1 = this.display.innerHTML;
    this.operator = e.currentTarget.innerHTML;
    this.display.innerHTML = e.currentTarget.innerHTML;
    this.formula.innerHTML += e.currentTarget.innerHTML;

    let temp = this.formula.innerHTML.length-1;

    //checks if there are many operators in a row (+*-/=/). operator is the last clicked
    if (this.formula.innerHTML[temp].match(/[\s-\+x÷]/) && this.formula.innerHTML[temp-1].match(/[\s-\+x÷]/)) {
        this.operator = this.formula.innerHTML[temp-1];
        this.formula.innerHTML = this.formula.innerHTML.slice(0, -2) + this.operator;
        this.display.innerHTML = e.currentTarget.innerHTML;
        this.num1 = this.formula.innerHTML.slice(0, -1);
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
}
//})();

calculator.initialise();
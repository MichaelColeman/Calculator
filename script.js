const screen = document.querySelector('.bottom-screen');
const topScreen = document.querySelector('.top-screen');

const btnContainer = document.querySelector('.btn-container');
btnContainer.addEventListener('click', (e) => {
  console.log(e.target.value);
  calculator.handleButtonClick(e.target.value);
});

let calculator = {
  inputArr: [],
  x: 0,
  y: 0,
  solution: 0,
  operator: '',

  resetInputArr() {
    this.inputArr.length = 0;
  },

  handleButtonClick(btnValue) {
    if (Number.isInteger(Number(btnValue)) === true) {
      this.inputArr.push(btnValue);
      screen.textContent = this.inputArr.join('');
    } else {
      switch (btnValue) {
        case '+':
        case '-':
        case '/':
        case '*':
          if (!this.x && this.inputArr) {
            this.x = Number(this.inputArr.join(''));
            this.operator = btnValue;
            this.resetInputArr();
            screen.textContent = this.operator;
          } else if (this.x && this.operator) {
            this.operator = btnValue;
            topScreen.textContent = `${this.solution} ${this.operator}`;
            this.y = Number(this.inputArr.join(''));
            this.solution = this.operate(this.operator, this.x, this.y);
            this.x = this.solution;
            screen.textContent = this.solution;
            this.resetInputArr();
          }
          this.operator = btnValue;
          break;
        case 'C':
          this.inputArr.length = 0;
          delete this.x;
          delete this.y;
          delete this.solution;
          delete this.operator;
          screen.textContent = this.inputArr.join('');
          topScreen.textContent = '';
          break;
        case '=':
          if (this.x && this.operator) {
            this.y = Number(this.inputArr.join(''));
            this.solution = this.operate(this.operator, this.x, this.y);
            screen.textContent = this.solution;
            topScreen.textContent = `${this.x} ${this.operator} ${this.y}`;
            this.x = this.solution;
            this.resetInputArr();
          }
          break;
        case '.':
          //TODO implement '.' button
          break;
        default:
          console.log('handle button switch statement failure');
          break;
      }
    }
  },

  operate(operator, x, y) {
    let solution;
    switch (operator) {
      case '+':
        solution = this.add(x, y);
        break;
      case '/':
        solution = this.divide(x, y);
        break;
      case '*':
        solution = this.multiply(x, y);
        break;
      case '-':
        solution = this.subtract(x, y);
        break;
      default:
        console.log('operate function switch failure');
        break;
    }
    return solution;
  },

  add(x, y) {
    return x + y;
  },

  subtract(x, y) {
    return x - y;
  },

  multiply(x, y) {
    return x * y;
  },

  divide(x, y) {
    return x / y;
  },
};
//133

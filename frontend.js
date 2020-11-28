import Interpreter from './inputInterpretation.js';

const inputElement = document.querySelector('.notes-input');

//console.log(Interpreter.interpret());

Interpreter.on('input', inputElement, (e) => {
    console.log(e);
})
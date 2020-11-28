import Interpreter from './inputInterpretation.js';
import Output from './output.js';

const inputElement = document.querySelector('.notes-input');
const outputElement = document.querySelector('.notes-output');

//console.log(Interpreter.interpret());

Interpreter.on('input', inputElement, (e) => {

    Output.write(outputElement, e)

})
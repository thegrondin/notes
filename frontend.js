import Interpreter from './inputInterpretation.js';
import Output from './output.js';
import Commands from './command.js'

const inputElement = document.querySelector('.notes-input');
const outputElement = document.querySelector('.notes-output');
const commandElement = document.querySelector('.command-input')

let data = [];

Interpreter.on('input', inputElement, (e) =>  { 
    data = e;
    Output.write(outputElement, e) 
});

Commands.on('entered', commandElement, (command) => {
    Commands.execute(command, inputElement, outputElement);
})

//save -n fichier.note -p C:\Users\tomto\Documents\notes\
//save -n fichier2.notes -p /home/thomas/Documents/
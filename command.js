
const fs = require('fs');

// save
// save -n fichier.note -p ~/Documents/Cours/ 
// export -x pdf -f a4
// export -x html
// load -n fichier.note -p ~/Document/Cours
//

const commands = {
    "save" : (args, input, output) => {

        const file = args.filter(a => a.arg === '-n')[0].value;
        const path = args.filter(a => a.arg === '-p')[0].value;

        try {
            fs.writeFileSync(path + file, input.value, 'utf-8')
        }
        catch(e) {
            console.log(e);
        }

    },
    "export" : () => {

    },
    "load" : () => {

    }
}

const format = (rawCommand) => {
    //save -n fichier.note -p ~/Documents/Cours/ 

    const words = rawCommand.split(' ');

    /* 
    Example:
        Command ==> { 
            "name" : "save", 
            "args" : [ 
                { arg: "-n", value : "fichier.note"}, 
                { arg: "-p", value : "~/Documents/Cours" }
            ] 
        } 
    */
    const command = {};

    command.name = words.shift();

    command.args = words.map((word, i) => {

        let argument = {arg : '', value: ''};

        if (word[0] === '-') {
            argument.arg = word;
        }
        else {
            return;
        }
        
        if (words[i + 1] && words[i + 1][0] !== '-') {
            argument.value = words[i + 1];
        }

        return argument;
    }).filter(Boolean);

    return command;
    
}


const inputConfirmListener = (inputElement, callback) => {
    inputElement.addEventListener('keyup', (e) => {
        
        if (e.keyCode !== 13) return;

        e.preventDefault();

        callback(format(inputElement.value));
        

    });
}

const on = (name, element, callback) => {
    switch(name) {
        case 'entered' : 
            inputConfirmListener(element, callback);
            break;
    }
}

const execute = (command, input, output) => {

    commands[command.name](command.args, input, output);

    //console.log(command);
}

export default {on, execute}
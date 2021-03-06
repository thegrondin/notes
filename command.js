
const fs = require('fs');

// save
// save -n fichier.note -p ~/Documents/Cours/ 
// export -x pdf -f a4
// export -x html
// load -n fichier.note -p ~/Document/Cours
//

let activeProperties = {} 

const commands = {
    "save" : (args, input, output) => {

        const pathArg = args.filter(a => a.arg === '-p');

        let path = pathArg.length !== 0 ? pathArg[0].value : null;

        if (!path) {
            path = activeProperties.currentPath;
        }

        try {
            fs.writeFileSync(path, input.value, 'utf-8')
            activeProperties.currentPath = path;
        }
        catch(e) {
            console.log(e);
        }

    },
    "export" : () => {

    },
    "load" : (args, input, output) => {
        const path = args.filter(a => a.arg === '-p')[0].value;

        try {
            const result = fs.readFileSync(path, 'utf-8');
            input.value = result;
            activeProperties.currentPath = path;
        }
        catch (e) {
            console.log(e);
        }
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

let buf = [];

const write = (outputElement, lines) => {

    for (let i = 0; i < lines.length; i++) {

        const line = lines[i];

        if (buf[i] !== line) buf[i] = line;
    }

    outputElement.innerHTML = buf.join('');
}

export default {
    write
}
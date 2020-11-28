const mapping = [
    { key: '##', element: 'h2'},
    { key: '#', element: 'h1' },
    { key: '*', element: 'ul'}
];

const format = (text) => {

    let html = [];
    const lines = text.split('\n');

    for (const line of lines) {

        const element = mapping.filter(m => line.includes(m.key))[0];
        console.log(element);

        if (!element) {
            html.push(`<p>${line}</p>`);
            continue;
        }

        html.push(`<${element.element}>${line.replace(element.key,'')}</${element.element}>`);
        

    }

    return html;

}

const addInputListener = (textarea, callback) => {

    textarea.addEventListener('input', (e) => {
       
        const html = format(textarea.value);
        
        callback(html);

    })

}

const on = (name, element, callback) => {

    switch (name) {
        case 'input' :
            addInputListener(element, callback)
            break;

    }

}

const init = (textarea) => {

    bindNativeEvents(textarea);

}

export default {
    init, on
}
function color(directive) {
    if (directive.includes('script')) {
        return 'red';
    }
    if (directive.includes('style')) {
        return 'purple';
    }
    if (directive.includes('frame')) {
        return 'blue';
    }
    if (directive.includes('object')) {
        return 'blue';
    }
    if (directive.includes('font')) {
        return 'mediumpurple'
    }
    if (directive.includes('worker')) {
        return 'orange'
    }
    if (directive.includes('img')) {
        return 'green'
    }
}

function reset() {
    const button = document.createElement('button');
    button.textContent = 'reset 🔄';
    button.addEventListener('click', () => {
        sessionStorage.temp_state = '';
        reload(true);
    });
    return button;
}

function share() {
    const button = document.createElement('button');
    button.textContent = 'share 🔗';
    button.addEventListener('click', () => {
        const blob = new Blob([location.href], {type: 'text/plain'});
        const item = new ClipboardItem({'text/plain': blob});
        navigator.clipboard.write([item]).then(() => {
            button.textContent = 'link copied to clipboard'
        });
    });
    return button;
}

function save() {
    const button = document.createElement('button');
    button.textContent = 'save ⬇️';
    button.addEventListener('click', () => {
        const name = prompt('name?');
        saveStorage([name], getParam('config'));
        sessionStorage.temp_state = name;
        reload();
    });
    return button;
}

function load() {
    const select = document.createElement('select');
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'load ⬆️';
    if (!sessionStorage.temp_state) option.selected = 'true';
    select.appendChild(option);
    select.addEventListener('change', () => {
        sessionStorage.temp_state = select.selectedOptions[0].value;
        reload();
    });
    for (const name in storage) {
        const option = document.createElement('option');
        if (sessionStorage.temp_state === name) option.selected = 'true';
        option.value = option.textContent = name;
        select.appendChild(option);
    }
    return select;
}

function code(xss = ';') {
    const container = document.createElement('div');
    const textarea = container.appendChild(document.createElement('textarea'));
    textarea.placeholder = `\n\n\tsetTimeout(() => alert("XSS WORKED!"), 500);`;
    textarea.style.width = "80%";
    textarea.style.height = "300px";
    textarea.value = xss;
    textarea.addEventListener('blur', () => updateXSS(textarea.value));
    return container;
}

function directive(name, value = '') {
    const opacity = {max: 1, min: value ? 1 : 0.4}
    const container = document.createElement('div');
    container.style.opacity = opacity.min;
    container.addEventListener('mouseover', () => container.style.opacity = opacity.max);
    container.addEventListener('mouseout', () => container.style.opacity = opacity.min);
    const input = container.appendChild(document.createElement('input'));
    input.style.width = "350px";
    input.value = value;
    input.addEventListener('blur', () => updateCSP(name, input.value));
    const span = container.appendChild(document.createElement('span'));
    span.style.fontStyle = 'italic';
    span.style.color = color(name);
    span.textContent = ` ${name}`;
    return container;
}

function initUI(state, container, hideAfter = Infinity) {
    container.appendChild(code(config.xss));
    let i = -1;
    for (const d in state) {
        if (i++ === hideAfter) {
            container = container.appendChild(document.createElement('details'));
            const summary = document.createElement('summary');
            summary.style.fontStyle = 'italic';
            summary.textContent = 'more...';
            container.appendChild(summary);
        }
        const v = state[d].join(', ');
        container.appendChild(directive(d, v));
    }
}
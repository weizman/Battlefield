function code(xss = ';') {
    const container = document.createElement('div');
    const textarea = container.appendChild(document.createElement('textarea'));
    textarea.style.width = "350px";
    textarea.style.height = "200px";
    textarea.value = xss;
    textarea.addEventListener('blur', () => updateXSS(textarea.value));
    const span = container.appendChild(document.createElement('span'));
    span.textContent = ' (xss)';
    return container;
}

function directive(name, value = '') {
    const container = document.createElement('div');
    const input = container.appendChild(document.createElement('input'));
    input.style.width = "350px";
    input.value = value;
    input.addEventListener('blur', () => updateCSP(name, input.value));
    const span = container.appendChild(document.createElement('span'));
    span.textContent = ` (${name})`;
    return container;
}

function initUI(container) {
    container.appendChild(code(config.xss));
    for (const d in directives) {
        const v = directives[d].join(', ');
        container.appendChild(directive(d, v));
    }
}
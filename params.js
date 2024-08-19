const config = JSON.parse(getParam('config') || '{}');
config.xss = config.xss || '';
config.csp = config.csp || {};

function reload() {
    location = setParam('config', JSON.stringify(config));
}

function updateCSP(directive, value) {
    if (!value) return;
    const same = config.csp[directive] && config.csp[directive][0] === value;
    config.csp[directive] = [value];
    if (value && !same) reload();
}

function updateXSS(value) {
    const same = value === config.xss;
    config.xss = value;
    if (value && !same) reload();
}

function getParam(param) {
    const url = new URL(window.location.href);
    return url.searchParams.get(param);
}
function setParam(param, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    return url;
}
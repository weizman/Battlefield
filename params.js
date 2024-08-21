const config =
    sessionStorage.temp_state ?
        JSON.parse(atob(storage[sessionStorage.temp_state])) :
    JSON.parse(atob(getParam('config')) || '{}');
config.xss = config.xss || '';
config.csp = config.csp || {};

function reload(clear = false) {
    const param = !clear ? btoa(JSON.stringify(config)) : '';
    location = setParam('config', param);
}

function updateCSP(directive, value) {
    if (!value && !config.csp[directive]) return;
    const same = (config.csp[directive] && config.csp[directive][0] === value)
    config.csp[directive] = [value];
    if (!same) {
        sessionStorage.temp_state = '';
        reload();
    }
}

function updateXSS(value) {
    const same = value === config.xss;
    config.xss = value;
    if (!same) {
        sessionStorage.temp_state = '';
        reload();
    }
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
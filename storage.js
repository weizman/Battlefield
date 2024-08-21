localStorage.bf_state = localStorage.bf_state || '{}';

const storage = {};

function loadStorage() {
    Object.assign(storage, JSON.parse(localStorage.bf_state));
}

function saveStorage(name, value) {
    storage[name] = value;
    localStorage.bf_state = JSON.stringify(storage);
}

loadStorage();
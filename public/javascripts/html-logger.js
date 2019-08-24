// const $ = require("jquery");

const logPosition = {
    TOP: 0,
    BOTTOM: 1
}

function htmlLogger() {
    _hasLogs = false;
    _logs = []

    this.log = (msg, pos = logPosition.TOP) => {
        const elem = document.createElement('div');
        elem.innerHTML = '';
        if (msg) elem.innerHTML = msg;
        $(elem).attr('id', `log-${_logs.length+1}`);
        _logs.push(elem);
        $('body').append(elem);
        // access the html

        _hasLogs = true;
        if (_hasLogs) {
        }
    }

    this.removeLogs = () => {
        const elemToRemove = _logs.shift();
        $($(elemToRemove).attr('id')).remove();
        if (_logs.length === 0) {

        }
    }

    return this;
}

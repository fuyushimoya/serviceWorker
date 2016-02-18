// Functions
function registerService() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceWorker.js')
            .then(function registerSuccess() {
                showState("Reg Success.");
            })
            .catch(function registerFailed()) {
                showState("Reg Failed.");
            }
    } else {
        console.warn('Service worker not available.');
    }
}
function unregisterService() {
    showState("unregisterService Not implement yet");
}
function runWebWorker() {
    showState("runWebWorker Not implement yet");
}

function showState(state) {
    if (!this.state) {
        this.state = document.getElementById('state');
    }
    this.state.innerText = state;
}

(function domReadyHandler() {
    console.log('Dom ready, start to do something...');

    var registerServiceBtn = document.getElementById('registerService');
    var unRegisterServiceBtn = document.getElementById('unRegisterService');
    var runWebWorkerBtn = document.getElementById('worker');

    registerServiceBtn.addEventListener('click', registerService);
    unRegisterServiceBtn.addEventListener('click', unregisterService);
    runWebWorkerBtn.addEventListener('click', runWebWorker);
})();
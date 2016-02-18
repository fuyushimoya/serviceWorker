// Functions
function registerService() {
    console.log("registerService Not implement yet");
}
function unregisterService() {
    console.log("unregisterService Not implement yet");
}
function runWebWorker() {
    console.log("runWebWorker Not implement yet");
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
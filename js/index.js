var activeServiceWorker = null;
var activeChannel = null;

// Functions
function registerService() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceWorker.js')
            .then(function registerSuccess(reg) {
                showState("Reg Success.");

                initState();
            })
            .catch(function registerFailed() {
                showState("Reg Failed.");
            });
    } else {
        console.warn('Service worker not available.');
    }
}

function initState() {
    // Check if push messaging is supported  
    if (!('PushManager' in window)) {  
        console.log('Push messaging isn\'t supported.');  
        return;  
    }

    // Wait until serviceWorker is ready
    navigator.serviceWorker.ready.then(function (reg) {
        activeChannel = new MessageChannel();
        activeChannel.port1.onmessage = function(e) {
            console.log(e);
        };
        activeServiceWorker = reg.active;
    });
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
    if (isNotificationAvailable()) {
        notify(state);
    }
}

function testNotification() {
    if (isNotificationAvailable()) {
        notify('BlaBlaBla');
    }
}

function postMessage() {
    if (!activeServiceWorker) {
        console.log("Not available");
        return;
    }

    var text = document.getElementById('sendContent').value;
    activeServiceWorker.postMessage({
        type: 'text',
        content: text
    }, [activeChannel.port2]);
}


(function domReadyHandler() {
    console.log('Dom ready, start to do something...');

    var registerServiceBtn = document.getElementById('registerService');
    var unRegisterServiceBtn = document.getElementById('unRegisterService');
    var runWebWorkerBtn = document.getElementById('worker');
    var sendMessageBtn = document.getElementById('send');

    registerServiceBtn.addEventListener('click', registerService);
    unRegisterServiceBtn.addEventListener('click', unregisterService);
    runWebWorkerBtn.addEventListener('click', runWebWorker);
    sendMessageBtn.addEventListener('click', postMessage);
})();
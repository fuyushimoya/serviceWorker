self.addEventListener('activate', function() {
    var dbRequest = indexedDB.open('testServiceWorker', 3);
    dbRequest.onupgradeneeded = function(evt) {
        var db = evt.target.result;
        var store = db.createStore('kvPair', {keyPath: 'key'});
    };
    dbRequest.onsuccess = function(evt) {
        var db = evt.target.result;
        var transaction = db.transaction(["kvPair"]);
        var store = transaction.objStore('kvPair');
        var req = store.get('interval');
        req.onsuccess = function(evt) {
            console.log(evt);
            var interval = evt.result ? evt.result.value : 0;
            if (interval > 0) {
                startInterval(obj.content);
            } else {
                stopInterval();
            }
        }
    };
});

self.addEventListener('message', function (event) {
    var obj = event.data;
    console.log(obj);
    if (obj.type === 'text') {
        fireNotification(obj.content);
    } else if (obj.type === 'interval') {
        if (obj.content > 0) {
            // Set to DB
            var dbRequest = indexedDB.open('testServiceWorker', 3);
            dbRequest.onupgradeneeded = function(evt) {
                var db = evt.target.result;
                var store = db.createStore('kvPair', {keyPath: 'key'});
            };

            dbRequest.onsuccess = function(evt) {
                var db = evt.target.result;
                var transaction = db.transaction(["kvPair"], "readwrite");
                var store = transaction.objStore('kvPair');
                store.put({key: 'interval', value: obj.content});
            };

            startInterval(obj.content);
            fireNotification('Interval Stared.');
        } else {
            stopInterval();
            fireNotification('Interval Stopped.');
        }
    }
});

var intervalHandle = null;
function startInterval(time) {
    // Clear prev.
    if (intervalHandle !== null) {
        startInterval();
    }
    intervalHandle = setInterval(function() {
        var now = new Date();
        var title = 'TimeNow';
        var body = now.toLocaleString();
        var icon = 'push-icon.png';
        var tag = 'timeNotify';

        self.registration.showNotification(title, {
            body: body,  
            icon: icon,  
            tag: tag  
        });
    }, time);
};
function stopInterval() {
    if (intervalHandle !== null) {
        clearInterval(intervalHandle);
        intervalHandle = null;
    }
}

function fireNotification(text) {
  var title = 'Notify';  
  var body = text
  var icon = 'push-icon.png';
  var tag = 'notify';
   
  self.registration.showNotification(title, {
    body: body,  
    icon: icon,  
    tag: tag  
  });
}
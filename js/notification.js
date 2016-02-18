function isNotificationAvailable() {
    if ('Notification' in window) {
        return checkPermission();
    }
    return false;
}

function checkPermission() {
    if (Notification.permission === 'granted') {
        return true;
    } else {
        Notification.requestPermission();    
        return (Notification.permission === 'granted');
    }
}

function notify(msg) {
    if (typeof msg === 'undefined') {
        msg = 'Hello';
    }

    if (!isNotificationAvailable()) {
        console.log('Not avail');
        return;
    }

    var notification;
    if (Notification.permission === 'granted') {
        notification = new Notification(msg);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification(msg);
          }
        });
    }
}
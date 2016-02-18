// handle install step
self.addEventListener('message', function (event) {
    var obj = event.data.json();
    console.log(obj);
});

function fireNotification(obj, event) {
  var title = 'Subscription change';  
  var body = obj.name + ' has ' + obj.action + 'd.'; 
  var icon = 'push-icon.png';  
  var tag = 'push';
   
  event.waitUntil(self.registration.showNotification(title, {
    body: body,  
    icon: icon,  
    tag: tag  
  }));
}
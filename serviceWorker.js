// handle install step
self.addEventListener('message', function (event) {
    var obj = event.data;
    console.log(obj);
    if (obj.type && obj.type === 'text') {
        fireNotification(obj.content);
    }
});

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
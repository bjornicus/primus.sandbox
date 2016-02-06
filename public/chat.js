    
var output = document.getElementById('output'),
    recipientBox = document.getElementById('recipientBox'),
    messageBox = document.getElementById('messageBox');

//
// Tell primus to create a new connect to the current domain/port/protocol
//
var primus = new Primus();

//
// Listen for incoming data and log it in our textarea.
//
primus.on('data', function received(data) {
  output.value += data +'\n';
  output.scrollTop = output.scrollHeight;
});

//
// Listen for submits of the form so we can send the message to the server.
//
document.getElementById('write').onsubmit = function submit(e) {
  if (e && e.preventDefault) e.preventDefault();

  //
  // Write the typed message.
  //
  var data = {
    recipient: recipientBox.value,
    message: messageBox.value
  }
  primus.write(data);
  messageBox.value = '';
};
    
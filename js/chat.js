// Get user
var myDataRef = new Firebase("https://fro15-c4-webapp.firebaseio.com");
var authData = myDataRef.getAuth();
var user = authData.uid;

$('#messageInput').keypress(function (e) {
  if (e.keyCode == 13) {
    var text = $('#messageInput').val();
    var usernameRef = new Firebase("https://fro15-c4-webapp.firebaseio.com/users");
    usernameRef.once("value", function(snapshot) {
      var username = snapshot.child(user).child('username').val();
      myDataRef.push({name: username, text: text});
    });
    $('#messageInput').val('');
  }
});

myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

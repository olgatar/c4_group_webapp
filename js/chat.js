// Get user
var myDataRef = new Firebase("https://fro15-c4-webapp.firebaseio.com");
var usernameRef = new Firebase("https://fro15-c4-webapp.firebaseio.com/users");
var authData = myDataRef.getAuth();
var user = authData.uid;

$('#messageInput').keypress(function (e) {
  if (e.keyCode == 13) {
    var text = $('#messageInput').val();
    usernameRef.once("value", function(snapshot) {
      var name = snapshot.child(user).child('username').val();
      myDataRef.push({name: name, text: text});
    });
    $('#messageInput').val('');
  }
});

myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
  if (text) { //in chatt flow are added only nodes in which message.text exist
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  }
};

// Check if user is logged in
var refUser = new Firebase("https://fro15-c4-webapp.firebaseio.com");
var authData = refUser.getAuth();

if (authData) {
  console.log("inloggad");
}
else {
  console.log("inte inloggad");
  window.location.replace("index.html");
}

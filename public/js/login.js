var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("user").value;
var password = document.getElementById("pass").value;
if ( username == "admin" && password == "admin1"){
alert ("Login successfully");
window.open('admininfo'); // Redirecting to other page.
return false;
}
else{
attempt --;// Decrementing by one.
alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("user").disabled = true;
document.getElementById("pass").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}
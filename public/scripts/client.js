

$(document).ready(onReady);

function onReady(){

// add event listeners
$('#register').on('click', register);

function register(){
// will run on click and collect data from client input and put into an object
var clientObject = {
  firstName: $('#ownerFirst').val(),
  lastName: $('#ownerLast').val(),
};
addClient();
}





} // end onReady

var addClient = function(){
  console.log('add new client');
};

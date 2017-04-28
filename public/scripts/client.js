

$(document).ready(onReady);

function onReady(){

// add event listeners
$('#register').on('click', registerClient);
$('#addPet').on('click', registerPet);

function registerClient(){
// will run on click and collect data from client input and put into an object
var clientObject = {
  firstName: $('#ownerFirst').val(),
  lastName: $('#ownerLast').val(),
};
console.log('add new client');
$.ajax ({
  url: '/addClient',
  type: 'POST',
  data: clientObject,
  success: function(data){
    console.log('adding client ->' , data);
  }
});
sendClient();
} // end registerClient

// create pet function
function registerPet(){
// will run on click and collect data from client input and put into an object
var petObject = {
  petName: $('#petName').val(),
  petBreed: $('#petBreed').val(),
  petColor: $('#petColor').val()
};
console.log('add new pet');
$.ajax ({
  url: '/addPet',
  type: 'POST',
  data: petObject,
  success: function(data){
    console.log('adding pet ->' , data);
  }
});
}

// create sendClient function for dropdown
function sendClient(){
  console.log('send client to dropdown');
  $.ajax({
    url: '/getClients',
    type: 'GET',
    success: function(response){
      console.log('getting clients', response);
      for (var i = 0; i < response.length; i++) {
        $('.savedOwners').append('<option>' + response[i].firstname + " " + response[i].lastname + '</option>');
      }
    }
  });
}



} // end onReady

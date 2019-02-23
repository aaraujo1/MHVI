function dbWrite() {
  //reference to database
  const dbWrite = firebase.database().ref().child(String($('#item').val()));
  dbWrite.set({
    Item:$('#item').val(),
    Quantity:(parseInt($('#quantity').val())),
    Cost:(parseInt($('#cost').val())),
    Date: firebase.database.ServerValue.TIMESTAMP
  })
}
//item = name of item we want to change
//quanityTxtField = txtField with quanity we want to add or subtract
function updateDatabase(item,quantityTxtField){
  // var itemQuantity = firebase.database().ref('bike/Quantity');

  //grab database reference to the quantity of the String from item
  const itemQuantity = firebase.database().ref(item + "/Quantity");
  itemQuantity.transaction(function(currentQuantity){

    return (currentQuantity + parseInt(quantityTxtField));
  });
}

//seaches database with given searchTerm and prints result to given output
function searchDatabase(searchTerm,output){
  //grab a reference to object from the database with the String from searchTerm
  const dbRead = firebase.database().ref().child(searchTerm);
  dbRead.on('value', snap => {
    //get timestamp from firebase and convert to javascript Date object
    let date = new Date(snap.val().Date);
    output.html("Item: " + snap.val().Item +
        "\nCost: " + snap.val().Cost +
        "\nQuantity: " + snap.val().Quantity +
        "\nDate: " + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear());
    });
  }
  function driverQuantityUpdate(string){
      alert(string);
      let item = $('#list').find(":selected").text();
      let quantity = $('#driverTxtUpdate').val();
      updateDatabase(item,quantity);
  }
  function adminSelectForm(){
    let item = $('#adminList').find(":selected").text()
    let quantity = $('#adminSelectQuantity').val();
    updateDatabase(item,quantity);
  }

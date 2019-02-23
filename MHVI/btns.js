$(document).ready(function(){
  $('#printReport').click(function(){
    window.location = 'reports.html';
  })
  $('#driverDropOff').click(function(){
    $('#driverDropOff').addClass("hide");
    $('#driverPickUp').addClass("hide");
    $('#driver').show();
    $('#dropOffHeading').show();
    $('#pickUpHeading').hide();
    $('#driverDropOffSubmit').show();
    $('#driverPickUpSubmit').hide();
    $('#driverBack').show();
    
  });
  $('#driverPickUp').click(function(){
    $('#driverDropOff').addClass("hide");
    $('#driverPickUp').addClass("hide");
    $('#driver').show();
    $('#dropOffHeading').hide();
    $('#pickUpHeading').show();
    $('#driverDropOffSubmit').hide();
    $('#driverPickUpSubmit').show();
    $('#driverBack').show();
  });
  $('#driverDropOffSubmit').click(function() {
    let item = $('#searchName').val();
    //check if driver form meets validation rules and item is in database
    if ($('#driver').valid() && existsInDB(item)) {
      let quantity = $('#driverQuantityUpdate').val();
      updateDatabase(item,(-1 * quantity));
      location.reload();
    }else{
      $('#driverOutput').html('Please check that the item you entered is in the database');
    }
  });
  $('#driverPickUpSubmit').click(function() {
    let item = $('#searchName').val();
    //check if driver form meets validation rules and item is in database
    if ($('#driver').valid() && existsInDB(item)) {
      let quantity = $('#driverQuantityUpdate').val();
      updateDatabase(item,quantity);
      location.reload();
    }else{
      $('#driverOutput').html('Please check that the item you entered is in the database');
    }
  });
  $('#driverBack').click(function(){
    $('#driverDropOff').removeClass("hide");
    $('#driverPickUp').removeClass("hide");
    $('#driver').hide();
    $('#driverBack').hide();
    location.reload();
  });

  //btn class update
  $('#tableBody').on('click','.update',function(){
    let $row = $(this).closest("tr");   // Find the row
    let $nextRow = $row.next("tr"); // Find the row below
    $nextRow.toggle(); //show/hide .hidden row
  });
  //btn class submit
  $('#tableBody').on('click','.submit',function(){
    let $row = $(this).closest("tr"); // get the row where the button was pushed
    let $prevRow = $row.prev(); // get the row directly above
    let item = $prevRow.find(".item").text(); // Find the item we are upadting
    let cost = $row.find("input[name = 'costTR']").val(); //Find textbox for Cost
    let quantity = $row.find("input[name = 'quantityTR']").val(); //Find textbox for Quantity

    if ($('#table').valid()) { //check if row meet validation requirments
      //update admin table rows
      if (cost != ""){
        $prevRow.find(".cost").html(cost.toLocaleString('en'));
      }
      if (quantity != ""){
        let currentQuantity = parseInt($prevRow.find(".quantity").text().replace(/,/g,""));
        console.log(currentQuantity);
        $prevRow.find(".quantity").html((currentQuantity + parseInt(quantity)).toLocaleString('en'));
      }
      adminUpdateDatabase(item,quantity,cost);
    }
  });
  //btn class delete
  $('#tableBody').on('click','.delete',function(){
    let $row = $(this).closest('tr');
    let $prevRow = $row.prev();
    let item = $prevRow.find(".item").text();
    const dbItem = firebase.database().ref(item);

    if (confirm("Are you sure you want to delete " + item + "?")){
      //remove item from database
      dbItem.remove();
      //update admin table rows
      $prevRow.remove();
      $row.remove();
    }
  });
//doc.ready()
});

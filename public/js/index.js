//Assign inputs to variables
var $make = $("#make");
var $model = $("#model");
var $year = $("#year");
var $miles = $("#miles");
var $condition = $("#condition");
var offer = 0;

//Set events for click or form submit
$(document).on("submit", "#sellForm", validateSellForm);
$(document).on("click", "button.accept", acceptOffer);
$(document).on("submit", "#buyCar", validateBuyForm);
$(document).on("click", "button.buy", buyCar);
$(document).on("click", ".clear", clear);

//Clears the page and reload the page
function clear(){
  location.reload();
}

//Shows offer after costumer enters all the information
function showOfferModal(){
  $('#showOffer').modal({
    show: true,
});
  $('#offer').text("Our offer for your vehicle is $" + offer + " 🚗");
}
//Shows inventory search to buy cars
function showResults(carsResult) {
  $("#inventory").empty();
  carsResult.forEach(function (car,index) {
    var value = parseInt(carsResult[index].offer);
    var profit = (value * .35);
    var sellPrice = Math.round(value + profit);
    var displayDiv = $("<div>").attr("class", "display");
    var make = $("<p>").text("Make: " + carsResult[index].make);
    var model = $("<p>").text("Model: " + carsResult[index].model);
    var year = $("<p>").text("Year: " + carsResult[index].year);
    var miles = $("<p>").text("Miles: " + carsResult[index].miles);
    var condition = $("<p>").text("Condition: " + carsResult[index].condition);
    var price = $("<p>").text("Price: " + "$" + sellPrice);
    var button = $("<button>").text("Buy").attr("class", "btn btn-dark buy").data("id",carsResult[index].id);
    var divider = $("<p>").text("-------------------------");
    displayDiv.append(make);
    displayDiv.append(model);
    displayDiv.append(year);
    displayDiv.append(miles);
    displayDiv.append(condition);
    displayDiv.append(price);
    displayDiv.append(button);
    displayDiv.append(divider);
    $("#inventory").append(displayDiv);
  });
}
// This function updates the image logo based on the car choosen.
function getImage(make){
$("#image").empty();
    switch (make) {
      case "Ford":
        $("#image").html("<img src='../assets/images/fordEmblem.png'/>")
        return;
      case "Mitsubishi":
        $("#image").html("<img src='../assets/images/mitsubishiEmblem.png'/>")
        return;
      case "Nissan":
        $("#image").html("<img src='../assets/images/nissanEmblem.png'/>")
        return;
      case "Toyota":
        $("#image").html("<img src='../assets/images/toyotaEmblem.png'/>")
        return;
      case "Honda":
        $("#image").html("<img src='../assets/images/hondaEmblem.png'/>")
        return;
      case "Chevrolet":
        $("#image").html("<img src='../assets/images/chevroletEmblem.png'/>")
        return;
      case "Dodge":
        $("#image").html("<img src='../assets/images/dodgeEmblem.png'/>")
        return;
      case "Kia":
        $("#image").html("<img src='../assets/images/kiaEmblem.png'/>")
        return;
      case "Volkswagen":
        $("#image").html("<img src='../assets/images/volkswagenEmblem.png'/>")
        return;
      case "Hyundai":
        $("#image").html("<img src='../assets/images/hyundaiEmblem.png'/>")
        return;
    }
}
// This function grabs cars from the database and updates the view
function getCars() {
  $("#inventory").empty();
  $.get("/api/cars/" + $make.val() + "/" + $condition.val(), function (data) {
    var cars = data;
    showResults(cars);
    getImage($make.val());
  });
}
//Makes offer based on fair condition
function fairCondition(carYear) {
  if (carYear > 1999 && carYear < 2004) {
    offer = Math.floor(Math.random() * (1500 - 900 + 1)) + 900;
    showOfferModal(offer);
  } else if (carYear > 2004 && carYear < 2009) {
    offer = Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500;
    showOfferModal(offer);
  } else if (carYear > 2009 && carYear < 2015) {
    offer = Math.floor(Math.random() * (2300 - 2000 + 1)) + 2000;
    showOfferModal(offer);
  } else if (carYear >= 2015) {
    offer = Math.floor(Math.random() * (2800 - 2300 + 1)) + 2300;
    showOfferModal(offer);
  }
}
//Makes offer based on good condition
function goodCondition(carYear) {
  if (carYear > 19999 && carYear < 2004) {
    offer = Math.floor(Math.random() * (3200 - 2800 + 1)) + 2800;
    showOfferModal(offer);
  } else if (carYear > 2004 && carYear < 2009) {
    offer = Math.floor(Math.random() * (3600 - 3200 + 1)) + 3200;
    showOfferModal(offer);
  } else if (carYear > 2009 && carYear < 2015) {
    offer = Math.floor(Math.random() * (4000 - 3600 + 1)) + 3600;
    showOfferModal(offer);
  } else if (carYear >= 2015) {
    offer = Math.floor(Math.random() * (4400 - 4000 + 1)) + 4000;
    showOfferModal(offer);
  }
}
//Makes offer based on excellent condition
function excellentCondition(carYear) {
  if (carYear > 1999 && carYear < 2004) {
    offer = Math.floor(Math.random() * (4600 - 4400 + 1)) + 4400;
    showOfferModal(offer);
  } else if (carYear > 2004 && carYear < 2009) {
    offer = Math.floor(Math.random() * (5000 - 4600 + 1)) + 4600;
    showOfferModal(offer);
  } else if (carYear > 2009 && carYear < 2015) {
    offer = Math.floor(Math.random() * (5400 - 5000 + 1)) + 5000;
    showOfferModal(offer);
  } else if (carYear >= 2015) {
    offer = Math.floor(Math.random() * (7000 - 5400 + 1)) + 5400;
    showOfferModal(offer);
  }
}
//Check condition of car to then make the offer
function checkCondition(condition) {
  var year = $year.val();
  switch (condition) {
    case "Fair":
      fairCondition(year);
      return;
    case "Good":
      goodCondition(year);
      return;
    case "Excellent":
      excellentCondition(year);
      return;
  }
}
//Passed the condition value to check the condition
function getOffer() {
  var condition = $condition.val();
  checkCondition(condition);
}

//After accepting the offer sends infomation to the DataBase
function acceptOffer(event){
  event.preventDefault();
  var cars = {
    make: $make.val(),
    model: $model.val(),
    year: $year.val(),
    miles: $miles.val(),
    condition: $condition.val(),
    offer: offer
  };
  $.post("/api/cars", cars);
  $("#offer").text("Congratulation this offer is valid for 15 days")
  $(".accept").hide();
}
//Deletes the car from the Database after clicking on buy
function buyCar(event) {
  event.stopPropagation();
  var id = $(this).data("id");
  $('#confirm').modal({
    show: true,
  });
    $.ajax({
      method: "DELETE",
      url: "/api/cars/" + id
    }).then(getCars);
}

//Validates that the customer does not miss a field in the sellig form
function validateSellForm(event) {
  event.preventDefault();
  if ($make.val() === "select make") {
    $('#errorModal').modal({
      show: true,
    });
    $('#error').text("Please Select a Make 😐");
  } else if ($model.val() === "") {
    $('#errorModal').modal({
      show: true,
    });
    $('#error').text("Please Enter a Model 😐");
  } else if ($year.val() === "select year") {
    $('#errorModal').modal({
      show: true,
    });
    $('#error').text("Please Select a Year 😐");
  } else if ($miles.val() === "") {
    $('#errorModal').modal({
      show: true,
    });
    $('#error').text("Please Enter Miles 😐");
  } else if ($condition.val() === "select condition") {
    $('#errorModal').modal({
      show: true,
    });
    $('#error').text("Please Select a Condition 😐");
  } else {
    getOffer();
  }
}
//Validates that the customer does not miss a field in the buying form
function validateBuyForm(event) {
  event.preventDefault();
  $("#error").text("");
  if ($make.val() === "select make") {
    $('#errorModal').modal({
      show: true,
    });
    $('#error').text("Please Select a Make 😐");
  } else if ($condition.val() === "select condition") {
    $('#errorModal').modal({
      show: true,
    });
    $('#error').text("Please Select a Condition 😐");
  } else {
    getCars();
  }
}



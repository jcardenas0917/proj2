var $make = $("#make");
var $model = $("#model");
var $year = $("#year");
var $miles = $("#miles");
var $condition = $("#condition");
var offer = 0;

$(document).on("submit", "#sellForm", getOffer);
$(document).on("click", "button.accept", acceptOffer);
$(document).on("submit", "#buyCar", getCars);
$(document).on("click", "button.buy", buyCar);
$(document).on("click", ".clear", clear);


function clear(){
  location.reload();
}
function showOfferModal(){
  $('#showOffer').modal({
    show: true,
});
  $('#offer').text("Our offer for your vehicle is $" + offer);
}
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
};

// This function grabs cars from the database and updates the view

function getCars() {
  $("#inventory").empty();
  $.get("/api/cars/" + $make.val() + "/" + $condition.val(), function (data) {
    var cars = data;
    showResults(cars);
  });
};

function fairCondition(carYear) {
  if (carYear > 1999 && carYear < 2004) {
    offer = Math.floor(Math.random() * (1500 - 900 + 1)) + 900;
    showOfferModal(offer);
    console.log(offer);
  } else if (carYear > 2004 && carYear < 2009) {
    offer = Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500;
    showOfferModal(offer);
    console.log(offer);
  } else if (carYear > 2009 && carYear < 2015) {
    offer = Math.floor(Math.random() * (2300 - 2000 + 1)) + 2000;
    showOfferModal(offer);
    console.log(offer);
  } else if (carYear >= 2015) {
    offer = Math.floor(Math.random() * (2800 - 2300 + 1)) + 2300;
    showOfferModal(offer);
    console.log(offer);
  }
};

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
};

function excellentCondition(carYear) {
  console.log("this"+carYear)
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
};

function checkCondition(condition) {
  var year = $year.val();
  switch (condition) {
    case "Fair":
      console.log("Fair");
      fairCondition(year);
      return;
    case "Good":
      console.log("Good");
      goodCondition(year);
      return;
    case "Excellent":
      console.log("Excellent");
      excellentCondition(year);
      return;
  }
};
function getOffer(event) {
  event.preventDefault();
  var condition = $condition.val();
  checkCondition(condition);
};


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
  console.log(offer);
  $.post("/api/cars", cars);
  $("#offer").text("Congratulation this offer is valid for 15 days")
  $(".accept").hide();
};

function buyCar(event) {
  event.stopPropagation();
  console.log("👍👍👍")
  var id = $(this).data("id");
  console.log(id)
  $.ajax({
    method: "DELETE",
    url: "/api/cars/" + id
  }).then(getCars);
  $('#confirm').modal({
    show: true,
  });
}



var $make = $("#make");
var $model = $("#model");
var $year = $("#year");
var $miles = $("#miles");
var $condition = $("#condition");
var offer = 0;

$(document).on("submit", "#sellForm", sellCar);
$(document).on("submit", "#buyCar", getCars);
$(document).on("click", "button.buy", buyCar);


function showResults(carsResult) {
  carsResult.forEach(function (car,index) {
    var value = parseInt(carsResult[index].offer);
    console.log(value);
    var profit = (value * .35);
    var sellPrice = Math.round(value + profit);
    console.log(carsResult[index].make);
    console.log(carsResult[index].model);
    console.log(carsResult[index].year);
    console.log(carsResult[index].miles);
    console.log(carsResult[index].condition);
    console.log(sellPrice);
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
    $("#result").append(displayDiv);
  });
}

// This function grabs cars from the database and updates the view

function getCars() {
  $.get("/api/cars/" + $make.val() + "/" + $condition.val(), function (data) {
    var cars = data;
    showResults(cars);
  });
}

// This function updates a todo in our database
// function updateCar(todo) {
//   $.ajax({
//     method: "PUT",
//     url: "/api/cars",
//     data: cars
//   }).then(getCars);
// }

function showOffer(acceptOffer){

  var displayDiv = $("<div>").attr("class", "display");
  var message = $("<h1>").text("Our offer is $" + acceptOffer+ " for your vehicle");
  displayDiv.append(message);
  displayDiv.append( $("<button>").text("accept").attr("class", "btn btn-dark accept"));
  displayDiv.append($("<div>").attr("class", "col-2"));
  displayDiv.append( $("<button>").text("do no accept").attr("class", "btn btn-dark notAccept"));
  $("#result").append(displayDiv);
  // $(document).on("click", "#sellForm", postCar);
}
function fairCondition(carYear) {
  if (carYear > 1999 && carYear < 2004) {
    offer = Math.floor(Math.random() * (1500 - 900 + 1)) + 900;
    showOffer(offer);
    console.log(offer);
  } else if (carYear > 2004 && carYear < 2009) {
    offer = Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500;
    showOffer(offer);
    console.log(offer);
  } else if (carYear > 2009 && carYear < 2015) {
    offer = Math.floor(Math.random() * (2300 - 2000 + 1)) + 2000;
    showOffer(offer);
    console.log(offer);
  } else if (carYear >= 2015) {
    offer = Math.floor(Math.random() * (2800 - 2300 + 1)) + 2300;
    showOffer(offer);
    console.log(offer);
  }
}

function goodCondition(carYear) {
  if (carYear > 19999 && carYear < 2004) {
    offer = Math.floor(Math.random() * (3200 - 2800 + 1)) + 2800;
    showOffer(offer);
  } else if (carYear > 2004 && carYear < 2009) {
    offer = Math.floor(Math.random() * (3600 - 3200 + 1)) + 3200;
    showOffer(offer);
  } else if (carYear > 2009 && carYear < 2015) {
    offer = Math.floor(Math.random() * (4000 - 3600 + 1)) + 3600;
    showOffer(offer);
  } else if (carYear >= 2015) {
    offer = Math.floor(Math.random() * (4400 - 4000 + 1)) + 4000;
    showOffer(offer);
  }
}

function excellentCondition(carYear) {
  console.log("this"+carYear)
  if (carYear > 1999 && carYear < 2004) {
    offer = Math.floor(Math.random() * (4600 - 4400 + 1)) + 4400;
    showOffer(offer);
  } else if (carYear > 2004 && carYear < 2009) {
    offer = Math.floor(Math.random() * (5000 - 4600 + 1)) + 4600;
    showOffer(offer);
  } else if (carYear > 2009 && carYear < 2015) {
    offer = Math.floor(Math.random() * (5400 - 5000 + 1)) + 5000;
    showOffer(offer);
  } else if (carYear >= 2015) {
    offer = Math.floor(Math.random() * (7000 - 5400 + 1)) + 5400;
    showOffer(offer);
  }
}

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
}
function sellCar(event) {
  event.preventDefault();
  var condition = $condition.val();
  checkCondition(condition);
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
  // location.reload();
}

function buyCar(event) {
  event.stopPropagation();
  console.log("👍👍👍")
  var id = $(this).data("id");
  console.log(id)
  $.ajax({
    method: "DELETE",
    url: "/api/todos/" + id
  }).then(getCars);
}



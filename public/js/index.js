var $make = $("#make");
var $model = $("#model");
var $year = $("#year");
var $miles = $("#miles");
var $condition = $("#condition");
var offer = 0;

$(document).on("submit", "#sellForm", buyCar);
$(document).on("click", "#results", getCars);

function showResults(carsResult) {
  carsResult.forEach(function(element) {
    console.log(element);
  });
}

// This function grabs cars from the database and updates the view

function getCars() {
  $.get("/api/cars", function(data) {
    cars = data;
    showResults(cars);
  });
}

// This function deletes a todo when the user clicks the delete button
// function deleteCar(event) {
//   event.stopPropagation();
//   var id = $(this).data("id");
//   $.ajax({
//     method: "DELETE",
//     url: "/api/cars/" + id
//   }).then(getCars);
//}

// This function updates a todo in our database
// function updateCar(todo) {
//   $.ajax({
//     method: "PUT",
//     url: "/api/cars",
//     data: cars
//   }).then(getCars);
// }

function fairCondition(currentCondition, carYear) {
  if (currentCondition === "fair" && carYear > 2000 && carYear < 2005) {
    offer = Math.floor(Math.random() * 800) + 500;
    console.log(offer);
  } else if (currentCondition === "fair" && carYear > 2005 && carYear < 2010) {
    offer = Math.floor(Math.random() * 1000) + 800;
    console.log(offer);
  } else if (currentCondition === "fair" && carYear > 2010 && carYear < 2015) {
    offer = Math.floor(Math.random() * 1200) + 1000;
    console.log(offer);
  } else if (currentCondition === "fair" && carYear > 2015) {
    offer = Math.floor(Math.random() * 1500) + 1200;
    console.log(offer);
  }
}

function goodCondition(currentCondition, carYear) {
  if (currentCondition === "good" && carYear > 2000 && carYear < 2005) {
    offer = Math.floor(Math.random() * 1000) + 800;
  } else if (currentCondition === "good" && carYear > 2005 && carYear < 2010) {
    offer = Math.floor(Math.random() * 1200) + 1000;
  } else if (currentCondition === "good" && carYear > 2010 && carYear < 2015) {
    offer = Math.floor(Math.random() * 2000) + 1600;
  } else if (currentCondition === "good" && carYear > 2015) {
    offer = Math.floor(Math.random() * 3500) + 2500;
  }
}

function excellentCondition(currentCondition, carYear) {
  if (currentCondition === "excellent" && carYear > 2000 && carYear < 2005) {
    offer = Math.floor(Math.random() * 1400) + 1200;
  } else if (currentCondition === "excellent" && carYear >2005 && carYear < 2010) {
    offer = Math.floor(Math.random() * 1800) + 1400;
  } else if (currentCondition === "excellent" && carYear > 2010 && carYear < 2015) {
    offer = Math.floor(Math.random() * 2500) + 1800;
  } else if (currentCondition === "excellent" && carYear > 2015) {
    offer = Math.floor(Math.random() * 7000) + 4500;
  }
}

function buyCar(event) {
  event.preventDefault();
  var condition = $condition.val();
  var year = $year.val();
  fairCondition(condition, year);
  goodCondition(condition, year);
  excellentCondition(condition, year);
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
}

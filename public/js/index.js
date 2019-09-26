var $make = $("#make");
var $model = $("#model");
var $year = $("#year");
var $miles = $("#miles");
var $condition = $("#condition");
var offer = 0;

$(document).on("click", "#offer", buyCar);
$(document).on("click", "#results", getCars);

function showResults(carsResult) {
  carsResult.forEach(function (element) {
    console.log(element);
  });
}

// This function grabs cars from the database and updates the view

function getCars() {
  $.get("/api/cars/" + $make.val() + "/" + $condition.val(), function (data) {
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
function fairCondition(carYear) {
  if (carYear > 1999 && carYear < 2004) {
    offer = Math.floor(Math.random() * (1500 - 900 + 1)) + 900;
    console.log(offer);
  } else if (carYear > 2004 && carYear < 2009) {
    offer = Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500;
    console.log(offer);
  } else if (carYear > 2009 && carYear < 2015) {
    offer = Math.floor(Math.random() * (2300 - 2000 + 1)) + 2000;
    console.log(offer);
  } else if (carYear >= 2015) {
    offer = Math.floor(Math.random() * (2800 - 2300 + 1)) + 2300;
    console.log(offer);
  }
}

function goodCondition(carYear) {
  if (carYear > 19999 && carYear < 2004) {
    offer = Math.floor(Math.random() * (3200 - 2800 + 1)) + 2800;
  } else if (carYear > 2004 && carYear < 2009) {
    offer = Math.floor(Math.random() * (3600 - 3200 + 1)) + 3200;
  } else if (carYear > 2009 && carYear < 2015) {
    offer = Math.floor(Math.random() * (4000 - 3600 + 1)) + 3600;
  } else if (carYear >= 2015) {
    offer = Math.floor(Math.random() * (4400 - 4000 + 1)) + 4000;
  }
}

function excellentCondition(carYear) {
  if (carYear > 1999 && carYear < 2004) {
    offer = Math.floor(Math.random() * (4600 - 4400 + 1)) + 4400;
  } else if (carYear > 2004 && carYear < 2009) {
    offer = Math.floor(Math.random() * (5000 - 4600 + 1)) + 4600;
  } else if (carYear > 2009 && carYear < 2015) {
    offer = Math.floor(Math.random() * (5400 - 5000 + 1)) + 5000;
  } else if (carYear >= 2015) {
    offer = Math.floor(Math.random() * (7000 - 5400 + 1)) + 5400;
  }
}

function checkCondition(condition) {
  var year = $year.val();
  switch (condition) {
    case "fair":
      console.log("fair");
      fairCondition(year);
      return;
    case "good":
      console.log("good");
      goodCondition(year);
      return;
    case "excellent":
      console.log("excellent");
      excellentCondition(year);
      return;
  }
}
function buyCar(event) {
  event.preventDefault();
  console.log($year.val());
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

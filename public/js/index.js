var $make = $("#make");
var $model = $("#model");
var $year = $("#year");
var $miles = $("#miles");
var $condition = $("#condition");
var offer = 0;

$(document).on("submit", "#sellForm", buyCar);

// This function grabs todos from the database and updates the view
// function getCars() {
//   $.get("/api/cars", function(data) {
//     cars = data;
//   });
// }

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

// This function inserts a new todo into our database and then updates the view
function buyCar(event) {
  event.preventDefault();
  if ($miles.val() < 50000 && $condition.val() === "good") {
    offer = 1000;
  }
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

var db = require("../models");

module.exports = function(app) {
  
  // app.get("/api/cars", function(req, res) {
  //   db.Cars.findAll({}).then(function(dbCars) {
  //     res.json(dbCars);
  //   });
  // });

  app.get("/api/cars/:make/:condition", function(req, res) {
    db.Cars.findAll({
      where: {
        make: req.params.make,
        condition: req.params.condition
      }
    })
      .then(function(dbCars) {
        res.json(dbCars);
      });
  });

  // Create a new example
  app.post("/api/cars", function(req, res) {
    db.Cars.create({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      miles: req.body.miles,
      condition: req.body.condition,
      offer: req.body.offer
    }).then(function(dbCars) {
      res.json(dbCars);
    });
  });

  // Delete an example by id
  app.delete("/api/cars/:id", function(req, res) {
    db.Cars.destroy({ where: { id: req.params.id } }).then(function(dbCars) {
      res.json(dbCars);
    });
  });
};

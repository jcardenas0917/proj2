var db = require("../models");

module.exports = function(app) {
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
    // We just have to specify which todo we want to destroy with "where"
    db.Cars.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCars) {
      res.json(dbCars);
    });

  });
};

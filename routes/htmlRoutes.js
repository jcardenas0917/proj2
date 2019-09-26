var path = require("path");
module.exports = function(app) {
 // Load index page
 // Each of the below routes just handles the HTML page that the user gets sent to.
 // index route loads view.html
 app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, "../public/index.html"));
 });
 // buy route loads buy.html
 app.get("/buy", function(req, res) {
   res.sendFile(path.join(__dirname, "../public/buy.html"));
 });
 // sell route loads sell.html
 app.get("/sell", function(req, res) {
   res.sendFile(path.join(__dirname, "../public/sell.html"));
 });
 app.get("/about", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/about.html"));
});
 // Render 404 page for any unmatched routes
 app.get("*", function(req, res) {
   res.render("404");
 });
};

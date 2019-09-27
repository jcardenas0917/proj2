var db = require("../models");

module.exports = function (app) {
    app.post("/api/emails", function (req, res) {
        db.Emails.create({
            emails: req.body.emails
        }).then(function (dbEmails) {
            res.json(dbEmails);
        });
    });
};

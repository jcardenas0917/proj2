var db = require("../models");

module.exports = function (app) {
    app.post("/api/emails", function (req, res) {
        db.Emails.create({
            emails: req.body.email
        }
        ).then(function (dbEmails) {
            res.json(dbEmails);
        });
    });
};

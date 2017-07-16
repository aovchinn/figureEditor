var express = require("express");
var router = express.Router();
var db = require("../public/javascripts/db.js");

router.get("/diagrams/:id", function(req, res, next) {
    res.json(db[req.params.id]);
});

router.patch("/diagrams/:id", function(req, res, next) {
    db[req.params.id] = req.body;
    res.json(db[req.params.id]);
});

module.exports = router;

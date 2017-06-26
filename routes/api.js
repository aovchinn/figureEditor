var express = require("express");
var router = express.Router();
var db = require("../public/javascripts/db.js");

router.get("/diagrams/:id", function(req, res, next) {
    res.json(db[req.params.id]);
});

router.put("/diagrams/:id", function(req, res, next) {
    // res.send(db[req.params.id]);
    console.log(req.body);
    console.log("ok");
    console.log(req.params.id);
    res.json(db[req.params.id]);
});

module.exports = router;

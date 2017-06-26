var express = require("express");
var router = express.Router();
var db = require("../public/javascripts/db.js");

router.get("/", function(req, res, next) {
    res.render("index", { list: db });
});

module.exports = router;

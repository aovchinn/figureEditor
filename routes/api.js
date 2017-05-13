var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db.js');

router.get('/diagrams/:id', function (req, res, next) {
    res.send(db[req.params.id]);
});

module.exports = router;

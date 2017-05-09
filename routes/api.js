var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db.js');
var _ = require('underscore');
//
// router.get('/diagrams', function(req, res, next) {
//     res.send(db);
// });

router.get('/diagrams/:id', function(req, res, next) {
    res.send(_.omit(db[req.params.id], 'components'));
});

router.get('/diagrams/:id/components', function(req, res, next) {
    res.send(db[req.params.id].components);
});

module.exports = router;

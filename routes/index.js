var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Figure editor',
        list: db
    });
});

module.exports = router;

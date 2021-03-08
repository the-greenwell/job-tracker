var express = require('express');
var router = express.Router();
var app = express();
var Jobs = require('../models/Jobs.js');

// list data
router.get('/', function(req, res) {
    Jobs.find(function (err, jobs) {
        if (err) return next(err);
        res.json(jobs);
    });
});

// get data by id
router.get('/:id', function(req, res, next) {
    Jobs.findById(req.params.id, function (err, jobs) {
        if (err) return next(err);
        res.json(jobs);
    });
});

// post data
router.post('/', function(req, res, next) {
    Jobs.create(req.body, function (err, jobs) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(jobs);
    });
});

// put data
router.put('/:id', function(req, res, next) {
    Jobs.findByIdAndUpdate(req.params.id, req.body, function (err, jobs) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(jobs);
    });
});

// delete data by id
router.delete('/:id', function(req, res, next) {
    Jobs.findByIdAndRemove(req.params.id, req.body, function (err, jobs) {
        if (err) return next(err);
        res.json(jobs);
    });
});

module.exports = router;

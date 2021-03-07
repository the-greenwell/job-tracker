var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Jobs = require('../models/Jobs.js');

server.listen(4000)

io.on('connection', function(socket){
  socket.on('newdata',function(data){
    io.emit('new-data', { data: data });
  });
  socket.on('updatedata', function(data){
    io.emit('update-data', { data: data });
  });
});

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

const express = require('express');
const router = express.Router();
const app = express();
const Jobs = require('../models/Jobs.js');
const User = require('../models/User.js');
const { jobsValidation } = require('../validation');


// list data
router.get('/:user_id', function(req, res) {
  User.findById(req.params.user_id, function (err, user){
    if (err) {
      console.log(err)
      return res.status(400).json(err);
    }
    res.json(user.jobs);
  });
});

// get data by id
router.get('/:user_id/:job_id', function(req, res, next) {
  User.findById(req.params.user_id, function (err, user){
    res.json(user.jobs.id(req.params.job_id))
  });
});

// post data
router.post('/:user_id', function(req, res, next) {
  const { error } = jobsValidation(req.body);

  if(error) {
    return res.status(400).json({error: error.details[0].message});
  }

  User.findById(req.params.user_id, function (err, user){
    console.log(req.params.user_id)
    const job = new Jobs(req.body);
    job.save(function (err) {
      if (err) {
        console.log(err)
        return res.status(400).json(err);
      }
      user.jobs.push(job);
      user.save(function(err) {
        if(err) {
          console.log(err)
          return res.status(400).json(err);
        }
        res.json(user.jobs.id(job._id));
      })
    });
  });
});

// put data
router.put('/:user_id/:job_id', function(req, res, next) {
  const { error } = jobsValidation(req.body);

  if(error) {
    console.log(error)
    return res.status(400).json({error: error.details[0].message});
  }

  User.findById(req.params.user_id, function (err, user){
    const job = user.jobs.id(req.params.job_id);
    job.company = req.body.company;
    job.position = req.body.position;
    job.status = req.body.status;
    job.link = req.body.link;
    job.starred = req.body.starred;
    job.notes = req.body.notes;

    user.save(function(err) {
      if(err) {
        console.log(err)
        return res.status(400).json(err);
      }
      res.json(user.jobs.id(req.params.job_id));
    });
  });
});

// delete data by id
router.delete('/:user_id/:job_id', function(req, res, next) {
  User.findById(req.params.user_id, function (err, user){
    user.jobs.pull(req.params.job_id);
    user.save(function(err) {
      if(err) {
        console.log(err)
        return res.status(400).json(err);
      }
      res.json(user.jobs);
    });
  });
});

module.exports = router;

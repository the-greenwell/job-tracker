const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');


// Register User
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);

  if(error) {
    return res.status(400).json({error: error.details[0].message});
  }

  const usernameExists = await User.findOne({ username: req.body.username });

  if (usernameExists){
    return res.status(400).json({ error: "Username already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: password,
  });

  try {
    const savedUser = await user.save();
    res.json({ error: null, data: { userId: savedUser._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Log User In
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  console.log(req.body)

  if(error) {
    return res.status(400).json({error: error.details[0].message});
  }

  const user = await User.findOne({ username: req.body.username });

  if(!user) {
    return res.status(400).json({ error: 'Username is wrong *CHANGE BEFOROE DEPLOY*'});
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({ error: "Password is wrong *CHANGE BEFOROE DEPLOY*" });
  }

  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.SECRET_TOKEN, { expiresIn: '45m'});
    res.json({
      auth_token: token,
      userId: user._id,
    });

});


module.exports = router;

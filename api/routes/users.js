const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');


// Register User
router.post("/register", async (req, res) => {
  console.log(req.body, req)
  const { error } = registerValidation(req.body);

  if(error) {
    return res.status(400).json({error: error.details[0].message});
  }

  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists){
    return res.status(400).json({ error: "Email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
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

  if(error) {
    return res.status(400).json({error: error.details[0].message});
  }

  const user = await User.findOne({ email: req.body.email });

  if(!user) {
    return res.status(400).json({ error: 'Email is wrong *CHANGE BEFOROE DEPLOY*'});
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
    process.env.SECRET_TOKEN
  );

  res.header('auth-token', token).json({
    error: null,
    data: {
      token,
    },
  });

});


module.exports = router;

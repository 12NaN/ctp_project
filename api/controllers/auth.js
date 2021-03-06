const router = require('express').Router();
const { User } = require('../models');
const { Bio } = require('../models');
const passport = require('../middlewares/authentication');


router.post('/signup', (req, res) => {
  console.log("POST body: ", req.body);

  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    message: req.body.message,
    recommendation: req.body.recommendation,
    traveledTo: req.body.traveledTo,
    wishListCities: req.body.wishListCities
  })
    .then(user => {
      /*req.login(user, () => */res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).json({ msg: 'Failed Signup', err });
    });
});

router.post('/login',
  passport.authenticate('local'), 
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.

    res.json(req.user);
  });

router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
})

router.post('/userbio', (req, res) => {
  Bio.create({
    message: req.body.message,
    recommendation: req.body.recommendation,
    traveledTo: req.body.traveledTo,
    wishListCities: req.body.wishListCities,
    userId: req.user.id
  })
    .then(user => {
      /*req.login(user, () => */res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).json({ msg: 'Failed user bio', err });
    });
});

module.exports = router;
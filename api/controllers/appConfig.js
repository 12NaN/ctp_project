const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("in root");
  res.json({
    title: 'APP TITLE',
    description: 'A short description about this app',
  });
});


module.exports = router;
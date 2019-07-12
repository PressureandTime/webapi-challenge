const express = require('express');

const actionDb = require('../helpers/actionModel');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const actions = await actionDb.get();
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the actions'
    });
  }
});



module.exports = router;
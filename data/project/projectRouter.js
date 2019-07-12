const express = require('express');

const postDb = require('../helpers/projectModel');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const projects = await postDb.get();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the projects'
    });
  }
});



module.exports = router;
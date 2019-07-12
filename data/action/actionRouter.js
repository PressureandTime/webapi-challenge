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

router.get('/:id', async (req, res) => {
  try {
    const actions = await actionDb.get(req.params.id);
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the action with that ID'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const action = await actionDb.insert(req.body);
    res.status(201).json(action);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the action'
    });
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedAction = await actionDb.update(id, req.body);
    if (updatedAction) {
      res.status(200).json({ message: 'update was successful' });
    } else {
      res.status(404).json({ message: 'The action could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the action'
    });
  }
});

module.exports = router;

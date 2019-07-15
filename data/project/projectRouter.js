const express = require('express');

const projectDb = require('../helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await projectDb.get();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the projects'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await projectDb.get(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the project with that ID'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await projectDb.getProjectActions(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the project with that ID'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const project = await projectDb.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the project'
    });
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedProject = await projectDb.update(id, req.body);
    if (updatedProject) {
      res.status(200).json({ message: 'Update was successful' });
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error updating the project'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await projectDb.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The project has been deleted' });
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the project'
    });
  }
});

module.exports = router;

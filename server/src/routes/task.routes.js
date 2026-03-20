const express = require('express');

const router = express.Router();
const { getAllTasks, createTask, deleteTask } = require('../controllers/task.controller');

router.get('/', getAllTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);

module.exports = router;


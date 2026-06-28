const express = require('express');
const router = express.Router();
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const validateTask = require('../middleware/validate');

router.get('/', getTasks);
router.post('/', validateTask, createTask);
router.get('/:id', getTask);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
